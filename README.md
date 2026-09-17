# Luma — tutor Solana

**Tutoria guiada em português brasileiro para aprender a desenvolver na Solana.**

Luma é um kit de tutoria para ideathons e oficinas de desenvolvimento de aplicações Solana. Sua proposta é apoiar quem aprende a compreender conceitos, experimentar código e construir o próximo passo com autonomia.

O projeto nasceu como uma entrega de aprendizagem no contexto da Solana Foundation Brazil. A experiência combina o objetivo declarado por aprendiz com orientações para explicações curtas, exemplos contextualizados, perguntas de raciocínio e opções de continuidade.

Luma foi concebido para acompanhar a construção de conhecimento: ensina, orienta, revisa e ajuda a depurar o código produzido por aprendiz. Ao receber um pedido de aplicação completa, conduz a implementação em etapas e propõe o menor próximo exercício.

## Para quem é

- Pessoas que estão começando a desenvolver na Solana.
- Aprendizes que precisam explorar um conceito ou superar um bloqueio durante uma atividade prática.
- Participantes de ideathons que querem compreender as decisões envolvidas em sua construção.
- Pessoas que facilitam oficinas e desejam oferecer um recurso complementar de tutoria individual.

## A proposta pedagógica

Luma organiza a orientação em torno do objetivo que você declara na sessão. Os princípios que orientam as respostas são:

1. Responder primeiro ao que foi perguntado, com clareza e concisão.
2. Trabalhar um conceito por vez, respeitando o passo atual da atividade.
3. Apresentar um exemplo curto e situado no seu objetivo quando isso ajudar.
4. Fazer uma pergunta que estimule raciocínio e construção da própria resposta.
5. Oferecer opções para continuar, pedir um exemplo ou indicar uma dificuldade.
6. Aguardar sua resposta, oferecer feedback e incentivar novas tentativas.

Esses princípios são expressos nas instruções enviadas ao modelo conectado. A qualidade e a adesão das respostas dependem da API e do modelo escolhidos. A avaliação da aprendizagem constitui uma frente de evolução do projeto.

## O que você pode aprender

O foco é o ecossistema Solana e os fundamentos necessários para desenvolver nele.

| Área | Exemplos de temas |
| --- | --- |
| Solana | Contas, `owner`, `signer`, PDAs, transações, clusters, taxas e rent |
| Programas e tokens | Rust, Anchor, Pinocchio, CPIs, SPL Token e Token-2022 |
| Clientes e ferramentas | TypeScript, JavaScript, Wallet Standard, `@solana/kit`, web3.js e Codama |
| Testes e desenvolvimento | Localnet, devnet, RPCs, Surfpool, LiteSVM, Mollusk, depuração e segurança |
| Fundamentos de software | Lógica, terminal, Git, arquitetura, APIs, bancos de dados, front-end e back-end |
| Blockchain e Web3 | Carteiras, criptografia aplicada, NFTs, DeFi, DAOs, oráculos e interoperabilidade |

Os temas delimitam a orientação do tutor. A implementação atual não consulta automaticamente documentação nem executa os exemplos gerados. Para ferramentas e APIs específicas, confira versões e referências oficiais.

## Como Luma se apresenta

Luma se identifica como **Luma, tutor Solana**, sem gênero, e conversa em português brasileiro. Usa **você** e **aprendiz** para se dirigir a quem participa.

Nas explicações sobre contas Solana, mantém o termo técnico `owner`, contextualizando-o como o programa responsável pelos dados da conta.

## Experiência atual

A implementação concentra-se em uma experiência individual de tutoria, com:

- Interface web com formulário de sessão e conversa.
- Objetivo ou tópico declarado por aprendiz.
- Conexão configurável a uma API compatível com o formato OpenAI Chat Completions.
- Respostas exibidas progressivamente, com renderização de Markdown e blocos de código.
- Opções de continuidade propostas pelo modelo.
- Botão para copiar trechos de código e alternância de tema claro ou escuro.
- Persistência local do perfil mediante consentimento.
- Testes automatizados dos componentes e das rotas HTTP.

