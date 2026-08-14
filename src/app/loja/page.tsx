import type { Metadata } from "next";
import { Suspense } from "react";
import LojaContent from "@/components/loja/LojaContent";

export const metadata: Metadata = {
  title: "Loja",
  description: "Vinis, CDs, camisetas e acessórios oficiais da Girrafa Produzida.",
};

export default function LojaPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-meta text-xs text-muted">Loja oficial</p>
      <h1 className="text-display text-4xl sm:text-5xl">Loja</h1>

      <Suspense fallback={<p className="mt-10 text-sm text-muted">Carregando produtos…</p>}>
        <LojaContent />
      </Suspense>
    </section>
  );
}
