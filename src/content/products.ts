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
    category: "Vinil",
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
    category: "Vinil",
    priceInCents: 17900,
    description: "Edição limitada em vinil colorido (300 unidades numeradas) do álbum Linha Tronco.",
    artistSlug: "ferrovia",
    inStock: false,
    accent: "gold",
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