O recorte favorece o uso em oficinas e a experimentação da abordagem pedagógica. Para esse uso, cada pessoa deve executar sua própria instância e utilizar sua própria API. A configuração do modelo e da chave é compartilhada por todo o processo do servidor.

## Instalação

### Requisitos

- Git.
- Node.js 24 LTS, recomendado para executar a aplicação e o comando atual de testes.
- npm.
- Acesso a uma API de linguagem compatível, ou a um servidor local compatível, como Ollama.

O `package.json` atual declara Node.js 20.18 ou superior. Entretanto, o comando de testes utiliza `--experimental-strip-types`, indisponível nessa versão mínima. A recomendação acima contempla o fluxo de testes.

### Executar localmente

```bash
git clone https://github.com/smp-sandramariapereira/luma-tutor-solana-dev.git
cd luma-tutor-solana-dev
npm ci
npm run dev
```

Abra **http://127.0.0.1:4177**.

O comando `dev` compila o projeto e inicia o servidor. Depois da compilação, você também pode executar:

```bash
npm start
```

Para recompilar após alterar o código, execute `npm run build` e reinicie o servidor.

## Primeiro uso

### 1. Conectar o modelo

Informe o endpoint, o modelo e, quando necessária, a chave de API. Clique em **conectar modelo**.

Use uma API sua. O kit não inclui créditos nem um modelo embutido; o provedor pode cobrar pelas chamadas, incluindo a chamada de verificação da conexão.

Para um servidor Ollama local com interface compatível, o endpoint pode ser `http://127.0.0.1:11434/v1`. Informe o nome de um modelo disponível nesse servidor. A chave é opcional nessa configuração local.

A chave permanece na memória do processo do servidor. Após uma conexão bem-sucedida, o campo é limpo e ocultado na interface.

### 2. Começar a sessão

Marque o consentimento para guardar o perfil, informe como devemos chamar você e descreva seu objetivo. Exemplos:

- “Entender contas e owner.”
- “Aprender a criar um mint com Token-2022.”
- “Compreender um PDA para um vault.”
- “Testar uma instrução de um programa Anchor.”

Clique em **começar sessão**. A conversa passa a usar seu nome e objetivo como contexto.

### 3. Conversar e experimentar

Pergunte, descreva um bloqueio ou cole um trecho de código. Você pode escrever livremente ou escolher uma opção de continuidade.

Experimente o que foi discutido no seu ambiente de desenvolvimento, observe os resultados e volte com sua tentativa ou mensagem de erro. O propósito é construir compreensão enquanto você desenvolve.

### 4. Mudar de tópico

Após iniciar, o campo **Objetivo** passa a se chamar **Tópico**. Escreva um tópico diferente e clique em **reiniciar sessão**.

O histórico visível é limpo e o novo tópico passa a orientar a conversa. Nome e consentimento permanecem no formulário.

Cada recarregamento da página começa com formulário e conversa limpos. Essa limpeza não exclui os registros já persistidos no banco.

## Código e segurança durante a aprendizagem

As instruções de Luma estabelecem Rust como linguagem padrão dos exemplos, com exceção de pedidos explícitos de outra linguagem ou de ferramentas cuja linguagem seja inerente.

Ao trabalhar com Solana, a orientação prioriza **localnet** e **devnet**. Luma não possui ferramentas para assinar ou enviar transações.

Nunca cole seed phrase, chave privada, arquivo de keypair ou outros segredos na conversa. O código e as mensagens que você envia são encaminhados ao modelo conectado.

Os exemplos têm finalidade didática. Confira dependências, versões e comportamento no seu ambiente antes de incorporá-los ao projeto.

## Dados e privacidade

### O que é persistido

Com consentimento, o kit grava nome, objetivo e metadados de identificação, consentimento e datas da sessão em um banco SQLite. Por padrão, ele fica em `.ideathon-harness/learning-harness.sqlite`, na máquina que executa o servidor.

