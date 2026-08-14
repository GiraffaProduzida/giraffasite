import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Fontes self-hosted via @fontsource (não dependem de fonts.googleapis.com
// em runtime nem em build — os arquivos de fonte ficam no próprio pacote
// npm). Ver docs/DESIGN_SYSTEM.md para a razão da escolha de cada fonte.
import "@fontsource/anton/400.css"; // fonte de exibição (títulos)
import "@fontsource/inter/400.css"; // fonte de corpo (texto)
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/jetbrains-mono/400.css"; // fonte de apoio (preços, labels)
import "@fontsource/jetbrains-mono/500.css";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Girrafa Produzida",
    template: "%s — Girrafa Produzida",
  },
  description:
    "Girrafa Produzida — produtora musical e loja oficial de vinis, CDs e produtos dos nossos artistas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
