"use client";

import { FeatureCard3D } from "@/components/ui/enhanced-3d-card";
import { PricingQuiz } from "@/components/ui/pricing-quiz";
import { PulseCTA } from "@/components/ui/PulseCTA";
import { Check, Lock, Shield, Zap } from "lucide-react";
import Script from "next/script";
import { motion } from "motion/react";

type CreationPlan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  variant: "primary" | "secondary";
};

type SubscriptionPlan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  variant: "primary" | "secondary";
  popular?: boolean;
};

interface PricingPageContentProps {
  creationPlans: CreationPlan[];
  subscriptionPlans: SubscriptionPlan[];
}

export function PricingPageContent({
  creationPlans,
  subscriptionPlans,
}: PricingPageContentProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Glows de fond type Awwwards */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 right-[-10%] h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute top-40 left-[-10%] h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute bottom-[-25%] right-1/4 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
      </div>

      <Script id="ld-json-breadcrumb" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Accueil",
              item: "https://levisweb.net/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Tarifs",
              item: "https://levisweb.net/pricing",
            },
          ],
        })}
      </Script>

      <div className="relative mx-auto max-w-7xl px-6 py-24">
        {/* Header de la page */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20 space-y-6"
        >
          <p className="text-sm font-semibold tracking-[0.35em] uppercase text-cyan-400/80">
            Tarifs & Accompagnement
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gradient-cyan leading-[1.05]">
            Des tarifs clairs pour
            <br className="hidden md:block" />
            <span className="text-white/90">un site qui travaille pour vous</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Un tarif clair pour la création de votre site, puis un accompagnement
            mensuel où je deviens votre développeur personnel, focalisé sur vos
            résultats plutôt que sur des packs incompréhensibles.
          </p>
        </motion.div>

        {/* Offre spéciale -20% */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-purple-600/20 border-2 border-cyan-400/50 rounded-2xl p-8 max-w-4xl mx-auto shadow-[0_0_60px_rgba(56,189,248,0.25)]">
            <div className="text-center space-y-4">
              <div className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold mb-2 animate-pulse">
                ⚡ OFFRE LIMITÉE -20% (1 place restante)
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Démarrez votre projet avec une longueur d&apos;avance
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                Profitez de <span className="font-semibold text-cyan-300">-20% sur les frais de création</span> pour lancer
                un site qui vous apporte de vrais résultats.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-sm text-muted-foreground">
                <span>
                  ✅ Site Vitrine : <span className="line-through">1000€</span>{" "}
                  <span className="text-cyan-300 font-bold">800€</span>
                </span>
                <span className="hidden md:inline">•</span>
                <span>
                  ✅ E-commerce : <span className="line-through">2000€</span>{" "}
                  <span className="text-cyan-300 font-bold">1600€</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section explicative - Pédagogie */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-8 mb-20 max-w-4xl mx-auto"
        >
          <div className="text-center mb-6">
            <Shield className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Comment fonctionnent nos tarifs ?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 text-muted-foreground">
            <div className="text-center">
              <div className="bg-cyan-500/20 rounded-lg p-4 mb-4">
                <Zap className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <h3 className="font-semibold text-foreground mb-2">
                  Frais de création
                </h3>
                <p className="text-sm">
                  Un paiement unique pour concevoir et lancer un site pensé pour
                  vos objectifs.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-cyan-500/20 rounded-lg p-4 mb-4">
                <Lock className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <h3 className="font-semibold text-foreground mb-2">
                  Accompagnement continu
                </h3>
                <p className="text-sm">
                  Je reste à vos côtés pour faire évoluer le site, corriger,
                  optimiser et vous conseiller.
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-6 p-4 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-lg">
            <p className="text-foreground font-medium">
              💡 <strong>Résultat :</strong> vous savez exactement ce que vous
              payez, et votre site continue de progresser dans le temps.
            </p>
          </div>
        </motion.div>

        {/* Quiz interactif */}
        <div className="mb-20">
          <PricingQuiz />
        </div>

        {/* Section 1: Frais de création (paiement unique) */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Frais de création
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Un investissement unique pour créer et mettre en ligne votre site
              web
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {creationPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                className="relative group flex flex-col"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Carte principale */}
                <FeatureCard3D
                  className="flex flex-col h-full p-10"
                  intensity="medium"
                  glowColor="auto"
                  containerClassName="bg-gradient-to-br from-white/10 via-white/5 to-white/10 dark:from-neutral-800/50 dark:via-neutral-900/50 dark:to-neutral-800/50 border border-neutral-400/30 dark:border-neutral-600/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
                >
                  {/* En-tête de la carte */}
                  <div className="text-center mb-8 flex-shrink-0">
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      {plan.name}
                    </h3>
                    <div className="mb-4">
                      {plan.price === "Sur devis" ? (
                        <span className="text-2xl font-bold text-cyan-400">
                          {plan.price}
                        </span>
                      ) : (
                        <>
                          {/* Prix barré original */}
                          <div className="mb-2">
                            <span className="text-2xl line-through text-muted-foreground">
                              €{plan.price}
                            </span>
                          </div>
                          {/* Prix remisé */}
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-4xl font-bold text-foreground">
                              €
                            </span>
                            <span className="text-5xl font-bold text-gradient-cyan">
                              {Math.round(parseInt(plan.price) * 0.8)}
                            </span>
                            <span className="text-lg text-cyan-400 font-semibold">
                              -20%
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  {/* Liste des fonctionnalités */}
                  <div className="flex-grow space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-start gap-3"
                      >
                        <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-muted-foreground leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bouton CTA */}
                  <div className="text-center flex-shrink-0">
                    <PulseCTA
                      href={plan.href}
                      variant={plan.variant}
                      size="lg"
                      className="w-full btn-cyan-gradient"
                    >
                      {plan.cta}
                    </PulseCTA>
                  </div>
                </FeatureCard3D>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 2: Abonnement mensuel (obligatoire) */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Abonnement mensuel
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              🔒 <strong>Inclus avec chaque site</strong> - Garantit performance
              et sécurité continues
            </p>
          </div>

          <div className="flex justify-center max-w-2xl mx-auto">
            {subscriptionPlans.map((plan) => (
              <motion.div
                key={plan.name}
                className="relative group flex flex-col w-full"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Badge "Populaire" */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                    <span className="pricing-badge-popular text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      ⭐ Populaire
                    </span>
                  </div>
                )}

                {/* Carte principale */}
                <FeatureCard3D
                  className="flex flex-col h-full p-10"
                  intensity="medium"
                  glowColor="auto"
                  containerClassName="bg-gradient-to-br from-white/10 via-white/5 to-white/10 dark:from-neutral-800/50 dark:via-neutral-900/50 dark:to-neutral-800/50 border border-neutral-400/30 dark:border-neutral-600/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
                >
                  {/* En-tête de la carte */}
                  <div className="text-center mb-8 flex-shrink-0">
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      {plan.name}
                    </h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-foreground">
                        €
                      </span>
                      <span className="text-5xl font-bold text-gradient-cyan">
                        {plan.price}
                      </span>
                      <span className="text-xl text-muted-foreground">
                        /mois
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  {/* Liste des fonctionnalités */}
                  <div className="flex-grow space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-start gap-3"
                      >
                        <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-muted-foreground leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bouton CTA */}
                  <div className="text-center flex-shrink-0">
                    <PulseCTA
                      href={plan.href}
                      variant={plan.variant}
                      size="lg"
                      className="w-full btn-cyan-gradient"
                    >
                      {plan.cta}
                    </PulseCTA>
                  </div>
                </FeatureCard3D>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section FAQ */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Questions fréquentes
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {/* Q1 */}
            <motion.div
              className="bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-xl font-semibold text-foreground mb-3">
                ❓ Que comprend concrètement le forfait 99€/mois ?
              </h3>
              <p className="text-muted-foreground">
                Ce forfait fait de moi votre développeur personnel : je m&apos;occupe
                des mises à jour techniques, de la sécurité, des petites
                évolutions du site, des optimisations de performance et je reste
                disponible pour répondre à vos besoins au quotidien.
              </p>
            </motion.div>

            {/* Q2 */}
            <motion.div
              className="bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-xl font-semibold text-foreground mb-3">
                ❓ L&apos;abonnement est-il obligatoire ou juste conseillé ?
              </h3>
              <p className="text-muted-foreground">
                Il n&apos;est pas strictement obligatoire, mais il est
                <span className="font-semibold text-foreground"> très conseillé</span>.
                Sans suivi régulier, un site finit toujours par vieillir,
                ralentir ou présenter des failles. L&apos;abonnement vous assure
                un site vivant, sécurisé et aligné avec vos objectifs, sans que
                vous ayez à gérer la technique.
              </p>
            </motion.div>

            {/* Q3 */}
            <motion.div
              className="bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-xl font-semibold text-foreground mb-3">
                ❓ Que se passe-t-il si j&apos;arrête l&apos;abonnement ?
              </h3>
              <p className="text-muted-foreground">
                Vous gardez le site qui a été développé pour vous, mais il ne
                bénéficiera plus de maintenance, d&apos;améliorations ni de
                support prioritaire. En pratique, cela signifie que les
                évolutions futures, corrections ou optimisations seront faites
                au cas par cas, sur devis.
              </p>
            </motion.div>

            {/* Q4 */}
            <motion.div
              className="bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-xl font-semibold text-foreground mb-3">
                ❓ Et si j&apos;ai déjà un site web existant ?
              </h3>
              <p className="text-muted-foreground">
                C&apos;est possible ! Nous pouvons partir de l&apos;existant pour
                une refonte ou une amélioration progressive. Le forfait 99€/mois
                permet alors de faire évoluer votre site actuel étape par étape,
                sans repartir de zéro.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Section CTA finale */}
        <div className="text-center">
          <motion.div
            className="bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient-cyan">
              Prêt à démarrer votre projet ?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Contactez-nous pour discuter de vos besoins et obtenir un devis
              personnalisé. Nous vous accompagnerons à chaque étape de votre
              projet.
            </p>
            <PulseCTA
              href="/contact"
              variant="secondary"
              size="lg"
              className="btn-cyan-gradient"
            >
              Discuter de mon projet
            </PulseCTA>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

