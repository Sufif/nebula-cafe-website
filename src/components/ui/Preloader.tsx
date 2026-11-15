import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { LogoMark } from "./Logo";

export default function Preloader() {
  const skip =
    sessionStorage.getItem("nebula-intro") === "1" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [done, setDone] = useState(skip);
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (done) return;
    document.body.style.overflow = "hidden";
    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("nebula-intro", "1");
        document.body.style.overflow = "";
        setDone(true);
      },
    });
    tl.fromTo(".pl-mark", { scale: 0.3, rotateY: -200, opacity: 0 }, { scale: 1, rotateY: 0, opacity: 1, duration: 1.2, ease: "back.out(1.5)" })
      .fromTo(".pl-word", { y: 26, opacity: 0, letterSpacing: "0.9em" }, { y: 0, opacity: 1, letterSpacing: "0.34em", duration: 0.9, ease: "power3.out" }, "-=0.55")
      .to(counter, {
        v: 100, duration: 1.4, ease: "power2.inOut",
        onUpdate: () => {
          const v = Math.round(counter.v);
          if (num.current) num.current.textContent = String(v).padStart(3, "0");
          if (bar.current) bar.current.style.width = `${v}%`;
        },
      }, 0)
      .to(root.current, { yPercent: -100, duration: 0.95, ease: "power4.inOut" }, "+=0.15");
    return () => { tl.kill(); document.body.style.overflow = ""; };
  }, [done]);

  if (done) return null;
  return (
    <div ref={root} className="starfield fixed inset-0 z-[200] grid place-items-center bg-[#090D12]" style={{ perspective: 900 }}>
      <div className="flex flex-col items-center">
        <div className="pl-mark"><LogoMark size={112} /></div>
        <p className="pl-word font-display mt-7 text-2xl font-extrabold text-[#F6F1E7]">NEBULA</p>
        <div className="mt-8 h-[2px] w-56 overflow-hidden rounded-full bg-white/10">
          <div ref={bar} className="h-full w-0 bg-[#C7F36A]" />
        </div>
        <span ref={num} className="font-display mt-3 text-[11px] tracking-[0.3em] text-white/45">000</span>
      </div>
    </div>
  );
}
