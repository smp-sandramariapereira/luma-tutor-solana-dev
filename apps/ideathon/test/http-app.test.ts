import assert from "node:assert/strict";
import { after, describe, it } from "node:test";
import {
  readJson,
  sidCookie,
  startApp,
  startMockLlm,
  startSession,
  writeSseReply,
  type TestApp
} from "./helpers.ts";

describe("http-app erros e sessão", () => {
  const apps: TestApp[] = [];

  after(async () => {
    for (const app of apps) await app.close();
  });

  it("abre página limpa, sem facilitador e sem sessão", async () => {
    const app = await startApp();
    apps.push(app);
    const home = await fetch(`${app.origin}/`);
    const html = await home.text();
    assert.equal(home.status, 200);
    assert.match(home.headers.get("set-cookie") ?? "", /lh_sid=;.*Max-Age=0/);
    assert.match(html, /reiniciar sessão/);
    assert.match(html, /Olá! Eu sou Luma, tutor Solana/);
    const missing = await readJson(app.origin, "/facilitador");
    assert.equal(missing.status, 404);
    const session = await readJson(app.origin, "/api/ideathon");
    assert.equal(session.status, 401);
    const chat = await readJson(app.origin, "/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: "oi" }] })
    });
    assert.equal(chat.status, 401);
    const status = await readJson(app.origin, "/api/status");
    assert.equal(status.body.cluster, "localnet");
    assert.equal(status.body.configured, false);
  });

  it("recusa sessão sem consentimento, nome ou objetivo", async () => {
    const app = await startApp();
    apps.push(app);
    const noConsent = await readJson(app.origin, "/api/session", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ displayName: "Ana", goal: "PDAs", consentToStoreProfile: false })
    });
    assert.equal(noConsent.status, 400);
    assert.match(String(noConsent.body.error), /consentimento/);
    const empty = await readJson(app.origin, "/api/session", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ displayName: "  ", goal: "PDAs", consentToStoreProfile: true })
    });
    assert.equal(empty.status, 400);
    assert.match(String(empty.body.error), /displayName/);
    const noGoal = await readJson(app.origin, "/api/session", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ displayName: "Ana", goal: "", consentToStoreProfile: true })
    });
    assert.equal(noGoal.status, 400);
    assert.match(String(noGoal.body.error), /goal/);
  });

  it("inicia sessão nova e recusa cookie de aprendiz inexistente", async () => {
    const app = await startApp();
    apps.push(app);
    const first = await startSession(app.origin, { displayName: "Ana", goal: "entender owner" });
    assert.equal(first.body.goal, "entender owner");
    const second = await startSession(app.origin, { displayName: "Ana", goal: "Token-2022" });
    assert.notEqual(second.cookie, first.cookie);
    assert.equal(second.body.goal, "Token-2022");
    const snapshot = await readJson(app.origin, "/api/ideathon", { headers: { cookie: second.cookie } });
    assert.equal(snapshot.status, 200);
    assert.equal(snapshot.body.goal, "Token-2022");
    app.store.connection.prepare("DELETE FROM learners").run();
    const missing = await readJson(app.origin, "/api/ideathon", { headers: { cookie: second.cookie } });
    assert.equal(missing.status, 400);
    assert.match(String(missing.body.error), /Sessão não encontrada/);
  });

  it("recusa chat sem API, sem mensagem e com papel inválido", async () => {
    const app = await startApp();
    apps.push(app);
    const { cookie } = await startSession(app.origin, { displayName: "Ana", goal: "PDAs" });
    const headers = { "content-type": "application/json", cookie };
    const noApi = await readJson(app.origin, "/api/chat", {
      method: "POST",
      headers,
      body: JSON.stringify({ messages: [{ role: "user", content: "o que é owner?" }] })
    });
    assert.equal(noApi.status, 403);
    assert.match(String(noApi.body.error), /Conecte a API/);
    const appWithLlm = await startApp({
      LLM_API_KEY: "sk-test",
      LLM_MODEL: "mock",
      LLM_BASE_URL: "http://127.0.0.1:9/v1"
    });
    apps.push(appWithLlm);
    const started = await startSession(appWithLlm.origin, { displayName: "Ana", goal: "PDAs" });
    const withLlm = { "content-type": "application/json", cookie: started.cookie };
    const empty = await readJson(appWithLlm.origin, "/api/chat", {
      method: "POST",
      headers: withLlm,
      body: JSON.stringify({ messages: [] })
    });
    assert.equal(empty.status, 400);
    assert.match(String(empty.body.error), /ao menos uma mensagem/);
    const badRole = await readJson(appWithLlm.origin, "/api/chat", {
      method: "POST",
      headers: withLlm,
      body: JSON.stringify({ messages: [{ role: "system", content: "x" }] })
    });
    assert.equal(badRole.status, 400);
    assert.match(String(badRole.body.error), /Papel de mensagem inválido/);
    const tooLong = await readJson(appWithLlm.origin, "/api/chat", {
      method: "POST",
      headers: withLlm,
      body: JSON.stringify({ messages: [{ role: "user", content: "a".repeat(20_001) }] })
    });
    assert.equal(tooLong.status, 400);
    assert.match(String(tooLong.body.error), /20\.000 caracteres/);
  });

  it("recusa config de API inválida", async () => {
    const app = await startApp();
    apps.push(app);
    const remoteHttp = await readJson(app.origin, "/api/config", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ model: "gpt-4o-mini", baseUrl: "http://example.com/v1", apiKey: "sk" })
    });
    assert.equal(remoteHttp.status, 400);
    assert.match(String(remoteHttp.body.error), /HTTPS/);
    const noKey = await readJson(app.origin, "/api/config", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ model: "gpt-4o-mini", baseUrl: "https://api.openai.com/v1" })
    });
    assert.equal(noKey.status, 400);
    assert.match(String(noKey.body.error), /chave de API/);
  });

  it("envia erro da LLM no fluxo e limita mensagens", async () => {
    const llm = await startMockLlm((_body, response) => {
      response.writeHead(401, { "content-type": "application/json" });
      response.end(JSON.stringify({ error: { message: "chave recusada" } }));
    });
    const app = await startApp({
      LLM_API_KEY: "sk-test",
      LLM_MODEL: "mock",
      LLM_BASE_URL: `${llm.origin}/v1`,
      CHAT_REQUESTS_PER_MINUTE: "2"
    });
    apps.push(app);
    try {
      const { cookie } = await startSession(app.origin, { displayName: "Ana", goal: "owner" });
      const chat = await fetch(`${app.origin}/api/chat`, {
        method: "POST",
        headers: { "content-type": "application/json", cookie },
        body: JSON.stringify({ messages: [{ role: "user", content: "o que é owner?" }] })
      });
      assert.equal(chat.status, 200);
      assert.match(chat.headers.get("content-type") ?? "", /text\/event-stream/);
      const payload = await chat.text();
      assert.match(payload, /chave recusada/);
    } finally {
      await llm.close();
    }
  });

  it("passa o tópico da sessão ao modelo mock e aplica rate limit", async () => {
    let seenGoal = "";
    const llm = await startMockLlm((body, response) => {
      const messages = body.messages as Array<{ role: string; content: string }>;
      const system = messages.find((item) => item.role === "system");
      const match = system?.content.match(/"goal":"([^"]+)"/);
      seenGoal = match?.[1] ?? "";
      writeSseReply(response, "Owner é o programa. [[OPCOES]] continuar | exemplo");
    });
    const app = await startApp({
      LLM_API_KEY: "sk-test",
      LLM_MODEL: "mock",
      LLM_BASE_URL: `${llm.origin}/v1`,
      CHAT_REQUESTS_PER_MINUTE: "1"
    });
    apps.push(app);
    try {
      const { cookie } = await startSession(app.origin, { displayName: "Ana", goal: "contas e owner" });
      const first = await fetch(`${app.origin}/api/chat`, {
        method: "POST",
        headers: { "content-type": "application/json", cookie },
        body: JSON.stringify({ messages: [{ role: "user", content: "explique owner" }] })
      });
      const text = await first.text();
      assert.match(text, /Owner é o programa/);
      assert.equal(seenGoal, "contas e owner");
      const second = await readJson(app.origin, "/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json", cookie },
        body: JSON.stringify({ messages: [{ role: "user", content: "e signer?" }] })
      });
      assert.equal(second.status, 429);
      assert.match(String(second.body.error), /Limite temporário/);
    } finally {
      await llm.close();
    }
  });
});
