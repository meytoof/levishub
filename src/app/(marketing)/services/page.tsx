import { ServicesSlidesPinning } from "@/components/ui/services-slides-pinning";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title:
    "Services Web Savoie | SEO, Vitrine & E-commerce \u2014 LevisWeb",
  description:
    "Agence web Savoie : création site vitrine, e-commerce sécurisé, backoffice sur mesure, refonte web. SEO inclus, maintenance continue. Devis gratuit.",
  keywords:
    "services agence digitale SEO, spécialiste SEO, site vitrine moderne, e-commerce sécurisé, backoffice sur mesure, refonte site web, performance web, maintenance site web, agence de communication, LevisWeb, Chambéry, Isère, Savoie",
  openGraph: {
    title:
      "Services Web Savoie | SEO, Vitrine & E-commerce \u2014 LevisWeb",
    description:
      "Services d'agence digitale spécialisée SEO : sites vitrine modernes, e-commerce sécurisé, backoffice sur mesure, refonte site web. Performance et design.",
    url: "https://levisweb.net/services",
    type: "website",
    images: [{ url: "https://levisweb.net/images/logo.png", width: 1200, height: 630, alt: "LevisWeb \u2014 Services Web Savoie" }],
  },
};

export default function Services() {
  return (
    <main className="min-h-svh w-full overflow-x-hidden bg-white dark:bg-black">
      <Script id="ld-json-services" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Services LevisWeb",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Site vitrine" },
            { "@type": "ListItem", position: 2, name: "E-commerce" },
            {
              "@type": "ListItem",
              position: 3,
              name: "Backoffice sur mesure",
            },
          ],
        })}
      </Script>
      <ServicesSlidesPinning />
    </main>
  );
}