O histórico da conversa não é persistido pelo servidor. A implementação atual exige consentimento para a persistência do perfil; uma sessão totalmente efêmera é uma possibilidade de evolução.

### O que é enviado ao modelo

O nome, o objetivo e as últimas 20 mensagens da conversa são enviados ao endpoint configurado, junto das instruções do tutor. O processamento e a eventual retenção pelo provedor seguem as condições desse serviço.

Quando você executa o servidor em seu próprio computador, o banco fica nele. Se executar em outra máquina, os dados persistidos ficam nessa outra máquina.

### Reiniciar e excluir

Reiniciar ou recarregar limpa a conversa visível, mas não exclui os perfis persistidos. A interface atual não oferece exclusão de registros nem prazo automático de retenção.

Para remover todos os perfis de uma instância local, encerre o servidor e exclua o arquivo `learning-harness.sqlite` e seus arquivos auxiliares `-wal` e `-shm`, se existirem, na pasta de dados configurada. Essa operação elimina os dados dessa instância.

## Configuração do servidor

O projeto lê variáveis do ambiente do processo. O arquivo `.env.example` serve como referência; a inicialização atual não carrega um arquivo `.env` automaticamente.

| Variável | Finalidade | Padrão |
| --- | --- | --- |
| `HOST` | Endereço em que o servidor escuta | `127.0.0.1` |
| `PORT` | Porta HTTP | `4177` |
| `SOLANA_DEFAULT_CLUSTER` | Cluster exibido na sessão: `localnet` ou `devnet` | `localnet` |
| `LEARNING_HARNESS_DATA_DIR` | Pasta do banco de perfis | `.ideathon-harness` |
| `PILOT_SESSION_SECRET` | Segredo para assinar cookies de sessão; obrigatório fora dos hosts locais reconhecidos | Segredo de desenvolvimento em execução local |
| `CHAT_REQUESTS_PER_MINUTE` | Limite de chamadas de chat por identificador de sessão | `20` |
| `LLM_BASE_URL` | Endpoint da API quando configurada por ambiente | `https://api.openai.com/v1` |
| `LLM_MODEL` | Nome do modelo quando configurado por ambiente | Sem padrão |
| `LLM_API_KEY` | Chave da API quando configurada por ambiente | Sem padrão |

Exemplo em um terminal compatível com POSIX, após compilar:

```bash
PORT=4177 HOST=127.0.0.1 SOLANA_DEFAULT_CLUSTER=localnet npm start
```

O cluster informado contextualiza a sessão; não estabelece uma conexão RPC nem executa transações. O segredo de sessão assina cookies e não autentica a configuração da API. O uso individual local é o contexto previsto para este recorte.

## Orientações para oficinas

1. Prepare o ambiente e teste a conexão ao modelo antes da atividade.
2. Peça que cada pessoa execute sua própria instância e utilize sua própria API.
3. Combine o uso de localnet ou devnet.
4. Oriente cada participante a declarar um objetivo em uma frase.
5. Incentive tentativas práticas e perguntas sobre os resultados observados.
6. Retome dúvidas recorrentes em momentos de discussão coletiva.

Luma funciona como um recurso complementar de tutoria individual. A mediação de quem facilita continua relevante para discutir conceitos, acompanhar dificuldades e relacionar a experiência aos objetivos da oficina.

## Desenvolvimento e testes

```bash
npm ci
npm run build
npm test
```

Os testes cobrem armazenamento, consentimento, cookies de sessão, validação de configuração, interpretação de respostas, limitação de requisições e rotas HTTP. A integração com a LLM utiliza um servidor simulado, sem depender de uma API paga.

Esses testes verificam o funcionamento técnico. A precisão das respostas de modelos reais e os resultados educacionais precisam de avaliações próprias.

### Estrutura principal

