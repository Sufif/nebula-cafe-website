import { ArrowUpRight, Orbit } from "lucide-react";

const TIMELINE = [
  { year: "2023", title: "A garage & a roaster", desc: "An imaginary origin story built around coffee craft, curiosity, and community." },
  { year: "2024", title: "The Araku pact", desc: "A fictional sourcing chapter celebrating Indian coffee-growing regions." },
  { year: "2026", title: "Nebula opens", desc: "The fictional Ahmedabad café concept comes to life with a slow bar and an immersive night-sky atmosphere." },
];

export default function Story() {
  return (
    <section id="story" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_20%,rgba(199,243,106,0.07),transparent_65%)]" />
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* sticky visual */}
          <div className="relative lg:sticky lg:top-28">
            <p data-reveal className="inline-flex items-center gap-2 rounded-full border border-[#C7F36A]/30 bg-[#C7F36A]/[0.07] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C7F36A]">
              <Orbit className="h-3.5 w-3.5" /> 03 — Our Story
            </p>
            <h2 data-reveal className="font-display mt-6 text-[clamp(1.9rem,4.8vw,3.8rem)] font-bold leading-[1.03]">
              WE BELIEVE EVERY DAY CAN FEEL{" "}
              <span className="font-serifit font-normal text-[#C7F36A]">otherworldly.</span>
            </h2>
            <p data-reveal className="mt-6 max-w-md text-[15px] leading-relaxed text-white/60">
              NEBULA is a fictional café concept built around one question — what if a café felt like stepping into orbit? Not cold sci-fi, but warm weightlessness. Slow mornings, glowing evenings, coffee treated like astronomy.
            </p>
            <p data-reveal className="font-serifit mt-5 max-w-md text-xl leading-relaxed text-white/80">
              “We don’t serve cups. We launch small rituals that pull you slightly above the everyday.”
            </p>
            <p data-reveal className="mt-3 text-xs uppercase tracking-[0.24em] text-white/40">— The NEBULA concept team</p>

            <div data-reveal className="mt-8 grid max-w-md grid-cols-3 gap-3">
              {[
                ["01", "Café concept"],
                ["09", "Brew methods"],
                ["∞", "Coffee moments"],
              ].map(([n, l]) => (
                <div key={l} className="glass rounded-2xl p-4 text-center">
                  <p className="font-display text-2xl font-bold text-[#C7F36A]">{n}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/50">{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* images + timeline */}
          <div className="space-y-5">
            <div data-reveal className="card-shine group relative overflow-hidden rounded-[28px] border border-white/10">
              <img
                src="https://images.pexels.com/photos/4353571/pexels-photo-4353571.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Pouring espresso at Nebula"
                loading="lazy"
                className="h-[320px] w-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.05] sm:h-[420px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090D12]/70 via-transparent to-transparent" />
              <div data-parallax="8" className="glass absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl px-5 py-4 sm:right-auto sm:gap-10">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#C7F36A]">Concept coffee bar</p>
                  <p className="font-display mt-1 text-sm font-semibold">Specialty coffee · imagined experience</p>
                </div>
                <ArrowUpRight className="hidden h-5 w-5 text-white/50 sm:block" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div data-reveal className="card-shine group overflow-hidden rounded-[24px] border border-white/10">
                <img
                  src="https://images.pexels.com/photos/8936985/pexels-photo-8936985.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="Coffee beans"
                  loading="lazy"
                  className="h-[220px] w-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.08] sm:h-[260px]"
                />
              </div>
              <div data-reveal data-delay="0.12" className="glass-lime flex flex-col justify-center rounded-[24px] p-6">
                <p className="font-display text-4xl font-black text-[#C7F36A]">∞</p>
                <p className="mt-2 text-sm leading-relaxed text-white/70">coffee moments waiting to happen.</p>
              </div>
            </div>

            <div data-stagger className="glass-strong rounded-[24px] p-6 sm:p-7">
              {TIMELINE.map((t, i) => (
                <div key={t.year} data-stagger-item className={`flex gap-5 ${i !== TIMELINE.length - 1 ? "border-b border-white/10 pb-5 mb-5" : ""}`}>
                  <span className="font-display shrink-0 rounded-full border border-[#C7F36A]/30 bg-[#C7F36A]/10 px-3 py-1 text-xs font-bold text-[#C7F36A]">{t.year}</span>
                  <div>
                    <p className="font-display text-[15px] font-semibold">{t.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/55">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
