"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/artistas", label: "Artistas" },
  { href: "/loja", label: "Loja" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

/**
 * Cabeçalho fixo do site. Client Component porque controla o estado
 * do menu mobile (useState). O carrinho/busca/conta são apenas UI
 * neste protótipo — sem lógica de e-commerce conectada ainda
 * (ver docs/ARCHITECTURE.md, seção "O que falta para produção").
 */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink text-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <button
          type="button"
          className="text-meta text-sm sm:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          {menuOpen ? "Fechar" : "Menu"}
        </button>

        <nav className="hidden gap-6 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-meta text-sm hover:opacity-70">
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/" className="text-display text-xl tracking-wide sm:text-2xl">
          Girrafa Produzida
        </Link>

        <div className="text-meta flex items-center gap-4 text-sm">
          <span aria-hidden className="hidden sm:inline">
            Busca
          </span>
          <span aria-hidden>Carrinho (0)</span>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" className="flex flex-col border-t border-paper/20 sm:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-meta border-b border-paper/10 px-4 py-3 text-sm"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
