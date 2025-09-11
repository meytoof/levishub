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
							// Force le thème clair pour les WebViews (Messenger, etc.)
							(function() {
								// Détecter si on est dans un WebView mobile
								const isWebView = /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) && 
									(window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches);
								
								// Forcer le thème clair dans les WebViews
								if (isWebView) {
									// Supprimer les classes dark
									document.documentElement.classList.remove('dark');
									document.documentElement.removeAttribute('data-theme');
									
									// Forcer le thème clair
									document.documentElement.style.background = 'linear-gradient(180deg, #ffffff 0%, #e0f2fe 25%, #bae6fd 50%, #e0f2fe 75%, #ffffff 100%)';
									document.documentElement.style.backgroundImage = 'radial-gradient(ellipse at 20% -10%, hsl(187 100% 70% / 0.4), transparent 50%), radial-gradient(ellipse at 100% 0%, hsl(183 100% 65% / 0.35), transparent 50%)';
									document.documentElement.style.backgroundAttachment = 'fixed';
									document.documentElement.style.backgroundSize = '100% 100vh';
									document.documentElement.style.backgroundRepeat = 'repeat-y';
									
									// Forcer le style sur body
									document.body.style.background = 'linear-gradient(180deg, #ffffff 0%, #e0f2fe 25%, #bae6fd 50%, #e0f2fe 75%, #ffffff 100%)';
									document.body.style.backgroundImage = 'radial-gradient(ellipse at 20% -10%, hsl(187 100% 70% / 0.4), transparent 50%), radial-gradient(ellipse at 100% 0%, hsl(183 100% 65% / 0.35), transparent 50%)';
									document.body.style.backgroundAttachment = 'fixed';
									document.body.style.backgroundSize = '100% 100vh';
									document.body.style.backgroundRepeat = 'repeat-y';
									document.body.style.color = '#000000';
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
