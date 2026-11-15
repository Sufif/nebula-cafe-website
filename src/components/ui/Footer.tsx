import { ArrowUp, AtSign, MapPin } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 pt-16">
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_120%,rgba(199,243,106,0.1),transparent_60%)]" />
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" aria-label="Nebula Café home"><Logo /></a>
            <p className="font-serifit mt-4 text-2xl text-white/70">A little out of this world.</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/45">
              Specialty coffee, curious creations and cinematic evenings.
            </p>
            <p className="mt-5 text-xs leading-relaxed text-white/40">Social profile links will be added when the café's official accounts are created.</p>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#C7F36A]">Explore</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/60">
              {[
                ["Experience", "#experience"],
                ["Menu", "#menu"],
                ["Our Story", "#story"],
                ["Gallery", "#gallery"],
                ["Find Us", "#visit"],
              ].map(([l, h]) => (
                <li key={h}>
                  <a href={h} className="link-underline hover:text-white">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#C7F36A]">Visit</p>
            <p className="mt-4 flex gap-2 text-sm leading-relaxed text-white/60">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C7F36A]" />
              Ahmedabad, Gujarat · Concept location
            </p>
            <p className="mt-3 text-sm text-white/60">Demo contact · Replace before launch</p>
            <p className="text-sm text-white/60">Demo email · Replace before launch</p>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#C7F36A]">Hours</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/60">
              <li className="flex justify-between gap-3">
                <span>Mon – Fri</span>
                <span className="text-white/90">8:00 AM – 11:00 PM</span>
              </li>
              <li className="flex justify-between gap-3">
                <span>Sat – Sun</span>
                <span className="text-white/90">7:00 AM – 11:30 PM</span>
              </li>
              <li className="mt-3 rounded-2xl border border-[#C7F36A]/25 bg-[#C7F36A]/[0.07] p-3 text-[13px] leading-relaxed text-white/70">
                Sample opening hours for this portfolio concept. Confirm actual hours before launch.
              </li>
            </ul>
          </div>
        </div>

        {/* giant wordmark */}
        <div className="pointer-events-none mt-14 select-none overflow-hidden" aria-hidden>
          <p className="font-display whitespace-nowrap text-center text-[clamp(3.5rem,14vw,11rem)] font-black leading-[0.9] tracking-tight text-white/[0.06]">
            NEBULA
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-[11px] uppercase tracking-[0.22em] text-white/35 sm:flex-row">
          <p>© 2026 Nebula Café · Crafted beyond orbit</p>
          <p className="inline-flex items-center gap-1.5">
            <AtSign className="h-3.5 w-3.5" /> nebula.cafe
          </p>
          <a href="#top" className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-white/60 hover:text-[#C7F36A]">
            Back to top <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
