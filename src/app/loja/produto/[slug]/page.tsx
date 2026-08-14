import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { Button } from "@/components/ui/Button";
import { products, getProductBySlug } from "@/content/products";
import { getArtistBySlug } from "@/content/artists";
import { formatPriceBRL } from "@/lib/format";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(
  props: PageProps<"/loja/produto/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return { title: product.name, description: product.description };
}

export default async function ProdutoPage(props: PageProps<"/loja/produto/[slug]">) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const artist = product.artistSlug ? getArtistBySlug(product.artistSlug) : undefined;

  return (
    <section className="grid gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:mx-auto lg:max-w-6xl">
      <PlaceholderImage label={product.name} tone={product.accent} aspect="square" />

      <div>
        <Link href="/loja" className="text-meta text-xs text-muted hover:underline">
          ← Voltar para a loja
        </Link>

        <p className="text-meta mt-4 text-xs text-muted">{product.category}</p>
        <h1 className="text-display text-3xl sm:text-4xl">{product.name}</h1>

        {artist && (
          <p className="mt-2 text-sm text-muted">
            Artista:{" "}
            <Link href={`/artistas/${artist.slug}`} className="underline">
              {artist.name}
            </Link>
          </p>
        )}

        <p className="text-meta mt-4 text-2xl">{formatPriceBRL(product.priceInCents)}</p>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/80">{product.description}</p>

        <div className="mt-6">
          {product.inStock ? (
            <Button type="button">Adicionar ao carrinho</Button>
          ) : (
            <Button type="button" variant="secondary" disabled className="cursor-not-allowed opacity-50">
              Esgotado
            </Button>
          )}
        </div>

        <p className="mt-3 text-xs text-muted">
          * Botão de compra ainda não conectado a um checkout real — ver
          docs/ARCHITECTURE.md, seção &quot;O que falta para produção&quot;.
        </p>
      </div>
    </section>
  );
}
