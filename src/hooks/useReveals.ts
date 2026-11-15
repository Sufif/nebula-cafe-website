import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGlobalReveals(dep?: unknown) {
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        (el as HTMLElement).style.opacity = "1";
        (el as HTMLElement).style.transform = "none";
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const delay = parseFloat(el.dataset.delay || "0");
        const y = parseFloat(el.dataset.y || "28");
        gsap.fromTo(
          el,
          { y, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            delay,
            ease: "power3.out",
            force3D: true,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              once: true,
              fastScrollEnd: true,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "10");
        gsap.to(el, {
          yPercent: speed,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: el.closest("section") || el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((parent) => {
        const items = parent.querySelectorAll("[data-stagger-item]");
        if (!items.length) return;
        gsap.fromTo(
          items,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.07,
            ease: "power3.out",
            force3D: true,
            scrollTrigger: {
              trigger: parent,
              start: "top 85%",
              once: true,
              fastScrollEnd: true,
            },
          }
        );
      });
    });

    ctxRef.current = ctx;
    const onRefresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", onRefresh);
    return () => {
      window.removeEventListener("load", onRefresh);
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [dep]);
}

export function refreshTriggers() {
  setTimeout(() => ScrollTrigger.refresh(), 120);
}
