# Guia de conteúdo — como adicionar artistas, produtos e fotos

Enquanto não existe um CMS conectado, todo o conteúdo do site mora em
dois arquivos TypeScript. Isso é temporário (ver `docs/ARCHITECTURE.md`,
item 1), mas é o suficiente para o time popular o catálogo real sem
esperar a integração com backend ficar pronta.

## Adicionar um artista

Edite `src/content/artists.ts` e adicione um novo objeto ao array
`artists`, seguindo o tipo `Artist` (definido em `src/lib/types.ts`):

```ts
{
  slug: "nome-do-artista",       // vira a URL: /artistas/nome-do-artista — só letras minúsculas, números e hífen
  name: "Nome do Artista",
  genre: "MPB",                  // um dos valores em ArtistGenre (src/lib/types.ts)
  shortBio: "Frase curta (1-2 linhas) usada nos cards.",
  bio: "Texto mais longo usado na página de detalhe do artista.",
  featured: true,                 // opcional: aparece na home em "Artistas em destaque"
  accent: "gold",                 // "gold" | "red" | "blue" — cor do placeholder de foto
}
```

Se `genre` for um gênero que ainda não existe na lista, adicione-o em
`ArtistGenre` no arquivo `src/lib/types.ts` primeiro — o TypeScript vai
acusar erro até isso ser feito, o que é intencional (evita erro de
digitação silencioso).

## Adicionar um produto

Mesma lógica, em `src/content/products.ts`, seguindo o tipo `Product`:

```ts
{
  slug: "nome-do-produto",
  name: "Nome do Produto",
  category: "Garimpeiros Máfia",  // um dos valores em ProductCategory (src/lib/types.ts)
  priceInCents: 15900,            // preço em CENTAVOS (R$ 159,00 = 15900) — evita erro de arredondamento
  description: "Descrição do produto usada na página de detalhe.",
  artistSlug: "nome-do-artista",  // opcional — só se o produto for de um artista específico
  inStock: true,
  featured: true,                 // opcional: aparece na home em "Mais vendidos"
  accent: "gold",
}
```

`priceInCents` sempre em centavos — a formatação para "R$ 159,00" é
feita automaticamente por `formatPriceBRL()` (`src/lib/format.ts`).

### Sobre a categoria "Garimpeiros Máfia"

Não é mais só a seção de vinil — o Diogo renomeou pra cobrir também
instrumentos e equipamentos (pedais, microfones, violões etc.), então
qualquer "achado" que a produtora queira vender entra aqui, disco ou
não. Ao adicionar um produto nessa categoria, não é preciso `artistSlug`
a menos que o item seja realmente ligado a um artista específico (como
os vinis de lançamento).

## Fotos

Quando houver fotos reais para usar:

1. Salve o arquivo em `public/images/artistas/` ou `public/images/loja/`
   (crie as subpastas se não existirem). Prefira `.jpg`/`.webp`
   otimizados (menos de ~300kb por imagem).
2. No componente onde a foto vai aparecer, troque `<PlaceholderImage />`
   por `<Image>` do `next/image`, mantendo o container (`div` pai) com
   a mesma classe de aspect ratio. Exemplo em `src/components/ui/ArtistCard.tsx`:

   ```tsx
   // antes
   <PlaceholderImage label={artist.name} tone={artist.accent} aspect="portrait" />

   // depois
   <div className="relative aspect-[3/4] overflow-hidden">
     <Image
       src={`/images/artistas/${artist.slug}.jpg`}
       alt={artist.name}
       fill
       className="object-cover"
     />
   </div>
   ```
3. Repita para cada lugar que usa `PlaceholderImage` (busque no projeto
   por `PlaceholderImage` para achar todos os usos).

## Onde os textos institucionais "placeholder" precisam ser revisados

Marcados com `[texto placeholder]` ou comentário equivalente no código:

- `src/app/sobre/page.tsx` — texto sobre a história da produtora.
- Rodapé (`src/components/layout/Footer.tsx`) — links de redes sociais
  apontam para os domínios genéricos (instagram.com, etc.) — trocar
  pelos perfis reais assim que existirem.
