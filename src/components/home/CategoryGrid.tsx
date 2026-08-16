import Link from "next/link";
import PlaceholderImage from "@/components/ui/PlaceholderImage";

const CATEGORIES = [
  {
    href: `/loja?categoria=${encodeURIComponent("Garimpeiros Máfia")}`,
    label: "Garimpeiros Máfia",
    tone: "gold" as const,
  },
  { href: "/artistas", label: "Artistas", tone: "red" as const },
  { href: "/loja", label: "Loja", tone: "blue" as const },
  { href: "/sobre", label: "A Girrafa", tone: "gold" as const },
];

/**
 * Grid 2x2 de categorias em destaque — mesmo padrão observado na
 * home do site de referência: blocos grandes clicáveis com foto +
 * camada de cor + título grande. Ver docs/DESIGN_SYSTEM.md.
 */
export default function CategoryGrid() {
  return (
    <section className="grid grid-cols-2">
      {CATEGORIES.map((category) => (
        <Link key={category.href} href={category.href} className="group relative block">
          <PlaceholderImage label={category.label} tone={category.tone} aspect="square" className="sm:aspect-[4/3]" />
          <span className="text-display absolute inset-0 flex items-center justify-center text-2xl text-paper sm:text-4xl">
            {category.label}
          </span>
        </Link>
      ))}
    </section>
  );
}
