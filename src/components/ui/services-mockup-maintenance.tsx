"use client";

interface Props {
  accent: string;
  isDark: boolean;
}

/* ----------------------------------------------------------------
   Maintenance panel mockup — zoomed in, large & readable.
   Top:    Health status bar with shield + live indicators
   Center: Terminal with large log lines appearing sequentially
   Bottom: Health gauges (CPU, RAM, Disk, Uptime)

   Bars + shield use GSAP classes (p4-health-bar, p4-shield,
   p4-log-line) for scroll-driven forward/reverse animation.
   ---------------------------------------------------------------- */

const LOG_LINES = [
  { status: "ok", text: "SSL certificate renewed" },
  { status: "ok", text: "Database backup completed — 2.4 GB" },
  { status: "ok", text: "Dependencies updated — 0 vulns" },
  { status: "ok", text: "CDN cache purged — 847 assets" },
  { status: "ok", text: "Security scan passed" },
  { status: "warn", text: "Disk usage 68% — threshold 80%" },
  { status: "ok", text: "Lighthouse score: 98/100" },
  { status: "ok", text: "Uptime: 99.98% over 30 days" },
];

const HEALTH_BARS = [
  { label: "CPU", value: 23, color: "#22c55e" },
  { label: "RAM", value: 45, color: "#22c55e" },
  { label: "Disk", value: 68, color: "#f59e0b" },
  { label: "Uptime", value: 99.9, color: "#22c55e" },
];

export function ServicesMockupMaintenance({ accent, isDark }: Props) {
  const borderCol = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";

  // Total animation: 18s loop, each log line gets a 2.25s slot
  const totalDuration = 18;
  const lineDelay = totalDuration / LOG_LINES.length;

  return (
    <div
      className="relative w-[90%] h-[78%] rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: isDark ? "#0a0a0a" : "#f8f8f8",
        border: `1px solid ${accent}30`,
        boxShadow: isDark
          ? `0 25px 60px rgba(0,0,0,0.6), 0 0 40px ${accent}10`
          : `0 25px 60px rgba(0,0,0,0.12)`,
      }}
      data-cursor="Voir"
    >
      <style>{`
        @keyframes maintTermLine {
          0%   { opacity: 0; transform: translateX(-8px); }
          8%   { opacity: 1; transform: translateX(0); }
          80%  { opacity: 1; }
          92%  { opacity: 0.35; }
          100% { opacity: 0.35; }
        }
        @keyframes maintCursorBlink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes maintShieldPulse {
          0%, 100% { filter: drop-shadow(0 0 6px ${accent}40); }
          50%      { filter: drop-shadow(0 0 16px ${accent}80); }
        }
        @keyframes maintDotPulse {
          0%, 100% { box-shadow: 0 0 4px #22c55e80; }
          50%      { box-shadow: 0 0 12px #22c55ecc; }
        }
        @keyframes maintBarGrow {
          from { width: 0%; }
        }
      `}</style>

      {/* ---- Top status bar ---- */}
      <div
        className="flex items-center justify-between px-5 py-3 shrink-0"
        style={{
          background: isDark ? "#0e0e0e" : "#f2f2f2",
          borderBottom: `1px solid ${borderCol}`,
        }}
      >
        <div className="flex items-center gap-3">
          {/* Shield icon */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            className="p4-shield"
            style={{ animation: "maintShieldPulse 3s ease infinite" }}
          >
            <path
              d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"
              fill={`${accent}20`}
              stroke={accent}
              strokeWidth="1.5"
            />
            <path d="M9 12l2 2 4-4" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: isDark ? "#fff" : "#111" }}>
              Système protégé
            </div>
            <div className="flex items-center gap-1.5" style={{ fontSize: "8px", color: "#22c55e", marginTop: "1px" }}>
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ background: "#22c55e", animation: "maintDotPulse 2s ease infinite" }}
              />
              Tous les services opérationnels
            </div>
          </div>
        </div>
        <div
          className="px-3 py-1.5 rounded-lg"
          style={{ background: `${accent}12`, border: `1px solid ${accent}25` }}
        >
          <span style={{ fontSize: "8px", fontWeight: 600, color: accent }}>
            Dernière vérif. : 3 min
          </span>
        </div>
      </div>

      {/* ---- Terminal ---- */}
      <div className="flex-1 flex flex-col min-h-0" style={{ background: isDark ? "#060606" : "#111111" }}>
        {/* Terminal header */}
        <div
          className="flex items-center gap-2 px-4 py-2 shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", fontFamily: "monospace", marginLeft: "4px" }}>
            levisweb-monitor v2.1
          </span>
        </div>

        {/* Terminal body — scrollable area with large text */}
        <div className="flex-1 px-4 py-3 overflow-hidden font-mono">
          {/* Header line */}
          <div
            className="mb-3 pb-2"
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              fontSize: "9px",
              color: `${accent}90`,
              letterSpacing: "0.08em",
              fontWeight: 600,
            }}
          >
            &#9632; MAINTENANCE MONITOR
          </div>

          {/* Log lines — large and readable */}
          <div className="space-y-2">
            {LOG_LINES.map((line, i) => (
              <div
                key={i}
                className="p4-log-line flex items-center gap-2.5"
                style={{
                  opacity: 0,
                  animation: `maintTermLine ${totalDuration}s ease ${i * lineDelay}s infinite`,
                }}
              >
                <span
                  className="font-bold flex-shrink-0"
                  style={{
                    fontSize: "9px",
                    color: line.status === "ok" ? "#22c55e" : "#f59e0b",
                  }}
                >
                  {line.status === "ok" ? "[OK]" : "[!!]"}
                </span>
                <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.65)", lineHeight: 1.4 }}>
                  {line.text}
                </span>
              </div>
            ))}
          </div>

          {/* Blinking cursor */}
          <div className="mt-3 flex items-center gap-1.5">
            <span style={{ fontSize: "10px", color: `${accent}70` }}>$</span>
            <span
              className="inline-block w-2 h-4"
              style={{
                background: accent,
                animation: "maintCursorBlink 1s step-end infinite",
              }}
            />
          </div>
        </div>
      </div>

      {/* ---- Bottom health bars ---- */}
      <div
        className="grid grid-cols-4 gap-3 px-5 py-3 shrink-0"
        style={{
          background: isDark ? "#0e0e0e" : "#f2f2f2",
          borderTop: `1px solid ${borderCol}`,
        }}
      >
        {HEALTH_BARS.map((bar, i) => (
          <div key={bar.label}>
            <div className="flex items-center justify-between mb-1.5">
              <span
                style={{
                  fontSize: "8px",
                  fontWeight: 700,
                  color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {bar.label}
              </span>
              <span style={{ fontSize: "10px", fontWeight: 800, color: bar.color }}>
                {bar.value}%
              </span>
            </div>
            <div
              className="w-full rounded-full overflow-hidden"
              style={{
                height: "6px",
                background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)",
              }}
            >
              <div
                className="p4-health-bar h-full rounded-full"
                style={{
                  width: `${bar.value}%`,
                  background: bar.color,
                  animation: `maintBarGrow 1s ease ${0.3 + i * 0.15}s both`,
                  boxShadow: `0 0 8px ${bar.color}40`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
