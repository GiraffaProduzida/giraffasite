"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { getProductBySlug } from "@/content/products";
import type { Product } from "@/lib/types";

const STORAGE_KEY = "girrafa-produzida:carrinho";

interface CartLine {
  productSlug: string;
  quantity: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  totalPriceInCents: number;
  addItem: (productSlug: string, quantity?: number) => void;
  removeItem: (productSlug: string) => void;
  updateQuantity: (productSlug: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

/**
 * Store externo (fora do React) que espelha o localStorage — ver
 * https://react.dev/reference/react/useSyncExternalStore. Usamos isso
 * em vez de useState+useEffect porque localStorage não existe durante
 * o build estático nem no primeiro paint no navegador (React ainda não
 * "hidratou"); ler e já dar setState dentro de um useEffect de mount
 * causa um cascading render (é isso que a regra de lint
 * react-hooks/set-state-in-effect aponta). getServerSnapshot() devolve
 * sempre `[]`, batendo com o HTML gerado no build; o valor real do
 * localStorage só é lido quando o componente assina o store (em
 * `subscribe`, chamado depois do primeiro paint), e o listener() ali
 * força o React a reconferir o snapshot. Bônus: como escuta o evento
 * "storage", o carrinho sincroniza entre abas abertas do site.
 */
const EMPTY_LINES: CartLine[] = [];
let cachedLines: CartLine[] = EMPTY_LINES;
const listeners = new Set<() => void>();

function parseLines(raw: string | null): CartLine[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (line): line is CartLine =>
        typeof line?.productSlug === "string" && typeof line?.quantity === "number"
    );
  } catch {
    return [];
  }
}

function notify() {
  listeners.forEach((listener) => listener());
}

function persist(lines: CartLine[]) {
  cachedLines = lines;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  notify();
}

function handleStorageEvent(event: StorageEvent) {
  if (event.key !== STORAGE_KEY) return;
  cachedLines = parseLines(event.newValue);
  notify();
}

function subscribe(listener: () => void) {
  if (listeners.size === 0) {
    // Popula cachedLines com o valor real do localStorage assim que o
    // componente monta no navegador. Não precisamos chamar listener()
    // aqui manualmente: o próprio useSyncExternalStore reconfere
    // getSnapshot() logo depois de assinar (é assim que ele resolve a
    // corrida entre "renderizou com getServerSnapshot" e "valor real
    // só existe no navegador") — chamar de novo aqui é redundante e
    // reentrante o suficiente pra disparar o aviso "getServerSnapshot
    // should be cached to avoid an infinite loop".
    cachedLines = parseLines(window.localStorage.getItem(STORAGE_KEY));
    window.addEventListener("storage", handleStorageEvent);
  }
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener("storage", handleStorageEvent);
    }
  };
}

function getSnapshot(): CartLine[] {
  return cachedLines;
}

function getServerSnapshot(): CartLine[] {
  // Precisa devolver sempre a MESMA referência (não um array novo) —
  // useSyncExternalStore compara por Object.is; um array novo a cada
  // chamada causa "getServerSnapshot should be cached" e re-render em
  // loop.
  return EMPTY_LINES;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const lines = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const removeItem = useCallback((productSlug: string) => {
    persist(getSnapshot().filter((line) => line.productSlug !== productSlug));
  }, []);

  const addItem = useCallback((productSlug: string, quantity = 1) => {
    const current = getSnapshot();
    const existing = current.find((line) => line.productSlug === productSlug);
    const next = existing
      ? current.map((line) =>
          line.productSlug === productSlug
            ? { ...line, quantity: line.quantity + quantity }
            : line
        )
      : [...current, { productSlug, quantity }];
    persist(next);
  }, []);

  const updateQuantity = useCallback(
    (productSlug: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productSlug);
        return;
      }
      persist(
        getSnapshot().map((line) =>
          line.productSlug === productSlug ? { ...line, quantity } : line
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => {
    persist(EMPTY_LINES);
  }, []);

  const items = useMemo<CartItem[]>(() => {
    return lines.reduce<CartItem[]>((acc, line) => {
      const product = getProductBySlug(line.productSlug);
      if (product) acc.push({ product, quantity: line.quantity });
      return acc;
    }, []);
  }, [lines]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPriceInCents = items.reduce(
    (sum, item) => sum + item.product.priceInCents * item.quantity,
    0
  );

  const value: CartContextValue = {
    items,
    totalItems,
    totalPriceInCents,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart precisa ser usado dentro de <CartProvider>");
  }
  return context;
}
