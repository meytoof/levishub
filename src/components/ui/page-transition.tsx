"use client";

import gsap from "gsap";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const CLOSE_DURATION = 0.7;
const OPEN_DURATION = 0.7;

// Formes de la vague pour l'animation
const CLOSE_SHAPES = [
  "M 0 100 V 100 Q 50 100 100 100 V 100 z", // bande bas
  "M 0 100 V 70 Q 50 40 100 70 V 100 z", // vague milieu
  "M 0 100 V 30 Q 50 0 100 30 V 100 z", // vague haute
  "M 0 100 V 0 Q 50 0 100 0 V 100 z", // plein écran
] as const;

const OPEN_SHAPES = [
  "M 0 100 V 0 Q 50 0 100 0 V 100 z", // plein écran
  "M 0 100 V 30 Q 50 0 100 30 V 100 z", // vague haute
  "M 0 100 V 70 Q 50 40 100 70 V 100 z", // vague milieu
  "M 0 100 V 100 Q 50 100 100 100 V 100 z", // bande bas
] as const;

export const PageTransition = () => {
  const pathRef = useRef<SVGPathElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Route cible et état de fermeture
  const pendingPathRef = useRef<string | null>(null);
  const isClosingRef = useRef(false);

  // Phase 1 : fermeture + navigation quand l'écran est couvert
  useEffect(() => {
    if (!pathRef.current) return;

    (window as any).startPageTransition = (to: string) => {
      // Si on est déjà sur cette route, ne rien faire
      if (to === pathname) {
        return;
      }

      if (!pathRef.current) {
        router.push(to);
        return;
      }

      const path = pathRef.current;
      pendingPathRef.current = to;
      isClosingRef.current = true;

      gsap.killTweensOf(path);

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        onComplete: () => {
          // écran couvert : navigation
          router.push(to);
        },
      });

      // Position de départ
      tl.set(path, { attr: { d: CLOSE_SHAPES[0] } });

      // interpolation fluide à travers les formes de fermeture
      tl.to(path, {
        duration: CLOSE_DURATION,
        keyframes: CLOSE_SHAPES.slice(1).map((d) => ({
          attr: { d },
        })),
      });
    };

    return () => {
      if ((window as any).startPageTransition) {
        delete (window as any).startPageTransition;
      }
    };
  }, [router, pathname]);

  // Phase 2 : réouverture quand la nouvelle route est active
  useEffect(() => {
    const target = pendingPathRef.current;
    if (!pathRef.current || !target) return;
    if (!isClosingRef.current) return;

    if (pathname !== target) return;

    const path = pathRef.current;
    isClosingRef.current = false;
    pendingPathRef.current = null;

    gsap.killTweensOf(path);

    const tl = gsap.timeline({ defaults: { ease: "none" } });

    tl.set(path, { attr: { d: OPEN_SHAPES[0] } });

    tl.to(path, {
      duration: OPEN_DURATION,
      keyframes: OPEN_SHAPES.slice(1).map((d) => ({
        attr: { d },
      })),
    });
  }, [pathname]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      <svg
        className="transition"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMin slice"
      >
        <defs>
          {/* Gradient light: bleu/cyan, comme la navbar-logo en light */}
          <linearGradient
            id="grad-light"
            x1="0"
            y1="0"
            x2="99"
            y2="99"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.0" stopColor="#67e8f9" />
            <stop offset="0.5" stopColor="#22d3ee" />
            <stop offset="1.0" stopColor="#06b6d4" />
          </linearGradient>

          {/* Gradient dark: violet → rose → rouge, comme navbar-logo en dark */}
          <linearGradient
            id="grad-dark"
            x1="0"
            y1="0"
            x2="99"
            y2="99"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.0" stopColor="#a855f7" />
            <stop offset="0.5" stopColor="#ec4899" />
            <stop offset="1.0" stopColor="#f43f5e" />
          </linearGradient>
        </defs>
        {/* On utilise grad-light par défaut, et on bascule sur grad-dark en CSS pour html.dark */}
        <path
          ref={pathRef}
          className="page-transition-path"
          stroke="url(#grad-light)"
          fill="url(#grad-light)"
          strokeWidth="2px"
          vectorEffect="non-scaling-stroke"
          d={CLOSE_SHAPES[0]}
        />
      </svg>
    </div>
  );
};
