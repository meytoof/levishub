"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Correct Lenis + GSAP ScrollTrigger integration
    lenis.on("scroll", ScrollTrigger.update);

    lenis.on("scroll", ({ velocity }: { velocity: number }) => {
      const skewTargets = document.querySelectorAll(".lenis-skew");
      if (skewTargets.length > 0) {
        gsap.to(".lenis-skew", {
          skewY: velocity * 0.05,
          ease: "power3",
          overwrite: true,
          duration: 0.4,
        });
      }
    });

    // Use GSAP ticker as the driver
    const tickerFn = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerFn);
    };
  }, []);

  return <>{children}</>;
}
