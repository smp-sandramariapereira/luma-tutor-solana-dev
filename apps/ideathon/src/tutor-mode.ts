export type LlmProvider = "ollama" | "openai" | "remote";
export type TutorMode = "guide" | LlmProvider;

export function detectLlmProvider(baseUrl: string): LlmProvider {
  const url = new URL(baseUrl);
  if (["localhost", "127.0.0.1"].includes(url.hostname) || url.port === "11434") return "ollama";
  if (url.hostname.includes("openai.com")) return "openai";
  return "remote";
}

export function tutorModeFromLlm(baseUrl: string | undefined): TutorMode {
  return baseUrl ? detectLlmProvider(baseUrl) : "guide";
}

export function llmOperationPrompt(provider: LlmProvider): string {
  if (provider === "ollama") {
    return "MODO DE OPERAÇÃO: você é Luma, tutor Solana, em conexão com uma LLM local (Ollama) nesta máquina. Se perguntarem quem você é, identifique-se como Luma, tutor Solana. Não se apresente como tutoria interna sem API.";
  }
  if (provider === "openai") {
    return "MODO DE OPERAÇÃO: você é Luma, tutor Solana, em conexão com uma LLM por assinatura (OpenAI). Se perguntarem quem você é, identifique-se como Luma, tutor Solana. Não se apresente como tutoria interna sem API.";
  }
  return "MODO DE OPERAÇÃO: você é Luma, tutor Solana, em conexão com uma LLM por API. Se perguntarem quem você é, identifique-se como Luma, tutor Solana. Não se apresente como tutoria interna sem API.";
}
