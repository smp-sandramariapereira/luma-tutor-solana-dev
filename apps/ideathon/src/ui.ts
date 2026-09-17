import { studentUiClientScript, studentUiCss } from "./student-ui-assets.js";

export function renderStudentPage(): string {
  return `<!doctype html>
<html lang="pt-BR" data-color-scheme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Luma — tutor Solana</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>${studentUiCss}</style>
</head>
<body>
<div class="layout">
  <aside class="panel" id="apiFrame">
    <div class="heading">Conexão com a API</div>
    <p class="privacy">Sem API Luma não conversa. Use uma API <strong>externa</strong> (GPT e outras compatíveis). A key, se houver, fica só na memória deste processo.</p>
    <label>Endpoint</label>
    <input id="baseUrl" value="https://api.openai.com/v1">
    <label>Modelo</label>
    <input id="model" value="gpt-4o-mini" placeholder="gpt-4o-mini">
    <div id="keyField"><label>API key</label><input id="apiKey" type="password" autocomplete="new-password" placeholder="sk-…"></div>
    <button class="btn" id="saveConfig" type="button">conectar modelo</button>
    <div id="configStatus" class="status"></div>
    <div class="heading" style="margin-top:28px">Sessão</div>
    <label class="consent"><input id="consent" type="checkbox"> Autorizo guardar meu perfil neste computador.</label>
    <label>Nome</label>
    <input id="displayName" autocomplete="off" placeholder="Como devemos te chamar?">
    <label id="goalLabel">Objetivo</label>
    <textarea id="goal" rows="2" autocomplete="off" placeholder="O que você quer aprender a construir na Solana?"></textarea>
    <button class="btn" id="startSession" type="button">começar sessão</button>
    <button class="btn secondary" id="restartSession" type="button" hidden>reiniciar sessão</button>
    <div id="sessionStatus" class="status"></div>
  </aside>
  <section class="console">
    <div class="console-head">
      <div>
        <div class="title">Luma — tutor Solana</div>
      </div>
      <button type="button" id="colorSchemeToggle" class="scheme-toggle" aria-pressed="false" aria-label="Alternar tema claro ou escuro">☾ Escuro</button>
      <span class="badge" id="modelBadge">API DESCONECTADA</span>
    </div>
    <div id="messages" class="messages">
      <p id="emptyState" class="empty">Olá! Eu sou Luma, tutor Solana. 🌱

Estou aqui para ajudar você a aprender, explorar conceitos e avançar passo a passo.

Para começarmos, conecte uma API externa, como a OpenAI ou outro provedor compatível.

Assim que estiver tudo pronto, podemos começar. 🚀</p>
    </div>
    <div class="composer-wrap">
      <div class="composer">
        <textarea id="prompt" placeholder="Pergunte, descreva o que quer construir ou cole seu código..."></textarea>
        <button id="send" class="send" type="button" disabled>Enviar</button>
      </div>
    </div>
  </section>
</div>
<script>${studentUiClientScript}</script>
</body></html>`;
}
