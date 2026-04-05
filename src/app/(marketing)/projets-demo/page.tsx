"use client";

import { MarketingPreviewLink } from "@/components/ui/transition-link";
import { SplitHeading } from "@/components/ui/split-heading";
import { MarqueeTicker } from "@/components/ui/marquee-ticker";
import { LineReveal } from "@/components/ui/line-reveal";
import { motion } from "motion/react";
import Script from "next/script";
import { useTheme } from "next-themes";

const demos = [
  {
    title: "E-commerce",
    description: "Un e-commerce moderne avec panier d'achat et gestion des produits.",
    link: "/demo/ecommerce",
    accent: "#06b6d4",
    category: "E-commerce",
    number: "01",
  },
  {
    title: "Portfolio",
    description: "Un portfolio créatif avec des animations néon et un design moderne.",
    link: "/demo/portfolio",
    accent: "#a855f7",
    category: "Créatif",
    number: "02",
  },
  {
    title: "Site Vitrine",
    description: "Un site vitrine professionnel et sobre pour PME et artisans.",
    link: "/demo/vitrine",
    accent: "#34d399",
    category: "Vitrine",
    number: "03",
  },
  {
    title: "Blog Magazine",
    description: "Un blog éditorial avec une inspiration magazine et un design chaleureux.",
    link: "/demo/blog",
    accent: "#f59e0b",
    category: "Blog",
    number: "04",
  },
];

