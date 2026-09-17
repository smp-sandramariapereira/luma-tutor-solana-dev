import { createServer, type Server } from "node:http";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { AddressInfo } from "node:net";
import { createIdeathonApp } from "../dist/http-app.js";
import { LearnerStore } from "../dist/learner-store.js";

export interface TestApp {
  origin: string;
  store: LearnerStore;
  directory: string;
  close(): Promise<void>;
}

export function tempStore(): { store: LearnerStore; directory: string } {
  const directory = mkdtempSync(join(tmpdir(), "ideathon-test-"));
  const store = new LearnerStore(join(directory, "learning-harness.sqlite"));
  return { store, directory };
}

export async function listen(server: Server, host = "127.0.0.1"): Promise<string> {
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, host, () => resolve());
  });
  const address = server.address() as AddressInfo;
  return `http://${host}:${address.port}`;
}

export async function startApp(env: NodeJS.ProcessEnv = {}): Promise<TestApp> {
  const { store, directory } = tempStore();
  const server = createIdeathonApp({
    store,
    env: {
      HOST: "127.0.0.1",
      SOLANA_DEFAULT_CLUSTER: "localnet",
      ...env
    }
  });
  const origin = await listen(server);
  return {
    origin,
    store,
    directory,
    async close() {
      await new Promise<void>((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()));
      });
      store.close();
      rmSync(directory, { recursive: true, force: true });
    }
  };
}

export async function startMockLlm(
  respond: (body: Record<string, unknown>, response: import("node:http").ServerResponse) => void
): Promise<{ origin: string; close(): Promise<void> }> {
  const server = createServer(async (request, response) => {
    if (!request.url?.includes("/chat/completions")) {
      response.writeHead(404).end();
      return;
    }
    const chunks: Buffer[] = [];
    for await (const chunk of request) chunks.push(Buffer.from(chunk));
    const body = JSON.parse(Buffer.concat(chunks).toString("utf8")) as Record<string, unknown>;
    respond(body, response);
  });
  const origin = await listen(server);
  return {
    origin,
    async close() {
      await new Promise<void>((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()));
      });
    }
  };
}

export function writeSseReply(response: import("node:http").ServerResponse, content: string): void {
  response.writeHead(200, { "content-type": "text/event-stream" });
  response.write(`data: ${JSON.stringify({ choices: [{ delta: { content } }] })}\n\n`);
  response.write("data: [DONE]\n\n");
  response.end();
}

export async function readJson(
  origin: string,
  path: string,
  init: RequestInit = {}
): Promise<{ status: number; body: Record<string, unknown>; headers: Headers }> {
  const response = await fetch(`${origin}${path}`, init);
  const body = (await response.json().catch(() => ({}))) as Record<string, unknown>;
  return { status: response.status, body, headers: response.headers };
}

export function sidCookie(headers: Headers): string | undefined {
  const cookies = headers.getSetCookie();
  const line = cookies.find((item) => item.startsWith("lh_sid="));
  if (!line) return undefined;
  const value = line.split(";")[0];
  return value && value !== "lh_sid=" ? value : undefined;
}

export async function startSession(
  origin: string,
  input: { displayName: string; goal: string }
): Promise<{ cookie: string; body: Record<string, unknown> }> {
  const result = await readJson(origin, "/api/session", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...input, consentToStoreProfile: true })
  });
  const cookie = sidCookie(result.headers);
  if (result.status !== 200 || !cookie) {
    throw new Error(`Falha ao iniciar sessão: ${result.status} ${JSON.stringify(result.body)}`);
  }
  return { cookie, body: result.body };
}
