"use client";
import { useRef, useCallback } from "react";
import gsap from "gsap";

export function useMagnetic(strength = 0.3) {
  const ref = useRef<HTMLElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    gsap.to(el, { x, y, ease: "power3.out", duration: 0.6 });
  }, [strength]);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, ease: "elastic.out(1, 0.3)", duration: 0.8 });
  }, []);

  return { ref, handlers: { onMouseMove, onMouseLeave } };
}
