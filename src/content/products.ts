import type { Product } from "@/lib/types";

/**
 * Dados de exemplo (placeholder) da loja da Girrafa Produzida.
 *
 * Mesmo racional de src/content/artists.ts: isto é só para o protótipo
 * funcionar com dados realistas. Ver docs/CONTENT_GUIDE.md antes de
 * decidir se o catálogo real vai virar CMS, planilha importada ou
 * integração direta com um provedor de e-commerce (ex: Shopify).
 */
export const products: Product[] = [
  {
    slug: "luna-cerrado-vinil-cerrado-aberto",
    name: "Luna Cerrado — Cerrado Aberto (Vinil)",
    category: "Garimpeiros Máfia",
    priceInCents: 15900,
    description:
      "Primeira prensagem em vinil 180g do álbum de estreia de Luna Cerrado, com encarte de 8 páginas e letras ilustradas.",
    artistSlug: "luna-cerrado",
    inStock: true,
    featured: true,
    accent: "gold",
  },
  {
    slug: "bloco-alto-cd-cimento-e-flor",
    name: "Bloco Alto — Cimento e Flor (CD)",
    category: "CD",
    priceInCents: 4900,
    description: "CD do segundo álbum do Bloco Alto, com faixa bônus exclusiva não disponível em streaming.",
    artistSlug: "bloco-alto",
    inStock: true,
    featured: true,
    accent: "red",
  },
  {
    slug: "camiseta-girrafa-logo-classico",
    name: "Camiseta Girrafa Produzida — Logo Clássico",
    category: "Camiseta",
    priceInCents: 8900,
    description: "Camiseta 100% algodão com estampa serigrafada do logo clássico da produtora.",
    inStock: true,
    featured: true,
    accent: "blue",
  },
  {
    slug: "moletom-onda-sintetica-tour",
    name: "Moletom Onda Sintética — Turnê 2026",
    category: "Moletom",
    priceInCents: 18900,
    description: "Moletom oficial da turnê 2026 de Onda Sintética, com estampa frente e verso.",
    artistSlug: "onda-sintetica",
    inStock: true,
    accent: "blue",
  },
  {
    slug: "bone-girrafa-aba-reta",
    name: "Boné Girrafa Produzida — Aba Reta",
    category: "Boné",
    priceInCents: 6900,
    description: "Boné aba reta bordado, ajuste com fivela metálica.",
    inStock: true,
    accent: "gold",
  },
  {
    slug: "ferrovia-vinil-linha-tronco",
    name: "Ferrovia — Linha Tronco (Vinil Colorido)",
    category: "Garimpeiros Máfia",
    priceInCents: 17900,
    description: "Edição limitada em vinil colorido (300 unidades numeradas) do álbum Linha Tronco.",
    artistSlug: "ferrovia",
    inStock: false,
    accent: "gold",
  },
  // A partir daqui: exemplos de instrumentos/equipamentos, também dentro
  // da categoria "Garimpeiros Máfia" — não têm artistSlug porque não são
  // ligados a um artista específico, são achados/curadoria da loja.
  {
    slug: "pedal-overdrive-garimpeiro",
    name: "Pedal de Overdrive Garimpeiro Mk1",
    category: "Garimpeiros Máfia",
    priceInCents: 45900,
    description:
      "Pedal de overdrive analógico, montado à mão, garimpado de uma pequena fábrica paulista. Circuito baseado em drives clássicos, com controle de graves independente.",
    inStock: true,
    accent: "red",
  },
  {
    slug: "microfone-dinamico-estudio-garimpo",
    name: "Microfone Dinâmico de Estúdio — Achado Garimpo",
    category: "Garimpeiros Máfia",
    priceInCents: 89900,
    description:
      "Unidade recondicionada de microfone dinâmico cardioide, testada e aprovada pela equipe técnica da Girrafa Produzida antes de ir pra loja.",
    inStock: true,
    accent: "blue",
  },
  {
    slug: "violao-folk-garimpeiros-edition",
    name: "Violão Folk — Garimpeiros Máfia Edition",
    category: "Garimpeiros Máfia",
    priceInCents: 189900,
    description:
      "Violão folk com tampo maciço, escolhido a dedo pelo time de garimpo. Cada unidade é única — vem com etiqueta numerada dentro da caixa acústica.",
    inStock: true,
    featured: true,
    accent: "gold",
  },
  {
    slug: "fone-estudio-monitor-garimpo",
    name: "Fone de Estúdio Monitor — Achado Garimpo",
    category: "Garimpeiros Máfia",
    priceInCents: 69900,
    description: "Fone fechado para monitoramento em estúdio, resposta de frequência plana, testado nas gravações da casa.",
    inStock: false,
    accent: "red",
  },
  {
    slug: "mc-vertigem-cd-vertigem-2",
    name: "MC Vertigem — Vertigem 2 (CD)",
    category: "CD",
    priceInCents: 4500,
    description: "CD do EP mais recente de MC Vertigem, com booklet de fotos do estúdio.",
    artistSlug: "mc-vertigem",
    inStock: true,
    accent: "blue",
  },
  {
    slug: "pin-set-girrafa-artistas",
    name: "Kit de Pins — Artistas da Casa",
    category: "Acessórios",
    priceInCents: 5900,
    description: "Kit com 6 pins esmaltados, um para cada artista do catálogo atual da Girrafa Produzida.",
    inStock: true,
    accent: "red",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}

export function getProductsByArtist(artistSlug: string): Product[] {
  return products.filter((product) => product.artistSlug === artistSlug);
}
