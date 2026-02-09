import { ServicesSlidesPinning } from "@/components/ui/services-slides-pinning";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title:
    "Services - Agence Digitale SEO | Sites Modernes & E-commerce | LevisWeb",
  description:
    "Services d'agence digitale spécialisée SEO : sites vitrine modernes, e-commerce sécurisé, backoffice sur mesure, refonte site web. Performance et design pour votre entreprise. Chambéry, Isère, Savoie.",
  keywords:
    "services agence digitale SEO, spécialiste SEO, site vitrine moderne, e-commerce sécurisé, backoffice sur mesure, refonte site web, performance web, maintenance site web, agence de communication, LevisWeb, Chambéry, Isère, Savoie",
  openGraph: {
    title:
      "Services - Agence Digitale SEO | Sites Modernes & Performance | LevisWeb",
    description:
      "Services d'agence digitale spécialisée SEO : sites vitrine modernes, e-commerce sécurisé, backoffice sur mesure, refonte site web. Performance et design.",
    url: "https://levisweb.net/services",
    type: "website",
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
