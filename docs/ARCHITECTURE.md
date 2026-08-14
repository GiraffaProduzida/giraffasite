# Arquitetura

## Visão geral

O site é publicado como **export estático** (`output: "export"` em
`next.config.ts`, hospedado no GitHub Pages — ver `docs/DEPLOY.md`).
Isso significa: sem servidor Node em produção, sem Server Actions, sem
API Routes dinâmicas. Tudo é pré-gerado em `next build` para arquivos
HTML/CSS/JS estáticos.

Dentro dessa restrição, o App Router do Next.js é 100% Server
Components por padrão — só viram Client Component (`"use client"`) os
pedaços que realmente precisam de interatividade no navegador (o que
continua funcionando normalmente em export estático, só roda como
JavaScript no cliente em vez de servidor):

- `src/components/layout/Header.tsx` — menu mobile (abre/fecha)
- `src/components/layout/Newsletter.tsx` — form com `preventDefault()`
- `src/components/loja/LojaContent.tsx` — lê o filtro `?categoria=` via
  `useSearchParams` (não dá pra ler isso no servidor num site estático,
  já que não há requisição por página — ver nota sobre `/loja` abaixo)

Tudo o mais (páginas, cards, grids) é Server Component: renderiza no
servidor, manda HTML pronto, carrega mais rápido e manda menos
JavaScript pro navegador. **Ao criar um componente novo, comece sem
`"use client"` e só adicione se o TypeScript/Next reclamar** (normalmente
porque você usou `useState`, `onClick`, etc.).

## Rotas (mapa de páginas)

| Rota | Arquivo | Tipo |
|---|---|---|
| `/` | `src/app/page.tsx` | Estática |
| `/artistas` | `src/app/artistas/page.tsx` | Estática |
| `/artistas/[slug]` | `src/app/artistas/[slug]/page.tsx` | Estática (pré-gerada via `generateStaticParams`) |
| `/loja` | `src/app/loja/page.tsx` | Estática — filtro `?categoria=` é lido no navegador (ver `LojaContent.tsx`), não no servidor |
| `/loja/produto/[slug]` | `src/app/loja/produto/[slug]/page.tsx` | Estática (pré-gerada) |
| `/sobre` | `src/app/sobre/page.tsx` | Estática |
| `/contato` | `src/app/contato/page.tsx` | Estática |

> Nota sobre `params` (rotas dinâmicas `[slug]`): no Next.js desta
> versão, é uma **Promise** — sempre `await props.params` dentro de
> `page.tsx`. Use o tipo global `PageProps<'/rota'>` (não precisa de
> import, é gerado automaticamente ao rodar `next dev`/`next build`).
> Isso é diferente de versões mais antigas do Next.js — se um
> assistente de IA sugerir `params: { slug: string }` (sem Promise),
> está desatualizado para esta versão. Ver
> `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/dynamic-routes.md`
> para a documentação completa desta versão instalada.
>
> Nota sobre `searchParams`: como o site é export estático (sem
> servidor por requisição), páginas que precisam ler a query string
> **não podem** usar a prop `searchParams` do lado do servidor — é
> assim que `/loja` funcionava antes de virar export estático. A forma
> compatível é ler no cliente com o hook `useSearchParams` dentro de um
> Client Component, envolto em `<Suspense>` (ver `src/app/loja/page.tsx`
> + `src/components/loja/LojaContent.tsx`). Copie esse padrão se outra
> página precisar de algo parecido.

## Fluxo de dados

```
src/content/artists.ts  ──┐
src/content/products.ts ──┴──►  Server Components (páginas)  ──► HTML
                                       │
                              src/components/ui/*
```

Não existe estado global (Context, Redux, etc.) porque não existe nada
que precise disso ainda — o carrinho, por exemplo, é só um contador fixo
"(0)" no Header. Quando o carrinho for implementado de verdade, ele vai
precisar de estado compartilhado entre Header e as páginas de produto;
nesse momento vale considerar Context API (simples) ou uma lib como
Zustand (se o estado crescer).

