# Nexus Tech — loja demo

Loja virtual fake de artigos tecnológicos em HTML/CSS/JS puro, pronta para **GitHub Pages**. Serve para demonstrar tracking de jornada de compra (catálogo → carrinho → checkout).

> Este repositório é **público**. Não commite tokens, chaves de API, credenciais, IPs internos, URLs de staging ou UUIDs de projetos reais de produção.

## Publicar no GitHub Pages

1. Faça push deste repositório (`main`).
2. Em **Settings → Pages**:
   - Source: **Deploy from a branch**
   - Branch: `main` / `/ (root)`
3. URL típica: `https://<org>.github.io/<repo>/`

O arquivo `.nojekyll` evita processamento Jekyll no Pages.

## Ativar o tracking (opcional)

1. No painel do produto de tracking, crie um projeto apontando para a URL do Pages.
2. Copie **somente** o snippet de instalação que o painel gera para merchants.
3. Cole esse snippet no `<head>` de todas as páginas HTML **ou** dentro do bloco indicado em [`js/tracking.js`](js/tracking.js).

Não reinvente loaders a partir de código interno. Use só o snippet oficial do painel.

## Eventos personalizados da loja

A loja chama `window.track("nome")`, que por sua vez usa `window.webscanner` **se** o snippet oficial estiver carregado:

| Evento | Quando |
|--------|--------|
| `view_catalog` | Abrir `produtos.html` |
| `view_product` | Abrir detalhe válido em `produto.html?id=` |
| `add_to_cart` | Clicar em Adicionar |
| `view_cart` | Abrir `carrinho.html` |
| `begin_checkout` | Abrir `checkout.html` com itens |
| `purchase` | Confirmar o formulário do checkout |

Sem o snippet, a loja funciona normalmente; os eventos simplesmente não são enviados.

## Fluxo sugerido para demo

1. Home → Catálogo (filtrar categoria)
2. Abrir um produto → Adicionar ao carrinho
3. Carrinho → Checkout → Confirmar pedido
4. Conferir a sessão/eventos no painel do projeto

## Preview local (opcional)

```bash
npx --yes serve .
```

## Estrutura

```
index.html          Home
produtos.html       Catálogo
produto.html        Detalhe (?id=)
carrinho.html       Carrinho
checkout.html       Checkout fake
sucesso.html        Confirmação
css/styles.css
js/tracking.js
js/products.js
js/cart.js
js/app.js
assets/favicon.svg
```
