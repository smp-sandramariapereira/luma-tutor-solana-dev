import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { normalizeConfiguration, parseTutorReply } from "../dist/llm-client.js";
import { detectLlmProvider, tutorModeFromLlm } from "../dist/tutor-mode.js";
import { publicCluster } from "../dist/session-snapshot.js";

describe("llm-client", () => {
  it("falha com resposta vazia ou só marcadores", () => {
    assert.throws(() => parseTutorReply("   "), /não retornou uma resposta textual/);
    assert.throws(() => parseTutorReply("[[OPCOES]] a | b"), /não retornou uma explicação textual/);
  });

  it("separa texto e opções", () => {
    const reply = parseTutorReply("Owner manda nos dados. [[OPCOES]] continuar | exemplo | ainda não entendi");
    assert.equal(reply.message, "Owner manda nos dados.");
    assert.deepEqual(reply.options, ["continuar", "exemplo", "ainda não entendi"]);
    assert.equal(reply.canContinue, false);
  });

  it("valida configuração da API", () => {
    assert.throws(() => normalizeConfiguration({}), /Informe o modelo/);
    assert.throws(
      () => normalizeConfiguration({ model: "gpt-4o-mini" }),
      /Informe a URL base/
    );
    assert.throws(
      () =>
        normalizeConfiguration({
          model: "gpt-4o-mini",
          baseUrl: "http://example.com/v1",
          apiKey: "sk-test"
        }),
      /Use HTTPS para APIs remotas/
    );
    assert.throws(
      () =>
        normalizeConfiguration({
          model: "gpt-4o-mini",
          baseUrl: "https://api.openai.com/v1"
        }),
      /Informe a chave de API/
    );
    const local = normalizeConfiguration({
      model: "llama",
      baseUrl: "http://127.0.0.1:11434/v1"
    });
    assert.equal(local.apiKey, "ollama-local");
  });
});

describe("tutor-mode e cluster", () => {
  it("classifica provedor e cluster público", () => {
    assert.equal(detectLlmProvider("http://127.0.0.1:11434/v1"), "ollama");
    assert.equal(detectLlmProvider("https://api.openai.com/v1"), "openai");
    assert.equal(detectLlmProvider("https://api.groq.com/openai/v1"), "remote");
    assert.equal(tutorModeFromLlm(undefined), "guide");
    assert.equal(publicCluster("devnet"), "devnet");
    assert.equal(publicCluster("mainnet"), "localnet");
    assert.equal(publicCluster(undefined), "localnet");
  });
});
