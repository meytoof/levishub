"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  accent: string;
  isDark: boolean;
}

/* ----------------------------------------------------------------
   Premium E-commerce mockup — white/light bg, real product images,
   animated cursor with rich click effects (ripple + particles +
   scale bounce), toast notifications.

   Timeline (14s loop):
   0-1s    : cursor enters
   1-3s    : moves to product 1, hover glow
   3-4.5s  : moves to "Ajouter" button
   4.5-5s  : CLICK — ripple + particles + card bounce
   5-6.5s  : toast slides in, cart badge pulses
   6.5-8.5s: moves to product 3, hover glow
   8.5-10s : moves to "Ajouter" button
   10-10.5s: CLICK — ripple + particles
   10.5-12s: second toast, cart badge
   12-14s  : cursor exits
   ---------------------------------------------------------------- */

const PRODUCTS = [
  {
    name: "Casque Audio Pro",
    price: "189,00",
    tag: "Nouveau",
    // Iconic headphones product shot
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&q=80&crop=center",
  },
  {
    name: "Montre Connectée",
    price: "299,00",
    tag: "Best-seller",
    // Clean watch on yellow bg — centered
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&q=80&crop=center",
  },
  {
    name: "Enceinte Portable",
    price: "129,00",
    tag: "-20%",
    // Minimal white speaker
    img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop&q=80&crop=center",
  },
  {
    name: "Écouteurs Sans Fil",
    price: "79,00",
    tag: null,
    // White earbuds on clean bg
    img: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop&q=80&crop=center",
  },
];

