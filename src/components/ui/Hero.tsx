import { Suspense, lazy, useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight, Star, Thermometer, Sparkles, Play } from "lucide-react";
import gsap from "gsap";

const HeroCanvas = lazy(() => import("./HeroCanvas"));

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(".hero-line", { yPercent: 110 }, { yPercent: 0, duration: 1.2, stagger: 0.12 }, 0.2)
        .fromTo(".hero-fade", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.1 }, 0.8)
        .fromTo(".hero-chip", { y: 18, opacity: 0, scale: 0.94 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12 }, 1.0);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="top" className="relative flex min-h-[108vh] flex-col overflow-hidden">
      {/* bg layers */}
      <div className="starfield absolute inset-0 opacity-90" />
      <div className="animate-gradient-pan absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_0%,rgba(199,243,106,0.14),transparent_60%),radial-gradient(70%_50%_at_15%_35%,rgba(90,140,255,0.14),transparent_60%),radial-gradient(70%_55%_at_85%_30%,rgba(180,120,255,0.12),transparent_60%),radial-gradient(80%_60%_at_50%_100%,rgba(199,243,106,0.07),transparent_60%)]" />
      <div className="orb left-[-120px] top-[12%] h-[420px] w-[420px] bg-[#C7F36A]/[0.13]" />
      <div className="orb right-[-140px] top-[30%] h-[520px] w-[520px] bg-[#5a8cff]/[0.12]" />
      <div className="orb bottom-[-160px] left-[30%] h-[380px] w-[600px] bg-[#b478ff]/[0.09]" />

      {/* 3D */}
      <div className="absolute inset-0 top-[6%] sm:top-[2%]">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C7F36A]/[0.09] blur-[110px] sm:h-[560px] sm:w-[560px]" />
        {/* css orbit guides */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
          <div className="orbit-ring animate-spin-slowest h-[560px] w-[560px]" />
          <div className="orbit-ring lime animate-spin-slower absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2" />
          <div className="orbit-ring animate-spin-rev absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 opacity-60" />
        </div>
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#090D12] to-transparent" />
      </div>

      {/* content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col items-center px-4 pt-[132px] text-center sm:px-6 sm:pt-[150px]">
        <div className="hero-fade glass inline-flex items-center gap-2.5 rounded-full py-2 pl-2 pr-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C7F36A] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#090D12]">
            <Sparkles className="h-3 w-3" /> Est. 2026
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/70 sm:text-xs">
            Specialty Coffee Lab
          </span>
        </div>

        <h1 className="font-display mt-7 max-w-5xl text-[clamp(2.4rem,8.5vw,6.2rem)] font-extrabold leading-[0.98] tracking-tight">
          <span className="block overflow-hidden pb-1">
            <span className="hero-line block">A LITTLE <span className="font-serifit font-normal text-[#C7F36A]">out of</span></span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span className="hero-line block">THIS <span className="text-stroke">WORLD</span><span className="text-[#C7F36A]">.</span></span>
          </span>
        </h1>

        <p className="hero-fade mt-6 max-w-xl text-balance text-[15px] leading-relaxed text-white/65 sm:text-lg">
          Coffee, conversations and curious creations. Discover a new kind of café experience.
        </p>

        <div className="hero-fade mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href="#menu"
            className="btn-primary group inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-[#090D12] shadow-[0_18px_50px_rgba(199,243,106,0.28)]"
          >
            Explore Menu
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </a>
          <a
            href="#story"
            className="glass group inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-all hover:border-[#C7F36A]/50 hover:bg-white/[0.08]"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 transition-colors group-hover:bg-[#C7F36A] group-hover:text-black">
              <Play className="h-3 w-3 fill-current" />
            </span>
            Discover Nebula
          </a>
        </div>

        {/* floating glass UI */}
        <div className="pointer-events-none relative z-10 mt-10 hidden w-full max-w-5xl items-start justify-between lg:flex">
          <div className="hero-chip glass animate-float pointer-events-auto w-[240px] rounded-2xl p-4 text-left">
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#C7F36A]">Now pouring</p>
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-[#C7F36A] text-[#C7F36A]" />
                ))}
              </span>
            </div>
            <p className="font-display mt-2 text-sm font-semibold">ARAKU VALLEY · 92 PTS</p>
            <p className="mt-1 text-xs leading-relaxed text-white/55">Single origin, honey-processed. Notes of lime leaf & jaggery.</p>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-[#C7F36A] to-emerald-300" />
            </div>
          </div>

          <div className="hero-chip glass animate-float-soft pointer-events-auto w-[230px] rounded-2xl p-4 text-left [animation-delay:1.2s]">
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/60">Signature</p>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#C7F36A]/15 px-2 py-0.5 text-[11px] text-[#C7F36A]">
                <Thermometer className="h-3 w-3" /> 62°C
              </span>
            </div>
            <p className="font-display mt-2 text-sm font-semibold">ORBITAL LATTE — ₹340</p>
            <p className="mt-1 text-xs text-white/55">Double ristretto · silk milk · lime mist</p>
          </div>
        </div>

        {/* mobile chips */}
        <div className="hero-fade mt-8 flex gap-2 lg:hidden">
          <span className="glass rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-[#C7F36A]">92 pts · Araku</span>
          <span className="glass rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-white/70">Orbital Latte ₹340</span>
        </div>
      </div>

      {/* bottom meta + scroll */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] items-end justify-between px-4 pb-10 sm:px-6">
        <div className="hero-fade hidden gap-8 sm:flex">
          {[
            ["18", "Single origins"],
            ["42K", "Cups in orbit"],
            ["4.9", "Guest rating"],
          ].map(([n, l]) => (
            <div key={l}>
              <p className="font-display text-2xl font-bold text-white">{n}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-white/45">{l}</p>
            </div>
          ))}
        </div>

        <a href="#experience" className="hero-fade group mx-auto flex flex-col items-center gap-3 sm:mx-0">
          <span className="text-[10px] uppercase tracking-[0.34em] text-white/50 group-hover:text-[#C7F36A]">Scroll to enter orbit</span>
          <span className="glass grid h-12 w-7 place-items-start justify-center rounded-full p-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#C7F36A] [animation:scroll-dot_1.8s_ease-in-out_infinite]" />
          </span>
          <ArrowDown className="h-4 w-4 animate-bounce text-white/40" />
        </a>

        <div className="hero-fade hidden text-right sm:block">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">Coordinates</p>
          <p className="font-display mt-1 text-sm text-[#C7F36A]">23.0338° N · 72.5081° E</p>
        </div>
      </div>
    </section>
  );
}
