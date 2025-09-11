import SessionWrapper from "@/components/auth/SessionWrapper";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "LevisWeb - Développement Web Freelance",
	description: "Sites modernes, rapides et animés avec backoffice sur mesure",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="fr" suppressHydrationWarning>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `
							// Détection automatique du thème sombre pour les WebViews (Messenger, etc.)
							(function() {
								// Vérifier si on est dans un WebView mobile
								const isMobileWebView = /Mobile|Android|iPhone|iPad/.test(navigator.userAgent);
								
								// Vérifier les préférences système
								const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
								
								// Forcer le thème sombre si nécessaire
								if (prefersDark || isMobileWebView) {
									document.documentElement.classList.add('dark');
									document.documentElement.setAttribute('data-theme', 'dark');
									
									// Forcer le style directement sur le body
									document.body.style.background = 'linear-gradient(180deg, #000000 0%, #0a0a0a 25%, #1a1a1a 50%, #0a0a0a 75%, #000000 100%)';
									document.body.style.backgroundImage = 'radial-gradient(ellipse at 20% -10%, hsl(258 96% 67% / 0.4), transparent 50%), radial-gradient(ellipse at 100% 0%, hsl(333 93% 56% / 0.3), transparent 50%), radial-gradient(ellipse at 50% 50%, hsl(280 100% 50% / 0.2), transparent 60%)';
									document.body.style.backgroundAttachment = 'fixed';
									document.body.style.backgroundSize = '100% 100vh';
									document.body.style.backgroundRepeat = 'repeat-y';
								}
							})();
						`,
					}}
				/>
			</head>
			<body className={inter.className} suppressHydrationWarning>
				<SessionWrapper>{children}</SessionWrapper>
				<Toaster
					position="top-right"
					richColors
					closeButton
					duration={4000}
				/>
			</body>
		</html>
	);
}
