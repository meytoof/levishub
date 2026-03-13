"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitHeading } from "./split-heading";
import { AnimatedCounter } from "./animated-counter";
import { LineReveal } from "./line-reveal";
import { MagneticButton } from "./magnetic-button";

type Panel = {
  id: number;
  number?: string;
  title?: string;
  description?: string;
  features?: string[];
  accent: string;
  bg: string;
  counter?: { value: number; label: string };
};

const panels: Panel[] = [
  { id: 0, accent: "#ffffff", bg: "#050505" },
  {
    id: 1, number: "01", title: "Site Vitrine",
    description: "Une présence digitale qui convertit. Design sur mesure, performance optimisée, identité forte.",
    features: ["Design personnalisé", "Optimisation SEO", "Responsive mobile", "Livraison 4 semaines"],
    accent: "#06b6d4", bg: "#020a0f",
  },
  {
    id: 2, number: "02", title: "E-commerce",
    description: "Votre boutique en ligne pensée pour vendre. UX fluide, paiement sécurisé, gestion simplifiée.",
    features: ["Catalogue illimité", "Paiement sécurisé", "Gestion des stocks", "Analytics avancés"],
    accent: "#a855f7", bg: "#08020f",
    counter: { value: 3, label: "× votre CA moyen" },
  },
  {
    id: 3, number: "03", title: "Backoffice",
    description: "Gérez votre activité depuis un tableau de bord sur mesure. Efficacité et clarté.",
    features: ["Dashboard custom", "Gestion utilisateurs", "Rapports en temps réel", "API RESTful"],
    accent: "#34d399", bg: "#02090a",
  },
  {
    id: 4, number: "04", title: "Maintenance",
    description: "Votre site entre de bonnes mains. Mises à jour, sécurité, monitoring 24/7.",
    features: ["Updates régulières", "Backup quotidien", "Support prioritaire", "Monitoring 24/7"],
    accent: "#f59e0b", bg: "#0a0700",
  },
];

