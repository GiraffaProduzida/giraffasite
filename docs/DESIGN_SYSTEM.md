# Design System (placeholder)

Tudo neste documento é **provisório**: uma direção visual coerente para
o protótipo funcionar e parecer "um site de verdade" enquanto a
identidade de marca definitiva da Girrafa Produzida não existe. Quando
o logo, paleta e fontes oficiais forem definidos, atualize os valores em
`src/app/globals.css` (bloco `:root`) e o resto do site deve se ajustar
sozinho, porque todos os componentes consomem os tokens (nenhuma cor
"solta" no meio dos componentes).

## De onde veio esta direção

Baseado em pesquisa de referência de sites de produtoras/selos musicais
com loja própria (ex: estrutura observada em motownrecords.com — ver
o doc `referencia-visual-motownrecords.md` salvo no projeto). Padrão
observado: base preto/branco de alto contraste, cor usada com moderação
como acento (não como cor dominante), tipografia condensada/bold para
títulos (estilo pôster/capa de disco) contrastando com uma fonte
monoespaçada para informação "de catálogo" (preço, data, categoria).
Isto é uma referência de **linguagem visual**, não uma cópia — cores,
fontes e fotos aqui são todas diferentes das do site pesquisado.

## Cores

Definidas em `src/app/globals.css`, expostas como classes Tailwind
(`bg-ink`, `text-paper`, `border-line`, `text-accent-gold`, etc.):

| Token | Valor | Uso |
|---|---|---|
| `ink` | `#121212` | Preto principal — nav, footer, texto |
| `paper` | `#f4f3ef` | Fundo geral (não branco puro, um pouco quente) |
| `paper-muted` | `#e6e4dd` | Fundo de blocos alternados |
| `line` | `#d8d6cd` | Bordas e divisores sutis |
| `muted` | `#6b6b63` | Texto secundário |
| `accent-gold` | `#e8b923` | Acento — usar com moderação |
| `accent-red` | `#d3402f` | Acento — usar com moderação |
| `accent-blue` | `#2f5fa8` | Acento — usar com moderação |

**Regra**: as cores de acento nunca devem ser o fundo dominante de uma
página inteira — usar em blocos, tags, bordas ou como camada sobre foto
(ver `PlaceholderImage`), sempre sobre a base preto/branco.

## Tipografia

Três famílias, cada uma com um papel bem definido — **não misture os
papéis** (ex: não use a fonte de exibição em parágrafos longos, é
cansativa de ler):

1. **Exibição** (`font-display`, classe utilitária `.text-display`) —
   [Anton](https://fonts.google.com/specimen/Anton), condensada, bold,
   sempre em caixa alta. Só para títulos grandes (H1/H2, banners).
2. **Corpo** (`font-sans`, padrão do `<body>`) —
   [Inter](https://fonts.google.com/specimen/Inter). Parágrafos, menus,
   botões, qualquer texto corrido.
3. **Apoio/meta** (`font-mono`, classe utilitária `.text-meta`) —
   [JetBrains Mono](https://www.jetbrains.com/lp/mono/). Preços, datas,
   categorias, labels — dá o ar "de catálogo/ficha técnica".

As três são carregadas via `@fontsource` (self-hosted, ver README raiz
para o porquê) em `src/app/layout.tsx`.

## Fotografia

O site real vai depender muito de fotos (artistas, capas de álbum,
produtos). Como ainda não há banco de imagens, todo lugar que teria uma
foto usa `src/components/ui/PlaceholderImage.tsx` — um bloco colorido
com gradiente na cor de acento do item (`accent: "gold" | "red" | "blue"`
em cada artista/produto, ver `src/lib/types.ts`) e uma etiqueta indicando
o que a foto deveria mostrar.

Quando houver fotos reais: siga as instruções no comentário no topo de
`PlaceholderImage.tsx` para trocar por `next/image`. Recomendação de
tratamento visual para manter a linguagem: fotos em preto e branco ou
alto contraste, com camada de cor translúcida por cima nos blocos de
categoria/destaque (mesmo efeito que o placeholder já simula).

## Componentes de UI e onde ficam

| Componente | Arquivo | Papel |
|---|---|---|
| `Button` / `ButtonLink` | `src/components/ui/Button.tsx` | Ação primária/secundária |
| `ArtistCard` | `src/components/ui/ArtistCard.tsx` | Card de artista em grids |
| `ProductCard` | `src/components/ui/ProductCard.tsx` | Card de produto em grids |
| `SectionHeading` | `src/components/ui/SectionHeading.tsx` | Cabeçalho de seção (título + link "ver todos") |
| `PlaceholderImage` | `src/components/ui/PlaceholderImage.tsx` | Placeholder de foto (ver acima) |
| `Hero` | `src/components/home/Hero.tsx` | Banner de destaque da home |
| `CategoryGrid` | `src/components/home/CategoryGrid.tsx` | Grid 2x2 de categorias da home |
| `Header` / `Footer` / `Newsletter` | `src/components/layout/` | Casca fixa do site |

## Espaçamento e grid

Usamos a escala padrão do Tailwind (múltiplos de 4px) sem customização.
Largura máxima de conteúdo: `max-w-6xl` centralizado (`mx-auto`), com
padding horizontal `px-4` no mobile e `sm:px-6` a partir do breakpoint
`sm`. Grids de cards usam 2 colunas no mobile, 3 no tablet, 4 no
desktop (`grid-cols-2 sm:grid-cols-3 lg:grid-cols-4`).
