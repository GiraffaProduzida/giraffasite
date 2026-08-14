import Link from "next/link";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { formatPriceBRL } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/loja/produto/${product.slug}`} className="group block">
      <PlaceholderImage label={product.name} tone={product.accent} aspect="square" />
      <div className="mt-3">
        <p className="text-meta text-xs text-muted">{product.category}</p>
        <h3 className="text-sm font-medium leading-snug group-hover:underline">
          {product.name}
        </h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-meta text-sm">{formatPriceBRL(product.priceInCents)}</span>
          {!product.inStock && (
            <span className="text-meta text-xs text-accent-red">esgotado</span>
          )}
        </div>
      </div>
    </Link>
  );
}
