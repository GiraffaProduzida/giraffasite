# Arquitetura

## Visão geral

App Router do Next.js, 100% Server Components por padrão — só viram
Client Component (`"use client"`) os pedaços que realmente precisam de
interatividade no navegador:

- `src/components/layout/Header.tsx` — menu mobile (abre/fecha)
- `src/components/layout/Newsletter.tsx` — form com `preventDefault()`

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
| `/loja` | `src/app/loja/page.tsx` | Dinâmica (usa `searchParams` para o filtro `?categoria=`) |
| `/loja/produto/[slug]` | `src/app/loja/produto/[slug]/page.tsx` | Estática (pré-gerada) |
| `/sobre` | `src/app/sobre/page.tsx` | Estática |
| `/contato` | `src/app/contato/page.tsx` | Estática |

> Nota sobre `params`/`searchParams`: no Next.js desta versão, ambos são
> **Promises** — sempre `await props.params` / `await props.searchParams`
> dentro de `page.tsx`. Use os tipos globais `PageProps<'/rota'>` e
> `LayoutProps<'/rota'>` (não precisam de import, são gerados
> automaticamente ao rodar `next dev`/`next build`). Isso é diferente de
> versões mais antigas do Next.js — se um assistente de IA sugerir
> `params: { slug: string }` (sem Promise), está desatualizado para esta
> versão. Ver `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/dynamic-routes.md`
> para a documentação completa desta versão instalada.

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
   `src/app/loja/produto/[slug]/page.tsx` não faz nada ainda. Decidir
   entre (a) processador de pagamento direto (Stripe, Pagar.me) com
   checkout próprio, ou (b) migrar a loja para uma plataforma pronta
   (Shopify) — o site de referência usado na pesquisa inicial
   (motownrecords.com) usa essa segunda opção.
4. **Newsletter**: `src/components/layout/Newsletter.tsx` não envia
   e-mail a lugar nenhum — falta integrar um provedor (Mailchimp,
   Klaviyo, RD Station) via Server Action ou API Route.
5. **Formulário de contato**: mesma situação — `src/app/contato/page.tsx`
   precisa de um handler de envio real (Server Action + serviço de
   e-mail, ex: Resend).
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
