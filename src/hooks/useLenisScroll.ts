import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Butter-smooth wheel / touch scrolling via Lenis,
 * kept in perfect sync with GSAP ScrollTrigger.
 */
export function useLenisScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      // Slightly longer + exponential ease = very smooth, never "floaty"
      duration: 1.35,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -11 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.15,
      // Infinite lerp feel on mobile
      syncTouch: true,
      syncTouchLerp: 0.075,
      touchInertiaMultiplier: 28,
      anchors: true,
      autoResize: true,
      // Prevent over-scroll bounce fighting with native
      prevent: (node) => node.classList?.contains("lenis-prevent") ?? false,
    });

    lenisRef.current = lenis;

    // Keep ScrollTrigger perfectly in sync
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker (same clock as all animations)
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    // Disable lag smoothing so scroll never stutters after a long frame
    gsap.ticker.lagSmoothing(0);

    // Soft-refresh triggers after fonts / images settle
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = window.setTimeout(refresh, 600);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, []);

  return lenisRef;
}
