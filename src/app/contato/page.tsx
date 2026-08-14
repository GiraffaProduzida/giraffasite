import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a Girrafa Produzida.",
};

export default function ContatoPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <p className="text-meta text-xs text-muted">Fale com a gente</p>
      <h1 className="text-display text-4xl sm:text-5xl">Contato</h1>
      <p className="mt-4 text-sm text-muted">
        Dúvidas sobre pedidos, parcerias ou imprensa — preencha o
        formulário abaixo (ainda não conectado a um envio real; ver
        docs/ARCHITECTURE.md).
      </p>

      <form className="mt-8 flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-meta text-xs">Nome</span>
          <input
            type="text"
            required
            className="border border-line bg-transparent px-3 py-2 text-sm focus:border-ink focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-meta text-xs">E-mail</span>
          <input
            type="email"
            required
            className="border border-line bg-transparent px-3 py-2 text-sm focus:border-ink focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-meta text-xs">Mensagem</span>
          <textarea
            required
            rows={5}
            className="border border-line bg-transparent px-3 py-2 text-sm focus:border-ink focus:outline-none"
          />
        </label>
        <div>
          <Button type="submit">Enviar mensagem</Button>
        </div>
      </form>
    </section>
  );
}