export function ServicesMockupEcommerce({ accent, isDark }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { setIsVisible(entry.isIntersecting); },
      { rootMargin: "100px" }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Always white/light — e-commerce look
  const storeBg = "#ffffff";
  const cardBg = "#fafafa";
  const textPrimary = "rgba(0,0,0,0.87)";
  const textSecondary = "rgba(0,0,0,0.4)";
  const borderCol = "rgba(0,0,0,0.06)";

  const playState = isVisible ? "running" : "paused";

  return (
    <div
      ref={ref}
      className="relative w-[90%] h-[78%] rounded-2xl overflow-hidden"
      style={{
        background: storeBg,
        border: isDark ? `1px solid rgba(255,255,255,0.1)` : `1px solid ${accent}25`,
        boxShadow: isDark
          ? `0 30px 80px rgba(0,0,0,0.7), 0 0 60px ${accent}08`
          : `0 30px 80px rgba(0,0,0,0.15)`,
      }}
      data-cursor="Voir"
    >
      <style>{`
        /* ---- Cursor movement ---- */
        @keyframes ecomCursor {
          0%        { transform: translate(320px, 360px); opacity: 0; }
          4%        { opacity: 1; }
          7%        { transform: translate(320px, 360px); }
          15%       { transform: translate(80px, 140px); }
          22%       { transform: translate(80px, 140px); }
          28%       { transform: translate(125px, 210px); }
          32%       { transform: translate(125px, 210px); }
          33%       { transform: translate(125px, 210px) scale(0.75); }
          35%       { transform: translate(125px, 210px) scale(1.05); }
          36%       { transform: translate(125px, 210px) scale(1); }
          44%       { transform: translate(125px, 210px); }
          52%       { transform: translate(270px, 140px); }
          58%       { transform: translate(270px, 140px); }
          64%       { transform: translate(310px, 210px); }
          68%       { transform: translate(310px, 210px); }
          69%       { transform: translate(310px, 210px) scale(0.75); }
          71%       { transform: translate(310px, 210px) scale(1.05); }
          72%       { transform: translate(310px, 210px) scale(1); }
          82%       { transform: translate(310px, 210px); }
          90%       { transform: translate(360px, 400px); opacity: 1; }
          96%       { opacity: 0; }
          100%      { transform: translate(360px, 400px); opacity: 0; }
        }

        /* ---- Click ripple (expands outward) ---- */
        @keyframes ecomRipple {
          0%, 31%, 67%, 100% { opacity: 0; transform: scale(0); }
          33%  { opacity: 0.8; transform: scale(0.2); }
          38%  { opacity: 0; transform: scale(2.5); }
          69%  { opacity: 0.8; transform: scale(0.2); }
          74%  { opacity: 0; transform: scale(2.5); }
        }

        /* ---- Second ripple ring (delayed) ---- */
        @keyframes ecomRipple2 {
          0%, 33%, 69%, 100% { opacity: 0; transform: scale(0); }
          35%  { opacity: 0.5; transform: scale(0.3); }
          41%  { opacity: 0; transform: scale(3); }
          71%  { opacity: 0.5; transform: scale(0.3); }
          77%  { opacity: 0; transform: scale(3); }
        }

        /* ---- Particles burst on click ---- */
        @keyframes ecomParticle1 {
          0%, 32%, 68%, 100% { opacity: 0; transform: translate(0,0) scale(0); }
          33%  { opacity: 1; transform: translate(0,0) scale(1); }
          38%  { opacity: 0; transform: translate(-18px,-22px) scale(0.3); }
          69%  { opacity: 1; transform: translate(0,0) scale(1); }
          74%  { opacity: 0; transform: translate(-18px,-22px) scale(0.3); }
        }
        @keyframes ecomParticle2 {
          0%, 32%, 68%, 100% { opacity: 0; transform: translate(0,0) scale(0); }
          33%  { opacity: 1; transform: translate(0,0) scale(1); }
          38%  { opacity: 0; transform: translate(20px,-18px) scale(0.3); }
          69%  { opacity: 1; transform: translate(0,0) scale(1); }
          74%  { opacity: 0; transform: translate(20px,-18px) scale(0.3); }
        }
        @keyframes ecomParticle3 {
          0%, 32%, 68%, 100% { opacity: 0; transform: translate(0,0) scale(0); }
          33%  { opacity: 1; transform: translate(0,0) scale(1); }
          39%  { opacity: 0; transform: translate(15px,20px) scale(0.2); }
          69%  { opacity: 1; transform: translate(0,0) scale(1); }
          75%  { opacity: 0; transform: translate(15px,20px) scale(0.2); }
        }
        @keyframes ecomParticle4 {
          0%, 32%, 68%, 100% { opacity: 0; transform: translate(0,0) scale(0); }
          33%  { opacity: 1; transform: translate(0,0) scale(1); }
          39%  { opacity: 0; transform: translate(-22px,14px) scale(0.2); }
          69%  { opacity: 1; transform: translate(0,0) scale(1); }
          75%  { opacity: 0; transform: translate(-22px,14px) scale(0.2); }
        }
        @keyframes ecomParticle5 {
          0%, 32.5%, 68.5%, 100% { opacity: 0; transform: translate(0,0) scale(0); }
          33.5%  { opacity: 1; transform: translate(0,0) scale(0.8); }
          39.5%  { opacity: 0; transform: translate(-8px,-28px) scale(0.1); }
          69.5%  { opacity: 1; transform: translate(0,0) scale(0.8); }
          75.5%  { opacity: 0; transform: translate(-8px,-28px) scale(0.1); }
        }

        /* ---- Card highlight glow ---- */
        @keyframes ecomGlow1 {
          0%, 12%  { box-shadow: 0 2px 8px rgba(0,0,0,0.04); transform: scale(1); }
          15%      { box-shadow: 0 8px 30px ${accent}25, 0 0 0 1px ${accent}30; transform: scale(1.02); }
          44%      { box-shadow: 0 8px 30px ${accent}25, 0 0 0 1px ${accent}30; transform: scale(1.02); }
          48%      { box-shadow: 0 2px 8px rgba(0,0,0,0.04); transform: scale(1); }
          100%     { box-shadow: 0 2px 8px rgba(0,0,0,0.04); transform: scale(1); }
        }
        @keyframes ecomGlow3 {
          0%, 49%  { box-shadow: 0 2px 8px rgba(0,0,0,0.04); transform: scale(1); }
          52%      { box-shadow: 0 8px 30px ${accent}25, 0 0 0 1px ${accent}30; transform: scale(1.02); }
          80%      { box-shadow: 0 8px 30px ${accent}25, 0 0 0 1px ${accent}30; transform: scale(1.02); }
          84%      { box-shadow: 0 2px 8px rgba(0,0,0,0.04); transform: scale(1); }
          100%     { box-shadow: 0 2px 8px rgba(0,0,0,0.04); transform: scale(1); }
        }

        /* ---- Button flash on click ---- */
        @keyframes ecomBtnFlash1 {
          0%, 32%, 37%, 100% { background: ${accent}12; color: ${accent}; }
          33% { background: ${accent}; color: #fff; }
          36% { background: ${accent}; color: #fff; }
        }
        @keyframes ecomBtnFlash3 {
          0%, 68%, 73%, 100% { background: ${accent}12; color: ${accent}; }
          69% { background: ${accent}; color: #fff; }
          72% { background: ${accent}; color: #fff; }
        }

        /* ---- Toast ---- */
        @keyframes ecomToast {
          0%, 35%  { transform: translateX(-50%) translateY(20px); opacity: 0; }
          38%      { transform: translateX(-50%) translateY(0); opacity: 1; }
          46%      { transform: translateX(-50%) translateY(0); opacity: 1; }
          49%      { transform: translateX(-50%) translateY(-10px); opacity: 0; }
          71%      { transform: translateX(-50%) translateY(20px); opacity: 0; }
          74%      { transform: translateX(-50%) translateY(0); opacity: 1; }
          82%      { transform: translateX(-50%) translateY(0); opacity: 1; }
          85%      { transform: translateX(-50%) translateY(-10px); opacity: 0; }
          100%     { opacity: 0; }
        }

        /* ---- Cart badge ---- */
        @keyframes ecomBadge {
          0%, 35%  { transform: scale(0); }
          38%      { transform: scale(1.4); }
          41%      { transform: scale(1); }
          71%      { transform: scale(1); }
          74%      { transform: scale(1.5); }
          77%      { transform: scale(1); }
          100%     { transform: scale(1); }
        }

        /* ---- Card flash overlay on click ---- */
        @keyframes ecomFlash1 {
          0%, 32%, 36%, 100% { opacity: 0; }
          33% { opacity: 0.6; }
          35% { opacity: 0; }
        }
        @keyframes ecomFlash3 {
          0%, 68%, 72%, 100% { opacity: 0; }
          69% { opacity: 0.6; }
          71% { opacity: 0; }
        }

        /* ---- Checkmark pop at cursor position ---- */
        @keyframes ecomCheckPop {
          0%, 32%, 68%, 100% { opacity: 0; transform: scale(0) rotate(-20deg); }
          34%  { opacity: 1; transform: scale(1.2) rotate(0deg); }
          37%  { opacity: 1; transform: scale(1) rotate(0deg); }
          42%  { opacity: 0; transform: scale(0.8) rotate(10deg); }
          70%  { opacity: 1; transform: scale(1.2) rotate(0deg); }
          73%  { opacity: 1; transform: scale(1) rotate(0deg); }
          78%  { opacity: 0; transform: scale(0.8) rotate(10deg); }
        }

        /* ---- Modal slide from right ---- */
        @keyframes ecomModal {
          0%, 30%   { transform: translateX(110%); opacity: 0; }
          35%       { transform: translateX(0); opacity: 1; }
          46%       { transform: translateX(0); opacity: 1; }
          50%       { transform: translateX(110%); opacity: 0; }
          66%       { transform: translateX(110%); opacity: 0; }
          71%       { transform: translateX(0); opacity: 1; }
          82%       { transform: translateX(0); opacity: 1; }
          86%       { transform: translateX(110%); opacity: 0; }
          100%      { transform: translateX(110%); opacity: 0; }
        }

        /* ---- Modal backdrop ---- */
        @keyframes ecomBackdrop {
          0%, 30%   { opacity: 0; }
          35%       { opacity: 1; }
          46%       { opacity: 1; }
          50%       { opacity: 0; }
          66%       { opacity: 0; }
          71%       { opacity: 1; }
          82%       { opacity: 1; }
          86%       { opacity: 0; }
          100%      { opacity: 0; }
        }

        /* ---- Modal checkmark draw ---- */
        @keyframes ecomModalCheck {
          0%, 33%   { stroke-dashoffset: 30; }
          38%       { stroke-dashoffset: 0; }
          46%       { stroke-dashoffset: 0; }
          50%       { stroke-dashoffset: 30; }
          69%       { stroke-dashoffset: 30; }
          74%       { stroke-dashoffset: 0; }
          82%       { stroke-dashoffset: 0; }
          86%       { stroke-dashoffset: 30; }
          100%      { stroke-dashoffset: 30; }
        }

        /* ---- Modal progress bar ---- */
        @keyframes ecomModalProgress {
          0%, 35%   { width: 0%; }
          46%       { width: 100%; }
          50%, 100% { width: 0%; }
        }
        @keyframes ecomModalProgress2 {
          0%, 71%   { width: 0%; }
          82%       { width: 100%; }
          86%, 100% { width: 0%; }
        }

        .ecom-play * {
          animation-play-state: ${playState} !important;
        }
      `}</style>

      {/* ---- Browser chrome ---- */}
      <div
        className="flex items-center gap-2 px-4 h-9 shrink-0"
        style={{
          background: isDark ? "#1a1a1a" : "#f0f0f0",
          borderBottom: `1px solid ${borderCol}`,
        }}
      >
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 mx-3 h-5 rounded-md flex items-center px-3" style={{ background: "rgba(0,0,0,0.05)" }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="mr-1.5 opacity-30">
            <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" stroke="#000" strokeWidth="2" />
          </svg>
          <span style={{ color: textSecondary, fontSize: "9px", letterSpacing: "0.05em" }}>
            shop.levisweb.net
          </span>
        </div>
        {/* Cart icon */}
        <div className="relative mr-1">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
          </svg>
          <span
            className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full flex items-center justify-center text-white font-bold"
            style={{
              background: accent,
              fontSize: "7px",
              animation: `ecomBadge 14s ease infinite`,
              animationPlayState: playState,
            }}
          >
            2
          </span>
        </div>
      </div>

      {/* ---- Store content (always white) ---- */}
      <div className="ecom-play relative" style={{ height: "calc(100% - 36px)", overflow: "hidden", background: storeBg }}>
        {/* Store header */}
        <div className="flex items-center justify-between px-5 py-2.5" style={{ borderBottom: `1px solid ${borderCol}` }}>
          <span style={{ color: textPrimary, fontSize: "12px", fontWeight: 800, letterSpacing: "-0.03em" }}>
            LEVIS<span style={{ color: accent }}>SHOP</span>
          </span>
          <div className="flex gap-4 items-center">
            {["Nouveautés", "Audio", "Wearables"].map((cat, i) => (
              <span
                key={cat}
                style={{
                  color: i === 0 ? accent : textSecondary,
                  fontSize: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  fontWeight: i === 0 ? 700 : 400,
                }}
              >
                {cat}
              </span>
            ))}
            {/* Search icon */}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </div>
        </div>

        {/* Product grid — 2x2 */}
        <div className="grid grid-cols-2 gap-3 p-3.5" style={{ height: "calc(100% - 42px)" }}>
          {PRODUCTS.map((product, i) => (
            <div
              key={i}
              className="rounded-xl flex flex-col overflow-hidden"
              style={{
                background: cardBg,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                animation:
                  i === 0 ? `ecomGlow1 14s ease infinite` :
                  i === 2 ? `ecomGlow3 14s ease infinite` : undefined,
              }}
            >
              {/* Product image — centered */}
              <div
                className="relative overflow-hidden flex items-center justify-center"
                style={{ flex: "1 1 0", minHeight: 0, background: "#f7f7f7" }}
              >
                <img
                  src={product.img}
                  alt={product.name}
                  loading="lazy"
                  className="w-[85%] h-[85%] object-contain drop-shadow-sm"
                />
                {product.tag && (
                  <span
                    className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-white font-bold"
                    style={{
                      fontSize: "6px",
                      background: product.tag === "-20%" ? "#ef4444" : accent,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {product.tag}
                  </span>
                )}
                {/* Flash overlay on click */}
                {(i === 0 || i === 2) && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at center, ${accent}40, transparent 70%)`,
                      opacity: 0,
                      animation: `${i === 0 ? "ecomFlash1" : "ecomFlash3"} 14s ease infinite`,
                    }}
                  />
                )}
              </div>
              {/* Product info */}
              <div className="px-3 py-2">
                <div className="font-semibold truncate" style={{ fontSize: "9px", color: textPrimary, marginBottom: "2px" }}>
                  {product.name}
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: "10px", fontWeight: 800, color: textPrimary }}>
                    {product.price}&euro;
                  </span>
                  <span
                    className="px-2.5 py-1 rounded-full font-bold cursor-pointer"
                    style={{
                      fontSize: "6.5px",
                      background: `${accent}12`,
                      color: accent,
                      letterSpacing: "0.04em",
                      animation:
                        i === 0 ? `ecomBtnFlash1 14s ease infinite` :
                        i === 2 ? `ecomBtnFlash3 14s ease infinite` : undefined,
                    }}
                  >
                    Ajouter +
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ---- Modal backdrop ---- */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(2px)",
            zIndex: 8,
            opacity: 0,
            animation: `ecomBackdrop 14s ease infinite`,
            animationPlayState: playState,
          }}
        />

        {/* ---- Add to cart modal ---- */}
        <div
          className="absolute top-[12%] right-2 bottom-[12%] w-[52%] rounded-xl flex flex-col overflow-hidden pointer-events-none"
          style={{
            background: "#fff",
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            zIndex: 9,
            transform: "translateX(110%)",
            animation: `ecomModal 14s ease infinite`,
            animationPlayState: playState,
          }}
        >
          {/* Modal header */}
          <div className="flex items-center justify-between px-3 py-2" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18" />
              </svg>
              <span style={{ fontSize: "8px", fontWeight: 700, color: textPrimary }}>Panier</span>
            </div>
            <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.05)" }}>
              <span style={{ fontSize: "8px", color: textSecondary, lineHeight: 1 }}>&times;</span>
            </div>
          </div>

          {/* Modal body — product added */}
          <div className="flex-1 flex flex-col items-center justify-center px-3 py-2 gap-2">
            {/* Animated checkmark circle */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: `${accent}12` }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12l5 5L19 7"
                  stroke={accent}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: 30,
                    strokeDashoffset: 30,
                    animation: `ecomModalCheck 14s ease infinite`,
                    animationPlayState: playState,
                  }}
                />
              </svg>
            </div>
            <span style={{ fontSize: "9px", fontWeight: 700, color: textPrimary }}>
              Ajouté au panier !
            </span>
            <span style={{ fontSize: "6px", color: textSecondary, textAlign: "center", lineHeight: 1.5 }}>
              Casque Audio Pro &times; 1
            </span>

            {/* Mini product preview */}
            <div
              className="w-full rounded-lg p-2 flex items-center gap-2 mt-1"
              style={{ background: "#f7f7f7" }}
            >
              <div
                className="w-8 h-8 rounded-md flex-shrink-0 overflow-hidden"
                style={{ background: "#eee" }}
              >
                <img
                  src={PRODUCTS[0].img}
                  alt=""
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div style={{ fontSize: "7px", fontWeight: 600, color: textPrimary }} className="truncate">Casque Audio Pro</div>
                <div style={{ fontSize: "6px", color: textSecondary }}>Qty: 1</div>
              </div>
              <span style={{ fontSize: "8px", fontWeight: 800, color: textPrimary }}>189&euro;</span>
            </div>
          </div>

          {/* Modal footer */}
          <div className="px-3 py-2" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
            {/* Progress bar auto-close */}
            <div className="w-full h-0.5 rounded-full mb-2 overflow-hidden" style={{ background: "rgba(0,0,0,0.06)" }}>
              <div className="h-full rounded-full" style={{ background: accent, animation: `ecomModalProgress 14s ease infinite, ecomModalProgress2 14s ease infinite`, animationPlayState: playState }} />
            </div>
            <div
              className="w-full py-1.5 rounded-lg text-center text-white font-bold"
              style={{ background: accent, fontSize: "7px" }}
            >
              Voir le panier (189&euro;)
            </div>
            <div className="text-center mt-1">
              <span style={{ fontSize: "5.5px", color: textSecondary }}>Continuer les achats</span>
            </div>
          </div>
        </div>

        {/* ---- Toast notification ---- */}
        <div
          className="absolute bottom-4 left-1/2 flex items-center gap-2 px-4 py-2 rounded-xl"
          style={{
            background: "#ffffff",
            border: `1px solid ${accent}30`,
            boxShadow: `0 12px 40px rgba(0,0,0,0.12), 0 0 0 1px ${accent}10`,
            animation: `ecomToast 14s ease infinite`,
            animationPlayState: playState,
            zIndex: 10,
            whiteSpace: "nowrap",
          }}
        >
          <span
            className="w-4 h-4 rounded-full flex items-center justify-center text-white flex-shrink-0"
            style={{ background: accent, fontSize: "8px" }}
          >
            &#10003;
          </span>
          <span style={{ fontSize: "8px", color: textPrimary, fontWeight: 600 }}>
            Ajouté au panier !
          </span>
        </div>

        {/* ---- Animated cursor + effects ---- */}
        <div
          className="absolute top-0 left-0 pointer-events-none"
          style={{
            zIndex: 20,
            animation: `ecomCursor 14s ease-in-out infinite`,
            animationPlayState: playState,
            willChange: "transform",
          }}
        >
          {/* Cursor SVG — clean black pointer */}
          <svg width="20" height="24" viewBox="0 0 20 24" fill="none" style={{ filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.25))" }}>
            <path
              d="M1.5 1L1.5 17.5L6 13L11 22L14 20.5L9 12L15 11L1.5 1Z"
              fill="#111"
              stroke="#fff"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>

          {/* Checkmark pop on click */}
          <div
            className="absolute flex items-center justify-center"
            style={{
              top: "-14px",
              left: "16px",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              background: accent,
              boxShadow: `0 2px 12px ${accent}60`,
              animation: `ecomCheckPop 14s ease infinite`,
              animationPlayState: playState,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M5 12l5 5L19 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Ripple ring 1 */}
          <div
            className="absolute top-2 left-1 w-8 h-8 rounded-full"
            style={{
              border: `2px solid ${accent}`,
              animation: `ecomRipple 14s ease infinite`,
              animationPlayState: playState,
            }}
          />
          {/* Ripple ring 2 (delayed) */}
          <div
            className="absolute top-1 left-0 w-10 h-10 rounded-full"
            style={{
              border: `1px solid ${accent}60`,
              animation: `ecomRipple2 14s ease infinite`,
              animationPlayState: playState,
            }}
          />

          {/* Particles */}
          {[
            { anim: "ecomParticle1", color: accent },
            { anim: "ecomParticle2", color: "#22c55e" },
            { anim: "ecomParticle3", color: accent },
            { anim: "ecomParticle4", color: "#f59e0b" },
            { anim: "ecomParticle5", color: accent },
          ].map((p, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                top: "8px",
                left: "6px",
                width: "4px",
                height: "4px",
                background: p.color,
                animation: `${p.anim} 14s ease infinite`,
                animationPlayState: playState,
                boxShadow: `0 0 6px ${p.color}80`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
