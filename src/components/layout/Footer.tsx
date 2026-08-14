import Link from "next/link";
import Newsletter from "@/components/layout/Newsletter";

const SOCIAL_LINKS = [
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://youtube.com", label: "YouTube" },
  { href: "https://open.spotify.com", label: "Spotify" },
];

const INSTITUTIONAL_LINKS = [
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
  { href: "/loja", label: "Loja" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        <Newsletter />

        <div>
          <p className="text-meta text-xs text-paper/50">Institucional</p>
          <ul className="mt-3 space-y-2">
            {INSTITUTIONAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-meta text-xs text-paper/50">Redes sociais</p>
          <ul className="mt-3 space-y-2">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10 px-4 py-4 sm:px-6">
        <p className="text-meta text-xs text-paper/50">
          © {new Date().getFullYear()} Girrafa Produzida. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