export function ServicesSlidesPinning() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [openAccordion, setOpenAccordion] = useState<number | null>(1);
  const [isMobile, setIsMobile] = useState(false);

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

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  if (isMobile) {
    return (
      <section className="py-20" style={{ background: "#050505" }}>
        <div className="px-6 mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/30 mb-4">Ce que nous faisons</p>
          <h2 className="font-display text-5xl font-black text-white leading-none">NOS SERVICES</h2>
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
                  <span className="font-mono text-xs opacity-30 text-white">{panel.number}</span>
                  <span className="font-display text-2xl text-white">{panel.title}</span>
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
                  <p className="text-white/50 text-sm mb-5 leading-relaxed">{panel.description}</p>
                  <ul className="space-y-3">
                    {panel.features?.map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: panel.accent }} />
                        <span className="text-white/70">{f}</span>
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

  return (
    <section ref={sectionRef} style={{ background: panels[0].bg }}>
      <div
        ref={trackRef}
        className="flex will-change-transform"
        style={{ width: `${panels.length * 100}vw`, height: "100vh" }}
      >
        {/* Panel 0 — Intro */}
        <div className="w-screen h-full flex flex-col items-center justify-center relative overflow-hidden" style={{ background: panels[0].bg }}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, #a855f7, transparent 70%)" }} />
          </div>
          <div className="relative z-10 text-center px-6">
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-white/20 mb-8">Ce que nous faisons</p>
            <SplitHeading
              as="h2"
              className="font-display font-black text-white leading-none"
              style={{ fontSize: "clamp(4rem, 13vw, 16rem)" } as React.CSSProperties}
              triggerOnLoad
            >
              NOS SERVICES
            </SplitHeading>
            <p className="text-white/30 mt-8 text-lg tracking-widest uppercase font-light">
              Votre présence digitale, repensée.
            </p>
            <div className="mt-16 flex items-center gap-3 justify-center text-white/20 text-xs tracking-widest uppercase">
              <span>Scrollez pour explorer</span>
              <span className="inline-block animate-bounce">→</span>
            </div>
          </div>
        </div>

        {/* Panel 1 — Site Vitrine */}
        <div className="w-screen h-full flex overflow-hidden" style={{ background: panels[1].bg }}>
          <div className="w-[50%] flex flex-col justify-center pl-[8vw] pr-12 relative">
            <span className="font-mono text-xs uppercase tracking-[0.4em] mb-6 block" style={{ color: panels[1].accent }}>
              {panels[1].number} — Site Vitrine
            </span>
            <SplitHeading as="h3" className="font-display font-black text-white leading-none mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 6rem)" } as React.CSSProperties}>
              {panels[1].title!}
            </SplitHeading>
            <p className="text-white/40 text-lg mb-10 max-w-[380px] leading-relaxed">{panels[1].description}</p>
            <ul className="space-y-4">
              {panels[1].features?.map((f, i) => (
                <li key={i} className="flex items-center gap-4">
                  <LineReveal className="w-6 flex-shrink-0" color={panels[1].accent} height={1} delay={i * 0.08} />
                  <span className="text-white/60 text-sm">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-[50%] flex items-center justify-center pr-[6vw]">
            <div
              className="relative w-[85%] h-[72%] rounded-3xl overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${panels[1].accent}18 0%, transparent 60%)`, border: `1px solid ${panels[1].accent}25` }}
              data-cursor="image"
            >
              <div className="absolute inset-0 p-8 flex flex-col gap-4">
                <div className="h-8 rounded-lg flex items-center px-4 gap-2" style={{ background: `${panels[1].accent}12` }}>
                  <div className="w-3 h-3 rounded-full" style={{ background: panels[1].accent }} />
                  <div className="flex-1 h-2 rounded-full" style={{ background: `${panels[1].accent}30` }} />
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl" style={{ background: `${panels[1].accent}10` }} />
                  <div className="flex flex-col gap-3 pt-2">
                    {[80, 60, 90, 40].map((w, i) => (
                      <div key={i} className="h-3 rounded-full" style={{ background: `${panels[1].accent}${i % 2 === 0 ? "25" : "15"}`, width: `${w}%` }} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full opacity-30"
                style={{ background: `radial-gradient(circle, ${panels[1].accent}, transparent 70%)` }} />
            </div>
          </div>
        </div>

        {/* Panel 2 — E-commerce */}
        <div className="w-screen h-full flex overflow-hidden" style={{ background: panels[2].bg }}>
          <div className="w-[50%] flex flex-col justify-center pl-[8vw] pr-12">
            <span className="font-mono text-xs uppercase tracking-[0.4em] mb-6 block" style={{ color: panels[2].accent }}>
              {panels[2].number} — E-commerce
            </span>
            <SplitHeading as="h3" className="font-display font-black text-white leading-none mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 6rem)" } as React.CSSProperties}>
              {panels[2].title!}
            </SplitHeading>
            <p className="text-white/40 text-lg mb-8 max-w-[380px] leading-relaxed">{panels[2].description}</p>
            <div className="mb-8 flex items-baseline gap-3">
              <span className="font-display font-black leading-none" style={{ color: panels[2].accent, fontSize: "clamp(2rem, 4vw, 5rem)" }}>
                <AnimatedCounter target={3} prefix="×" suffix="" className="" />
              </span>
              <span className="text-white/30 text-base font-light">votre CA moyen</span>
            </div>
            <ul className="space-y-4">
              {panels[2].features?.map((f, i) => (
                <li key={i} className="flex items-center gap-4">
                  <LineReveal className="w-6 flex-shrink-0" color={panels[2].accent} height={1} delay={i * 0.08} />
                  <span className="text-white/60 text-sm">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-[50%] flex items-center justify-center pr-[6vw]">
            <div
              className="w-[85%] h-[72%] rounded-3xl overflow-hidden p-6"
              style={{ background: `${panels[2].accent}0a`, border: `1px solid ${panels[2].accent}20` }}
              data-cursor="image"
            >
              <div className="grid grid-cols-2 gap-4 h-full">
                {[0,1,2,3].map((i) => (
                  <div key={i} className="rounded-2xl p-4 flex flex-col justify-between"
                    style={{ background: `${panels[2].accent}${i === 0 ? "18" : "0d"}` }}>
                    <div className="w-full flex-1 rounded-xl mb-3" style={{ background: `${panels[2].accent}20`, minHeight: "50px" }} />
                    <div>
                      <div className="h-2 rounded-full mb-1.5" style={{ background: `${panels[2].accent}40`, width: i % 2 === 0 ? "65%" : "55%" }} />
                      <div className="h-2 rounded-full" style={{ background: `${panels[2].accent}20`, width: "35%" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Panel 3 — Backoffice */}
        <div className="w-screen h-full flex overflow-hidden" style={{ background: panels[3].bg }}>
          <div className="w-[50%] flex flex-col justify-center pl-[8vw] pr-12">
            <span className="font-mono text-xs uppercase tracking-[0.4em] mb-6 block" style={{ color: panels[3].accent }}>
              {panels[3].number} — Backoffice
            </span>
            <SplitHeading as="h3" className="font-display font-black text-white leading-none mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 6rem)" } as React.CSSProperties}>
              {panels[3].title!}
            </SplitHeading>
            <p className="text-white/40 text-lg mb-10 max-w-[380px] leading-relaxed">{panels[3].description}</p>
            <ul className="space-y-4">
              {panels[3].features?.map((f, i) => (
                <li key={i} className="flex items-center gap-4">
                  <LineReveal className="w-6 flex-shrink-0" color={panels[3].accent} height={1} delay={i * 0.08} />
                  <span className="text-white/60 text-sm">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-[50%] flex items-center justify-center pr-[6vw]">
            <div
              className="w-[85%] h-[72%] rounded-3xl overflow-hidden font-mono text-xs leading-relaxed p-8"
              style={{ background: "#000", border: `1px solid ${panels[3].accent}30`, color: `${panels[3].accent}80` }}
              data-cursor="image"
            >
              <div className="text-white/20 mb-4 text-[10px]">{"// dashboard.init()"}</div>
              <div><span style={{ color: panels[3].accent }}>import</span> <span className="text-white/60">Dashboard</span> <span style={{ color: panels[3].accent }}>from</span> <span className="text-white/40">&apos;@levisweb/core&apos;</span></div>
              <div className="mt-4">
                <span style={{ color: panels[3].accent }}>const</span>{" "}
                <span className="text-white/80">db</span>{" "}
                <span className="text-white/40">=</span>{" "}
                <span style={{ color: panels[3].accent }}>new</span>{" "}
                <span className="text-white/60">Dashboard</span>
                <span className="text-white/30">({"{"}</span>
              </div>
              <div className="pl-6 text-white/50">auth: session,</div>
              <div className="pl-6 text-white/50">theme: <span className="text-yellow-400/60">&apos;dark&apos;</span>,</div>
              <div className="pl-6 text-white/50">realtime: <span style={{ color: panels[3].accent }}>true</span>,</div>
              <div><span className="text-white/30">{"});"}</span></div>
              <div className="mt-6 space-y-1.5 text-[10px]">
                <div><span style={{ color: panels[3].accent }}>✓</span> <span className="text-white/30">Dashboard ready</span></div>
                <div><span style={{ color: panels[3].accent }}>✓</span> <span className="text-white/30">12 users connected</span></div>
                <div><span style={{ color: panels[3].accent }}>✓</span> <span className="text-white/30">1,247 events logged</span></div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span style={{ color: panels[3].accent }}>▶</span>
                <span className="animate-pulse text-white/40">_</span>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 4 — Maintenance */}
        <div className="w-screen h-full flex overflow-hidden" style={{ background: panels[4].bg }}>
          <div className="w-[50%] flex flex-col justify-center pl-[8vw] pr-12">
            <span className="font-mono text-xs uppercase tracking-[0.4em] mb-6 block" style={{ color: panels[4].accent }}>
              {panels[4].number} — Maintenance
            </span>
            <SplitHeading as="h3" className="font-display font-black text-white leading-none mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 6rem)" } as React.CSSProperties}>
              {panels[4].title!}
            </SplitHeading>
            <p className="text-white/40 text-lg mb-8 max-w-[380px] leading-relaxed">{panels[4].description}</p>
            <div className="mb-8 flex items-baseline gap-3">
              <span className="font-display font-black leading-none" style={{ color: panels[4].accent, fontSize: "clamp(2rem, 4vw, 5rem)" }}>
                <AnimatedCounter target={99} suffix=".9%" className="" />
              </span>
              <span className="text-white/30 text-base font-light">uptime garanti</span>
            </div>
            <ul className="space-y-4">
              {panels[4].features?.map((f, i) => (
                <li key={i} className="flex items-center gap-4">
                  <LineReveal className="w-6 flex-shrink-0" color={panels[4].accent} height={1} delay={i * 0.08} />
                  <span className="text-white/60 text-sm">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-[50%] flex items-center justify-center pr-[6vw]">
            <div className="flex flex-col items-center gap-10">
              <svg width="220" height="90" viewBox="0 0 220 90" fill="none">
                <path
                  d="M0,45 L30,45 L45,12 L60,78 L75,22 L90,68 L105,32 L120,58 L135,38 L150,52 L165,42 L185,45 L220,45"
                  stroke={panels[4].accent}
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    filter: `drop-shadow(0 0 6px ${panels[4].accent}80)`,
                    strokeDasharray: "700",
                    animation: "hb 2.5s ease-in-out infinite",
                  }}
                />
              </svg>
              <div className="text-center">
                <div className="font-display text-8xl font-black" style={{ color: panels[4].accent, textShadow: `0 0 40px ${panels[4].accent}40` }}>
                  24/7
                </div>
                <div className="text-white/30 text-xs tracking-[0.4em] uppercase mt-3">Monitoring actif</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes hb {
          0%, 100% { stroke-dashoffset: 700; opacity: 0.3; }
          50% { stroke-dashoffset: 0; opacity: 1; }
        }
      `}</style>
    </section>
  );
}

export function ServicesCTA() {
  return (
    <section className="py-32 flex flex-col items-center justify-center text-center relative overflow-hidden" style={{ background: "#050505" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full opacity-15"
          style={{ background: "radial-gradient(ellipse, #a855f7, transparent 70%)" }} />
      </div>
      <p className="text-white/20 text-xs uppercase tracking-[0.4em] font-mono mb-8 relative z-10">Prêt à démarrer ?</p>
      <SplitHeading as="h2" className="font-display font-black text-white mb-14 relative z-10"
        style={{ fontSize: "clamp(2rem, 5vw, 6rem)" } as React.CSSProperties}>
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
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">Démarrer votre projet</span>
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">→</span>
            <span className="absolute inset-0 bg-[#a855f7] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
          </a>
        </MagneticButton>
      </div>
    </section>
  );
}
