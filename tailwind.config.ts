import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: ["class"],
	theme: {
		extend: {
			colors: {
				// Couleurs standard pour les thèmes
				background: {
					DEFAULT: "#ffffff",
					secondary: "#f8fafc",
				},
				foreground: {
					DEFAULT: "#0f172a",
					secondary: "#475569",
				},
				card: {
					DEFAULT: "#ffffff",
					secondary: "#f8fafc",
				},
				cardForeground: {
					DEFAULT: "#0f172a",
					secondary: "#475569",
				},
				muted: {
					DEFAULT: "#f1f5f9",
					secondary: "#e2e8f0",
				},
				mutedForeground: {
					DEFAULT: "#64748b",
					secondary: "#94a3b8",
				},
				accent: {
					DEFAULT: "#f1f5f9",
					secondary: "#e2e8f0",
				},
				accentForeground: {
					DEFAULT: "#0f172a",
					secondary: "#475569",
				},
				border: "#e2e8f0",
				input: "#e2e8f0",
				ring: "#0f172a",
			},
		},
	},
	plugins: [],
};

export default config;
