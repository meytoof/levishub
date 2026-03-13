"use client";

import { Button } from "@/components/ui/button";
import { MarketingPreviewLink } from "@/components/ui/transition-link";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import Script from "next/script";
import { useState } from "react";

const demos = [
  {
    title: "E-commerce",
    description:
      "Un e-commerce moderne avec panier d'achat et gestion des produits.",
    link: "/demo/ecommerce",
    icon: "🛒",
    color: "from-cyan-500 to-blue-600",
    category: "E-commerce",
    tall: true,
  },
  {
    title: "Portfolio",
    description:
      "Un portfolio créatif avec des animations néon et un design moderne.",
    link: "/demo/portfolio",
    icon: "🎨",
    color: "from-violet-500 to-purple-600",
    category: "Créatif",
    tall: false,
  },
  {
    title: "Site Vitrine",
    description: "Un site vitrine professionnel et sobre pour PME et artisans.",
    link: "/demo/vitrine",
    icon: "🏗️",
    color: "from-blue-500 to-cyan-600",
    category: "Vitrine",
    tall: false,
  },
  {
    title: "Blog Magazine",
    description:
      "Un blog éditorial avec une inspiration magazine et un design chaleureux.",
    link: "/demo/blog",
    icon: "📝",
    color: "from-violet-500 to-indigo-600",
    category: "Blog",
    tall: true,
  },
];

const ALL_CATEGORIES = ["Tous", ...Array.from(new Set(demos.map((d) => d.category)))];

export default function ProjetsDemo() {
  const [activeFilter, setActiveFilter] = useState("Tous");

  const filtered = demos.filter(
    (d) => activeFilter === "Tous" || d.category === activeFilter
  );

  return (
    <>
      <Script id="ld-json-projets-demo" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Projets Démo LevisWeb",
          description:
            "Découvrez différents exemples concrets de sites web réalisés par LevisWeb",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "E-commerce",
              url: "https://levisweb.net/demo/ecommerce",
              description:
                "Un e-commerce moderne avec panier d'achat et gestion des produits",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Portfolio",
              url: "https://levisweb.net/demo/portfolio",
              description:
                "Un portfolio créatif avec des animations néon et un design moderne",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Site Vitrine",
              url: "https://levisweb.net/demo/vitrine",
              description:
                "Un site vitrine professionnel et sobre pour PME et artisans",
            },
            {
              "@type": "ListItem",
              position: 4,
              name: "Blog Magazine",
              url: "https://levisweb.net/demo/blog",
              description:
                "Un blog éditorial avec une inspiration magazine et un design chaleureux",
            },
          ],
        })}
      </Script>

      <main className="min-h-svh">
        <section className="relative mx-auto max-w-7xl px-6 sm:px-8 py-12 sm:py-24">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="mb-16 text-center"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400/80">
              Exemples concrets
            </p>
            <h1 className="font-display text-5xl font-bold tracking-tight text-gradient-cyan sm:text-6xl md:text-7xl mb-6">
              Projets Démo
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed sm:text-xl">
              Découvrez différents exemples concrets de ce que je peux réaliser
              pour vous.
            </p>
          </motion.div>

          {/* Filter bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            className="mb-12 flex flex-wrap justify-center gap-3"
          >
            <LayoutGroup id="filters">
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveFilter(cat)}
                  className={`relative px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
                    activeFilter === cat
                      ? "text-white"
                      : "text-neutral-500 hover:text-foreground"
                  }`}
                >
                  {activeFilter === cat && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-pink-600"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              ))}
            </LayoutGroup>
          </motion.div>

          {/* Masonry-style grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2"
            >
              {filtered.map((demo, index) => (
                <motion.div
                  key={demo.title}
                  layout
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                  className={demo.tall ? "sm:row-span-2" : ""}
                >
                  <motion.div
                    whileHover={{ scale: 1.015, y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group relative overflow-hidden rounded-2xl border border-neutral-500/30 bg-white/5 backdrop-blur-xl h-full hover:bg-white/10 transition-all duration-300 hover:shadow-2xl feature-shadow-1"
                    data-cursor="Voir"
                  >
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-600/0 to-pink-600/0 group-hover:from-violet-600/10 group-hover:to-pink-600/10 transition-all duration-500 z-10" />

                    {/* Accent glow */}
                    <div
                      className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${demo.color} opacity-0 group-hover:opacity-20 rounded-full blur-3xl -translate-y-20 translate-x-20 transition-opacity duration-500`}
                    />

                    <div className={`relative z-20 p-8 flex flex-col ${demo.tall ? "min-h-72" : "min-h-48"}`}>
                      {/* Category badge */}
                      <span className="mb-4 inline-flex items-center self-start rounded-full border border-neutral-500/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                        {demo.category}
                      </span>

                      {/* Icon */}
                      <div className="mb-4 text-5xl transition-transform duration-300 group-hover:scale-110">
                        {demo.icon}
                      </div>

                      {/* Content */}
                      <h3 className="font-display text-2xl font-bold mb-3 text-foreground">
                        {demo.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed flex-1">
                        {demo.description}
                      </p>

                      {/* CTA */}
                      <MarketingPreviewLink href={demo.link}>
                        <Button
                          className="btn-cyan-gradient shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                          size="lg"
                        >
                          Voir la démo
                        </Button>
                      </MarketingPreviewLink>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* CTA Final */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="mt-20 text-center"
          >
            <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-neutral-500/30 p-12 hover:bg-white/10 transition-all duration-300">
              {/* Background number */}
              <span
                aria-hidden="true"
                className="font-display pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 select-none text-[15vw] font-bold leading-none text-neutral-900 dark:text-white"
                style={{ opacity: 0.04 }}
              >
                +
              </span>
              <h2 className="font-display relative z-10 text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Vous avez un projet en tête ?
              </h2>
              <p className="relative z-10 text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Transformez votre vision en réalité avec LevisWeb. Des solutions
                web rapides, fiables et pensées pour générer des résultats.
              </p>
              <div className="relative z-10" data-cursor="Voir">
                <MarketingPreviewLink href="/contact">
                  <Button
                    size="lg"
                    className="btn-cyan-gradient shadow-lg hover:shadow-xl px-8 py-4 text-lg transition-all duration-200 hover:scale-105"
                  >
                    Me contacter
                  </Button>
                </MarketingPreviewLink>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}
