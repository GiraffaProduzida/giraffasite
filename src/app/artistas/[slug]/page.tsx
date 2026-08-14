import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import ProductCard from "@/components/ui/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { artists, getArtistBySlug } from "@/content/artists";
import { getProductsByArtist } from "@/content/products";

// Gera as páginas de todos os artistas em build time (dados são locais
// e conhecidos com antecedência — ver node_modules/next/dist/docs
// /01-app/03-api-reference/03-file-conventions/dynamic-routes.md).
export function generateStaticParams() {
  return artists.map((artist) => ({ slug: artist.slug }));
}

export async function generateMetadata(props: PageProps<"/artistas/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const artist = getArtistBySlug(slug);
  if (!artist) return {};
  return { title: artist.name, description: artist.shortBio };
}

export default async function ArtistPage(props: PageProps<"/artistas/[slug]">) {
  const { slug } = await props.params;
  const artist = getArtistBySlug(slug);
  if (!artist) notFound();

  const products = getProductsByArtist(artist.slug);

  return (
    <>
      <section className="grid gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:mx-auto lg:max-w-6xl">
        <PlaceholderImage label={artist.name} tone={artist.accent} aspect="portrait" />
        <div>
          <Link href="/artistas" className="text-meta text-xs text-muted hover:underline">
            ← Todos os artistas
          </Link>
          <p className="text-meta mt-4 text-xs text-muted">{artist.genre}</p>
          <h1 className="text-display text-4xl sm:text-5xl">{artist.name}</h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/80">{artist.bio}</p>
        </div>
      </section>

      {products.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <SectionHeading eyebrow="Loja" title={`Produtos de ${artist.name}`} />
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
