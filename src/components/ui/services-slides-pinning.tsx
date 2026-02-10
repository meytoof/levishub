"use client";

import { Button } from "@/components/ui/button";
import { PulseCTA } from "@/components/ui/PulseCTA";
import { StaggeredReveal } from "@/components/ui/staggered-reveal";
import { MarketingPreviewLink } from "@/components/ui/transition-link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SLIDES = [
  {
    id: "hero",
    bgClass:
      "bg-gradient-to-br from-amber-200 via-orange-100 to-lime-200 dark:from-slate-900 dark:via-cyan-950 dark:to-teal-900",
    content: (
      <div className="section-inner flex h-full flex-col items-center justify-center overflow-visible px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          <p className="slide-reveal-words text-sm font-semibold uppercase tracking-[0.3em] text-amber-600/80 dark:text-cyan-400/80 sm:text-base">
            Offres & Accompagnement
          </p>
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9rem]">
            <span className="slide-reveal-words block text-neutral-800 dark:text-neutral-200">
              Nos Services de
            </span>
            <span className="slide-reveal-words slide-reveal-words-gradient mt-2 block bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent pb-3 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400">
              Communication Digitale
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mx-auto max-w-2xl text-xl text-neutral-600 dark:text-neutral-400 sm:text-2xl"
          >
            De la création de sites web à la formation en stratégie digitale, je
            vous accompagne dans tous vos projets.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <PulseCTA href="/contact" size="lg">
              Discutons de votre projet
            </PulseCTA>
          </motion.div>
        </motion.div>
      </div>
    ),
  },
  {
    id: "principaux",
    bgClass:
      "bg-gradient-to-br from-lime-200 via-emerald-100 to-amber-200 dark:from-blue-950 dark:via-indigo-950 dark:to-slate-900",
    content: (
      <div className="section-inner flex h-full flex-col justify-center overflow-hidden px-6 pb-[20vh] pt-8 sm:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <p className="slide-reveal-words mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-700/70 dark:text-cyan-400/70">
            Solutions complètes
          </p>
          <h2 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="slide-reveal-words slide-reveal-words-gradient bg-gradient-to-r from-orange-600 to-amber-700 bg-clip-text text-transparent dark:from-cyan-400 dark:to-blue-500">
              Services Principaux
            </span>
          </h2>
        </motion.div>
        <StaggeredReveal
          className="mx-auto grid max-w-5xl gap-8 text-left sm:grid-cols-2 lg:gap-16"
          staggerDelay={150}
          direction="up"
        >
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-white/90 p-8 shadow-xl backdrop-blur-sm transition-shadow duration-300 hover:shadow-2xl dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15"
          >
            <span className="absolute -right-4 -top-4 text-8xl opacity-20 transition-transform duration-300 group-hover:scale-110">
              🌐
            </span>
            <h3 className="relative mb-4 text-3xl font-bold sm:text-4xl">
              Création de Sites Web
            </h3>
            <ul className="relative space-y-3 text-base text-neutral-600 dark:text-neutral-400">
              <li>→ Sites vitrines modernes et responsives</li>
              <li>→ E-commerce avec paiements sécurisés</li>
              <li>→ Applications web sur mesure</li>
              <li>→ Backoffices et interfaces d&apos;administration</li>
              <li>→ Optimisation des performances</li>
            </ul>
            <MarketingPreviewLink href="/contact" className="relative mt-6 inline-block">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-amber-500/60 font-semibold hover:border-amber-600 hover:bg-amber-50 dark:border-cyan-500/50 dark:hover:border-cyan-500 dark:hover:bg-cyan-950/30"
              >
                Demander un devis
              </Button>
            </MarketingPreviewLink>
          </motion.div>
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-white/90 p-8 shadow-xl backdrop-blur-sm transition-shadow duration-300 hover:shadow-2xl dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15"
          >
            <span className="absolute -right-4 -top-4 text-8xl opacity-20 transition-transform duration-300 group-hover:scale-110">
              🎓
            </span>
            <h3 className="relative mb-4 text-3xl font-bold sm:text-4xl">
              Formation & Accompagnement
            </h3>
            <ul className="relative space-y-3 text-base text-neutral-600 dark:text-neutral-400">
              <li>→ Formation en développement web</li>
              <li>→ Accompagnement stratégique digital</li>
              <li>→ Workshops sur mesure</li>
              <li>→ Support technique continu</li>
              <li>→ Mentoring personnalisé</li>
            </ul>
            <MarketingPreviewLink href="/contact" className="relative mt-6 inline-block">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-amber-500/60 font-semibold hover:border-amber-600 hover:bg-amber-50 dark:border-cyan-500/50 dark:hover:border-cyan-500 dark:hover:bg-cyan-950/30"
              >
                En savoir plus
              </Button>
            </MarketingPreviewLink>
          </motion.div>
        </StaggeredReveal>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center text-sm italic tracking-wide text-neutral-500 dark:text-neutral-500"
        >
          Scroll pour continuer ↓
        </motion.p>
      </div>
    ),
  },
  {
    id: "specialises",
    bgClass:
      "bg-gradient-to-br from-rose-200 via-amber-200 to-emerald-200 dark:from-indigo-950 dark:via-violet-950 dark:to-purple-900",
    content: (
      <div className="section-inner flex h-full flex-col items-center overflow-hidden px-6 py-8 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="slide-reveal-words mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-rose-600/70 dark:text-blue-400/70">
            Expertise pointue
          </p>
          <h2 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="slide-reveal-words slide-reveal-words-gradient bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-violet-500">
              Services Spécialisés
            </span>
          </h2>
        </motion.div>
        <StaggeredReveal
          className="grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6"
          staggerDelay={80}
          direction="scale"
        >
          {[
            {
              icon: "🔍",
              title: "SEO & Visibilité",
              desc: "Audit, optimisation technique, stratégie de mots-clés",
            },
            {
              icon: "📊",
              title: "Stratégie Digitale",
              desc: "Analyse de marché, plan d'action, KPIs",
            },
            {
              icon: "📱",
              title: "Communication Digitale",
              desc: "Réseaux sociaux, contenu, community management",
            },
            {
              icon: "⚡",
              title: "Performance Web",
              desc: "Audit, optimisation images, mise en cache",
            },
            {
              icon: "🔒",
              title: "Sécurité Web",
              desc: "Protection, SSL/TLS, sauvegardes",
            },
            {
              icon: "🛠️",
              title: "Maintenance & Support",
              desc: "Mises à jour, monitoring 24/7",
            },
          ].map((s) => (
            <motion.div
              key={s.title}
              whileHover={{ scale: 1.03, y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/90 p-6 backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-xl dark:border-white/10 dark:bg-white/10"
            >
              <span className="text-4xl transition-transform duration-300 group-hover:scale-110">
                {s.icon}
              </span>
              <h4 className="mt-4 text-xl font-bold sm:text-2xl">{s.title}</h4>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </StaggeredReveal>
      </div>
    ),
  },
  {
    id: "process",
    bgClass:
      "bg-gradient-to-br from-orange-200 via-amber-200 to-rose-200 dark:from-violet-950 dark:via-fuchsia-950 dark:to-rose-950",
    content: (
      <div className="section-inner flex h-full flex-col items-center justify-center overflow-hidden px-6 py-8 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="slide-reveal-words mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-rose-600/70 dark:text-violet-400/70">
            Méthodologie
          </p>
          <h2 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="slide-reveal-words slide-reveal-words-gradient bg-gradient-to-r from-rose-600 via-orange-600 to-amber-700 bg-clip-text text-transparent dark:from-violet-400 dark:to-fuchsia-400">
              Comment je travaille
            </span>
          </h2>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
            Une approche structurée et transparente
          </p>
        </motion.div>
        <StaggeredReveal
          className="grid w-full max-w-6xl grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-12"
          staggerDelay={120}
          direction="down"
        >
          {[
            {
              n: "01",
              title: "Consultation",
              desc: "Analyse de vos besoins et objectifs",
            },
            {
              n: "02",
              title: "Planification",
              desc: "Plan détaillé avec planning et livrables",
            },
            {
              n: "03",
              title: "Exécution",
              desc: "Développement avec suivi régulier",
            },
            {
              n: "04",
              title: "Livraison",
              desc: "Mise en ligne et accompagnement",
            },
          ].map((s) => (
            <motion.div
              key={s.n}
              whileHover={{ y: -6 }}
              className="group relative text-center"
            >
              <div className="process-circle-1 mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full text-2xl font-bold text-white shadow-xl transition-transform duration-300 group-hover:scale-110 sm:h-28 sm:w-28 sm:text-3xl">
                {s.n}
              </div>
              <h4 className="text-xl font-bold sm:text-2xl">{s.title}</h4>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </StaggeredReveal>
      </div>
    ),
  },
];

export function ServicesSlidesPinning() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || typeof window === "undefined") return;

    const panels = gsap.utils.toArray<HTMLElement>(".services-slide-panel");

    const ctx = gsap.context(() => {
      panels.forEach((panel, index) => {
        const isLastPanel = index === panels.length - 1;
        const innerPanel = panel.querySelector(".section-inner") as HTMLElement;
        if (!innerPanel) return;

        const panelHeight = innerPanel.offsetHeight;
        const windowHeight = window.innerHeight;
        const difference = panelHeight - windowHeight;
        const fakeScrollRatio =
          difference > 0 ? difference / (difference + windowHeight) : 0;

        // On n'ajoute du faux scroll qu'aux panneaux intermédiaires,
        // pas au dernier slide pour éviter le gros gap avant le footer.
        if (fakeScrollRatio && !isLastPanel) {
          (panel as HTMLElement).style.marginBottom = `${panelHeight * fakeScrollRatio}px`;
        }

        const shouldPin = !isLastPanel;
        const slideId = (panel as HTMLElement).dataset.slideId;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: "bottom bottom",
            end:
              fakeScrollRatio && !isLastPanel
                ? `+=${innerPanel.offsetHeight}`
                : "bottom top",
            pinSpacing: shouldPin ? false : true,
            pin: shouldPin,
            scrub: shouldPin,
          },
        });

        // Animation Awwwards : word-split slide-up + blocks blur/scale
        const easeReveal = "power4.out" as const;
        const splitWords = (el: HTMLElement) => {
          // On laisse le hero (slide \"hero\") tranquille pour éviter les soucis de crop,
          // il a déjà sa propre anim via Framer Motion.
          if (slideId === "hero") return;
          if (el.classList.contains("slide-reveal-words-gradient")) return;
          const text = el.textContent || "";
          const words = text.split(/\s+/).filter(Boolean);
          if (words.length < 2) return;
          el.innerHTML = words
            .map(
              (w) =>
                `<span class="word-wrap" style="display:inline-block;overflow:hidden;vertical-align:bottom"><span class="word-inner" style="display:inline-block">${w}</span></span>`
            )
            .join(" ");
        };
        innerPanel
          .querySelectorAll<HTMLElement>(".slide-reveal-words")
          .forEach(splitWords);
        const words = innerPanel.querySelectorAll(".word-inner");
        const blocks = Array.from(innerPanel.children);
        gsap.fromTo(
          words,
          { yPercent: 110 },
          {
            yPercent: 0,
            stagger: 0.035,
            duration: 1,
            ease: easeReveal,
            scrollTrigger: {
              trigger: panel,
              start: "top 82%",
              end: "top 28%",
              scrub: 1.2,
            },
          }
        );
        gsap.fromTo(
          blocks,
          {
            opacity: 0,
            scale: 0.96,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            stagger: 0.07,
            duration: 1,
            ease: easeReveal,
            scrollTrigger: {
              trigger: panel,
              start: "top 85%",
              end: "top 25%",
              scrub: 1.2,
            },
          }
        );

        if (fakeScrollRatio) {
          tl.to(innerPanel, {
            yPercent: -100,
            y: window.innerHeight,
            duration: 1 / (1 - fakeScrollRatio) - 1,
            ease: "none",
          });
        }

        tl.fromTo(
          panel,
          { scale: 1, opacity: 1 },
          { scale: 0.7, opacity: 0.5, duration: 0.9, ease: "none" }
        ).to(panel, { opacity: 0, duration: 0.1, ease: "none" });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="services-slides-wrapper mt-[72px] w-full md:mt-20">
      {SLIDES.map((slide) => (
        <section
          key={slide.id}
          data-slide-id={slide.id}
          className={`services-slide-panel section flex min-h-[calc(100vh-80px)] w-full items-center justify-center overflow-hidden px-4 py-6 sm:px-6 ${slide.bgClass}`}
        >
          <div className="section-content h-full w-full max-w-7xl">
            {slide.content}
          </div>
        </section>
      ))}

      {/* Section CTA finale */}
      <section className="services-cta-overlap relative z-20 flex w-full flex-col items-center justify-center bg-gradient-to-br from-amber-200 via-lime-100 to-rose-200 px-6 py-24 text-center dark:from-emerald-950 dark:via-teal-950 dark:to-cyan-900 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-10"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-400/70 dark:text-amber-700/70">
            Prêt à démarrer ?
          </p>
          <h2 className="max-w-5xl text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent dark:from-amber-600 dark:via-orange-600 dark:to-rose-600">
              Prêt à transformer votre présence digitale ?
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-neutral-600 dark:text-neutral-400">
            Que vous ayez besoin d&apos;un site web, d&apos;une formation ou
            d&apos;une stratégie digitale complète.
          </p>
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
            <PulseCTA href="/contact" size="lg">Discutons de votre projet</PulseCTA>
            <MarketingPreviewLink href="/pricing">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-orange-500/60 px-10 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:border-orange-600 dark:border-cyan-500/50 dark:hover:border-cyan-600"
              >
                Voir mes tarifs
              </Button>
            </MarketingPreviewLink>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
