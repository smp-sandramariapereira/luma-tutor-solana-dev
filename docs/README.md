# Página de apresentação de Luma

Esta pasta contém uma página estática independente da aplicação de tutoria. Não coleta perfis, não solicita chaves e não chama APIs de IA.

## Arquivos

- `index.html`: conteúdo e estrutura.
- `styles.css`: identidade visual e layout responsivo.
- `script.js`: botão para copiar os comandos de instalação.
- `assets/`: ilustração extraída do PDF fornecido e favicon.
- `.nojekyll`: permite servir os arquivos diretamente pelo GitHub Pages.

## Publicação no GitHub Pages

No repositório, abra **Settings → Pages**. Em **Build and deployment**, selecione **Deploy from a branch**, escolha a branch **main** e a pasta **/docs**, e clique em **Save**.

Após o GitHub concluir a publicação, o endereço esperado é:

https://smp-sandramariapereira.github.io/luma-tutor-solana-dev/

O endereço acima é o destino esperado; confirme o estado e o link publicado no painel Pages. Um domínio próprio pode ser conectado depois nesse mesmo painel.

## Visualização da experiência

A seção `#visualizacao` contém um exemplo ilustrativo em HTML. Não é uma captura real nem uma conversa ativa. Para usar uma imagem real:

1. Coloque a captura em `assets/luma-interface.webp` ou outro formato adequado.
2. Substitua o elemento `.demo-window` por uma imagem com texto alternativo descritivo.
3. Atualize a legenda para identificar a captura real.
4. Remova dados pessoais e credenciais da captura antes de publicar.

## Referência

A identidade e a organização do conteúdo seguem a apresentação `Luma_Solana_Tutor.pdf`, fornecida como referência. O link da apresentação aponta para o PDF já disponível na raiz do repositório.
