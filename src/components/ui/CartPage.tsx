import { useState } from "react";
import { ArrowLeft, ArrowUpRight, Minus, Plus, ShoppingBag, Tag, X } from "lucide-react";
import { PROMO, useCart } from "../../store/cart";

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export function Totals() {
  const { subtotal, discount, total, promoOn } = useCart();
  const row = (l: string, v: string, accent = false) => (
    <div className="flex justify-between text-sm">
      <span className="text-white/55">{l}</span>
      <span className={accent ? "text-[#C7F36A]" : "text-white/85"}>{v}</span>
    </div>
  );
  return (
    <div className="space-y-3">
      {row("Subtotal", inr(subtotal))}
      {promoOn && row(`Promo ${PROMO.code}`, `− ${inr(discount)}`, true)}
      {row("Taxes", "Included")}
      <div className="flex items-end justify-between border-t border-white/10 pt-4">
        <span className="text-[11px] uppercase tracking-[0.24em] text-white/50">Total</span>
        <span className="font-display text-2xl font-bold text-[#C7F36A]">{inr(total)}</span>
      </div>
    </div>
  );
}

export function CartToast() {
  const { toast, bump } = useCart();
  if (!toast) return null;
  return (
    <div key={bump} role="status" className="animate-toast glass-strong fixed bottom-6 left-1/2 z-[75] flex items-center gap-4 rounded-full py-2.5 pl-5 pr-2.5 text-[13px]">
      <span className="text-white/85">{toast}</span>
      <a href="#/cart" className="btn-primary rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#090D12]">View tray</a>
    </div>
  );
}

export default function CartPage() {
  const { lines, count, setQty, applyPromo, promoOn } = useCart();
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  if (!lines.length) {
    return (
      <section className="animate-page mx-auto grid min-h-[80vh] max-w-xl place-items-center px-6 pt-32 text-center">
        <div>
          <div className="glass mx-auto grid h-24 w-24 place-items-center rounded-full"><ShoppingBag className="h-9 w-9 text-[#C7F36A]" /></div>
          <h1 className="font-display mt-8 text-3xl font-bold">Your tray is empty</h1>
          <p className="mt-3 text-white/55">Nothing in orbit yet. Pick a few signatures from the menu.</p>
          <a href="#menu" className="btn-primary mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.16em] text-[#090D12]">
            Browse the menu <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="animate-page mx-auto max-w-[1180px] px-4 pb-24 pt-32 sm:px-6">
      <a href="#menu" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50 hover:text-[#C7F36A]">
        <ArrowLeft className="h-4 w-4" /> Keep browsing
      </a>
      <h1 className="font-display mt-5 text-[clamp(1.8rem,4vw,3rem)] font-bold">
        Your <span className="font-serifit font-normal text-[#C7F36A]">tray</span>
        <span className="ml-3 align-middle text-sm font-medium text-white/40">{count} items</span>
      </h1>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
        <ul className="space-y-4">
          {lines.map(({ item, qty }) => (
            <li key={item.id} className="glass flex gap-4 rounded-3xl p-3 sm:p-4">
              <img src={item.img} alt={item.name} className="h-24 w-24 rounded-2xl object-cover sm:h-28 sm:w-28" />
              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-[15px] font-semibold">{item.name}</h2>
                    <p className="mt-1 text-xs text-white/45">{item.category} · {inr(item.price)} each</p>
                  </div>
                  <button aria-label={`Remove ${item.name}`} onClick={() => setQty(item.id, 0)} className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-red-400/50 hover:text-red-300">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="glass inline-flex items-center rounded-full">
                    <button aria-label="Decrease quantity" onClick={() => setQty(item.id, qty - 1)} className="grid h-9 w-9 place-items-center text-white/70 hover:text-[#C7F36A]"><Minus className="h-4 w-4" /></button>
                    <span className="w-7 text-center text-sm font-semibold">{qty}</span>
                    <button aria-label="Increase quantity" onClick={() => setQty(item.id, qty + 1)} className="grid h-9 w-9 place-items-center text-white/70 hover:text-[#C7F36A]"><Plus className="h-4 w-4" /></button>
                  </div>
                  <p className="font-display font-bold text-[#C7F36A]">{inr(item.price * qty)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="glass-strong h-fit rounded-3xl p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-lg font-semibold">Order summary</h2>
          <form
            className="mt-5"
            onSubmit={(e) => {
              e.preventDefault();
              setMsg(applyPromo(code) ? `${PROMO.pct}% off applied` : "That code isn't valid");
            }}
          >
            <label htmlFor="promo" className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/50">
              <Tag className="h-3.5 w-3.5" /> Promo code
            </label>
            <div className="flex gap-2">
              <input id="promo" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Try NEBULA10" className="min-w-0 flex-1 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2.5 text-sm outline-none focus:border-[#C7F36A]/60" />
              <button className="rounded-full border border-[#C7F36A]/50 px-5 text-[12px] font-bold uppercase tracking-[0.14em] text-[#C7F36A] hover:bg-[#C7F36A]/10">Apply</button>
            </div>
            {msg && <p role="status" className={`mt-2 text-xs ${promoOn ? "text-[#C7F36A]" : "text-red-300"}`}>{msg}</p>}
          </form>
          <div className="my-6 h-px bg-white/10" />
          <Totals />
          <a href="#/checkout" className="btn-primary mt-6 flex items-center justify-center gap-2 rounded-full py-4 text-[13px] font-bold uppercase tracking-[0.16em] text-[#090D12]">
            Checkout <ArrowUpRight className="h-4 w-4" />
          </a>
        </aside>
      </div>
    </section>
  );
}
