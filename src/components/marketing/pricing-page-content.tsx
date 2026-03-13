"use client";

import { PricingQuiz } from "@/components/ui/pricing-quiz";
import { SplitHeading } from "@/components/ui/split-heading";
import { MarqueeTicker } from "@/components/ui/marquee-ticker";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { LineReveal } from "@/components/ui/line-reveal";
import Script from "next/script";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

function SvgCheckmark({ color }: { color: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="flex-shrink-0 mt-0.5"
      style={{
        strokeDasharray: 30,
        strokeDashoffset: 0,
      }}
    >
      <circle cx="10" cy="10" r="9" stroke={color} strokeWidth="1.5" strokeOpacity="0.3" />
      <path
        d="M6 10l3 3 5-5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 20,
          strokeDashoffset: 0,
        }}
      />
    </svg>
  );
}

function PricingHero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const el = heroRef.current;
    if (!el) return;

    const chars = el.querySelectorAll<HTMLSpanElement>(".price-char");
    gsap.fromTo(
      chars,
      { y: -150, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "back.out(1.5)",
        duration: 1.2,
        stagger: 0.04,
        delay: 0.2,
      }
    );

    const subtitle = el.querySelector(".price-subtitle");
    if (subtitle) {
      gsap.fromTo(
        subtitle,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, ease: "expo.out", duration: 1, delay: 0.7 }
      );
    }
  }, []);

  const priceChars = "1490€".split("");

  return (
    <div
      ref={heroRef}
      className="relative flex flex-col items-center justify-center min-h-screen bg-black overflow-hidden"
    >
      {/* Giant € watermark */}
      <span
        aria-hidden="true"
        className="font-display pointer-events-none absolute right-0 top-0 select-none text-[50vw] font-bold leading-none text-white"
        style={{ opacity: 0.025, transform: "translateY(-10%)" }}
      >
        €
      </span>

      <div className="relative z-10 text-center px-6">
        <p className="text-white/30 text-xs uppercase tracking-[0.4em] mb-8 font-mono">
          Tarifs &amp; Accompagnement
        </p>

        {/* Giant price with char-by-char reveal */}
        <div
          className="font-display font-bold text-white leading-none mb-8 overflow-hidden"
          style={{ fontSize: "clamp(5rem, 20vw, 22rem)" }}
          aria-label="À partir de 1490€"
        >
          {priceChars.map((char, i) => (
            <span
              key={i}
              className="price-char inline-block"
              style={{ display: "inline-block" }}
            >
              {char}
            </span>
          ))}
        </div>

        <p className="price-subtitle text-white/40 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed opacity-0">
          Un tarif clair. Un investissement unique. Un développeur personnel
          focalisé sur vos résultats.
        </p>

        <div className="mt-12 flex items-center gap-3 justify-center text-white/20 text-sm">
          <span>Explorez nos offres</span>
          <span className="animate-bounce">↓</span>
        </div>
      </div>
    </div>
  );
}

