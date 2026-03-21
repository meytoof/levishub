import type { Metadata } from "next";
import { PricingPageContent } from "@/components/marketing/pricing-page-content";

export const metadata: Metadata = {
  title: "Tarifs LevisWeb | Site vitrine dès 1 000 € — Agence Web Savoie",
  description:
    "Tarifs clairs : site vitrine dès 1 000 €, e-commerce dès 2 000 € + abonnement 99 €/mois. SEO inclus. Demandez un devis gratuit en Savoie & Chartreuse.",
  keywords:
    "tarifs agence web SEO, prix site vitrine, tarif e-commerce, prix refonte site web, devis gratuit, maintenance site web, LevisWeb, Savoie, Chartreuse",
  openGraph: {
    title: "Tarifs LevisWeb | Site vitrine dès 1 000 € — Agence Web Savoie",
    description:
      "Tarifs clairs : site vitrine dès 1 000 €, e-commerce dès 2 000 € + abonnement 99 €/mois. SEO inclus. Devis gratuit.",
    url: "https://levisweb.net/pricing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarifs LevisWeb | Site vitrine dès 1 000 € — Agence Web Savoie",
    description:
      "Tarifs clairs : site vitrine dès 1 000 €, e-commerce dès 2 000 € + abonnement 99 €/mois. SEO inclus. Devis gratuit.",
    images: ["https://levisweb.net/images/logo.png"],
  },
};

export default function PricingPage() {
  // Frais de création (paiement unique)
  const creationPlans = [
    {
      name: "Site Vitrine",
      price: "1000",
      description: "Site professionnel pour présenter votre activité",
      features: [
        "Design personnalisé et responsive",
        "Jusqu'à 5 pages",
        "Formulaire de contact",
        "Optimisation SEO de base",
        "Intégration réseaux sociaux",
      ],
      cta: "Démarrer mon projet",
      href: "/contact?plan=vitrine",
      variant: "primary" as const,
    },
    {
      name: "E-commerce",
      price: "2000",
      description: "Boutique en ligne complète",
      features: [
        "Site vitrine + catalogue produits",
        "Paiements Stripe sécurisés",
        "Gestion des commandes",
        "Gestion des stocks",
        "Backoffice administrateur",
      ],
      cta: "Démarrer mon projet",
      href: "/contact?plan=ecommerce",
      variant: "primary" as const,
    },
    {
      name: "Sur Mesure",
      price: "Sur devis",
      description: "Solution personnalisée pour vos besoins spécifiques",
      features: [
        "Analyse de vos besoins",
        "Développement sur mesure",
        "Intégrations avancées",
        "API personnalisées",
        "Formation de votre équipe",
      ],
      cta: "Demander un devis",
      href: "/contact?plan=custom",
      variant: "secondary" as const,
    },
  ];

  // Plan d'abonnement mensuel (obligatoire)
  const subscriptionPlans = [
    {
      name: "Développeur Personnel",
      price: "99",
      description: "Je deviens votre développeur personnel disponible en tout temps",
      features: [
        "Mises à jour techniques régulières",
        "Surveillance de la sécurité et des performances",
        "Sauvegardes automatiques quotidiennes",
        "Disponible en tout temps pour vos besoins",
        "Modifications et améliorations incluses",
        "Support prioritaire illimité",
        "Monitoring 24/7 de votre site",
        "Optimisations de performance continues",
        "SEO et analytics avancés",
        "Conseils stratégiques personnalisés",
      ],
      cta: "Choisir ce plan",
      href: "/contact?subscription=premium",
      variant: "primary" as const,
      popular: true,
    },
  ];

  return (
    <PricingPageContent
      creationPlans={creationPlans}
      subscriptionPlans={subscriptionPlans}
    />
  );
}
