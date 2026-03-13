"use client";

import { MarketingPreviewLink } from "@/components/ui/transition-link";
import { SplitHeading } from "@/components/ui/split-heading";
import { MarqueeTicker } from "@/components/ui/marquee-ticker";
import { LineReveal } from "@/components/ui/line-reveal";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import Script from "next/script";
import { useState } from "react";

const demos = [
  {
    title: "E-commerce",
    description:
      "Un e-commerce moderne avec panier d'achat et gestion des produits.",
    link: "/demo/ecommerce",
    accent: "#06b6d4",
    category: "E-commerce",
    tall: true,
    number: "01",
  },
  {
    title: "Portfolio",
    description:
      "Un portfolio créatif avec des animations néon et un design moderne.",
    link: "/demo/portfolio",
    accent: "#a855f7",
    category: "Créatif",
    tall: false,
    number: "02",
  },
  {
    title: "Site Vitrine",
    description: "Un site vitrine professionnel et sobre pour PME et artisans.",
    link: "/demo/vitrine",
    accent: "#34d399",
    category: "Vitrine",
    tall: false,
    number: "03",
  },
  {
    title: "Blog Magazine",
    description:
      "Un blog éditorial avec une inspiration magazine et un design chaleureux.",
    link: "/demo/blog",
    accent: "#f59e0b",
    category: "Blog",
    tall: true,
    number: "04",
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
              description: "Un e-commerce moderne avec panier d'achat et gestion des produits",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Portfolio",
              url: "https://levisweb.net/demo/portfolio",
              description: "Un portfolio créatif avec des animations néon et un design moderne",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Site Vitrine",
              url: "https://levisweb.net/demo/vitrine",
              description: "Un site vitrine professionnel et sobre pour PME et artisans",
            },
            {
              "@type": "ListItem",
              position: 4,
              name: "Blog Magazine",
              url: "https://levisweb.net/demo/blog",
              description: "Un blog éditorial avec une inspiration magazine et un design chaleureux",
            },
          ],
        })}
      </Script>

      <main className="bg-black text-white min-h-svh">
        {/* Hero 100vh */}
        <section className="relative flex flex-col justify-end min-h-screen pb-16 px-8 md:px-16 overflow-hidden">
          {/* Large background number */}
          <span
            aria-hidden="true"
            className="font-display pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none text-[35vw] font-bold leading-none text-white"
            style={{ opacity: 0.03 }}
          >
            NP
          </span>

          <div className="relative z-10 max-w-6xl">
            <p className="text-white/30 text-xs uppercase tracking-[0.4em] font-mono mb-6">
              Exemples concrets
            </p>
            <SplitHeading
              as="h1"
              className="font-display font-bold text-white leading-none mb-6"
              style={{ fontSize: "clamp(3.5rem, 10vw, 12rem)" } as React.CSSProperties}
              triggerOnLoad
            >
              NOS PROJETS
            </SplitHeading>
            <LineReveal className="w-32 mb-8" color="#a855f7" height={2} delay={0.8} />
            <p className="text-white/40 text-lg md:text-xl max-w-2xl leading-relaxed">
              Découvrez différents exemples concrets de ce que je peux réaliser pour vous.
            </p>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 right-8 text-white/20 text-xs font-mono uppercase tracking-widest">
            <span className="animate-bounce inline-block">↓ Explorez</span>
          </div>
        </section>

        {/* MarqueeTicker */}
        <div className="border-y border-white/10 py-5 overflow-hidden">
          <MarqueeTicker speed={25} className="text-white/20 text-sm font-mono uppercase tracking-widest">
            <span className="px-8">E-commerce</span>
            <span className="text-white/10 px-4">—</span>
            <span className="px-8">Portfolio</span>
            <span className="text-white/10 px-4">—</span>
            <span className="px-8">Site Vitrine</span>
            <span className="text-white/10 px-4">—</span>
            <span className="px-8">Blog Magazine</span>
            <span className="text-white/10 px-4">—</span>
            <span className="px-8">LevisWeb Demos</span>
            <span className="text-white/10 px-4">—</span>
          </MarqueeTicker>
        </div>

        {/* Filter bar */}
        <div className="px-8 md:px-16 pt-12 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            className="flex flex-wrap gap-2"
          >
            <LayoutGroup id="filters-projets">
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveFilter(cat)}
                  className={`relative px-5 py-2 text-sm font-mono uppercase tracking-widest transition-colors duration-200 border ${
                    activeFilter === cat
                      ? "text-black border-white"
                      : "text-white/40 border-white/10 hover:text-white hover:border-white/30"
                  }`}
                >
                  {activeFilter === cat && (
                    <motion.span
                      layoutId="filter-pill-projets"
                      className="absolute inset-0 bg-white"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              ))}
            </LayoutGroup>
          </motion.div>
        </div>

        {/* Editorial asymmetric grid */}
        <div className="px-8 md:px-16 pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2"
            >
              {filtered.map((demo, index) => (
                <motion.div
                  key={demo.title}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                  className={demo.tall ? "sm:row-span-2" : ""}
                >
                  <MarketingPreviewLink href={demo.link} className="block h-full">
                    <motion.div
                      className="group relative overflow-hidden bg-black h-full cursor-pointer"
                      style={{ minHeight: demo.tall ? "500px" : "280px" }}
                      data-cursor="image"
                      whileHover="hovered"
                    >
                      {/* Grayscale filter background with accent on hover */}
                      <div
                        className="absolute inset-0 transition-all duration-700"
                        style={{
                          background: `linear-gradient(135deg, ${demo.accent}08, transparent 70%)`,
                        }}
                      />
                      <motion.div
                        className="absolute inset-0"
                        style={{ background: `linear-gradient(135deg, ${demo.accent}20, ${demo.accent}05)` }}
                        initial={{ opacity: 0 }}
                        variants={{ hovered: { opacity: 1 } }}
                        transition={{ duration: 0.4 }}
                      />

                      {/* Number watermark */}
                      <span
                        aria-hidden="true"
                        className="font-display pointer-events-none absolute right-4 bottom-4 select-none text-[8vw] font-bold leading-none"
                        style={{ opacity: 0.06, color: demo.accent }}
                      >
                        {demo.number}
                      </span>

                      {/* Content */}
                      <div className="relative z-10 p-8 flex flex-col h-full">
                        {/* Category badge */}
                        <div className="flex items-center justify-between mb-auto">
                          <span
                            className="text-xs font-mono uppercase tracking-[0.3em] border px-3 py-1"
                            style={{ color: demo.accent, borderColor: `${demo.accent}40` }}
                          >
                            {demo.category}
                          </span>
                          <span className="text-xs font-mono text-white/20">{demo.number}</span>
                        </div>

                        {/* Title with clip-path reveal */}
                        <div className="mt-auto">
                          <div className="overflow-hidden mb-3">
                            <motion.h3
                              className="font-display text-3xl md:text-4xl font-bold text-white"
                              initial={{ y: "100%" }}
                              variants={{ hovered: { y: "0%" } }}
                              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                            >
                              {demo.title}
                            </motion.h3>
                          </div>
                          <motion.p
                            className="text-white/50 text-sm leading-relaxed max-w-xs"
                            initial={{ opacity: 0 }}
                            variants={{ hovered: { opacity: 1 } }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                          >
                            {demo.description}
                          </motion.p>
                          <motion.div
                            className="mt-4 flex items-center gap-2 text-sm font-mono"
                            style={{ color: demo.accent }}
                            initial={{ opacity: 0, x: -10 }}
                            variants={{ hovered: { opacity: 1, x: 0 } }}
                            transition={{ duration: 0.4, delay: 0.15 }}
                          >
                            <span>Voir la démo</span>
                            <span>→</span>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </MarketingPreviewLink>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA Final */}
        <section className="border-t border-white/10 py-32 px-8 md:px-16 text-center">
          <p className="text-white/30 text-sm uppercase tracking-[0.3em] mb-8 font-mono">
            Votre projet, notre expertise
          </p>
          <SplitHeading as="h2" className="font-display text-4xl md:text-6xl font-bold text-white mb-12">
            Vous avez un projet en tête ?
          </SplitHeading>
          <MarketingPreviewLink href="/contact">
            <span className="inline-flex items-center gap-3 border border-white/20 text-white px-10 py-5 text-sm font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
              Me contacter
              <span>→</span>
            </span>
          </MarketingPreviewLink>
        </section>
      </main>
    </>
  );
}