export function PricingPageContent({
  creationPlans,
  subscriptionPlans,
}: PricingPageContentProps) {
  return (
    <div className="bg-black text-white min-h-screen">
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

      {/* Hero 100vh */}
      <PricingHero />

      {/* MarqueeTicker band */}
      <div className="border-y border-white/10 py-5 overflow-hidden">
        <MarqueeTicker speed={30} className="text-white/20 text-sm font-mono uppercase tracking-widest">
          <span className="px-8">Site Vitrine — à partir de 1000€</span>
          <span className="text-white/10 px-2">✦</span>
          <span className="px-8">E-commerce — à partir de 2000€</span>
          <span className="text-white/10 px-2">✦</span>
          <span className="px-8">Maintenance — 99€/mois</span>
          <span className="text-white/10 px-2">✦</span>
          <span className="px-8">Livraison en 4 semaines</span>
          <span className="text-white/10 px-2">✦</span>
          <span className="px-8">LevisWeb — Agence Digitale</span>
          <span className="text-white/10 px-2">✦</span>
        </MarqueeTicker>
      </div>

      {/* Stats section */}
      <section className="py-24 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          <div>
            <div className="font-display text-7xl font-bold text-white mb-3">
              <AnimatedCounter target={4} suffix=" sem." className="" />
            </div>
            <div className="text-white/40 text-sm uppercase tracking-[0.2em]">Livraison moyenne</div>
          </div>
          <div>
            <div className="font-display text-7xl font-bold text-white mb-3">
              <AnimatedCounter target={99} suffix=".9%" className="" />
            </div>
            <div className="text-white/40 text-sm uppercase tracking-[0.2em]">Uptime garanti</div>
          </div>
          <div>
            <div className="font-display text-7xl font-bold text-white mb-3">
              <AnimatedCounter target={24} suffix="/7" className="" />
            </div>
            <div className="text-white/40 text-sm uppercase tracking-[0.2em]">Support disponible</div>
          </div>
        </div>
      </section>

      {/* Quiz interactif */}
      <section className="py-24 px-6 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <SplitHeading as="h2" className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Quel projet vous correspond ?
            </SplitHeading>
            <LineReveal className="w-24" color="#a855f7" height={2} />
          </div>
          <PricingQuiz />
        </div>
      </section>

      {/* Frais de création */}
      <section className="py-24 px-6 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-white/30 text-xs uppercase tracking-[0.4em] font-mono mb-4">01</p>
            <SplitHeading as="h2" className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
              Frais de création
            </SplitHeading>
            <LineReveal className="w-16" color="#06b6d4" height={2} />
            <p className="text-white/40 mt-6 text-lg max-w-xl">
              Un investissement unique pour créer et mettre en ligne votre site web.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white/10">
            {creationPlans.map((plan, index) => {
              const accentColors = ["#06b6d4", "#a855f7", "#34d399"];
              const accent = accentColors[index] ?? "#06b6d4";
              const isCustom = plan.price === "Sur devis";

              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}
                  className="bg-black p-8 md:p-10 flex flex-col relative group"
                  style={{ borderTop: `2px solid ${accent}22` }}
                  data-cursor="image"
                >
                  {/* Glow on hover for Pro plan */}
                  {index === 1 && (
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{
                        boxShadow: `inset 0 0 60px ${accent}15`,
                        border: `1px solid ${accent}33`,
                      }}
                    />
                  )}

                  <div className="mb-8">
                    <span
                      className="font-mono text-xs uppercase tracking-[0.3em] mb-3 block"
                      style={{ color: accent }}
                    >
                      0{index + 1}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-white/40 text-sm">{plan.description}</p>
                  </div>

                  <div className="mb-8">
                    {isCustom ? (
                      <span className="font-display text-4xl font-bold" style={{ color: accent }}>
                        Sur devis
                      </span>
                    ) : (
                      <div>
                        <div className="text-white/30 text-sm line-through mb-1">
                          {parseInt(plan.price).toLocaleString("fr-FR")}€
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="font-display text-5xl font-bold text-white">
                            {Math.round(parseInt(plan.price) * 0.8).toLocaleString("fr-FR")}€
                          </span>
                          <span className="text-sm font-mono ml-2" style={{ color: accent }}>-20%</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <ul className="space-y-4 mb-10 flex-1">
                    {plan.features.map((feature, fi) => (
                      <li key={fi} className="flex items-start gap-3">
                        <SvgCheckmark color={accent} />
                        <span className="text-white/60 text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <MagneticButton>
                    <a
                      href={plan.href}
                      className="flex items-center justify-center gap-2 w-full py-4 border text-sm font-semibold transition-all duration-300 hover:text-black"
                      style={{
                        borderColor: `${accent}50`,
                        color: accent,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.backgroundColor = accent;
                        (e.currentTarget as HTMLAnchorElement).style.color = "#000";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                        (e.currentTarget as HTMLAnchorElement).style.color = accent;
                      }}
                    >
                      {plan.cta}
                      <span>→</span>
                    </a>
                  </MagneticButton>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Abonnement mensuel */}
      <section className="py-24 px-6 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-white/30 text-xs uppercase tracking-[0.4em] font-mono mb-4">02</p>
            <SplitHeading as="h2" className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
              Accompagnement mensuel
            </SplitHeading>
            <LineReveal className="w-16" color="#a855f7" height={2} />
            <p className="text-white/40 mt-6 text-lg max-w-xl">
              Je deviens votre développeur personnel, focalisé sur vos résultats.
            </p>
          </div>

          <div className="max-w-2xl">
            {subscriptionPlans.map((plan) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                className="border border-white/10 p-8 md:p-10 relative group"
                data-cursor="image"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

                <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-white/40 text-sm">{plan.description}</p>
                  </div>
                  {plan.popular && (
                    <span className="text-xs font-mono uppercase tracking-widest text-purple-400 border border-purple-500/30 px-3 py-1.5">
                      Populaire
                    </span>
                  )}
                </div>

                <div className="mb-10">
                  <span className="font-display text-7xl font-bold text-white">{plan.price}€</span>
                  <span className="text-white/30 text-lg ml-2">/mois</span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-10">
                  {plan.features.map((feature, fi) => (
                    <div key={fi} className="flex items-start gap-3">
                      <SvgCheckmark color="#a855f7" />
                      <span className="text-white/60 text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                <MagneticButton>
                  <a
                    href={plan.href}
                    className="inline-flex items-center gap-3 border border-purple-500/30 text-purple-400 px-8 py-4 text-sm font-semibold hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-all duration-300"
                  >
                    {plan.cta}
                    <span>→</span>
                  </a>
                </MagneticButton>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <p className="text-white/30 text-xs uppercase tracking-[0.4em] font-mono mb-4">03</p>
            <SplitHeading as="h2" className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Questions fréquentes
            </SplitHeading>
            <LineReveal className="w-16" color="#34d399" height={2} />
          </div>

          <div className="space-y-0">
            {[
              {
                q: "Que comprend concrètement le forfait 99€/mois ?",
                a: "Ce forfait fait de moi votre développeur personnel : je m'occupe des mises à jour techniques, de la sécurité, des petites évolutions du site, des optimisations de performance et je reste disponible pour répondre à vos besoins au quotidien.",
              },
              {
                q: "L'abonnement est-il obligatoire ou juste conseillé ?",
                a: "Il n'est pas strictement obligatoire, mais il est très conseillé. Sans suivi régulier, un site finit toujours par vieillir, ralentir ou présenter des failles. L'abonnement vous assure un site vivant, sécurisé et aligné avec vos objectifs.",
              },
              {
                q: "Que se passe-t-il si j'arrête l'abonnement ?",
                a: "Vous gardez le site qui a été développé pour vous, mais il ne bénéficiera plus de maintenance, d'améliorations ni de support prioritaire. Les évolutions futures seront faites au cas par cas, sur devis.",
              },
              {
                q: "Et si j'ai déjà un site web existant ?",
                a: "Nous pouvons partir de l'existant pour une refonte ou une amélioration progressive. Le forfait 99€/mois permet de faire évoluer votre site actuel étape par étape, sans repartir de zéro.",
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.76, 0, 0.24, 1] }}
                className="border-b border-white/10 py-8 group"
              >
                <div className="flex items-start justify-between gap-6">
                  <h3 className="text-white text-lg font-medium leading-snug group-hover:text-white/80 transition-colors">
                    {faq.q}
                  </h3>
                  <span className="text-white/20 text-xl flex-shrink-0 font-mono">0{i + 1}</span>
                </div>
                <p className="text-white/40 text-sm leading-relaxed mt-4">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA finale */}
      <section className="py-32 px-6 text-center">
        <p className="text-white/30 text-sm uppercase tracking-[0.3em] mb-8 font-mono">Prêt à démarrer ?</p>
        <SplitHeading as="h2" className="font-display text-5xl md:text-6xl font-bold text-white mb-12">
          Construisons ensemble
        </SplitHeading>
        <MagneticButton>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 border border-white/20 text-white px-10 py-5 text-lg hover:bg-white hover:text-black transition-colors duration-300"
          >
            Démarrer mon projet
            <span>→</span>
          </a>
        </MagneticButton>
      </section>
    </div>
  );
}
