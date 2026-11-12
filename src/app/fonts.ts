import { Sofia_Sans_Condensed, Sora, Spline_Sans_Mono } from "next/font/google";
import localFont from "next/font/local";

// Self-hosted via next/font: no render-blocking request to Google / Fontshare,
// fonts are preloaded and served from levisweb.net with size-adjusted fallbacks.

export const sofiaSansCondensed = Sofia_Sans_Condensed({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-sofia",
});

export const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sora",
});

export const splineSansMono = Spline_Sans_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-spline-mono",
  preload: false, // only used below the fold (services section)
});

export const clashDisplay = localFont({
  src: [
    { path: "../fonts/clash-display/ClashDisplay-200.woff2", weight: "200" },
    { path: "../fonts/clash-display/ClashDisplay-300.woff2", weight: "300" },
    { path: "../fonts/clash-display/ClashDisplay-400.woff2", weight: "400" },
    { path: "../fonts/clash-display/ClashDisplay-500.woff2", weight: "500" },
    { path: "../fonts/clash-display/ClashDisplay-600.woff2", weight: "600" },
    { path: "../fonts/clash-display/ClashDisplay-700.woff2", weight: "700" },
  ],
  display: "swap",
  variable: "--font-clash",
});

export const fontVariables = [
  sofiaSansCondensed.variable,
  sora.variable,
  splineSansMono.variable,
  clashDisplay.variable,
].join(" ");
