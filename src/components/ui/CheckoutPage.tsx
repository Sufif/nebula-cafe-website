import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useCart } from "../../store/cart";
import { Totals, inr } from "./CartPage";

interface Placed { id: string; name: string; mode: string; slot: string; total: number; count: number }
const SLOTS = ["As soon as possible (~15 min)", "In 30 minutes", "In 1 hour"];
const field = "w-full rounded-2xl border border-white/12 bg-white/[0.05] px-4 py-3 text-sm outline-none transition-colors focus:border-[#C7F36A]/60";

export default function CheckoutPage() {
  const { lines, count, total, clear } = useCart();
  const [mode, setMode] = useState("Pickup");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placed, setPlaced] = useState<Placed | null>(null);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const phone = String(f.get("phone") || "").replace(/\D/g, "");
    const err: Record<string, string> = {};
    if (name.length < 2) err.name = "Tell us who to call out at the counter.";
    if (phone.length < 10) err.phone = "Enter a 10-digit mobile number.";
    setErrors(err);
    if (Object.keys(err).length) return;
    setPlaced({ id: `NEB-${Math.floor(10000 + Math.random() * 90000)}`, name, mode, slot: String(f.get("slot")), total, count });
    clear();
    window.scrollTo({ top: 0 });
  };

  if (placed) {
    return (
      <section className="animate-page mx-auto grid min-h-[85vh] max-w-xl place-items-center px-6 pt-32 text-center">
        <div className="glass-strong rounded-[32px] p-8 sm:p-12">
          <svg viewBox="0 0 64 64" className="mx-auto h-24 w-24" fill="none" aria-hidden="true">
            <circle cx="32" cy="32" r="28" stroke="#C7F36A" strokeWidth="2.5" strokeOpacity=".4" />
            <path className="draw-check" d="M20 33l9 9 16-19" stroke="#C7F36A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h1 className="font-display mt-6 text-3xl font-bold">Order <span className="font-serifit font-normal text-[#C7F36A]">confirmed</span></h1>
          <p className="mt-3 text-white/60">Thanks, {placed.name}. We're brewing {placed.count} item{placed.count > 1 ? "s" : ""} for {placed.mode.toLowerCase()}.</p>
          <dl className="mt-8 grid grid-cols-3 gap-3 text-left text-sm">
            {[["Order", placed.id], ["Total", inr(placed.total)], ["Ready", placed.slot.split(" (")[0]]].map(([k, v]) => (
              <div key={k} className="glass rounded-2xl p-3">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-white/45">{k}</dt>
                <dd className="mt-1 font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-xs text-white/40">Demo checkout: no payment was taken and no order was sent.</p>
          <a href="#top" className="btn-primary mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.16em] text-[#090D12]">
            Back home <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    );
  }

  if (!lines.length) {
    return (
      <section className="animate-page mx-auto grid min-h-[70vh] max-w-xl place-items-center px-6 pt-32 text-center">
        <div>
          <h1 className="font-display text-2xl font-bold">Nothing to check out yet</h1>
          <a href="#menu" className="btn-primary mt-6 inline-flex rounded-full px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.16em] text-[#090D12]">Browse the menu</a>
        </div>
      </section>
    );
  }

  return (
    <section className="animate-page mx-auto max-w-[1100px] px-4 pb-24 pt-32 sm:px-6">
      <a href="#/cart" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50 hover:text-[#C7F36A]">
        <ArrowLeft className="h-4 w-4" /> Back to tray
      </a>
      <h1 className="font-display mt-5 text-[clamp(1.8rem,4vw,3rem)] font-bold">Check<span className="font-serifit font-normal text-[#C7F36A]">out</span></h1>

      <form onSubmit={submit} noValidate className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="glass space-y-5 rounded-3xl p-6 sm:p-8">
          <div role="radiogroup" aria-label="Order type" className="grid grid-cols-2 gap-2">
            {["Pickup", "Dine-in"].map((m) => (
              <button type="button" role="radio" aria-checked={mode === m} key={m} onClick={() => setMode(m)} className={`rounded-full py-3 text-[12px] font-bold uppercase tracking-[0.16em] transition-all ${mode === m ? "bg-[#C7F36A] text-[#090D12]" : "border border-white/12 text-white/65 hover:text-white"}`}>
                {m}
              </button>
            ))}
          </div>
          <div>
            <label htmlFor="name" className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-white/50">Name</label>
            <input id="name" name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} />
            {errors.name && <p className="mt-1.5 text-xs text-red-300">{errors.name}</p>}
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-white/50">Mobile number</label>
              <input id="phone" name="phone" inputMode="tel" autoComplete="tel" className={field} aria-invalid={!!errors.phone} />
              {errors.phone && <p className="mt-1.5 text-xs text-red-300">{errors.phone}</p>}
            </div>
            <div>
              <label htmlFor="slot" className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-white/50">Ready</label>
              <select id="slot" name="slot" className={field}>{SLOTS.map((s) => <option key={s} className="bg-[#0d131a]">{s}</option>)}</select>
            </div>
          </div>
          <div>
            <label htmlFor="notes" className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-white/50">Notes (optional)</label>
            <textarea id="notes" name="notes" rows={3} placeholder="Oat milk, extra hot, allergies…" className={field} />
          </div>
        </div>

        <aside className="glass-strong h-fit rounded-3xl p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-lg font-semibold">Your order</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {lines.map(({ item, qty }) => (
              <li key={item.id} className="flex justify-between gap-3"><span>{qty} × {item.name}</span><span>{inr(item.price * qty)}</span></li>
            ))}
          </ul>
          <div className="my-5 h-px bg-white/10" />
          <Totals />
          <button className="btn-primary mt-6 flex w-full items-center justify-center gap-2 rounded-full py-4 text-[13px] font-bold uppercase tracking-[0.16em] text-[#090D12]">
            Place order <ArrowUpRight className="h-4 w-4" />
          </button>
        </aside>
      </form>
    </section>
  );
}
