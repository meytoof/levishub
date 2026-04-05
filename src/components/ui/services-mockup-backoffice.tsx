"use client";

interface Props {
  accent: string;
  isDark: boolean;
}

/* ----------------------------------------------------------------
   Animated dashboard mockup for the Backoffice panel.

   Bars and sparkline use GSAP classes (p3-bar, p3-spark-line,
   p3-spark-fill, p3-stat) so the parent can drive them via
   ScrollTrigger containerAnimation for forward/reverse on scroll.

   Only pulsing indicators use CSS animations (lightweight).
   ---------------------------------------------------------------- */

const STATS = [
  { label: "Revenus", value: "12,847", suffix: "\u20ac", trend: "+14%" },
  { label: "Commandes", value: "384", suffix: "", trend: "+8%" },
  { label: "Clients", value: "1,206", suffix: "", trend: "+23%" },
];

const BAR_DATA = [35, 52, 45, 68, 58, 82, 75, 90, 65, 78, 88, 95];

const NAV_ITEMS = ["Dashboard", "Commandes", "Clients", "Produits", "Analytics"];

export function ServicesMockupBackoffice({ accent, isDark }: Props) {
  const bg = isDark ? "#0a0a0a" : "#f8f8f8";
  const sidebarBg = isDark ? "#111111" : "#f0f0f0";
  const cardBg = isDark ? "#141414" : "#ffffff";
  const textPrimary = isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)";
  const textSecondary = isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.4)";
  const borderCol = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";

  // Sparkline path
  const sparkPoints = [10, 35, 25, 50, 40, 65, 45, 70, 55, 75, 60, 80, 72, 85];
  const sparkW = 200;
  const sparkH = 50;
  const sparkPath = sparkPoints
    .map((y, i) => {
      const x = (i / (sparkPoints.length - 1)) * sparkW;
      const yPos = sparkH - (y / 100) * sparkH;
      return `${i === 0 ? "M" : "L"}${x},${yPos}`;
    })
    .join(" ");

  return (
    <div
      className="p3-code-block relative w-[90%] h-[78%] rounded-2xl overflow-hidden flex"
      style={{
        background: bg,
        border: `1px solid ${accent}30`,
        boxShadow: isDark
          ? `0 25px 60px rgba(0,0,0,0.6), 0 0 40px ${accent}10`
          : `0 25px 60px rgba(0,0,0,0.12)`,
      }}
      data-cursor="Voir"
    >
      <style>{`
        @keyframes boStatusPulse {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.4; }
        }
        @keyframes boDotBlink {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px ${accent}80; }
          50%      { opacity: 0.6; box-shadow: 0 0 2px ${accent}40; }
        }
      `}</style>

      {/* ---- Sidebar ---- */}
      <div
        className="shrink-0 flex flex-col py-3 px-2.5"
        style={{ width: "72px", background: sidebarBg, borderRight: `1px solid ${borderCol}` }}
      >
        <div className="flex items-center justify-center mb-4">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-white" style={{ background: accent, fontSize: "9px" }}>
            LW
          </div>
        </div>
        <div className="space-y-1 flex-1">
          {NAV_ITEMS.map((item, i) => (
            <div key={item} className="flex items-center gap-1.5 px-2 py-1.5 rounded-md" style={{ background: i === 0 ? `${accent}18` : "transparent" }}>
              <div className="w-2.5 h-2.5 rounded-sm" style={{ background: i === 0 ? accent : textSecondary, opacity: i === 0 ? 1 : 0.5 }} />
              <span style={{ fontSize: "6px", color: i === 0 ? accent : textSecondary, fontWeight: i === 0 ? 600 : 400, letterSpacing: "0.02em" }}>
                {item}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5 px-2">
          <div className="w-5 h-5 rounded-full flex items-center justify-center text-white font-bold" style={{ background: `${accent}60`, fontSize: "6px" }}>QL</div>
          <div>
            <div style={{ fontSize: "5px", color: textPrimary, fontWeight: 600 }}>Admin</div>
            <div className="flex items-center gap-1" style={{ fontSize: "4px", color: textSecondary }}>
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#22c55e", animation: "boDotBlink 2s ease infinite" }} />
              En ligne
            </div>
          </div>
        </div>
      </div>

      {/* ---- Main content ---- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: `1px solid ${borderCol}` }}>
          <span style={{ color: textPrimary, fontSize: "9px", fontWeight: 700 }}>Dashboard</span>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md" style={{ fontSize: "6px", background: `${accent}15`, color: accent, fontWeight: 600 }}>
              Aujourd&apos;hui
            </span>
            <span style={{ fontSize: "6px", color: textSecondary }}>7 jours</span>
            <span style={{ fontSize: "6px", color: textSecondary }}>30 jours</span>
          </div>
        </div>

        {/* Stats row — GSAP animated via p3-stat class */}
        <div className="flex gap-2.5 px-4 py-3">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="p3-stat flex-1 rounded-xl p-2.5"
              style={{ background: cardBg, border: `1px solid ${borderCol}`, opacity: 0, transform: "translateY(10px)" }}
            >
              <div style={{ fontSize: "5px", color: textSecondary, marginBottom: "3px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                {stat.label}
              </div>
              <div className="flex items-baseline gap-1">
                <span style={{ fontSize: "13px", fontWeight: 800, color: textPrimary }}>{stat.value}</span>
                <span style={{ fontSize: "7px", color: textSecondary }}>{stat.suffix}</span>
              </div>
              <span style={{ fontSize: "6px", color: "#22c55e", fontWeight: 600 }}>{stat.trend}</span>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="flex gap-2.5 px-4 flex-1 pb-3 min-h-0">
          {/* Bar chart */}
          <div className="flex-[1.4] rounded-xl p-3 flex flex-col" style={{ background: cardBg, border: `1px solid ${borderCol}` }}>
            <div className="flex items-center justify-between mb-2">
              <span style={{ fontSize: "7px", fontWeight: 700, color: textPrimary }}>Revenus mensuels</span>
              <span style={{ fontSize: "5px", color: textSecondary }}>Jan — Déc</span>
            </div>
            <div className="flex-1 flex items-end gap-[3px] min-h-0">
              {BAR_DATA.map((h, i) => (
                <div
                  key={i}
                  className="p3-bar flex-1 rounded-t-sm"
                  style={{
                    height: `${h}%`,
                    background: i === BAR_DATA.length - 1
                      ? accent
                      : `${accent}${i >= BAR_DATA.length - 3 ? "50" : "25"}`,
                    transformOrigin: "bottom",
                    transform: "scaleY(0)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Sparkline + activity */}
          <div className="flex-1 rounded-xl p-3 flex flex-col" style={{ background: cardBg, border: `1px solid ${borderCol}` }}>
            <div className="flex items-center justify-between mb-2">
              <span style={{ fontSize: "7px", fontWeight: 700, color: textPrimary }}>Trafic</span>
              <span className="flex items-center gap-1" style={{ fontSize: "5px", color: "#22c55e" }}>
                <span className="w-1 h-1 rounded-full inline-block" style={{ background: "#22c55e", animation: "boStatusPulse 2s ease infinite" }} />
                Live
              </span>
            </div>
            <svg viewBox={`0 0 ${sparkW} ${sparkH}`} className="w-full mb-2" style={{ height: "40px" }} preserveAspectRatio="none">
              <defs>
                <linearGradient id="sparkGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={accent} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={accent} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                className="p3-spark-fill"
                d={`${sparkPath} L${sparkW},${sparkH} L0,${sparkH} Z`}
                fill="url(#sparkGrad3)"
                style={{ opacity: 0 }}
              />
              <path
                className="p3-spark-line"
                d={sparkPath}
                fill="none"
                stroke={accent}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ strokeDasharray: 600, strokeDashoffset: 600 }}
              />
            </svg>
            <div className="space-y-1.5 flex-1">
              {[
                { text: "Nouvelle commande #1247", time: "2min" },
                { text: "Client inscrit", time: "8min" },
                { text: "Paiement confirmé", time: "12min" },
              ].map((item, i) => (
                <div key={i} className="p3-activity flex items-center justify-between" style={{ opacity: 0, transform: "translateY(6px)" }}>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full" style={{ background: accent }} />
                    <span style={{ fontSize: "5px", color: textPrimary }}>{item.text}</span>
                  </div>
                  <span style={{ fontSize: "4px", color: textSecondary }}>{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
