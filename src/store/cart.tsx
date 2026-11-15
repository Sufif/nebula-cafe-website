import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { MENU_ITEMS, type MenuItem } from "../data/content";

export const PROMO = { code: "NEBULA10", pct: 10 };
export interface Line { item: MenuItem; qty: number }
type Qty = Record<string, number>;

interface Ctx {
  lines: Line[]; count: number; subtotal: number; discount: number; total: number;
  promoOn: boolean; toast: string | null; bump: number;
  add: (id: string) => void; setQty: (id: string, n: number) => void; clear: () => void;
  applyPromo: (code: string) => boolean;
}

const CartContext = createContext<Ctx | null>(null);
const KEY = "nebula-tray-v1";

function load(): Qty {
  try { return JSON.parse(localStorage.getItem(KEY) || "{}") as Qty; } catch { return {}; }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [qty, setQtyMap] = useState<Qty>(load);
  const [promoOn, setPromoOn] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [bump, setBump] = useState(0);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(qty)); } catch { /* storage unavailable */ }
  }, [qty]);

  const add = useCallback((id: string) => {
    setQtyMap((q) => ({ ...q, [id]: Math.min((q[id] || 0) + 1, 20) }));
    setBump((b) => b + 1);
    setToast(`${MENU_ITEMS.find((m) => m.id === id)?.name ?? "Item"} added to your tray`);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 2400);
  }, []);

  const setQty = useCallback((id: string, n: number) => {
    setQtyMap((q) => {
      const next = { ...q };
      if (n <= 0) delete next[id]; else next[id] = Math.min(n, 20);
      return next;
    });
  }, []);

  const clear = useCallback(() => { setQtyMap({}); setPromoOn(false); }, []);
  const applyPromo = useCallback((code: string) => {
    const ok = code.trim().toUpperCase() === PROMO.code;
    setPromoOn(ok);
    return ok;
  }, []);

  const value = useMemo<Ctx>(() => {
    const lines = MENU_ITEMS.filter((m) => qty[m.id]).map((item) => ({ item, qty: qty[item.id] }));
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const subtotal = lines.reduce((s, l) => s + l.qty * l.item.price, 0);
    const discount = promoOn ? Math.round((subtotal * PROMO.pct) / 100) : 0;
    return { lines, count, subtotal, discount, total: subtotal - discount, promoOn, toast, bump, add, setQty, clear, applyPromo };
  }, [qty, promoOn, toast, bump, add, setQty, clear, applyPromo]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
