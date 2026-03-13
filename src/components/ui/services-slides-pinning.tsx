"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitHeading } from "./split-heading";
import { AnimatedCounter } from "./animated-counter";
import { LineReveal } from "./line-reveal";
import { MagneticButton } from "./magnetic-button";

const panels = [
  {
    id: 0,
    label: null,
    accent: "#ffffff",
    bg: "#000000",
  },
  {
    id: 1,
    number: "01",
    title: "Site Vitrine",
    description: "Une présence digitale qui convertit. Design sur mesure, performance optimisée, identité forte.",
    features: ["Design personnalisé", "Optimisation SEO", "Responsive mobile", "Livraison 4 semaines"],
    accent: "#06b6d4",
    bg: "#020a0e",
  },
  {
    id: 2,
    number: "02",
    title: "E-commerce",
    description: "Votre boutique en ligne pensée pour vendre. UX fluide, paiement sécurisé, gestion simplifiée.",
    features: ["Catalogue illimité", "Paiement sécurisé", "Gestion des stocks", "Analytics avancés"],
    accent: "#a855f7",
    bg: "#0a020e",
    counter: { value: 3, label: "× votre CA moyen" },
  },
  {
    id: 3,
    number: "03",
    title: "Backoffice",
    description: "Gérez votre activité depuis un tableau de bord sur mesure. Efficacité et clarté.",
    features: ["Dashboard custom", "Gestion utilisateurs", "Rapports en temps réel", "API RESTful"],
    accent: "#34d399",
    bg: "#02090a",
  },
  {
    id: 4,
    number: "04",
    title: "Maintenance",
    description: "Votre site entre de bonnes mains. Mises à jour, sécurité, monitoring 24/7.",
    features: ["Updates régulières", "Backup quotidien", "Support prioritaire", "Monitoring 24/7"],
    accent: "#f59e0b",
    bg: "#0a0600",
    counter: { value: 99.9, label: "% uptime" },
  },
];

