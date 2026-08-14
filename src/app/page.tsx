import Link from "next/link";
import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import SectionHeading from "@/components/ui/SectionHeading";
import ArtistCard from "@/components/ui/ArtistCard";
import ProductCard from "@/components/ui/ProductCard";
import { getFeaturedArtists } from "@/content/artists";
import { getFeaturedProducts } from "@/content/products";

export default function HomePage() {
  const featuredArtists = getFeaturedArtists();
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading
          eyebrow="Catálogo"
          title="Artistas em destaque"
          action={<Link href="/artistas">Ver todos</Link>}
        />
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {featuredArtists.map((artist) => (
            <ArtistCard key={artist.slug} artist={artist} />
          ))}
        </div>
      </section>

      <CategoryGrid />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading
          eyebrow="Loja"
          title="Mais vendidos"
          action={<Link href="/loja">Ver loja completa</Link>}
        />
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
