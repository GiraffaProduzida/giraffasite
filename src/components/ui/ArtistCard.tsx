import Link from "next/link";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import type { Artist } from "@/lib/types";

export default function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Link href={`/artistas/${artist.slug}`} className="group block">
      <PlaceholderImage label={artist.name} tone={artist.accent} aspect="portrait" />
      <div className="mt-3">
        <p className="text-meta text-xs text-muted">{artist.genre}</p>
        <h3 className="text-display text-xl group-hover:underline">{artist.name}</h3>
        <p className="mt-1 text-sm text-muted">{artist.shortBio}</p>
      </div>
    </Link>
  );
}
