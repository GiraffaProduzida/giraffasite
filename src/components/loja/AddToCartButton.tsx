"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";

/**
 * Botão "Adicionar ao carrinho" da página de produto. Client Component
 * porque chama useCart (estado do carrinho só existe no navegador) —
 * o resto da página de produto continua Server Component.
 */
export default function AddToCartButton({ productSlug }: { productSlug: string }) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (!justAdded) return;
    const timeout = window.setTimeout(() => setJustAdded(false), 1500);
    return () => window.clearTimeout(timeout);
  }, [justAdded]);

  function handleClick() {
    addItem(productSlug, 1);
    setJustAdded(true);
  }

  return (
    <Button type="button" onClick={handleClick}>
      {justAdded ? "Adicionado ✓" : "Adicionar ao carrinho"}
    </Button>
  );
}
