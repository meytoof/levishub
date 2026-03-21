import SessionWrapper from "@/components/auth/SessionWrapper";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LevisWeb | Agence Web SEO Savoie — Création Sites Modernes",
  description:
    "Agence web SEO en Savoie & Chartreuse. Création sites modernes, refonte, e-commerce sécurisé & maintenance. Devis gratuit, résultats concrets.",
  keywords:
    "agence digitale SEO, spécialiste SEO, création site internet moderne, refonte site web, e-commerce sécurisé, performance web, maintenance site web, Savoie, Chartreuse, Grenoble",
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "LevisWeb | Agence Web SEO Savoie — Création Sites Modernes",
    description:
      "Agence web SEO en Savoie & Chartreuse. Création sites modernes, refonte, e-commerce sécurisé & maintenance. Devis gratuit, résultats concrets.",
    url: "https://levisweb.net",
    images: [
      {
        url: "https://levisweb.net/images/logo.png",
        width: 1200,
        height: 630,
        alt: "LevisWeb — Agence Web SEO Savoie | Création Sites Modernes",
      },
    ],
    siteName: "LevisWeb",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "LevisWeb | Agence Web SEO Savoie — Création Sites Modernes",
    description:
      "Agence web SEO en Savoie & Chartreuse. Création sites modernes, refonte, e-commerce sécurisé & maintenance. Devis gratuit, résultats concrets.",
    images: ["https://levisweb.net/images/logo.png"],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://levisweb.net/#website",
      url: "https://levisweb.net",
      name: "LevisWeb",
      description: "Agence web SEO en Savoie & Chartreuse",
      inLanguage: "fr-FR",
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://levisweb.net/#business",
      name: "LevisWeb",
      description: "Agence web SEO spécialisée en création de sites modernes, Savoie & Chartreuse.",
      url: "https://levisweb.net",
      address: {
        "@type": "PostalAddress",
        addressRegion: "Savoie",
        addressCountry: "FR",
      },
      areaServed: ["Savoie", "Isère", "Chartreuse", "Grenoble"],
      serviceType: ["Création de site web", "Référencement SEO", "Refonte web", "E-commerce"],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sofia+Sans+Condensed:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
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
        <Toaster position="top-right" richColors closeButton duration={4000} />
      </body>
    </html>
  );
}
