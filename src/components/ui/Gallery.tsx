import { Images, Expand } from "lucide-react";
import { GALLERY } from "../../data/content";

export default function Gallery() {
  return (
    <section id="gallery" className="relative overflow-hidden py-24 sm:py-32">
      <div className="orb left-1/2 top-0 h-[360px] w-[720px] -translate-x-1/2 bg-[#C7F36A]/[0.06]" />
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p data-reveal className="inline-flex items-center gap-2 rounded-full border border-[#C7F36A]/30 bg-[#C7F36A]/[0.07] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C7F36A]">
              <Images className="h-3.5 w-3.5" /> 04 — Gallery
            </p>
            <h2 data-reveal className="font-display mt-6 text-[clamp(1.8rem,4.6vw,3.6rem)] font-bold leading-[1.04]">
              POSTCARDS <span className="text-white/35">FROM</span> <span className="font-serifit font-normal text-[#C7F36A]">the deck.</span>
            </h2>
          </div>
          <p data-reveal className="max-w-sm text-[15px] leading-relaxed text-white/55">
            Shot on quiet mornings and neon nights. Hover to drift closer — every corner has its own gravity.
          </p>
        </div>

        <div data-stagger className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-4 lg:grid-cols-4">
          {GALLERY.map((g, i) => {
            const cls =
              g.span === "tall"
                ? "row-span-2"
                : g.span === "wide"
                  ? "col-span-2"
                  : "";
            const tall = g.span === "tall";
            return (
              <figure
                key={g.label + i}
                data-stagger-item
                data-parallax={i % 2 === 0 ? "4" : "-4"}
                className={`card-shine group relative overflow-hidden rounded-[22px] border border-white/10 ${cls}`}
              >
                <img
                  src={g.img}
                  alt={g.label}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-[1.1] ${tall ? "h-full" : "h-full"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090D12]/85 via-[#090D12]/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="glass absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <Expand className="h-4 w-4 text-[#C7F36A]" />
                </span>
                <figcaption className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="inline-block rounded-full border border-[#C7F36A]/40 bg-[#090D12]/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C7F36A] backdrop-blur-md">
                    {g.label}
                  </span>
                  <p className="mt-2 text-xs text-white/60">{g.sub}</p>
                </figcaption>
              </figure>
            );
          })}

          {/* CTA tile */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            data-stagger-item
            className="group relative flex flex-col justify-between overflow-hidden rounded-[22px] bg-gradient-to-br from-[#C7F36A] to-[#8fd63f] p-5 text-[#090D12]"
          >
            <p className="font-display text-lg font-bold leading-tight">@nebula.cafe</p>
            <p className="font-serifit text-xl">daily orbits, stories & drops →</p>
            <span className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-[#090D12] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#C7F36A] transition-transform group-hover:scale-105">
              Follow along
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