export default function ProjetsDemo() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <>
      <Script id="ld-json-projets-demo" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Projets Démo LevisWeb",
          description: "Découvrez différents exemples concrets de sites web réalisés par LevisWeb",
          itemListElement: demos.map((d, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: d.title,
            url: `https://levisweb.net${d.link}`,
            description: d.description,
          })),
        })}
      </Script>

      <main className="min-h-svh bg-[#f5f5f0] dark:bg-black text-black dark:text-white">
        {/* ---- Hero ---- */}
        <section className="relative flex min-h-screen flex-col justify-end overflow-hidden px-8 pb-16 md:px-16">
          <span
            aria-hidden="true"
            className="font-display pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none text-[35vw] font-bold leading-none text-black dark:text-white"
            style={{ opacity: 0.04 }}
          >
            NP
          </span>
          <div className="relative z-10 max-w-6xl">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.4em] text-black/40 dark:text-white/40">
              Exemples concrets
            </p>
            <SplitHeading
              as="h1"
              className="font-display font-bold leading-none text-black dark:text-white mb-6"
              style={{ fontSize: "clamp(3.5rem, 10vw, 12rem)" } as React.CSSProperties}
              triggerOnLoad
            >
              NOS PROJETS
            </SplitHeading>
            <LineReveal className="w-32 mb-8" color="#a855f7" height={2} delay={0.8} />
            <p className="max-w-2xl text-lg leading-relaxed text-black/50 dark:text-white/50 md:text-xl">
              Découvrez différents exemples concrets de ce que je peux réaliser pour vous.
            </p>
          </div>
          <div className="absolute bottom-8 right-8 font-mono text-xs uppercase tracking-widest text-black/25 dark:text-white/25">
            <span className="inline-block animate-bounce">↓ Explorez</span>
          </div>
        </section>

        {/* ---- Marquee ---- */}
        <div className="overflow-hidden border-y border-black/10 dark:border-white/10 py-5">
          <MarqueeTicker speed={25} className="font-mono text-sm uppercase tracking-widest text-black/25 dark:text-white/25">
            <span className="px-8">E-commerce</span>
            <span className="px-4 text-black/15 dark:text-white/15">—</span>
            <span className="px-8">Portfolio</span>
            <span className="px-4 text-black/15 dark:text-white/15">—</span>
            <span className="px-8">Site Vitrine</span>
            <span className="px-4 text-black/15 dark:text-white/15">—</span>
            <span className="px-8">Blog Magazine</span>
            <span className="px-4 text-black/15 dark:text-white/15">—</span>
            <span className="px-8">LevisWeb Demos</span>
            <span className="px-4 text-black/15 dark:text-white/15">—</span>
          </MarqueeTicker>
        </div>

        {/* ---- Grille projets ---- */}
        <section className="px-8 py-24 md:px-16">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {demos.map((demo, i) => (
              <motion.div
                key={demo.number}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <MarketingPreviewLink href={demo.link} className="block">
                  <motion.div
                    className="group relative overflow-hidden cursor-pointer"
                    style={{
                      height: i === 0 ? "420px" : i === 1 ? "340px" : i === 2 ? "340px" : "420px",
                      background: `linear-gradient(160deg, ${demo.accent}22, ${demo.accent}0a 50%, ${isDark ? "#111111" : "#ebebeb"} 100%)`,
                      border: `1px solid ${demo.accent}50`,
                    }}
                    data-cursor="image"
                    whileHover="hovered"
                  >
                    {/* Hover gradient */}
                    <motion.div
                      className="absolute inset-0"
                      style={{ background: `linear-gradient(160deg, ${demo.accent}35, ${demo.accent}12 50%, transparent)` }}
                      initial={{ opacity: 0 }}
                      variants={{ hovered: { opacity: 1 } }}
                      transition={{ duration: 0.4 }}
                    />

                    {/* Number watermark */}
                    <span
                      aria-hidden="true"
                      className="font-display pointer-events-none absolute right-6 bottom-6 select-none font-bold leading-none"
                      style={{ opacity: 0.08, color: demo.accent, fontSize: "clamp(6rem, 12vw, 16rem)" }}
                    >
                      {demo.number}
                    </span>

                    {/* Content */}
                    <div className="relative z-10 flex h-full flex-col p-8">
                      <div className="mb-auto flex items-center justify-between">
                        <span
                          className="border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em]"
                          style={{ color: demo.accent, borderColor: `${demo.accent}70` }}
                        >
                          {demo.category}
                        </span>
                        <span className="font-mono text-xs text-black/30 dark:text-white/30">{demo.number}</span>
                      </div>
                      <div className="mt-auto">
                        <div
                          className="mb-4 h-px w-12 transition-all duration-500 group-hover:w-full"
                          style={{ background: demo.accent }}
                        />
                        <h3 className="font-display text-3xl font-bold text-black dark:text-white md:text-4xl lg:text-5xl">
                          {demo.title}
                        </h3>
                        <p className="mt-2 max-w-xs text-sm leading-relaxed text-black/50 dark:text-white/50">
                          {demo.description}
                        </p>
                        <motion.div
                          className="mt-4 flex items-center gap-2 font-mono text-sm"
                          style={{ color: demo.accent }}
                          initial={{ opacity: 0, x: -10 }}
                          variants={{ hovered: { opacity: 1, x: 0 } }}
                          transition={{ duration: 0.3, delay: 0.1 }}
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
          </div>
        </section>

        {/* ---- CTA ---- */}
        <section className="border-t border-black/10 dark:border-white/10 px-8 py-32 text-center md:px-16">
          <p className="mb-8 font-mono text-sm uppercase tracking-[0.3em] text-black/35 dark:text-white/35">
            Votre projet, notre expertise
          </p>
          <SplitHeading as="h2" className="font-display mb-12 text-4xl font-bold text-black dark:text-white md:text-6xl">
            Vous avez un projet en tête ?
          </SplitHeading>
          <MarketingPreviewLink href="/contact">
            <span className="inline-flex items-center gap-3 border border-black/20 dark:border-white/20 px-10 py-5 font-mono text-sm uppercase tracking-widest text-black dark:text-white transition-colors duration-300 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black">
              Me contacter
              <span>→</span>
            </span>
          </MarketingPreviewLink>
        </section>
      </main>
    </>
  );
}
