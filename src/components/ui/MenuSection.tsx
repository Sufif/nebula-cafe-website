import { useMemo, useState } from "react";
import { Star, Plus, Flame } from "lucide-react";
import { MENU_ITEMS, type MenuCategory } from "../../data/content";
import { refreshTriggers } from "../../hooks/useReveals";
import { useCart } from "../../store/cart";

const FILTERS: Array<"All" | MenuCategory> = ["All", "Coffee", "Cold Drinks", "Desserts", "Bakery"];

export default function MenuSection() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [added, setAdded] = useState<string | null>(null);
  const cart = useCart();

  const items = useMemo(
    () => (filter === "All" ? MENU_ITEMS : MENU_ITEMS.filter((i) => i.category === filter)),
    [filter]
  );

  const pick = (f: (typeof FILTERS)[number]) => {
    setFilter(f);
    refreshTriggers();
  };

  const add = (id: string) => {
    cart.add(id);
    setAdded(id);
    setTimeout(() => setAdded(null), 1400);
  };

  const tilt = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`;
  };
  const untilt = (e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.style.transform = "";
  };

  return (
    <section id="menu" className="relative overflow-hidden py-24 sm:py-32">
      <div className="orb right-[-160px] top-[10%] h-[460px] w-[460px] bg-[#b478ff]/[0.08]" />
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p data-reveal className="inline-flex items-center gap-2 rounded-full border border-[#C7F36A]/30 bg-[#C7F36A]/[0.07] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C7F36A]">
              <Flame className="h-3.5 w-3.5" /> 02 — Transmission Menu
            </p>
            <h2 data-reveal className="font-display mt-6 max-w-2xl text-[clamp(1.8rem,4.6vw,3.6rem)] font-bold leading-[1.04]">
              FUEL FOR <span className="font-serifit font-normal text-[#C7F36A]">deep space</span>
              <br />
              <span className="text-white/40">THINKING.</span>
            </h2>
          </div>
          <p data-reveal className="max-w-sm text-[15px] leading-relaxed text-white/55">
            Fourteen signatures, zero fillers. Roasted in-house, priced in rupees, plated like small galaxies.
          </p>
        </div>

        {/* filters */}
        <div data-reveal className="mt-10 flex flex-wrap gap-2.5">
          {FILTERS.map((f) => {
            const active = filter === f;
            const count = f === "All" ? MENU_ITEMS.length : MENU_ITEMS.filter((i) => i.category === f).length;
            return (
              <button
                key={f}
                onClick={() => pick(f)}
                className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                  active
                    ? "bg-[#C7F36A] text-[#090D12] shadow-[0_12px_36px_rgba(199,243,106,0.3)]"
                    : "glass text-white/65 hover:border-[#C7F36A]/40 hover:text-white"
                }`}
              >
                {f}
                <span className={`rounded-full px-1.5 text-[11px] ${active ? "bg-black/15" : "bg-white/10 text-white/50"}`}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* grid */}
        <div key={filter} data-stagger className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <article
              key={item.id}
              data-stagger-item
              onPointerMove={tilt}
              onPointerLeave={untilt}
              className="glass group card-shine flex flex-col overflow-hidden rounded-[24px] transition-all duration-500 hover:-translate-y-2 hover:border-[#C7F36A]/40 hover:shadow-[0_28px_70px_rgba(0,0,0,0.55),0_0_0_1px_rgba(199,243,106,0.2)]"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.1] group-hover:rotate-[0.5deg]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d131a]/70 via-transparent to-transparent" />
                <div className="absolute left-3 top-3 flex gap-2">
                  <span className="rounded-full bg-[#090D12]/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                    {item.category}
                  </span>
                  {item.tag && (
                    <span className="rounded-full bg-[#C7F36A] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#090D12]">
                      {item.tag}
                    </span>
                  )}
                </div>
                <span className="glass absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold">
                  <Star className="h-3 w-3 fill-[#C7F36A] text-[#C7F36A]" /> {item.rating.toFixed(1)}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-[15px] font-semibold leading-snug">{item.name}</h3>
                  <p className="font-display whitespace-nowrap text-[15px] font-bold text-[#C7F36A]">₹{item.price}</p>
                </div>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-white/55">{item.desc}</p>
                <button
                  onClick={() => add(item.id)}
                  className={`mt-4 inline-flex items-center justify-center gap-2 rounded-full py-2.5 text-[12px] font-bold uppercase tracking-[0.16em] transition-all duration-300 ${
                    added === item.id
                      ? "bg-[#C7F36A] text-[#090D12]"
                      : "border border-white/12 bg-white/[0.05] text-white/80 hover:border-[#C7F36A]/60 hover:bg-[#C7F36A]/10 hover:text-[#C7F36A]"
                  }`}
                >
                  <Plus className={`h-4 w-4 transition-transform duration-300 ${added === item.id ? "rotate-45" : "group-hover:rotate-90"}`} />
                  {added === item.id ? "Added to tray" : "Add to tray"}
                </button>
              </div>
            </article>
          ))}
        </div>

        <p data-reveal className="mt-8 text-center text-xs uppercase tracking-[0.24em] text-white/35">
          All prices inclusive of taxes · Oat / almond milk +₹40 · Beans retail from ₹520
        </p>
      </div>
    </section>
  );
}
