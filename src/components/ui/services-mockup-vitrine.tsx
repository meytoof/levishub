"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  accent: string;
  isDark: boolean;
}

/* ----------------------------------------------------------------
   Site Vitrine mockup — Self-contained component with:
   - Real video background (Pixabay CDN, same as DB Groupe)
   - "Votre Marque" branding
   - Auto-scroll down animation (slow pan revealing sections)
   - Nav, hero, marquee, cards section — all animated
   - No iframe, no scrollbar, pure CSS + video
   ---------------------------------------------------------------- */

const VIDEO_SRC = "https://cdn.pixabay.com/video/2020/08/09/46476-449256263_large.mp4";

export function ServicesMockupVitrine({ accent, isDark }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); obs.disconnect(); } },
      { rootMargin: "200px" }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="p1-mockup relative w-[90%] h-[78%] rounded-2xl overflow-hidden"
      style={{
        background: "#0a0a0a",
        border: `1px solid ${accent}30`,
        boxShadow: isDark
          ? `0 25px 60px rgba(0,0,0,0.6), 0 0 40px ${accent}10`
          : `0 25px 60px rgba(0,0,0,0.12)`,
      }}
      data-cursor="Voir"
    >
      <style>{`
        /* Slow vertical pan — scrolls the "page" down then back up */
        @keyframes vitrinePan {
          0%   { transform: translateY(0); }
          40%  { transform: translateY(-35%); }
          60%  { transform: translateY(-35%); }
          100% { transform: translateY(0); }
        }
        @keyframes vitrineTextUp {
          0%   { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes vitrineLineGrow {
          0%   { width: 0; }
          100% { width: 100%; }
        }
        @keyframes vitrineMarquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes vitrineCardUp {
          0%   { opacity: 0; transform: translateY(40px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes vitrinePulse {
          0%, 100% { opacity: 0.5; }
          50%      { opacity: 1; }
        }
        @keyframes vitrineFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-4px); }
        }
      `}</style>

      {/* ---- Browser chrome ---- */}
      <div
        className="flex items-center gap-2 px-4 h-9 shrink-0 relative z-20"
        style={{
          background: isDark ? "#141414" : "#e8e8e8",
          borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)"}`,
        }}
      >
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 mx-3 h-5 rounded-md flex items-center px-3" style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="mr-1.5 opacity-40">
            <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" stroke={isDark ? "#fff" : "#000"} strokeWidth="2" />
          </svg>
          <span className="text-[9px] tracking-wide" style={{ color: isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.3)" }}>
            votremarque.fr
          </span>
        </div>
      </div>

      {/* ---- Page content with auto-scroll pan ---- */}
      <div className="relative w-full" style={{ height: "calc(100% - 36px)", overflow: "hidden" }}>
        <div
          style={{
            animation: isVisible ? "vitrinePan 14s ease-in-out infinite" : "none",
            willChange: "transform",
          }}
        >
          {/* ======== SECTION 1 — HERO ======== */}
          <div className="relative" style={{ height: "calc(100vh * 0.55)", minHeight: "300px" }}>
            {/* Video background */}
            {isVisible && (
              <video
                autoPlay muted loop playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "brightness(0.3)" }}
              >
                <source src={VIDEO_SRC} type="video/mp4" />
              </video>
            )}
            {/* Dark overlay */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.6) 100%)" }} />
            {/* Grain */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            }} />

            {/* Nav */}
            <div className="relative z-10 flex items-center justify-between px-5 py-3" style={{ mixBlendMode: "difference" }}>
              <span style={{ fontSize: "10px", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", fontFamily: "serif" }}>
                Votre Marque
              </span>
              <div className="flex gap-3">
                {["Accueil", "Services", "Projets", "Contact"].map((item) => (
                  <span key={item} style={{ fontSize: "6px", color: "rgba(255,255,255,0.6)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Hero content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center" style={{ height: "calc(100% - 40px)", padding: "0 12%" }}>
              <div className="mb-2" style={{ animation: isVisible ? "vitrineTextUp 0.8s ease 0.3s both" : "none" }}>
                <span style={{ fontSize: "6px", color: `${accent}cc`, letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 600 }}>
                  Agence Digitale
                </span>
              </div>
              <h3 style={{
                fontSize: "26px", fontWeight: 900, color: "#fff", lineHeight: 0.95, letterSpacing: "-0.03em", fontFamily: "serif",
                animation: isVisible ? "vitrineTextUp 1s ease 0.5s both" : "none",
              }}>
                Votre Marque
              </h3>
              <p style={{
                fontSize: "7px", color: "rgba(255,255,255,0.45)", marginTop: "10px", lineHeight: 1.8, maxWidth: "200px",
                animation: isVisible ? "vitrineTextUp 0.8s ease 0.9s both" : "none",
              }}>
                Un site vitrine sur mesure qui reflète votre identité et convertit vos visiteurs.
              </p>
              {/* CTA */}
              <div className="mt-4 flex gap-2" style={{ animation: isVisible ? "vitrineTextUp 0.8s ease 1.2s both" : "none" }}>
                <div className="px-4 py-1.5 rounded-full" style={{ background: accent }}>
                  <span style={{ fontSize: "7px", fontWeight: 700, color: "#fff" }}>Découvrir</span>
                </div>
                <div className="px-3 py-1.5 rounded-full" style={{ border: "1px solid rgba(255,255,255,0.25)" }}>
                  <span style={{ fontSize: "7px", color: "rgba(255,255,255,0.6)" }}>Nos projets</span>
                </div>
              </div>
              {/* Scroll indicator */}
              <div className="mt-5" style={{ animation: isVisible ? "vitrineFloat 2.5s ease infinite" : "none" }}>
                <span style={{ fontSize: "4px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Scroll</span>
                <div className="w-px h-4 mx-auto mt-1" style={{ background: `linear-gradient(to bottom, ${accent}80, transparent)` }} />
              </div>
            </div>
          </div>

          {/* ======== MARQUEE BAND ======== */}
          <div className="overflow-hidden py-2" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex w-max" style={{ animation: isVisible ? "vitrineMarquee 12s linear infinite" : "none" }}>
              {[0, 1].map((k) => (
                <div key={k} className="flex gap-6 px-6">
                  {["Design", "Performance", "SEO", "Responsive", "Animations", "UI/UX", "Branding"].map((word) => (
                    <span key={`${k}-${word}`} style={{ fontSize: "7px", color: "rgba(255,255,255,0.12)", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "serif", whiteSpace: "nowrap" }}>
                      {word} <span style={{ color: `${accent}40` }}>&#10038;</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* ======== SECTION 2 — SERVICES CARDS ======== */}
          <div style={{ background: "#0a0a0a", padding: "20px 16px" }}>
            {/* Section title */}
            <div className="text-center mb-4">
              <span style={{ fontSize: "5px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.3em", textTransform: "uppercase" }}>Nos services</span>
              <h4 style={{ fontSize: "14px", fontWeight: 900, color: "#fff", fontFamily: "serif", marginTop: "4px", letterSpacing: "-0.02em" }}>
                Ce que nous faisons
              </h4>
            </div>
            {/* Cards grid */}
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { title: "Stratégie", color: "#4a8a3e", icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
                { title: "Création", color: "#e0a800", icon: "M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.586 7.586" },
                { title: "Croissance", color: "#2980b9", icon: "M23 6l-9.5 9.5-5-5L1 18M17 6h6v6" },
              ].map((card, i) => (
                <div
                  key={card.title}
                  className="rounded-xl p-3 relative overflow-hidden"
                  style={{
                    background: `${card.color}12`,
                    border: `1px solid ${card.color}25`,
                    animation: isVisible ? `vitrineCardUp 0.7s ease ${1.8 + i * 0.15}s both` : "none",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={card.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-2 opacity-80">
                    <path d={card.icon} />
                  </svg>
                  <div style={{ fontSize: "8px", fontWeight: 700, color: "#fff", marginBottom: "3px" }}>{card.title}</div>
                  <div style={{ fontSize: "5px", color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>
                    Lorem ipsum dolor sit amet consectetur adipiscing elit.
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
