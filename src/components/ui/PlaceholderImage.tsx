/**
 * PlaceholderImage
 * -----------------
 * Este projeto ainda não tem fotos reais de artistas/produtos, então
 * usamos este componente no lugar de <Image> para simular o "peso"
 * visual de uma foto (ver docs/DESIGN_SYSTEM.md, seção Fotografia).
 *
 * COMO TROCAR POR FOTOS DE VERDADE:
 * 1. Coloque o arquivo em /public/images/... (ver docs/CONTENT_GUIDE.md)
 * 2. Troque o uso de <PlaceholderImage /> por next/image, ex:
 *      <Image src="/images/artistas/luna-cerrado.jpg" alt="Luna Cerrado"
 *             fill className="object-cover" />
 *    dentro do mesmo container (mantenha a classe `relative` e a
 *    aspect ratio do container pai).
 */

type Tone = "gold" | "red" | "blue";

const toneGradients: Record<Tone, string> = {
  gold: "from-accent-gold/80 via-accent-gold/30 to-ink",
  red: "from-accent-red/80 via-accent-red/30 to-ink",
  blue: "from-accent-blue/80 via-accent-blue/30 to-ink",
};

interface PlaceholderImageProps {
  label: string;
  tone?: Tone;
  aspect?: "square" | "portrait" | "wide";
  className?: string;
}

const aspectClasses = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[16/9]",
};

export default function PlaceholderImage({
  label,
  tone = "gold",
  aspect = "square",
  className = "",
}: PlaceholderImageProps) {
  return (
    <div
      className={`relative overflow-hidden bg-ink ${aspectClasses[aspect]} ${className}`}
      role="img"
      aria-label={label}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${toneGradients[tone]} mix-blend-normal opacity-90`}
      />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #ffffff 0, #ffffff 1px, transparent 1px, transparent 8px)",
        }}
      />
      <span className="text-meta absolute bottom-2 left-2 rounded bg-ink/70 px-2 py-1 text-[10px] text-paper">
        foto: {label}
      </span>
    </div>
  );
}
