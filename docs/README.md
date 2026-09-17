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

A seção `#visualizacao` apresenta uma captura real da interface de Luma, fornecida pela autora, em `assets/luma-interface.jpeg`. A imagem é exibida por inteiro, de forma responsiva, e pode ser aberta em tamanho original.

Para atualizar a captura, substitua esse arquivo ou ajuste o caminho em `index.html`. Mantenha o texto alternativo e a legenda coerentes com a imagem. Confira se a captura não contém credenciais ou dados que você não deseja publicar.

## Referência

A identidade e a organização do conteúdo seguem a apresentação `Luma_Solana_Tutor.pdf`, fornecida como referência. O link da apresentação aponta para o PDF já disponível na raiz do repositório.
