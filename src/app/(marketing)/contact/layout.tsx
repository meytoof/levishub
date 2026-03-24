import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact LevisWeb | Devis Gratuit — Agence Web Savoie",
  description: "Contactez LevisWeb pour votre projet web en Savoie & Chartreuse. Devis gratuit, réponse sous 24h. Création site vitrine, e-commerce, SEO & maintenance.",
  openGraph: {
    title: "Contact LevisWeb | Devis Gratuit — Agence Web Savoie",
    description: "Contactez LevisWeb pour votre projet web en Savoie & Chartreuse. Devis gratuit, réponse sous 24h.",
    url: "https://levisweb.net/contact",
    type: "website",
    images: [{ url: "https://levisweb.net/images/logo.png", width: 1200, height: 630, alt: "Contact LevisWeb" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact LevisWeb | Devis Gratuit — Agence Web Savoie",
    description: "Contactez LevisWeb pour votre projet web en Savoie & Chartreuse. Devis gratuit, réponse sous 24h.",
    images: ["https://levisweb.net/images/logo.png"],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}