export function ServicesSlidesPinning() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
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

    const scrollDistance = track.scrollWidth - window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        end: () => `+=${scrollDistance}`,
        invalidateOnRefresh: true,
      },
    });

    tl.to(track, {
      x: () => -scrollDistance,
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [isMobile]);

  // Mobile accordion
  if (isMobile) {
    return (
      <section className="bg-black py-16">
        <div className="px-6 mb-10">
          <h2 className="font-display text-5xl font-bold text-white">NOS SERVICES</h2>
          <p className="text-white/50 mt-3">Votre présence digitale, repensée.</p>
        </div>
        <div className="space-y-px">
          {panels.slice(1).map((panel) => (
            <div key={panel.id} className="border-t border-white/10">
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpenAccordion(openAccordion === panel.id ? null : panel.id)}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono opacity-40">{panel.number}</span>
                  <span className="font-display text-xl text-white">{panel.title}</span>
                </div>
                <span
                  className="text-2xl transition-transform duration-300"
                  style={{
                    color: panel.accent,
                    transform: openAccordion === panel.id ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  +
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-500"
                style={{ maxHeight: openAccordion === panel.id ? "400px" : "0" }}
              >
                <div className="px-6 pb-6">
                  <p className="text-white/60 text-sm mb-4">{panel.description}</p>
                  <ul className="space-y-2">
                    {panel.features?.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <span style={{ color: panel.accent }}>✓</span>
                        <span className="text-white/80">{f}</span>
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
    <section ref={sectionRef} className="overflow-hidden bg-black" style={{ height: "100vh" }}>
      <div ref={trackRef} className="flex h-full will-change-transform" style={{ width: `${panels.length * 100}vw` }}>
        {/* Panel 0 — Intro */}
        <div className="w-screen h-full flex flex-col items-center justify-center relative" style={{ background: "#000" }}>
          <div className="text-center">
            <SplitHeading
              as="h2"
              className="font-display font-bold text-white leading-none"
              style={{ fontSize: "clamp(4rem, 12vw, 14rem)" } as React.CSSProperties}
              triggerOnLoad
            >
              NOS SERVICES
            </SplitHeading>
            <p className="text-white/40 mt-6 text-lg tracking-widest uppercase font-light">
              Votre présence digitale, repensée.
            </p>
            <div className="mt-12 flex items-center gap-3 justify-center text-white/30 text-sm">
              <span>Scrollez pour explorer</span>
              <span className="animate-bounce">→</span>
            </div>
          </div>
        </div>

        {/* Panel 1 — Site Vitrine */}
        <div className="w-screen h-full flex" style={{ background: panels[1].bg }}>
          <div className="w-[45%] flex flex-col justify-center pl-[8vw] pr-8 relative">
            <span className="font-mono text-[20vw] font-bold absolute left-0 top-1/2 -translate-y-1/2 opacity-[0.04] text-white select-none pointer-events-none leading-none">
              {panels[1].number}
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.3em] mb-4" style={{ color: panels[1].accent }}>
              {panels[1].number}
            </span>
            <SplitHeading
              as="h3"
              className="font-display text-[6vw] font-bold text-white leading-none mb-6"
            >
              {panels[1].title}
            </SplitHeading>
            <p className="text-white/50 text-lg mb-8 max-w-[360px]">{panels[1].description}</p>
            <ul className="space-y-3">
              {panels[1].features?.map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <LineReveal className="w-8 opacity-60" color={panels[1].accent} delay={i * 0.1} />
                  <span className="text-white/80">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-[55%] flex items-center justify-center pr-[8vw]">
            <div
              className="w-[80%] h-[70%] rounded-2xl relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${panels[1].accent}22, ${panels[1].accent}05)`, border: `1px solid ${panels[1].accent}33` }}
              data-cursor="image"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-xs tracking-widest uppercase opacity-20" style={{ color: panels[1].accent }}>
                  Site Vitrine Preview
                </span>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="h-2 rounded-full mb-2" style={{ background: `${panels[1].accent}33`, width: "60%" }} />
                <div className="h-2 rounded-full mb-2" style={{ background: `${panels[1].accent}22`, width: "80%" }} />
                <div className="h-2 rounded-full" style={{ background: `${panels[1].accent}11`, width: "40%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Panel 2 — E-commerce */}
        <div className="w-screen h-full flex" style={{ background: panels[2].bg }}>
          <div className="w-[45%] flex flex-col justify-center pl-[8vw] pr-8">
            <span className="font-mono text-xs uppercase tracking-[0.3em] mb-4" style={{ color: panels[2].accent }}>
              {panels[2].number}
            </span>
            <SplitHeading
              as="h3"
              className="font-display text-[6vw] font-bold text-white leading-none mb-6"
            >
              {panels[2].title}
            </SplitHeading>
            <p className="text-white/50 text-lg mb-8 max-w-[360px]">{panels[2].description}</p>
            <div className="mb-8">
              <div className="font-display text-[5vw] font-bold" style={{ color: panels[2].accent }}>
                <AnimatedCounter target={3} prefix="×" suffix="" className="" />
                <span className="text-white/40 text-xl ml-2 font-sans font-light">votre CA moyen</span>
              </div>
            </div>
            <ul className="space-y-3">
              {panels[2].features?.map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <LineReveal className="w-8 opacity-60" color={panels[2].accent} delay={i * 0.1} />
                  <span className="text-white/80">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-[55%] flex items-center justify-center pr-[8vw]">
            <div
              className="w-[80%] h-[70%] rounded-2xl overflow-hidden relative"
              style={{ background: `linear-gradient(135deg, ${panels[2].accent}22, ${panels[2].accent}05)`, border: `1px solid ${panels[2].accent}33` }}
              data-cursor="image"
            >
              <div className="absolute inset-0 grid grid-cols-2 gap-4 p-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="rounded-xl flex flex-col p-3" style={{ background: `${panels[2].accent}11` }}>
                    <div className="w-full aspect-square rounded-lg mb-2" style={{ background: `${panels[2].accent}22` }} />
                    <div className="h-2 rounded mb-1" style={{ background: `${panels[2].accent}33`, width: "70%" }} />
                    <div className="h-2 rounded" style={{ background: `${panels[2].accent}22`, width: "40%" }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Panel 3 — Backoffice */}
        <div className="w-screen h-full flex" style={{ background: panels[3].bg }}>
          <div className="w-[45%] flex flex-col justify-center pl-[8vw] pr-8">
            <span className="font-mono text-xs uppercase tracking-[0.3em] mb-4" style={{ color: panels[3].accent }}>
              {panels[3].number}
            </span>
            <SplitHeading
              as="h3"
              className="font-display text-[6vw] font-bold text-white leading-none mb-6"
            >
              {panels[3].title}
            </SplitHeading>
            <p className="text-white/50 text-lg mb-8 max-w-[360px]">{panels[3].description}</p>
            <ul className="space-y-3">
              {panels[3].features?.map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <LineReveal className="w-8 opacity-60" color={panels[3].accent} delay={i * 0.1} />
                  <span className="text-white/80">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-[55%] flex items-center justify-center pr-[8vw]">
            <div
              className="w-[80%] h-[70%] rounded-2xl overflow-hidden font-mono text-xs p-6 leading-relaxed"
              style={{ background: "#000", border: `1px solid ${panels[3].accent}33`, color: `${panels[3].accent}99` }}
              data-cursor="image"
            >
              <div className="opacity-60 mb-2">{"// backoffice.dashboard.init()"}</div>
              <div><span style={{ color: panels[3].accent }}>const</span> dashboard = new Dashboard()</div>
              <div className="mt-1 pl-4"><span style={{ color: panels[3].accent }}>.</span>withAuth(session)</div>
              <div className="pl-4"><span style={{ color: panels[3].accent }}>.</span>withAnalytics()</div>
              <div className="pl-4"><span style={{ color: panels[3].accent }}>.</span>build()</div>
              <div className="mt-4 opacity-40">{"// ✓ Dashboard ready"}</div>
              <div className="opacity-40">{"// ✓ 12 users connected"}</div>
              <div className="opacity-40">{"// ✓ 1,247 events logged"}</div>
              <div className="mt-4 flex items-center gap-2">
                <span style={{ color: panels[3].accent }}>▶</span>
                <span className="animate-pulse">_</span>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 4 — Maintenance */}
        <div className="w-screen h-full flex" style={{ background: panels[4].bg }}>
          <div className="w-[45%] flex flex-col justify-center pl-[8vw] pr-8">
            <span className="font-mono text-xs uppercase tracking-[0.3em] mb-4" style={{ color: panels[4].accent }}>
              {panels[4].number}
            </span>
            <SplitHeading
              as="h3"
              className="font-display text-[6vw] font-bold text-white leading-none mb-6"
            >
              {panels[4].title}
            </SplitHeading>
            <p className="text-white/50 text-lg mb-8 max-w-[360px]">{panels[4].description}</p>
            <div className="mb-8">
              <div className="font-display text-[5vw] font-bold" style={{ color: panels[4].accent }}>
                <AnimatedCounter target={99} suffix=".9%" className="" />
                <span className="text-white/40 text-xl ml-2 font-sans font-light">uptime</span>
              </div>
            </div>
            <ul className="space-y-3">
              {panels[4].features?.map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <LineReveal className="w-8 opacity-60" color={panels[4].accent} delay={i * 0.1} />
                  <span className="text-white/80">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-[55%] flex items-center justify-center pr-[8vw]">
            <div className="flex flex-col items-center gap-8">
              <svg width="200" height="80" viewBox="0 0 200 80" fill="none" className="overflow-visible">
                <path
                  d="M0,40 L30,40 L45,10 L60,70 L75,20 L90,60 L105,30 L120,50 L135,35 L150,45 L165,38 L180,42 L200,40"
                  stroke={panels[4].accent}
                  strokeWidth="2"
                  fill="none"
                  style={{
                    strokeDasharray: "600",
                    strokeDashoffset: "0",
                    animation: "heartbeat 2s ease-in-out infinite",
                  }}
                />
              </svg>
              <div className="text-center">
                <div className="font-display text-6xl font-bold" style={{ color: panels[4].accent }}>24/7</div>
                <div className="text-white/40 text-sm mt-2 tracking-widest uppercase">Monitoring actif</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heartbeat {
          0%, 100% { stroke-dashoffset: 600; }
          50% { stroke-dashoffset: 0; }
        }
      `}</style>
    </section>
  );
}

export function ServicesCTA() {
  return (
    <section className="bg-black py-32 flex flex-col items-center justify-center text-center">
      <p className="text-white/30 text-sm uppercase tracking-[0.3em] mb-6">Prêt à démarrer ?</p>
      <SplitHeading as="h2" className="font-display text-[5vw] font-bold text-white mb-12">
        Démarrer votre projet
      </SplitHeading>
      <MagneticButton>
        <a
          href="/contact"
          data-cursor="magnetic"
          className="inline-flex items-center gap-3 border border-white/20 text-white px-10 py-5 text-lg hover:bg-white hover:text-black transition-colors duration-300"
        >
          Démarrer votre projet
          <span>→</span>
        </a>
      </MagneticButton>
    </section>
  );
}
