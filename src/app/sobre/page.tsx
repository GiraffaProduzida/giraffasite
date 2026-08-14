import type { Metadata } from "next";
import PlaceholderImage from "@/components/ui/PlaceholderImage";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça a história da Girrafa Produzida.",
};

export default function SobrePage() {
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6">
      <div>
        <p className="text-meta text-xs text-muted">Desde sempre</p>
        <h1 className="text-display text-4xl sm:text-5xl">A Girrafa Produzida</h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-ink/80">
          [Texto institucional placeholder — substituir pelo texto real da
          produtora: história, missão, artistas revelados, marcos
          importantes.] A Girrafa Produzida nasceu para dar palco a
          artistas que misturam raiz e vanguarda, cuidando de cada etapa —
          da gravação ao produto que chega até você.
        </p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/80">
          Hoje reunimos um catálogo diverso, de MPB a funk, sempre com o
          mesmo cuidado de produção e curadoria.
        </p>
      </div>
      <PlaceholderImage label="equipe girrafa produzida" tone="red" aspect="portrait" />
    </section>
  );
}
