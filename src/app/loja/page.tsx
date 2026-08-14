import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/content/products";
import type { ProductCategory } from "@/lib/types";

export const metadata: Metadata = {
  title: "Loja",
  description: "Vinis, CDs, camisetas e acessórios oficiais da Girrafa Produzida.",
};

const CATEGORIES: ProductCategory[] = [
  "Vinil",
  "CD",
  "Camiseta",
  "Moletom",
  "Boné",
  "Acessórios",
];

export default async function LojaPage(props: PageProps<"/loja">) {
  const searchParams = await props.searchParams;
  const rawCategoria = searchParams?.categoria;
  const categoria = Array.isArray(rawCategoria) ? rawCategoria[0] : rawCategoria;

  const filtered = categoria
    ? products.filter((product) => product.category.toLowerCase() === categoria.toLowerCase())
    : products;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-meta text-xs text-muted">Loja oficial</p>
      <h1 className="text-display text-4xl sm:text-5xl">Loja</h1>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/loja"
          className={`text-meta border px-3 py-1.5 text-xs ${
            !categoria ? "border-ink bg-ink text-paper" : "border-line text-muted"
          }`}
        >
          Todos
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/loja?categoria=${encodeURIComponent(cat)}`}
            className={`text-meta border px-3 py-1.5 text-xs ${
              categoria?.toLowerCase() === cat.toLowerCase()
                ? "border-ink bg-ink text-paper"
                : "border-line text-muted"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-sm text-muted">Nenhum produto encontrado nesta categoria.</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