```text
apps/ideathon/src/
  index.ts               Inicialização do servidor
  http-app.ts            Rotas HTTP e fluxo de chat
  learner-store.ts       Persistência dos perfis em SQLite
  pilot-session.ts       Cookies e assinatura de sessão
  llm-client.ts          Integração com API e interpretação das respostas
  luma-prompt.ts         Instruções complementares do tutor
  tutor-mode.ts          Identificação do tipo de provedor
  rate-limiter.ts        Limitação de requisições de chat
  session-snapshot.ts    Contexto público da sessão
  ui.ts                 Página da interface
  student-ui-assets.ts   Estilos e comportamento no navegador

apps/ideathon/test/      Testes automatizados
```

### Bancos de versões anteriores

Na inicialização, a migração atual remove tabelas legadas que não pertencem ao recorte de tutoria individual. Antes de reutilizar um banco de uma versão anterior, faça uma cópia de segurança ou configure uma pasta de dados nova.

## Colaborações

**Colaborações são bem-vindas.** Você pode contribuir com código, documentação, revisão técnica, acessibilidade, exemplos didáticos e relatos de uso em oficinas.

As contribuições devem preservar a proposta de tutoria guiada, a participação ativa de aprendiz, a comunicação em português brasileiro e o cuidado com dados e segredos.

### Como participar

- **Relatar problemas:** abra uma [issue](https://github.com/smp-sandramariapereira/luma-tutor-solana-dev/issues) com o comportamento esperado, o resultado observado e os passos para reproduzir. Informe ambiente e modelo quando relevantes.
- **Sugerir melhorias:** descreva a necessidade, quem seria beneficiado e como a proposta se relaciona com o propósito pedagógico.
- **Compartilhar experiências:** registre dificuldades e observações de oficinas sem identificar participantes nem expor conversas privadas.
- **Revisar conteúdo:** indique o trecho, a correção sugerida e a documentação oficial ou evidência que a sustenta.
- **Contribuir com código:** faça um fork, crie uma branch e envie um pull request para revisão.

Para mudanças amplas de arquitetura ou escopo, abra uma issue antes de implementar, para alinhar a proposta com a manutenção do projeto.

### Antes de enviar um pull request

1. Descreva o problema ou a necessidade atendida.
2. Explique a mudança e seu efeito na experiência de uso.
3. Execute `npm run build` e `npm test` para alterações de código.
4. Inclua testes relevantes quando a mudança alterar comportamento.
5. Atualize a documentação afetada.
6. Remova credenciais, dados pessoais e segredos de exemplos, logs e capturas de tela.

Os pull requests serão avaliados pela manutenção. A abertura à colaboração não implica incorporação automática de todas as propostas.

## Evolução do projeto

A evolução será orientada pelas experiências em oficinas, pela revisão técnica e pelas contribuições da comunidade. Possíveis frentes incluem:

- Referências oficiais contextualizadas e recuperação de documentação.
- Exemplos didáticos verificados e associados às versões das ferramentas.
- Diagnóstico inicial e acompanhamento das etapas de aprendizagem.
- Estudos sobre compreensão, autonomia e transferência para novos problemas.
- Sessões efêmeras e controles de exclusão e retenção de perfis.
- Melhorias de acessibilidade e experiência de uso.
- Integração contínua e ampliação das avaliações automatizadas.
- Isolamento de credenciais e controles adequados a instâncias compartilhadas.
- Recursos de apoio a quem facilita oficinas.

Essas frentes são possibilidades de desenvolvimento, sem compromisso de prazo. Sua priorização deve preservar a simplicidade e o propósito pedagógico do projeto.

## Licença

A licença de uso e distribuição ainda precisa ser formalizada em um arquivo `LICENSE`. A visibilidade pública do repositório e o convite à colaboração não substituem essa definição.

Até sua formalização, consulte a manutenção para esclarecer condições de reutilização e de incorporação de contribuições.

## Origem

Luma nasceu como uma entrega de aprendizagem no contexto da Solana Foundation Brazil e mantém o foco em apoiar a formação de pessoas que desenvolvem no ecossistema Solana.

Repositório: [smp-sandramariapereira/luma-tutor-solana-dev](https://github.com/smp-sandramariapereira/luma-tutor-solana-dev).
