"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface LineRevealProps {
  className?: string;
  color?: string;
  height?: number;
  delay?: number;
}

export function LineReveal({
  className = "",
  color = "currentColor",
  height = 1,
  delay = 0,
}: LineRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { scaleX: 0, transformOrigin: "left center" },
      {
        scaleX: 1,
        ease: "expo.out",
        duration: 1.2,
        delay,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === el) st.kill();
      });
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        height: `${height}px`,
        backgroundColor: color === "currentColor" ? undefined : color,
        background: color === "currentColor" ? "currentColor" : undefined,
        transformOrigin: "left center",
      }}
    />
  );
}
