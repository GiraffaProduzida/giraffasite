"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/content/products";
import type { ProductCategory } from "@/lib/types";

const CATEGORIES: ProductCategory[] = [
  "Vinil",
  "CD",
  "Camiseta",
  "Moletom",
  "Boné",
  "Acessórios",
];

/**
 * Conteúdo da página /loja. É Client Component porque lê o filtro de
 * categoria via `useSearchParams` — no site estático publicado no
 * GitHub Pages não existe servidor para ler a query string por
 * requisição, então o filtro acontece no navegador (os dados dos
 * produtos já vêm todos no bundle, é uma lista pequena; se o catálogo
 * crescer muito, ver docs/ARCHITECTURE.md sobre buscar isso de uma API).
 *
 * `useSearchParams` exige que o componente esteja dentro de um
 * <Suspense> (ver src/app/loja/page.tsx) — sem isso o Next.js
 * bloquearia a página inteira de ser pré-renderizada como estática.
 */
export default function LojaContent() {
  const searchParams = useSearchParams();
  const categoria = searchParams.get("categoria");

  const filtered = categoria
    ? products.filter((product) => product.category.toLowerCase() === categoria.toLowerCase())
    : products;

  return (
    <>
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
    </>
  );
}
