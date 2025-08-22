import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				// Couleurs optimisées pour le contraste avec le fond cyan
				background: {
					DEFAULT: "#ffffff",
					secondary: "#f0fdfa",
				},
				foreground: {
					DEFAULT: "#0c4a6e", // Bleu très foncé pour contraste optimal
					secondary: "#1e40af", // Bleu foncé pour contraste élevé
				},
				card: {
					DEFAULT: "#ffffff",
					secondary: "#f0fdfa",
				},
				cardForeground: {
					DEFAULT: "#0c4a6e", // Bleu très foncé pour contraste optimal
					secondary: "#1e40af", // Bleu foncé pour contraste élevé
				},
				muted: {
					DEFAULT: "#e0f2fe", // Cyan très clair
					secondary: "#bae6fd", // Cyan clair
				},
				mutedForeground: {
					DEFAULT: "#0369a1", // Bleu foncé pour contraste élevé
					secondary: "#0284c7", // Bleu moyen pour contraste bon
				},
				accent: {
					DEFAULT: "#e0f2fe", // Cyan très clair
					secondary: "#bae6fd", // Cyan clair
				},
				accentForeground: {
					DEFAULT: "#0c4a6e", // Bleu très foncé pour contraste optimal
					secondary: "#1e40af", // Bleu foncé pour contraste élevé
				},
				border: "#0284c7", // Bleu moyen pour contraste bon
				input: "#0284c7", // Bleu moyen pour contraste bon
				ring: "#0c4a6e", // Bleu très foncé pour contraste optimal
			},
		},
	},
	plugins: [],
};

export default config;
