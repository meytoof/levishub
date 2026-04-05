"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";
import { SplitHeading } from "./split-heading";
import { MagneticButton } from "./magnetic-button";
import { ServicesMockupVitrine } from "./services-mockup-vitrine";
import { ServicesMockupEcommerce } from "./services-mockup-ecommerce";
import { ServicesMockupBackoffice } from "./services-mockup-backoffice";
import { ServicesMockupMaintenance } from "./services-mockup-maintenance";

type Panel = {
  id: number;
  number?: string;
  title?: string;
  description?: string;
  features?: string[];
  accent: string;
  bg: string;
  bgLight: string;
  counter?: { value: number; label: string };
};

const panels: Panel[] = [
  { id: 0, accent: "#ffffff", bg: "#050505", bgLight: "#fafafa" },
  {
    id: 1, number: "01", title: "Site Vitrine",
    description: "Une présence digitale qui convertit. Design sur mesure, performance optimisée, identité forte.",
    features: ["Design personnalisé", "Optimisation SEO", "Responsive mobile", "Livraison 4 semaines"],
    accent: "#06b6d4", bg: "#020a0f", bgLight: "#f0f9fb",
  },
  {
    id: 2, number: "02", title: "E-commerce",
    description: "Votre boutique en ligne pensée pour vendre. UX fluide, paiement sécurisé, gestion simplifiée.",
    features: ["Catalogue illimité", "Paiement sécurisé", "Gestion des stocks", "Analytics avancés"],
    accent: "#a855f7", bg: "#08020f", bgLight: "#faf5ff",
    counter: { value: 3, label: "× votre CA moyen" },
  },
  {
    id: 3, number: "03", title: "Backoffice",
    description: "Gérez votre activité depuis un tableau de bord sur mesure. Efficacité et clarté.",
    features: ["Dashboard custom", "Gestion utilisateurs", "Rapports en temps réel", "API RESTful"],
    accent: "#34d399", bg: "#02090a", bgLight: "#f0fdf9",
  },
  {
    id: 4, number: "04", title: "Maintenance",
    description: "Votre site entre de bonnes mains. Mises à jour, sécurité, monitoring 24/7.",
    features: ["Updates régulières", "Backup quotidien", "Support prioritaire", "Monitoring 24/7"],
    accent: "#f59e0b", bg: "#0a0700", bgLight: "#fffbf0",
  },
];

