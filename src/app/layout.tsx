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
								const isMobileWebView = /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) && 
									(window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches);
								
								// Vérifier les préférences système
								const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
								
								// Forcer le thème sombre si nécessaire
								if (prefersDark || isMobileWebView) {
									document.documentElement.classList.add('dark');
									document.documentElement.setAttribute('data-theme', 'dark');
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
