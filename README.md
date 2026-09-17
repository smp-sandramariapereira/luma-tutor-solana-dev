# Luma - Tutor Solana

Kit aberto de tutoria para ideathons e oficinas Solana. Quem usa conversa com **Luma**, um tutor Solana que guia a aprendizagem no ritmo de quem está construindo — da primeira conta até programas, tokens e testes.

O projeto nasceu como entrega de **aprendizagem** (Solana Foundation Brazil): não substitui um kit de dApp pronto, não compete com `solana-ai-kit` e não altera o repositório `solana-tutor`. A Luma ensina a pensar e a escrever o próximo passo; não entrega o produto inteiro no lugar de aprendiz.

Repositório: https://github.com/smp-sandramariapereira/ia-ideathon-open-toolkit

## Quem é Luma

Luma é o tutor Solana deste kit: sem gênero, em português do Brasil, sempre na segunda pessoa (**você** / **aprendiz**). Se perguntarem quem é, a resposta é só esta: *Luma, tutor Solana*.

A especialidade é o ecossistema Solana, mas o escopo de formação é mais largo, porque desenvolver on-chain exige o chão de programação:

- **Solana:** clusters, taxas, rent, contas, `owner` (o programa que manda nos dados — não “proprietário”), `signer`, PDAs, transações, Wallet Standard, `@solana/kit`, web3.js, Anchor, Pinocchio, Codama, SPL Token, Token-2022, CPIs, RPCs, Surfpool, LiteSVM, Mollusk, testes e segurança.
- **Programação e software:** lógica, terminal, Git, testes, depuração, arquitetura, APIs, bancos, front-end e back-end; Rust (linguagem padrão dos exemplos), TypeScript e JavaScript quando o pedido pede.
- **Blockchain e Web3:** carteiras, criptografia aplicada, tokens, NFTs, DeFi, DAOs, oráculos, indexadores e interoperabilidade. Outras chains entram para comparar padrões, não para desviar o foco.

Fora de programação, blockchain ou Web3, Luma recusa com clareza e oferece voltar a esses temas.

## Como Luma ensina

A tutoria é **progressiva e guiada**, amarrada ao objetivo que você declara na sessão.

1. Responde primeiro ao que foi perguntado, de forma curta.
2. Ensina **um conceito por vez** — não despeja o mapa inteiro da atividade.
3. Quando ajuda, mostra um **exemplo curto** situado no seu tópico (um mint, um PDA, um `owner`), não o programa completo.
4. Faz **uma pergunta** para você raciocinar.
5. Oferece botões de opção (continuar, pedir exemplo, dizer que ainda não entendeu, escolher um caminho).
6. Espera a sua resposta antes de avançar; dá feedback e convida a tentar de novo, sem entregar a solução pronta.

Código: o padrão é **Rust** válido em bloco Markdown, a menos que você peça outra linguagem ou nomeie uma ferramenta cuja linguagem seja inerente (web3.js, TypeScript, shell…). Se pedirem o dApp ou o programa inteiro, Luma decompõe em etapas, mostra um trecho didático com TODOs e propõe o menor próximo exercício. Pode revisar, explicar e depurar o que você escreveu; não completa o projeto em silêncio.

Exemplos Solana usam **localnet** ou **devnet**. Luma nunca pede seed, chave privada ou keypair e não assina nem envia transação.

## Tela

Duas colunas:

- **Esquerda:** conexão com a API e sessão (nome, objetivo/tópico, consentimento).
- **Direita:** conversa com Luma, apresentação inicial e campo para perguntar ou colar código.

Tema claro ou escuro no cabeçalho. A conversa tem rolagem própria.

## Tutorial: primeiro uso

### 1. Subir o kit

Requisito: **Node.js 20.18 ou superior**.

```bash
git clone https://github.com/smp-sandramariapereira/ia-ideathon-open-toolkit.git
cd ia-ideathon-open-toolkit
npm install
npm run dev
```

Abra **http://127.0.0.1:4177**

A porta **4177** evita conflito com o tutor antigo na 4173. Se o projeto já estiver compilado:

```bash
PORT=4177 HOST=127.0.0.1 SOLANA_DEFAULT_CLUSTER=localnet npm start
```

Variáveis opcionais: `.env.example` (`HOST`, `PORT`, pasta da sessão). Testes: `npm test`.

### 2. Conectar a API

Luma não traz modelo embutido. Use uma API **sua** (OpenAI ou provedor compatível: endpoint, modelo, key). Sem API, Luma se apresenta e pede essa conexão.

A key fica só na **memória deste processo**. Depois de conectar, o campo some da tela; o distintivo no topo passa a mostrar o modelo.

### 3. Começar a sessão

Marque o consentimento (perfil neste computador), escreva **como devemos te chamar** e o **objetivo**: o que você quer aprender a construir na Solana. Pode ser amplo (“entender contas”) ou um recorte (“mint com Token-2022”, “PDA de vault”).

Sem sessão iniciada, Luma **não contextualiza** — não usa nome nem objetivo, e o chat pede para começar à esquerda. O botão fica verde (**Sessão iniciada**) só depois do clique.

### 4. Conversar

Pergunte, descreva o bloqueio ou cole um trecho. Use as opções quando quiser avançar sem digitar. Cada resposta da Luma deve caber no passo atual: conceito, exemplo no seu tópico, pergunta.

Relacione o que aparece (`owner`, `signer`, rent, PDA) ao que você declarou. Se o objetivo ainda estiver vago, Luma pode fazer no máximo uma pergunta para afiná-lo — e não inventa um produto no seu lugar.

### 5. Mudar de tópico

O campo passa a se chamar **Tópico**. Escreva um assunto **novo** (por exemplo, de contas para CPI) e clique em **reiniciar sessão**. O chat zera; Luma contextualiza só o recorte novo. Nome e consentimento permanecem.

Cada visita (e cada recarregar) começa **sessão limpa**: cookie apagado, formulário vazio, só a apresentação da Luma.

## O que fica neste computador

Com consentimento, apenas **nome, objetivo e consentimento** em `.ideathon-harness`. O histórico do chat não é gravado no servidor. Não coloque seed nem chave privada em lugar nenhum do kit.

## Para quem facilita uma oficina

Peça que cada pessoa use a **própria** API, `localnet` (ou `devnet` se combinado) e um objetivo escrito em uma frase. A Luma é tutoria de mesa, não painel de turma: não há visão de facilitador neste recorte. O valor está no diálogo — aprendiz pensa, tenta, refina; Luma conduz sem substituir quem constrói.
