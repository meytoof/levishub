import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Button } from "@/components/ui/button";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { MarketingPreviewLink } from "@/components/ui/transition-link";
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
    <TracingBeam className="w-full">
      <main className="min-h-svh">
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
        {/* Hero Section */}
        <section className="relative mx-auto max-w-7xl px-6 sm:px-8 py-12 sm:py-24 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 sm:mb-8 text-gradient-cyan leading-tight">
              Mes Services de Communication Digitale
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 sm:mb-12">
              De la création de sites web à la formation en stratégie digitale,
              je vous accompagne dans tous vos projets de communication
              numérique
            </p>
            <MarketingPreviewLink href="/contact">
              <Button className="btn-cyan-gradient shadow-lg hover:shadow-xl px-8 sm:px-10 py-3 sm:py-4 text-lg sm:text-xl">
                Discutons de votre projet
              </Button>
            </MarketingPreviewLink>
          </div>
        </section>

        {/* Services Principaux */}
        <section className="relative mx-auto max-w-7xl px-6 sm:px-8 py-12 sm:py-24">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6 text-gradient-cyan">
              Services Principaux
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Des solutions complètes pour votre présence en ligne
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Création de Sites Web */}
            <CardContainer className="inter-var">
              <CardBody className="relative bg-gradient-to-br from-background/70 to-background/20 backdrop-blur-xl border border-neutral-500/50 shadow-xl ring-1 ring-black/5 h-full rounded-2xl p-6 sm:p-8">
                <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10" />
                <CardItem translateZ="50" className="text-4xl mb-4">
                  🌐
                </CardItem>
                <CardItem translateZ="60" className="text-2xl font-bold mb-4">
                  Création de Sites Web
                </CardItem>
                <CardItem
                  translateZ="40"
                  className="text-muted-foreground mb-6 space-y-3"
                >
                  <ul className="space-y-2 text-left">
                    <li>• Sites vitrines modernes et responsives</li>
                    <li>• E-commerce avec paiements sécurisés</li>
                    <li>• Applications web sur mesure</li>
                    <li>• Backoffices et interfaces d'administration</li>
                    <li>• Optimisation des performances</li>
                  </ul>
                </CardItem>
                <CardItem translateZ="30" className="mt-auto">
                  <MarketingPreviewLink href="/contact">
                    <Button className="w-full btn-cyan-gradient">
                      Demander un devis
                    </Button>
                  </MarketingPreviewLink>
                </CardItem>
              </CardBody>
            </CardContainer>

            {/* Formation et Accompagnement */}
            <CardContainer className="inter-var">
              <CardBody className="relative bg-gradient-to-br from-background/70 to-background/20 backdrop-blur-xl border border-neutral-500/50 shadow-xl ring-1 ring-black/5 h-full rounded-2xl p-6 sm:p-8">
                <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-600/10" />
                <CardItem translateZ="50" className="text-4xl mb-4">
                  🎓
                </CardItem>
                <CardItem translateZ="60" className="text-2xl font-bold mb-4">
                  Formation & Accompagnement
                </CardItem>
                <CardItem
                  translateZ="40"
                  className="text-muted-foreground mb-6 space-y-3"
                >
                  <ul className="space-y-2 text-left">
                    <li>• Formation en développement web</li>
                    <li>• Accompagnement stratégique digital</li>
                    <li>• Workshops sur mesure</li>
                    <li>• Support technique continu</li>
                    <li>• Mentoring personnalisé</li>
                  </ul>
                </CardItem>
                <CardItem translateZ="30" className="mt-auto">
                  <MarketingPreviewLink href="/contact">
                    <Button className="w-full btn-cyan-gradient">
                      En savoir plus
                    </Button>
                  </MarketingPreviewLink>
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
        </section>

        {/* Services Spécialisés */}
        <section className="relative mx-auto max-w-7xl px-6 sm:px-8 py-12 sm:py-24">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6 text-gradient-cyan">
              Services Spécialisés
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Expertise pointue dans des domaines clés du digital
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* SEO et Visibilité */}
            <div className="group relative bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl">
              <div className="text-3xl sm:text-4xl mb-4">🔍</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">
                SEO & Visibilité
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                Optimisation pour les moteurs de recherche, amélioration du
                référencement naturel et augmentation de la visibilité en ligne.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Audit SEO complet</li>
                <li>• Optimisation technique</li>
                <li>• Stratégie de mots-clés</li>
                <li>• Suivi des performances</li>
              </ul>
            </div>

            {/* Stratégie Digitale */}
            <div className="group relative bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl">
              <div className="text-3xl sm:text-4xl mb-4">📊</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">
                Stratégie Digitale
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                Élaboration de stratégies digitales complètes pour atteindre vos
                objectifs business et maximiser votre ROI.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Analyse de marché</li>
                <li>• Plan d'action digital</li>
                <li>• Roadmap de transformation</li>
                <li>• KPIs et métriques</li>
              </ul>
            </div>

            {/* Communication Digitale */}
            <div className="group relative bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl">
              <div className="text-3xl sm:text-4xl mb-4">📱</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">
                Communication Digitale
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                Stratégies de communication en ligne, gestion des réseaux
                sociaux et création de contenu engageant.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Gestion des réseaux sociaux</li>
                <li>• Création de contenu</li>
                <li>• Community management</li>
                <li>• Campagnes publicitaires</li>
              </ul>
            </div>

            {/* Performance Web */}
            <div className="group relative bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl">
              <div className="text-3xl sm:text-4xl mb-4">⚡</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">
                Performance Web
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                Optimisation des performances, amélioration de la vitesse de
                chargement et de l'expérience utilisateur.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Audit de performance</li>
                <li>• Optimisation des images</li>
                <li>• Mise en cache</li>
                <li>• Tests de charge</li>
              </ul>
            </div>

            {/* Sécurité Web */}
            <div className="group relative bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl">
              <div className="text-3xl sm:text-4xl mb-4">🔒</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">
                Sécurité Web
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                Protection de vos sites web, sécurisation des données et mise en
                place de bonnes pratiques de sécurité.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Audit de sécurité</li>
                <li>• Protection contre les attaques</li>
                <li>• Chiffrement SSL/TLS</li>
                <li>• Sauvegardes sécurisées</li>
              </ul>
            </div>

            {/* Maintenance & Support */}
            <div className="group relative bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl">
              <div className="text-3xl sm:text-4xl mb-4">🛠️</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">
                Maintenance & Support
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                Services de maintenance continue, mises à jour régulières et
                support technique réactif pour vos projets.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Maintenance préventive</li>
                <li>• Mises à jour de sécurité</li>
                <li>• Support technique 24/7</li>
                <li>• Monitoring continu</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Process de Travail */}
        <section className="relative mx-auto max-w-7xl px-6 sm:px-8 py-12 sm:py-24">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6 text-gradient-cyan">
              Comment je travaille
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Une approche structurée et transparente pour des résultats
              optimaux
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {/* Étape 1 */}
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-2xl text-white font-bold group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">
                Consultation
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Analyse de vos besoins et objectifs pour définir la meilleure
                approche
              </p>
            </div>

            {/* Étape 2 */}
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-2xl text-white font-bold group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">
                Planification
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Élaboration d'un plan détaillé avec planning et livrables clairs
              </p>
            </div>

            {/* Étape 3 */}
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-2xl text-white font-bold group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">
                Exécution
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Développement et mise en œuvre avec suivi régulier et feedback
              </p>
            </div>

            {/* Étape 4 */}
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-2xl text-white font-bold group-hover:scale-110 transition-transform duration-300">
                4
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">
                Livraison
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Mise en ligne, formation et accompagnement post-lancement
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative mx-auto max-w-7xl px-6 sm:px-8 py-12 sm:py-24">
          <div className="text-center px-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6 text-gradient-cyan">
              Prêt à transformer votre présence digitale ?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed">
              Que vous ayez besoin d'un site web, d'une formation ou d'une
              stratégie digitale complète, je suis là pour vous accompagner vers
              le succès.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MarketingPreviewLink href="/contact">
                <Button className="btn-cyan-gradient shadow-lg hover:shadow-xl px-8 sm:px-10 py-3 sm:py-4 text-lg sm:text-xl">
                  Discutons de votre projet
                </Button>
              </MarketingPreviewLink>
              <MarketingPreviewLink href="/pricing">
                <Button
                  variant="outline"
                  className="border-2 transition-all duration-200 hover:-translate-y-1 px-8 sm:px-10 py-3 sm:py-4 text-lg sm:text-xl border-cyan-500/50 hover:border-cyan-600"
                >
                  Voir mes tarifs
                </Button>
              </MarketingPreviewLink>
            </div>
          </div>
        </section>
      </main>
    </TracingBeam>
  );
}
