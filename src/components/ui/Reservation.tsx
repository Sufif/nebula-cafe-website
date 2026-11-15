import { useState } from "react";
import { MapPin, Clock, AtSign, Navigation, CalendarCheck, Users, CheckCircle2, FlaskConical, Phone } from "lucide-react";

const HOURS = [
  ["Mon — Fri", "8:00 AM – 11:00 PM"],
  ["Sat — Sun", "7:00 AM – 11:30 PM"],
  ["Neon Hour", "7 PM onwards · low lights"],
];

export default function Reservation() {
  const [form, setForm] = useState({ name: "", contact: "", date: "", guests: "2", slot: "Evening · 7:30 PM" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.contact.trim() || !form.date) {
      setError("Please add your name, contact and a date so we can hold your orbit.");
      return;
    }
    setError("");
    setSent(true);
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <section id="visit" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_100%,rgba(199,243,106,0.09),transparent_65%)]" />
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="text-center">
          <p data-reveal className="inline-flex items-center gap-2 rounded-full border border-[#C7F36A]/30 bg-[#C7F36A]/[0.07] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C7F36A]">
            <CalendarCheck className="h-3.5 w-3.5" /> 05 — Reservations & Contact
          </p>
          <h2 data-reveal className="font-display mx-auto mt-6 max-w-3xl text-[clamp(1.8rem,4.6vw,3.6rem)] font-bold leading-[1.04]">
            RESERVE YOUR <span className="font-serifit font-normal text-[#C7F36A]">corner</span> OF THE COSMOS.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_1.1fr]">
          {/* info column */}
          <div className="space-y-5">
            <div data-reveal className="glass-strong overflow-hidden rounded-[26px]">
              <div className="relative h-52 overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/16266201/pexels-photo-16266201.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="Atmospheric café interior"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d131a] via-transparent to-transparent" />
                <span className="glass absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-300" /> Portfolio concept
                </span>
              </div>
              <div className="space-y-4 p-6 sm:p-7">
                <div className="flex gap-3.5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#C7F36A]/12 text-[#C7F36A]">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display text-[15px] font-semibold">NEBULA Café — Demo Location</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/55">
                      Ahmedabad, Gujarat · Concept location,
                      <br />
                      Nebula District
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Ahmedabad+Gujarat"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] text-[#090D12]"
                  >
                    <Navigation className="h-3.5 w-3.5" /> Get directions
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white hover:border-[#C7F36A]/50"
                  >
                    <AtSign className="h-3.5 w-3.5 text-[#C7F36A]" /> Demo social profile
                  </a>
                </div>
              </div>
            </div>

            <div data-reveal data-delay="0.1" className="glass grid gap-5 rounded-[26px] p-6 sm:grid-cols-2 sm:p-7">
              <div>
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#C7F36A]">
                  <Clock className="h-3.5 w-3.5" /> Opening hours
                </p>
                <div className="mt-4 space-y-2.5">
                  {HOURS.map(([d, h]) => (
                    <div key={d} className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-white/50">{d}</span>
                      <span className="text-right font-medium text-white/90">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-white/10 pt-5 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#C7F36A]">
                  <Phone className="h-3.5 w-3.5" /> Talk to us
                </p>
                <p className="font-display mt-4 text-lg font-semibold">Demo phone · Replace before launch</p>
                <p className="mt-1 text-sm text-white/55">Demo email · Replace before launch</p>
                <p className="mt-3 text-xs leading-relaxed text-white/40">Demo contact details shown for portfolio presentation only.</p>
              </div>
            </div>
          </div>

          {/* form */}
          <div data-reveal data-delay="0.12" className="glass-strong relative overflow-hidden rounded-[26px] p-6 sm:p-9">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#C7F36A]/15 blur-[70px]" />
            {!sent ? (
              <form onSubmit={submit} className="relative">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-xl font-bold">Book a table</h3>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-200">
                    <FlaskConical className="h-3 w-3" /> Demo — no backend
                  </span>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-white/50">
                  Portfolio demo only. This form does not send or store a real reservation.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">Customer name</span>
                    <input
                      value={form.name}
                      onChange={set("name")}
                      autoComplete="name"
                      required
                      minLength={2}
                      placeholder="Aarav Sharma"
                      className="w-full rounded-2xl border border-white/12 bg-white/[0.05] px-4 py-3.5 text-[15px] text-white placeholder:text-white/30 outline-none transition-all focus:border-[#C7F36A]/70 focus:bg-white/[0.07] focus:shadow-[0_0_0_3px_rgba(199,243,106,0.15)]"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">Email or phone</span>
                    <input
                      value={form.contact}
                      onChange={set("contact")}
                      autoComplete="email"
                      required
                      placeholder="you@email.com / 98765 43210"
                      className="w-full rounded-2xl border border-white/12 bg-white/[0.05] px-4 py-3.5 text-[15px] text-white placeholder:text-white/30 outline-none transition-all focus:border-[#C7F36A]/70 focus:bg-white/[0.07] focus:shadow-[0_0_0_3px_rgba(199,243,106,0.15)]"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">Reservation date</span>
                    <input
                      type="date"
                      required
                      value={form.date}
                      min={(() => { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().split("T")[0]; })()}
                      onChange={set("date")}
                      className="w-full rounded-2xl border border-white/12 bg-white/[0.05] px-4 py-3.5 text-[15px] text-white outline-none transition-all focus:border-[#C7F36A]/70"
                    />
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="block">
                      <span className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
                        <Users className="h-3 w-3" /> Guests
                      </span>
                      <select
                        value={form.guests}
                        onChange={set("guests")}
                        className="w-full appearance-none rounded-2xl border border-white/12 bg-white/[0.05] px-4 py-3.5 text-[15px] outline-none focus:border-[#C7F36A]/70"
                      >
                        {["1", "2", "3", "4", "5", "6", "7", "8+"].map((g) => (
                          <option key={g} value={g} className="bg-[#131b24]">
                            {g}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">Slot</span>
                      <select
                        value={form.slot}
                        onChange={set("slot")}
                        className="w-full appearance-none rounded-2xl border border-white/12 bg-white/[0.05] px-4 py-3.5 text-[15px] outline-none focus:border-[#C7F36A]/70"
                      >
                        {["Morning · 9 AM", "Brunch · 12 PM", "Sunset · 5:30 PM", "Evening · 7:30 PM", "Neon · 9:30 PM"].map((s) => (
                          <option key={s} value={s} className="bg-[#131b24]">
                            {s}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>

                {error && (
                  <p className="mt-4 rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-[13px] text-red-200">{error}</p>
                )}

                <button
                  type="submit"
                  className="btn-primary mt-6 flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#090D12]"
                >
                  <CalendarCheck className="h-4 w-4" /> Request reservation
                </button>
                <p className="mt-3 text-center text-[11px] uppercase tracking-[0.2em] text-white/35">
                  Demo form · No reservation will be submitted
                </p>
              </form>
            ) : (
              <div className="relative flex min-h-[480px] flex-col items-center justify-center text-center">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-[#C7F36A]/15">
                  <CheckCircle2 className="h-10 w-10 text-[#C7F36A]" />
                </span>
                <h3 className="font-display mt-6 text-2xl font-bold">Demo request preview, {form.name.split(" ")[0] || "traveller"}.</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
                  {form.guests} guest(s) · {form.date} · {form.slot}. Sample reference:{" "}
                  <span className="font-mono font-bold text-[#C7F36A]">NBL-{Math.abs((form.name.length * 7919 + form.contact.length * 104729) % 90000 + 10000)}</span>.
                </p>
                <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-amber-200">
                  <FlaskConical className="h-3 w-3" /> Demo mode — connect backend to confirm
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="glass mt-6 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] hover:border-[#C7F36A]/50"
                >
                  Make another request
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
