import type { Metadata } from "next";
import ArtistCard from "@/components/ui/ArtistCard";
import { artists } from "@/content/artists";

export const metadata: Metadata = {
  title: "Artistas",
  description: "Conheça os artistas do catálogo da Girrafa Produzida.",
};

export default function ArtistasPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-meta text-xs text-muted">Catálogo</p>
      <h1 className="text-display text-4xl sm:text-5xl">Artistas</h1>

      <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {artists.map((artist) => (
          <ArtistCard key={artist.slug} artist={artist} />
        ))}
      </div>
    </section>
  );
}
