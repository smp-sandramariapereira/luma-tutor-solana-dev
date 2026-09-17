# Luma - Tutor Solana

Tutoria Solana com **Luma**: a pessoa conecta a própria API, declara um objetivo e aprende passo a passo — contas, `owner`, `signer`, PDAs, tokens — sem receber o projeto pronto.

Ferramenta de **aprendizagem** (grant Solana Foundation Brazil). Não é um dApp, não compete com `solana-ai-kit` e não substitui `solana-tutor`. Cluster padrão: `localnet`. A Luma não pede seed, chave privada ou keypair e não assina transação.

Repositório: https://github.com/smp-sandramariapereira/ia-ideathon-open-toolkit

## Como rodar

Requisito: **Node.js 20.18 ou superior**.

```bash
git clone https://github.com/smp-sandramariapereira/ia-ideathon-open-toolkit.git
cd ia-ideathon-open-toolkit
npm install
npm run dev
```

Abra **http://127.0.0.1:4177**

A porta 4177 evita conflito com o tutor antigo na 4173. Para só subir depois de já ter compilado:

```bash
PORT=4177 HOST=127.0.0.1 SOLANA_DEFAULT_CLUSTER=localnet npm start
```

Variáveis opcionais estão em `.env.example` (`HOST`, `PORT`, pasta local da sessão). A chave da API **não** vai para arquivo: fica na memória deste processo depois de clicar em conectar.

Testes: `npm test`

## Tutorial Luma

A tela tem duas colunas: à esquerda, API e sessão; à direita, a conversa.

1. **Conecte a API.** Endpoint (por padrão OpenAI), modelo (por exemplo `gpt-4o-mini`) e a sua key. Use GPT ou outro provedor compatível com a API OpenAI. Sem API a Luma não conversa. A key não reaparece na tela depois de conectar.

2. **Comece a sessão.** Marque o consentimento (o perfil fica só neste computador), escreva o nome e o objetivo — o recorte Solana que você quer aprender a construir. Sem sessão iniciada a Luma não contextualiza.

3. **Converse.** Pergunte, cole código ou escolha um dos botões de opção. A Luma responde curto: um conceito, um exemplo no seu tópico, uma pergunta. Use `owner` para o programa que manda nos dados da conta, nunca “proprietário”.

4. **Reinicie com outro tópico.** Quando quiser mudar o recorte (por exemplo de `owner` para Token-2022), escreva o tópico novo no campo e clique em **reiniciar sessão**. O chat zera e a Luma contextualiza só o assunto novo.

Cada visita à página começa sessão limpa. Um recarregar apaga o cookie de sessão: é preciso começar de novo. Não use mainnet; não cole seed nem chave privada no chat.

## O que é guardado

Com consentimento, só **nome, objetivo e consentimento** em `.ideathon-harness` neste computador. O histórico do chat não é gravado no servidor.
