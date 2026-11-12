"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { runWhenIdle } from "@/lib/run-when-idle";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    // Lenis n'est utile qu'au premier scroll : on l'initialise après le
    // premier rendu, quand le navigateur est libre.
    let lenis: Lenis | undefined;
    let tickerFn: ((time: number) => void) | undefined;

    const cancelIdle = runWhenIdle(() => {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: false,
    });

    window.__lenis = lenis;

    // Correct Lenis + GSAP ScrollTrigger integration
    lenis.on("scroll", ScrollTrigger.update);

    // Use GSAP ticker as the driver
    const l = lenis;
    tickerFn = (time: number) => {
      l.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);
    }, 800);

    return () => {
      cancelIdle();
      lenis?.destroy();
      if (tickerFn) gsap.ticker.remove(tickerFn);
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
