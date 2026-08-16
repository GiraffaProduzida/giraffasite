import type { Metadata } from "next";
import CarrinhoContent from "@/components/carrinho/CarrinhoContent";

export const metadata: Metadata = {
  title: "Carrinho",
  description: "Itens no seu carrinho de compras.",
};

export default function CarrinhoPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-meta text-xs text-muted">Seu carrinho</p>
      <h1 className="text-display text-4xl sm:text-5xl">Carrinho</h1>

      <CarrinhoContent />
    </section>
  );
}
