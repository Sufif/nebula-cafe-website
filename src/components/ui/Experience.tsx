import { Coffee, Armchair, FlaskConical, ArrowUpRight } from "lucide-react";

const CARDS = [
  {
    icon: Coffee,
    title: "The Brew Bar",
    desc: "Nine origins, three brew labs, one slow bar. Watch extraction become theatre.",
    meta: "V60 · Syphon · Espresso",
  },
  {
    icon: Armchair,
    title: "The Interior",
    desc: "Obsidian oak, lunar concrete, neon dusk — 120 seats across three gravity zones.",
    meta: "Deck · Pod · Window Orbit",
  },
  {
    icon: FlaskConical,
    title: "Curious Creations",
    desc: "Lime-mist lattes, yuzu cold brews, desserts plated like constellations.",
    meta: "New drops monthly",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden py-24 sm:py-32">
      <div className="orb left-[-160px] top-[20%] h-[420px] w-[420px] bg-[#C7F36A]/[0.07]" />
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        {/* heading */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p data-reveal className="inline-flex items-center gap-2 rounded-full border border-[#C7F36A]/30 bg-[#C7F36A]/[0.07] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C7F36A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C7F36A]" /> 01 — The Experience
            </p>
            <h2 data-reveal className="font-display mt-6 text-[clamp(1.8rem,4.6vw,3.6rem)] font-bold leading-[1.04] tracking-tight">
              NOT JUST A COFFEE STOP.
              <br />
              <span className="text-white/40">YOUR NEW FAVOURITE</span>{" "}
              <span className="font-serifit font-normal text-[#C7F36A]">orbit.</span>
            </h2>
          </div>
          <p data-reveal className="max-w-sm text-[15px] leading-relaxed text-white/55">
            Step inside a space that behaves like a planet — warm core, glowing rings, quiet corners to drift into. Every detail is designed for lingering.
          </p>
        </div>

        {/* overlapping imagery */}
        <div className="mt-14 grid grid-cols-12 gap-4 sm:gap-5">
          <div data-reveal className="card-shine group relative col-span-12 overflow-hidden rounded-[28px] border border-white/10 sm:col-span-7 sm:row-span-2">
            <img
              src="https://images.pexels.com/photos/31206741/pexels-photo-31206741.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Nebula main deck interior"
              loading="lazy"
              className="h-[380px] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06] sm:h-[560px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090D12]/85 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
              <div className="glass rounded-2xl px-5 py-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#C7F36A]">Zone 01</p>
                <p className="font-display mt-1 text-lg font-semibold">The Main Deck</p>
                <p className="mt-1 text-xs text-white/55">Communal oak · obsidian bar · low neon</p>
              </div>
              <span className="glass hidden h-12 w-12 place-items-center rounded-full transition-colors group-hover:bg-[#C7F36A] group-hover:text-black sm:grid">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </div>
          </div>

          <div data-reveal data-delay="0.1" className="card-shine group relative col-span-6 overflow-hidden rounded-[28px] border border-white/10 sm:col-span-5">
            <img
              src="https://images.pexels.com/photos/13735913/pexels-photo-13735913.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Barista pouring latte art"
              loading="lazy"
              className="h-[220px] w-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.07] sm:h-[268px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090D12]/80 to-transparent" />
            <span className="glass absolute bottom-4 left-4 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.2em]">Brew Rituals</span>
          </div>

          <div data-reveal data-delay="0.18" className="card-shine group relative col-span-6 overflow-hidden rounded-[28px] border border-white/10 sm:col-span-5">
            <img
              src="https://images.pexels.com/photos/302893/pexels-photo-302893.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Espresso machine detail"
              loading="lazy"
              className="h-[220px] w-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.07] sm:h-[268px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090D12]/80 to-transparent" />
            <span className="glass absolute bottom-4 left-4 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.2em]">Engine Room</span>
          </div>
        </div>

        {/* glass info cards */}
        <div data-stagger className="mt-5 grid gap-4 sm:gap-5 md:grid-cols-3">
          {CARDS.map((c) => (
            <div
              key={c.title}
              data-stagger-item
              className="glass group rounded-[24px] p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#C7F36A]/40 hover:shadow-[0_24px_60px_rgba(199,243,106,0.12)]"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#C7F36A]/12 text-[#C7F36A] transition-all duration-500 group-hover:bg-[#C7F36A] group-hover:text-black">
                  <c.icon className="h-5 w-5" />
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/45">{c.meta}</span>
              </div>
              <h3 className="font-display mt-5 text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* marquee */}
        <div className="mask-fade-x mt-14 overflow-hidden border-y border-white/10 py-5">
          <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
            {[0, 1].map((k) => (
              <div key={k} className="flex gap-10" aria-hidden={k === 1}>
                {["SINGLE ORIGIN", "SLOW BAR", "NEON HOUR", "ORBITAL LATTE", "ZERO-G BREW", "MOON-DUST DESSERTS", "VINYL MORNINGS"].map((w) => (
                  <span key={w + k} className="font-display flex items-center gap-10 text-sm tracking-[0.24em] text-white/45">
                    {w} <span className="h-1.5 w-1.5 rounded-full bg-[#C7F36A]" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
