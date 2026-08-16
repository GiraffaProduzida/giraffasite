# Girrafa Produzida — Site + Loja

Protótipo funcional do site institucional e loja virtual da **Girrafa
Produzida**, produtora musical.

🔗 **Site publicado** (espelhado em dois repositórios, ver
`docs/DEPLOY.md`):
- https://libraleones.github.io/girafaproduzida/
- https://giraffaproduzida.github.io/giraffasite/

(cada um atualiza automaticamente a cada push na branch `main` do seu
próprio repositório)

> Este é um protótipo com dados de exemplo (placeholder), pensado para
> ser a base que um time de desenvolvimento evolui até produção. Antes
> de mexer no código, leia esta página inteira e depois os documentos
> em `docs/`.

## Stack

- [Next.js 16](https://nextjs.org) (App Router) — **atenção:** esta versão
  do Next.js pode ter mudanças que fogem do que modelos de IA "sabem de
  cor". Se for usar um assistente de IA neste projeto, ele já vai
  encontrar as instruções corretas em `AGENTS.md` / `CLAUDE.md` na raiz.
- TypeScript
- Tailwind CSS v4 (configurado via `@theme` em `src/app/globals.css`, não
  via `tailwind.config.js` — é assim mesmo na v4)
- Fontes self-hosted via [`@fontsource`](https://fontsource.org) (não
  usamos `next/font/google` de propósito — ver nota abaixo)

## Como rodar

```bash
npm install
npm run dev       # http://localhost:3000
```

Outros comandos:

```bash
npm run build      # build de produção
npm run start       # roda o build de produção localmente
npm run lint        # ESLint
```

## Estrutura de pastas

```
src/
  app/                  → rotas (App Router do Next.js). Cada pasta = 1 segmento de URL.
    page.tsx            → home ("/")
    artistas/
      page.tsx           → listagem de artistas ("/artistas")
      [slug]/page.tsx    → página de 1 artista ("/artistas/nome-do-artista")
    loja/
      page.tsx           → listagem da loja ("/loja"), com filtro por categoria via ?categoria=
      produto/[slug]/page.tsx → página de 1 produto
    sobre/page.tsx       → página institucional
    contato/page.tsx     → formulário de contato (visual, sem envio real ainda)
    layout.tsx           → layout raiz: fontes, <html>/<body>, Header/Footer fixos
    globals.css          → design tokens (cores, tipografia) + estilos globais

  components/
    layout/              → Header, Footer, Newsletter (usados em todas as páginas)
    home/                → componentes exclusivos da home (Hero, CategoryGrid)
    ui/                  → componentes reutilizáveis em qualquer página
                            (ArtistCard, ProductCard, Button, SectionHeading, PlaceholderImage)

  content/                → "banco de dados" provisório, em código
    artists.ts            → lista de artistas + funções de busca (getArtistBySlug, etc.)
    products.ts            → lista de produtos + funções de busca

  lib/
    types.ts               → tipos TypeScript centrais (Artist, Product) — a fonte da verdade
                              da forma dos dados
    format.ts               → utilitários (ex: formatação de preço em R$)

docs/                       → documentação do projeto (leia antes de codar)
  ARCHITECTURE.md            → decisões técnicas e o que falta para produção
  DESIGN_SYSTEM.md           → cores, tipografia, regras visuais
  CONTENT_GUIDE.md            → como adicionar/editar artistas e produtos
  DEPLOY.md                   → como o site é publicado no GitHub Pages

public/
  images/                    → onde entram fotos reais (hoje vazio — ver docs/CONTENT_GUIDE.md)

.github/
  workflows/deploy.yml        → publica o site automaticamente a cada push na main
```

## Por que os dados estão "hardcoded" em `src/content/`?

Para o protótipo funcionar de ponta a ponta (navegação, filtros, página
de produto) sem depender de nenhum serviço externo ainda. `src/lib/types.ts`
define o formato exato dos dados (`Artist`, `Product`) — quando o
catálogo real for definido (CMS, Shopify, banco próprio etc.), a migração
é trocar `src/content/*.ts` por chamadas à API real, mantendo os
mesmos tipos. O resto do app (componentes, páginas) não deveria precisar
mudar.

## Por que não usamos `next/font/google`?

Porque este ambiente de desenvolvimento não tem acesso a
`fonts.googleapis.com`, o que quebra o build. Trocamos por pacotes
[`@fontsource`](https://fontsource.org) (mesmas fontes, arquivos
distribuídos via npm, sem dependência de rede em build). Isso também é
uma prática comum em produção por trazer mais controle e privacidade
(evita chamada a domínio do Google no runtime do usuário final). Ver
`src/app/layout.tsx`.

## Hospedagem: GitHub Pages (site estático)

O projeto está configurado para gerar um **export estático**
(`output: "export"` em `next.config.ts`) e publicar em
[GitHub Pages](https://pages.github.com/), espelhado nos repositórios
`Libraleones/girafaproduzida` e `GiraffaProduzida/giraffasite`. Isso
significa que não existe servidor Node em produção — só arquivos
HTML/CSS/JS. Ver `docs/DEPLOY.md` para o fluxo completo e o que isso
limita (ex: formulário de contato e newsletter precisam de um serviço
externo para processar o envio, já que não há backend próprio).

## Próximos passos

Ver `docs/ARCHITECTURE.md`, seção "O que falta para produção".