## O que falta para produção

Este protótipo cobre a **navegação e o visual**. Ainda não é uma loja
funcional. Antes de ir ao ar, falta:

1. **Catálogo real**: substituir `src/content/artists.ts` e
   `src/content/products.ts` por uma fonte de dados de verdade (CMS
   headless, Shopify, banco próprio + API). Os tipos em `src/lib/types.ts`
   são o contrato — ajuste-os primeiro se o modelo de dados mudar.
2. **Fotos reais**: trocar `<PlaceholderImage />` por `next/image` em
   todo lugar que ela aparece (ver comentário no topo de
   `src/components/ui/PlaceholderImage.tsx` e `docs/CONTENT_GUIDE.md`).
3. **Carrinho e checkout**: o botão "Adicionar ao carrinho" em
   `src/app/loja/produto/[slug]/page.tsx` não faz nada ainda.
   **Importante**: como o site roda como export estático no GitHub
   Pages (sem servidor Node — ver `docs/DEPLOY.md`), não dá pra usar
   Server Actions/API Routes próprias para processar pagamento. As
   opções realistas são: (a) checkout hospedado por um processador de
   pagamento (ex: Stripe Checkout, Pagar.me) chamado direto do
   navegador, ou (b) migrar a loja inteira para uma plataforma pronta
   com hospedagem própria (Shopify) — o site de referência usado na
   pesquisa inicial (motownrecords.com) usa essa segunda opção. Se o
   catálogo crescer muito ou o carrinho precisar de lógica de servidor,
   pode valer a pena reavaliar sair do GitHub Pages para uma hospedagem
   com servidor (Vercel, etc.) — nesse caso dá pra remover
   `output: "export"` do `next.config.ts` e usar Server Actions
   normalmente.
4. **Newsletter**: `src/components/layout/Newsletter.tsx` não envia
   e-mail a lugar nenhum — falta integrar um provedor (Mailchimp,
   Klaviyo, RD Station) via chamada `fetch` no cliente direto para a
   API do provedor (não dá pra usar Server Action/API Route própria
   nesta hospedagem — ver item 3).
5. **Formulário de contato**: mesma restrição — `src/app/contato/page.tsx`
   precisa de um handler de envio real feito no cliente, chamando a API
   de um serviço de e-mail transacional que aceite envio direto do
   navegador (ex: Formspree, EmailJS) ou uma função serverless externa
   (ex: Cloudflare Worker) — não um Server Action do próprio Next.js.
6. **Busca**: o ícone "Busca" no Header é só visual.
7. **Conta de usuário / login**: o ícone de conta no Header é só visual.
8. **SEO/Metadata por página**: já existe uma base (`generateMetadata`
   nas páginas de artista/produto) — revisar textos e adicionar
   Open Graph/imagens de compartilhamento antes de publicar.
9. **Testes**: o projeto não tem testes automatizados ainda.
10. **Acessibilidade**: revisão de contraste de cor (a paleta placeholder
    foi pensada para bom contraste, mas deve ser revalidada quando a
    paleta de marca final entrar) e navegação por teclado do menu mobile.

## Convenções de código

- Componentes em PascalCase, um componente por arquivo, nome do
  arquivo = nome do componente (`ArtistCard.tsx` exporta `ArtistCard`).
- Sempre que um componente tiver alguma decisão não-óbvia (por que é
  Client Component, por que um dado está hardcoded, o que falta
  conectar), isso deve estar documentado em um comentário no topo do
  arquivo — siga o padrão já usado nos arquivos existentes.
- Tailwind é a única forma de estilização usada (sem CSS Modules, sem
  styled-components). Classes utilitárias customizadas (`text-display`,
  `text-meta`) ficam centralizadas em `src/app/globals.css`.
