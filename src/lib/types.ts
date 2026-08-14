/**
 * Tipos centrais do domínio da Girrafa Produzida.
 *
 * Mantenha estes tipos como a "fonte da verdade" da forma dos dados.
 * Se o projeto migrar para um CMS/backend real (ex: Shopify, Sanity,
 * um banco próprio), estes tipos devem continuar batendo com a resposta
 * da API — ajuste aqui primeiro e o TypeScript vai apontar tudo que
 * precisa mudar no resto do app.
 */

export type ArtistGenre =
  | "MPB"
  | "Hip Hop"
  | "Eletrônica"
  | "Rock"
  | "Samba/Pagode"
  | "Funk";

export interface Artist {
  /** Identificador único usado na URL: /artistas/[slug] */
  slug: string;
  name: string;
  genre: ArtistGenre;
  /** Texto curto usado em cards/listagens (1-2 frases). */
  shortBio: string;
  /** Texto completo usado na página de detalhe do artista. */
  bio: string;
  /** Aparece em destaque na home quando true. */
  featured?: boolean;
  /** Cor de acento usada no placeholder visual do artista (ver DESIGN_SYSTEM.md). */
  accent: "gold" | "red" | "blue";
}

export type ProductCategory =
  | "Vinil"
  | "CD"
  | "Camiseta"
  | "Moletom"
  | "Boné"
  | "Acessórios";

export interface Product {
  /** Identificador único usado na URL: /loja/produto/[slug] */
  slug: string;
  name: string;
  category: ProductCategory;
  /** Preço em reais (BRL), em centavos, para evitar erro de ponto flutuante. */
  priceInCents: number;
  description: string;
  /** slug do artista relacionado, se houver (ex: vinil de um artista específico). */
  artistSlug?: string;
  inStock: boolean;
  featured?: boolean;
  accent: "gold" | "red" | "blue";
}