export function ServicesSlidesPinning() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [openAccordion, setOpenAccordion] = useState<number | null>(1);
  const [isMobile, setIsMobile] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const bg = (p: Panel) => (isDark ? p.bg : p.bgLight);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || isMobile) return;
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let ctx: gsap.Context | null = null;

    const initScrollTrigger = () => {
      if (ctx) ctx.revert();

      ctx = gsap.context(() => {
        // ----------------------------------------------------------------
        // Tween principal : scroll horizontal
        // Scrub: true (pas de valeur numérique) pour éviter le double-
        // smoothing avec Lenis qui lisse déjà le scroll.
        // ----------------------------------------------------------------
        const horizontalTween = gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // ----------------------------------------------------------------
        // Panel 0 — Intro : parallax exit
        // ----------------------------------------------------------------
        gsap.to(".p0-subtitle", {
          y: -60,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".panel-0",
            containerAnimation: horizontalTween,
            start: "left 80%",
            end: "left 20%",
            scrub: true,
          },
        });

        gsap.to(".p0-scroll-hint", {
          opacity: 0,
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: ".panel-0",
            containerAnimation: horizontalTween,
            start: "left 95%",
            end: "left 60%",
            scrub: true,
          },
        });

        gsap.to(".p0-gradient", {
          scale: 2.2,
          ease: "none",
          scrollTrigger: {
            trigger: ".panel-0",
            containerAnimation: horizontalTween,
            start: "left 100%",
            end: "left 0%",
            scrub: true,
          },
        });

        // ----------------------------------------------------------------
        // Panel 1 — Site Vitrine : 3D slide-in from right
        // ----------------------------------------------------------------

        // Label clipPath reveal
        gsap.from(".p1-label", {
          clipPath: "inset(0 100% 0 0)",
          ease: "none",
          scrollTrigger: {
            trigger: ".panel-1",
            containerAnimation: horizontalTween,
            start: "left 85%",
            end: "left 60%",
            scrub: true,
          },
        });

        // Titre mot par mot
        gsap.from(".p1-title-word", {
          y: 100,
          opacity: 0,
          rotateX: -20,
          transformOrigin: "center bottom",
          stagger: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: ".panel-1",
            containerAnimation: horizontalTween,
            start: "left 80%",
            end: "left 45%",
            scrub: true,
          },
        });

        // Description
        gsap.from(".p1-desc", {
          y: 40,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".panel-1",
            containerAnimation: horizontalTween,
            start: "left 70%",
            end: "left 40%",
            scrub: true,
          },
        });

        // Features staggerées
        gsap.from(".p1-feature", {
          x: -30,
          opacity: 0,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: ".panel-1",
            containerAnimation: horizontalTween,
            start: "left 65%",
            end: "left 35%",
            scrub: true,
          },
        });

        // Mockup card
        gsap.from(".p1-mockup", {
          scale: 0.7,
          opacity: 0,
          rotateY: 15,
          transformOrigin: "center center",
          ease: "none",
          scrollTrigger: {
            trigger: ".panel-1",
            containerAnimation: horizontalTween,
            start: "left 80%",
            end: "left 45%",
            scrub: true,
          },
        });

        // ----------------------------------------------------------------
        // Panel 2 — E-commerce : scale & cascade from bottom
        // ----------------------------------------------------------------

        // Label tracking expand
        gsap.from(".p2-label", {
          letterSpacing: "0em",
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".panel-2",
            containerAnimation: horizontalTween,
            start: "left 85%",
            end: "left 60%",
            scrub: true,
          },
        });

        // Titre skew up
        gsap.from(".p2-title-word", {
          y: 120,
          opacity: 0,
          skewY: 5,
          stagger: 0.12,
          ease: "none",
          scrollTrigger: {
            trigger: ".panel-2",
            containerAnimation: horizontalTween,
            start: "left 80%",
            end: "left 45%",
            scrub: true,
          },
        });

        // Counter ×3 dramatic
        gsap.from(".p2-counter", {
          scale: 0,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".panel-2",
            containerAnimation: horizontalTween,
            start: "left 70%",
            end: "left 45%",
            scrub: true,
          },
        });

        // Description
        gsap.from(".p2-desc", {
          y: 30,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".panel-2",
            containerAnimation: horizontalTween,
            start: "left 68%",
            end: "left 42%",
            scrub: true,
          },
        });

        // Features depuis la droite
        gsap.from(".p2-feature", {
          x: 40,
          opacity: 0,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: ".panel-2",
            containerAnimation: horizontalTween,
            start: "left 65%",
            end: "left 35%",
            scrub: true,
          },
        });

        // E-commerce mockup entrance
        gsap.from(".panel-2 [data-cursor]", {
          scale: 0.7,
          opacity: 0,
          rotateY: -10,
          transformOrigin: "center center",
          ease: "none",
          scrollTrigger: {
            trigger: ".panel-2",
            containerAnimation: horizontalTween,
            start: "left 80%",
            end: "left 45%",
            scrub: true,
          },
        });

        // ----------------------------------------------------------------
        // Panel 3 — Backoffice : code reveal
        // ----------------------------------------------------------------

        // Label depuis la gauche
        gsap.from(".p3-label", {
          x: -50,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".panel-3",
            containerAnimation: horizontalTween,
            start: "left 85%",
            end: "left 62%",
            scrub: true,
          },
        });

        // Titre flip chars
        gsap.from(".p3-title-char", {
          rotateY: -90,
          opacity: 0,
          stagger: 0.06,
          transformOrigin: "center center",
          ease: "none",
          scrollTrigger: {
            trigger: ".panel-3",
            containerAnimation: horizontalTween,
            start: "left 80%",
            end: "left 45%",
            scrub: true,
          },
        });

        // Description
        gsap.from(".p3-desc", {
          y: 30,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".panel-3",
            containerAnimation: horizontalTween,
            start: "left 70%",
            end: "left 45%",
            scrub: true,
          },
        });

        // Features staggerées depuis le bas
        gsap.from(".p3-feature", {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: ".panel-3",
            containerAnimation: horizontalTween,
            start: "left 65%",
            end: "left 35%",
            scrub: true,
          },
        });

        // Backoffice mockup container reveal
        gsap.from(".p3-code-block", {
          scale: 0.75,
          opacity: 0,
          rotateY: 10,
          transformOrigin: "center center",
          ease: "none",
          scrollTrigger: {
            trigger: ".panel-3",
            containerAnimation: horizontalTween,
            start: "left 82%",
            end: "left 50%",
            scrub: true,
          },
        });

        // Backoffice stat cards — slide up with scroll (forward/reverse)
        gsap.to(".p3-stat", {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: ".panel-3",
            containerAnimation: horizontalTween,
            start: "left 70%",
            end: "left 42%",
            scrub: true,
          },
        });

        // Backoffice bar chart — grow with scroll (forward/reverse)
        gsap.to(".p3-bar", {
          scaleY: 1,
          stagger: 0.03,
          ease: "none",
          scrollTrigger: {
            trigger: ".panel-3",
            containerAnimation: horizontalTween,
            start: "left 68%",
            end: "left 35%",
            scrub: true,
          },
        });

        // Backoffice sparkline — draw with scroll (forward/reverse)
        gsap.to(".p3-spark-line", {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".panel-3",
            containerAnimation: horizontalTween,
            start: "left 65%",
            end: "left 32%",
            scrub: true,
          },
        });

        // Sparkline fill area fade in
        gsap.to(".p3-spark-fill", {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".panel-3",
            containerAnimation: horizontalTween,
            start: "left 55%",
            end: "left 35%",
            scrub: true,
          },
        });

        // Activity feed items
        gsap.to(".p3-activity", {
          opacity: 1,
          y: 0,
          stagger: 0.04,
          ease: "none",
          scrollTrigger: {
            trigger: ".panel-3",
            containerAnimation: horizontalTween,
            start: "left 55%",
            end: "left 30%",
            scrub: true,
          },
        });

        // ----------------------------------------------------------------
        // Panel 4 — Maintenance : dramatic scale
        // ----------------------------------------------------------------

        // Label tracking
        gsap.from(".p4-label", {
          opacity: 0,
          letterSpacing: "1em",
          ease: "none",
          scrollTrigger: {
            trigger: ".panel-4",
            containerAnimation: horizontalTween,
            start: "left 85%",
            end: "left 60%",
            scrub: true,
          },
        });

        // Titre drop from above
        gsap.from(".p4-title-word", {
          y: -80,
          opacity: 0,
          rotateX: 20,
          stagger: 0.12,
          transformOrigin: "center top",
          ease: "none",
          scrollTrigger: {
            trigger: ".panel-4",
            containerAnimation: horizontalTween,
            start: "left 80%",
            end: "left 45%",
            scrub: true,
          },
        });

        // Counter 99.9%
        gsap.from(".p4-counter", {
          scale: 3,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".panel-4",
            containerAnimation: horizontalTween,
            start: "left 70%",
            end: "left 48%",
            scrub: true,
          },
        });

        // Description
        gsap.from(".p4-desc", {
          y: 30,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".panel-4",
            containerAnimation: horizontalTween,
            start: "left 68%",
            end: "left 42%",
            scrub: true,
          },
        });

        // Features reverse stagger
        gsap.from(".p4-feature", {
          y: 20,
          opacity: 0,
          stagger: { each: 0.08, from: "end" },
          ease: "none",
          scrollTrigger: {
            trigger: ".panel-4",
            containerAnimation: horizontalTween,
            start: "left 65%",
            end: "left 35%",
            scrub: true,
          },
        });

        // Maintenance mockup entrance
        gsap.from(".panel-4 [data-cursor]", {
          scale: 0.7,
          opacity: 0,
          y: 40,
          transformOrigin: "center center",
          ease: "none",
          scrollTrigger: {
            trigger: ".panel-4",
            containerAnimation: horizontalTween,
            start: "left 78%",
            end: "left 45%",
            scrub: true,
          },
        });
      }, section);

      // Force Lenis to recalculate scrollable height after
      // ScrollTrigger adds the pin-spacer (which extends the page).
      ScrollTrigger.refresh();
      window.__lenis?.resize();
    };

    if (document.readyState === "complete") {
      initScrollTrigger();
    } else {
      window.addEventListener("load", initScrollTrigger, { once: true });
    }

    const onResize = () => {
      ScrollTrigger.refresh();
      window.__lenis?.resize();
    };
    window.addEventListener("resize", onResize);

    return () => {
      ctx?.revert();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", initScrollTrigger);
    };
  }, [isMobile]);

  // ----------------------------------------------------------------
  // Mobile : accordion inchangé
  // ----------------------------------------------------------------
  if (isMobile) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-[#050505]">
        <div className="px-6 mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gray-400 dark:text-white/30 mb-4">Ce que nous faisons</p>
          <h2 className="font-display text-5xl font-black text-gray-900 dark:text-white leading-none">NOS SERVICES</h2>
          <div className="mt-4 h-px bg-gradient-to-r from-cyan-500/50 via-purple-500/30 to-transparent" />
        </div>
        <div>
          {panels.slice(1).map((panel) => (
            <div key={panel.id} style={{ borderTop: `1px solid ${panel.accent}22` }}>
              <button
                className="w-full flex items-center justify-between px-6 py-6 text-left group"
                onClick={() => setOpenAccordion(openAccordion === panel.id ? null : panel.id)}
              >
                <div className="flex items-center gap-5">
                  <span className="font-mono text-xs opacity-30 text-gray-900 dark:text-white">{panel.number}</span>
                  <span className="font-display text-2xl text-gray-900 dark:text-white">{panel.title}</span>
                </div>
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-lg flex-shrink-0 transition-transform duration-300"
                  style={{
                    color: panel.accent,
                    background: `${panel.accent}15`,
                    transform: openAccordion === panel.id ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >+</span>
              </button>
              <div
                className="overflow-hidden transition-all duration-500 ease-out"
                style={{ maxHeight: openAccordion === panel.id ? "500px" : "0" }}
              >
                <div className="px-6 pb-8">
                  <p className="text-gray-500 dark:text-white/50 text-sm mb-5 leading-relaxed">{panel.description}</p>
                  <ul className="space-y-3">
                    {panel.features?.map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: panel.accent }} />
                        <span className="text-gray-600 dark:text-white/70">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ----------------------------------------------------------------
  // Desktop : horizontal scroll pinning
  // ----------------------------------------------------------------
  return (
    <section ref={sectionRef} style={{ background: bg(panels[0]), overflow: "hidden" }}>
      <div
        ref={trackRef}
        className="flex will-change-transform"
        style={{ width: `${panels.length * 100}vw`, height: "100vh" }}
      >
        {/* ---- Panel 0 — Intro ---- */}
        <div className="panel-0 w-screen h-full flex flex-col items-center justify-center relative overflow-hidden" style={{ background: bg(panels[0]) }}>
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="p0-gradient absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, #a855f7, transparent 70%)" }}
            />
          </div>
          <div className="relative z-10 text-center px-6">
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-gray-400 dark:text-white/20 mb-8">Ce que nous faisons</p>
            <SplitHeading
              as="h2"
              className="font-display font-black text-gray-900 dark:text-white leading-none"
              style={{ fontSize: "clamp(4rem, 13vw, 16rem)" } as React.CSSProperties}
              triggerOnLoad
            >
              NOS SERVICES
            </SplitHeading>
            <p className="p0-subtitle text-gray-400 dark:text-white/30 mt-8 text-lg tracking-widest uppercase font-light">
              Votre présence digitale, repensée.
            </p>
            <div className="p0-scroll-hint mt-16 flex items-center gap-3 justify-center text-gray-400 dark:text-white/20 text-xs tracking-widest uppercase">
              <span>Scrollez pour explorer</span>
              <span className="inline-block animate-bounce">→</span>
            </div>
          </div>
        </div>

        {/* ---- Panel 1 — Site Vitrine ---- */}
        <div className="panel-1 w-screen h-full flex overflow-hidden" style={{ background: bg(panels[1]) }}>
          <div className="w-[50%] flex flex-col justify-center pl-[8vw] pr-12 relative">
            <span
              className="p1-label font-mono text-xs uppercase tracking-[0.4em] mb-6 block"
              style={{ color: panels[1].accent }}
            >
              {panels[1].number} — Site Vitrine
            </span>
            <h3
              className="font-display font-black text-gray-900 dark:text-white leading-none mb-6 overflow-hidden"
              style={{ fontSize: "clamp(2.5rem, 5vw, 6rem)" }}
            >
              {"Site Vitrine".split(" ").map((word, i) => (
                <span key={i} className="p1-title-word inline-block mr-[0.25em] last:mr-0" style={{ display: "inline-block" }}>
                  {word}
                </span>
              ))}
            </h3>
            <p className="p1-desc text-gray-500 dark:text-white/40 text-lg mb-10 max-w-[380px] leading-relaxed">
              {panels[1].description}
            </p>
            <ul className="space-y-4">
              {panels[1].features?.map((f, i) => (
                <li key={i} className="p1-feature flex items-center gap-4">
                  <span className="w-6 h-px flex-shrink-0 block" style={{ background: panels[1].accent }} />
                  <span className="text-gray-600 dark:text-white/60 text-sm">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-[50%] flex items-center justify-center pr-[6vw]">
            <ServicesMockupVitrine accent={panels[1].accent} isDark={isDark} />
          </div>
        </div>

        {/* ---- Panel 2 — E-commerce ---- */}
        <div className="panel-2 w-screen h-full flex overflow-hidden" style={{ background: bg(panels[2]) }}>
          <div className="w-[50%] flex flex-col justify-center pl-[8vw] pr-12">
            <span
              className="p2-label font-mono text-xs uppercase tracking-[0.4em] mb-6 block"
              style={{ color: panels[2].accent }}
            >
              {panels[2].number} — E-commerce
            </span>
            <h3
              className="font-display font-black text-gray-900 dark:text-white leading-none mb-6 overflow-hidden"
              style={{ fontSize: "clamp(2.5rem, 5vw, 6rem)" }}
            >
              {"E-commerce".split("-").map((word, i, arr) => (
                <span key={i} className="p2-title-word inline-block" style={{ display: "inline-block" }}>
                  {word}{i < arr.length - 1 ? "-" : ""}
                </span>
              ))}
            </h3>
            <p className="p2-desc text-gray-500 dark:text-white/40 text-lg mb-8 max-w-[380px] leading-relaxed">
              {panels[2].description}
            </p>
            <div className="mb-8 flex items-baseline gap-3">
              <span
                className="p2-counter font-display font-black leading-none"
                style={{ color: panels[2].accent, fontSize: "clamp(2rem, 4vw, 5rem)", display: "inline-block" }}
              >
                ×3
              </span>
              <span className="text-gray-400 dark:text-white/30 text-base font-light">votre CA moyen</span>
            </div>
            <ul className="space-y-4">
              {panels[2].features?.map((f, i) => (
                <li key={i} className="p2-feature flex items-center gap-4">
                  <span className="w-6 h-px flex-shrink-0 block" style={{ background: panels[2].accent }} />
                  <span className="text-gray-600 dark:text-white/60 text-sm">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-[50%] flex items-center justify-center pr-[6vw]">
            <ServicesMockupEcommerce accent={panels[2].accent} isDark={isDark} />
          </div>
        </div>

        {/* ---- Panel 3 — Backoffice ---- */}
        <div className="panel-3 w-screen h-full flex overflow-hidden" style={{ background: bg(panels[3]) }}>
          <div className="w-[50%] flex flex-col justify-center pl-[8vw] pr-12">
            <span
              className="p3-label font-mono text-xs uppercase tracking-[0.4em] mb-6 block"
              style={{ color: panels[3].accent }}
            >
              {panels[3].number} — Backoffice
            </span>
            <h3
              className="font-display font-black text-gray-900 dark:text-white leading-none mb-6 overflow-hidden"
              style={{ fontSize: "clamp(2.5rem, 5vw, 6rem)" }}
            >
              {"Backoffice".split("").map((char, i) => (
                <span
                  key={i}
                  className="p3-title-char"
                  style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : undefined }}
                >
                  {char}
                </span>
              ))}
            </h3>
            <p className="p3-desc text-gray-500 dark:text-white/40 text-lg mb-10 max-w-[380px] leading-relaxed">
              {panels[3].description}
            </p>
            <ul className="space-y-4">
              {panels[3].features?.map((f, i) => (
                <li key={i} className="p3-feature flex items-center gap-4">
                  <span className="w-6 h-px flex-shrink-0 block" style={{ background: panels[3].accent }} />
                  <span className="text-gray-600 dark:text-white/60 text-sm">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-[50%] flex items-center justify-center pr-[6vw]">
            <ServicesMockupBackoffice accent={panels[3].accent} isDark={isDark} />
          </div>
        </div>

        {/* ---- Panel 4 — Maintenance ---- */}
        <div className="panel-4 w-screen h-full flex overflow-hidden" style={{ background: bg(panels[4]) }}>
          <div className="w-[50%] flex flex-col justify-center pl-[8vw] pr-12">
            <span
              className="p4-label font-mono text-xs uppercase tracking-[0.4em] mb-6 block"
              style={{ color: panels[4].accent }}
            >
              {panels[4].number} — Maintenance
            </span>
            <h3
              className="font-display font-black text-gray-900 dark:text-white leading-none mb-6 overflow-hidden"
              style={{ fontSize: "clamp(2.5rem, 5vw, 6rem)" }}
            >
              {"Maintenance".split(" ").map((word, i) => (
                <span key={i} className="p4-title-word inline-block mr-[0.25em] last:mr-0" style={{ display: "inline-block" }}>
                  {word}
                </span>
              ))}
            </h3>
            <p className="p4-desc text-gray-500 dark:text-white/40 text-lg mb-8 max-w-[380px] leading-relaxed">
              {panels[4].description}
            </p>
            <div className="mb-8 flex items-baseline gap-3">
              <span
                className="p4-counter font-display font-black leading-none"
                style={{ color: panels[4].accent, fontSize: "clamp(2rem, 4vw, 5rem)", display: "inline-block" }}
              >
                99.9%
              </span>
              <span className="text-gray-400 dark:text-white/30 text-base font-light">uptime garanti</span>
            </div>
            <ul className="space-y-4">
              {panels[4].features?.map((f, i) => (
                <li key={i} className="p4-feature flex items-center gap-4">
                  <span className="w-6 h-px flex-shrink-0 block" style={{ background: panels[4].accent }} />
                  <span className="text-gray-600 dark:text-white/60 text-sm">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-[50%] flex items-center justify-center pr-[6vw]">
            <ServicesMockupMaintenance accent={panels[4].accent} isDark={isDark} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesCTA() {
  return (
    <section className="py-32 flex flex-col items-center justify-center text-center relative bg-gray-50 dark:bg-[#050505]" style={{ minHeight: "400px" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full opacity-10 dark:opacity-15"
          style={{ background: "radial-gradient(ellipse, #a855f7, transparent 70%)" }}
        />
      </div>
      <p className="text-gray-400 dark:text-white/20 text-xs uppercase tracking-[0.4em] font-mono mb-8 relative z-10">Prêt à démarrer ?</p>
      <SplitHeading
        as="h2"
        className="font-display font-black text-gray-900 dark:text-white mb-14 relative z-10"
        style={{ fontSize: "clamp(2rem, 5vw, 6rem)" } as React.CSSProperties}
      >
        Démarrer votre projet
      </SplitHeading>
      <div className="relative z-10">
        <MagneticButton>
          <a
            href="/contact"
            data-cursor="magnetic"
            className="group inline-flex items-center gap-4 px-12 py-6 text-base font-semibold relative overflow-hidden"
            style={{ border: "1px solid rgba(168,85,247,0.4)", color: "#a855f7" }}
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">Démarrer votre projet</span>
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">→</span>
            <span className="absolute inset-0 bg-[#a855f7] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
          </a>
        </MagneticButton>
      </div>
    </section>
  );
}
