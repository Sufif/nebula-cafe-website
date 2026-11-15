import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight, ShoppingBag } from "lucide-react";
import Logo from "./Logo";
import { useCart } from "../../store/cart";

const LINKS = [
  { label: "Experience", href: "#experience" },
  { label: "Menu", href: "#menu" },
  { label: "Our Story", href: "#story" },
  { label: "Gallery", href: "#gallery" },
  { label: "Find Us", href: "#visit" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [progress, setProgress] = useState(0);
  const { count, bump } = useCart();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setProgress(max > 0 ? (y / max) * 100 : 0);

        // active section spy
        const ids = ["experience", "menu", "story", "gallery", "visit"];
        let current = "";
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = id;
        }
        setActive(current);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[80] h-[2px] bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-[#C7F36A] via-[#e6ff9f] to-[#C7F36A] transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <header
        className={`fixed inset-x-0 top-[2px] z-[70] transition-all duration-500 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <nav
            className={`flex items-center justify-between gap-4 rounded-2xl px-4 py-3 transition-all duration-500 sm:px-5 ${
              scrolled
                ? "glass-strong shadow-[0_18px_50px_rgba(0,0,0,0.5)]"
                : "border border-transparent bg-transparent"
            }`}
          >
            <a href="#top" aria-label="Nebula Café home"><Logo /></a>

            <div className="hidden items-center gap-7 lg:flex">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className={`link-underline text-[13px] font-medium uppercase tracking-[0.18em] transition-colors ${
                    active === l.href.slice(1) ? "active text-[#C7F36A]" : "text-white/70 hover:text-white"
                  }`}
                >
                  {l.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="mr-1 hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] tracking-[0.18em] text-white/60 xl:flex">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                DEMO CAFÉ · AHMEDABAD
              </span>
              <a
                href="#visit"
                className="btn-primary group hidden items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#090D12] sm:inline-flex"
              >
                Book a Table
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href="#/cart" aria-label={`Open tray, ${count} items`} className="relative grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white transition-colors hover:border-[#C7F36A]/60 hover:text-[#C7F36A]">
                <ShoppingBag className="h-5 w-5" />
                {count > 0 && (
                  <span key={bump} className="animate-pop absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#C7F36A] px-1 text-[11px] font-bold text-[#090D12]">{count}</span>
                )}
              </a>
              <button
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white lg:hidden"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[65] transition-all duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-[#090D12]/80 backdrop-blur-2xl" onClick={() => setOpen(false)} />
        <div
          className={`absolute inset-x-3 top-24 rounded-3xl glass-strong p-6 transition-all duration-500 ${
            open ? "translate-y-0 scale-100 opacity-100" : "-translate-y-6 scale-[0.98] opacity-0"
          }`}
        >
          <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-[#C7F36A]">Navigate the galaxy</p>
          <div className="space-y-1">
            {LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between rounded-2xl px-4 py-4 transition-colors hover:bg-white/[0.06]"
              >
                <span className="font-display text-2xl font-medium text-white/90 group-hover:text-[#C7F36A]">
                  {l.label}
                </span>
                <span className="font-serifit text-lg text-white/30">0{i + 1}</span>
              </a>
            ))}
          </div>
          <a
            href="#visit"
            onClick={() => setOpen(false)}
            className="btn-primary mt-5 flex items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#090D12]"
          >
            Book a Table <ArrowUpRight className="h-4 w-4" />
          </a>
          <p className="mt-4 text-center text-xs tracking-[0.2em] text-white/40">
            AHMEDABAD · PORTFOLIO CONCEPT
          </p>
        </div>
      </div>
    </>
  );
}
