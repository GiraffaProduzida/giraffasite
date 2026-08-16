"use client";

import Link from "next/link";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { Button, ButtonLink } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { formatPriceBRL } from "@/lib/format";

/**
 * Conteúdo da página /carrinho. Client Component porque lê o estado
 * do carrinho via useCart (ver src/context/CartContext.tsx).
 */
export default function CarrinhoContent() {
  const { items, totalItems, totalPriceInCents, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="mt-10">
        <p className="text-sm text-muted">Seu carrinho está vazio.</p>
        <ButtonLink href="/loja" className="mt-6 inline-flex">
          Ver a loja
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
      <ul className="flex flex-col divide-y divide-line">
        {items.map(({ product, quantity }) => (
          <li key={product.slug} className="flex gap-4 py-6">
            <Link href={`/loja/produto/${product.slug}`} className="w-24 shrink-0">
              <PlaceholderImage label={product.name} tone={product.accent} aspect="square" />
            </Link>

            <div className="flex flex-1 flex-col justify-between">
              <div>
                <p className="text-meta text-xs text-muted">{product.category}</p>
                <Link
                  href={`/loja/produto/${product.slug}`}
                  className="text-sm font-medium leading-snug hover:underline"
                >
                  {product.name}
                </Link>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-4">
                <label className="flex items-center gap-2">
                  <span className="text-meta text-xs text-muted">Qtd.</span>
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => {
                      const next = Number(e.target.value);
                      if (Number.isNaN(next)) return;
                      updateQuantity(product.slug, next);
                    }}
                    className="w-16 border border-line bg-transparent px-2 py-1 text-sm focus:border-ink focus:outline-none"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => removeItem(product.slug)}
                  className="text-meta text-xs text-muted underline hover:text-ink"
                >
                  Remover
                </button>
              </div>
            </div>

            <p className="text-meta whitespace-nowrap text-sm">
              {formatPriceBRL(product.priceInCents * quantity)}
            </p>
          </li>
        ))}
      </ul>

      <aside className="h-fit border border-line p-6">
        <p className="text-meta text-xs text-muted">
          {totalItems} {totalItems === 1 ? "item" : "itens"}
        </p>
        <p className="text-meta mt-2 text-2xl">{formatPriceBRL(totalPriceInCents)}</p>

        <Button type="button" disabled className="mt-6 w-full cursor-not-allowed opacity-50">
          Finalizar pedido
        </Button>
        <p className="mt-3 text-xs text-muted">
          * Checkout ainda em desenvolvimento — próxima etapa (ver
          docs/ARCHITECTURE.md).
        </p>
      </aside>
    </div>
  );
}
