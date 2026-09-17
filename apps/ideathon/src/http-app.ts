import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { lumaTutorPrompt } from "./luma-prompt.js";
import {
  type LlmConfiguration,
  normalizeConfiguration,
  verifyLlmConfiguration,
  OpenAiCompatibleLlmClient,
  type ChatMessage
} from "./llm-client.js";
import type { LearnerStore } from "./learner-store.js";
import {
  LEARNER_COOKIE,
  expireCookie,
  issueLearnerId,
  parseToken,
  readCookie,
  resolveSessionSecret,
  serializeCookie,
  signToken
} from "./pilot-session.js";
import { FixedWindowRateLimiter, RateLimitError } from "./rate-limiter.js";
import { publicCluster, sessionSnapshot } from "./session-snapshot.js";
import { detectLlmProvider } from "./tutor-mode.js";
import { renderStudentPage } from "./ui.js";

export interface IdeathonAppOptions {
  store: LearnerStore;
  env?: NodeJS.ProcessEnv;
}

export function createIdeathonApp(options: IdeathonAppOptions) {
  const env = options.env ?? process.env;
  const store = options.store;
  const cluster = publicCluster(env.SOLANA_DEFAULT_CLUSTER);
  const host = env.HOST ?? "127.0.0.1";
  const secret = resolveSessionSecret(env, host);
  let llmConfiguration: LlmConfiguration | undefined = configurationFromEnvironment(env);
  const chatRateLimiter = new FixedWindowRateLimiter(
    Number(env.CHAT_REQUESTS_PER_MINUTE ?? 20),
    60_000
  );

  const server = createServer(async (request, response) => {
    const cookiesToSet: string[] = [];
    try {
      const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "127.0.0.1"}`);
      const learnerFromCookie = parseToken(readCookie(request.headers.cookie, LEARNER_COOKIE), secret);

      if (request.method === "GET" && url.pathname === "/") {
        cookiesToSet.push(expireCookie(LEARNER_COOKIE));
        sendHtml(response, 200, renderStudentPage(), cookiesToSet);
        return;
      }

      if (request.method === "GET" && url.pathname === "/api/status") {
        sendJson(
          response,
          200,
          {
            cluster,
            mainnet: false,
            configured: Boolean(llmConfiguration),
            model: llmConfiguration?.model,
            provider: llmConfiguration ? detectLlmProvider(llmConfiguration.baseUrl) : undefined
          },
          cookiesToSet
        );
        return;
      }

      if (request.method === "POST" && url.pathname === "/api/config") {
        const body = await readJson(request);
        const next = normalizeConfiguration({
          apiKey: typeof body.apiKey === "string" ? body.apiKey : undefined,
          model: typeof body.model === "string" ? body.model : undefined,
          baseUrl: typeof body.baseUrl === "string" ? body.baseUrl : undefined
        });
        await verifyLlmConfiguration(next);
        llmConfiguration = next;
        sendJson(
          response,
          200,
          {
            configured: true,
            provider: detectLlmProvider(llmConfiguration.baseUrl),
            llm: { model: llmConfiguration.model, baseUrl: llmConfiguration.baseUrl }
          },
          cookiesToSet
        );
        return;
      }

      if (request.method === "POST" && url.pathname === "/api/session") {
        const body = await readJson(request);
        if (body.consentToStoreProfile !== true) {
          throw new Error("O armazenamento persistente exige consentimento explícito.");
        }
        const learnerId = issueLearnerId();
        cookiesToSet.push(serializeCookie(LEARNER_COOKIE, signToken(learnerId, secret)));
        await store.startSession({
          learnerId,
          displayName: requiredString(body.displayName, "displayName"),
          goal: requiredString(body.goal, "goal"),
          consentToStoreProfile: true
        });
        sendJson(response, 200, await sessionSnapshot(store, learnerId, cluster), cookiesToSet);
        return;
      }

      const learnerId = learnerFromCookie;
      const needsSession =
        (request.method === "GET" && url.pathname === "/api/ideathon") ||
        (request.method === "POST" && url.pathname === "/api/chat");
      if (!learnerId) {
        if (needsSession) {
          sendJson(response, 401, { error: "Inicie a sessão (com consentimento)." }, cookiesToSet);
          return;
        }
        sendJson(response, 404, { error: "Rota não encontrada." }, cookiesToSet);
        return;
      }

      if (request.method === "GET" && url.pathname === "/api/ideathon") {
        sendJson(response, 200, await sessionSnapshot(store, learnerId, cluster), cookiesToSet);
        return;
      }

      if (request.method === "POST" && url.pathname === "/api/chat") {
        if (!llmConfiguration) {
          sendJson(
            response,
            403,
            { error: "Conecte a API à esquerda. Sem API Luma não conversa." },
            cookiesToSet
          );
          return;
        }
        chatRateLimiter.consume(learnerId);
        const body = await readJson(request);
        const rawMessages = Array.isArray(body.messages) ? body.messages : [];
        const messages: ChatMessage[] = rawMessages.slice(-20).map((item): ChatMessage => {
          if (!item || typeof item !== "object") throw new Error("Mensagem inválida.");
          const record = item as Record<string, unknown>;
          if (record.role !== "user" && record.role !== "assistant") {
            throw new Error("Papel de mensagem inválido.");
          }
          const content = requiredString(record.content, "messages.content");
          if (content.length > 20_000) throw new Error("Mensagem excede 20.000 caracteres.");
          return { role: record.role, content };
        });
        if (messages.length === 0) {
          throw new Error("Envie ao menos uma mensagem.");
        }
        const session = await sessionSnapshot(store, learnerId, cluster);
        const learnerContext = {
          goal: session.goal,
          displayName: session.displayName
        };
        const headers: Record<string, string | string[]> = {
          "content-type": "text/event-stream; charset=utf-8",
          "cache-control": "no-cache",
          connection: "keep-alive",
          "x-accel-buffering": "no"
        };
        if (cookiesToSet.length > 0) headers["set-cookie"] = cookiesToSet;
        response.writeHead(200, headers);
        const sendEvent = (payload: unknown): void => {
          response.write(`data: ${JSON.stringify(payload)}\n\n`);
        };
        try {
          const reply = await new OpenAiCompatibleLlmClient(llmConfiguration).chat(
            messages,
            learnerContext,
            (delta) => sendEvent({ delta }),
            lumaTutorPrompt
          );
          sendEvent({ done: true, message: reply.message, options: reply.options });
        } catch (error) {
          const message = error instanceof Error ? error.message : "Erro inesperado.";
          sendEvent({ error: message });
        }
        response.end();
        return;
      }

      sendJson(response, 404, { error: "Rota não encontrada." }, cookiesToSet);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro inesperado.";
      const status =
        error instanceof RateLimitError
          ? 429
          : error && typeof error === "object" && "statusCode" in error
            ? Number((error as { statusCode: number }).statusCode)
            : 400;
      const extraHeaders =
        error instanceof RateLimitError ? { "retry-after": String(error.retryAfterSeconds) } : {};
      sendJson(
        response,
        status,
        {
          error: message,
          ...(error instanceof RateLimitError ? { retryAfterSeconds: error.retryAfterSeconds } : {})
        },
        cookiesToSet,
        extraHeaders
      );
    }
  });

  return server;
}

function configurationFromEnvironment(env: NodeJS.ProcessEnv): LlmConfiguration | undefined {
  const apiKey = env.LLM_API_KEY;
  const model = env.LLM_MODEL;
  if (!apiKey || !model) return undefined;
  return normalizeConfiguration({
    apiKey,
    model,
    baseUrl: env.LLM_BASE_URL ?? "https://api.openai.com/v1"
  });
}

async function readJson(request: IncomingMessage): Promise<Record<string, unknown>> {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of request) {
    const buffer = Buffer.from(chunk);
    size += buffer.length;
    if (size > 1_000_000) throw new Error("Requisição excede o limite de 1 MB.");
    chunks.push(buffer);
  }
  if (chunks.length === 0) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8")) as Record<string, unknown>;
}

function requiredString(value: unknown, field: string): string {
  if (typeof value !== "string" || !value.trim()) throw new Error(`Campo obrigatório: ${field}.`);
  return value.trim();
}

function sendJson(
  response: ServerResponse,
  status: number,
  body: unknown,
  cookies: string[],
  extraHeaders: Record<string, string> = {}
): void {
  const headers: Record<string, string | string[]> = {
    "content-type": "application/json; charset=utf-8",
    ...extraHeaders
  };
  if (cookies.length > 0) headers["set-cookie"] = cookies;
  response.writeHead(status, headers);
  response.end(JSON.stringify(body));
}

function sendHtml(
  response: ServerResponse,
  status: number,
  body: string,
  cookies: string[]
): void {
  const headers: Record<string, string | string[]> = {
    "content-type": "text/html; charset=utf-8"
  };
  if (cookies.length > 0) headers["set-cookie"] = cookies;
  response.writeHead(status, headers);
  response.end(body);
}
