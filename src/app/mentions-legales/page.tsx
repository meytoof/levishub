"use client";

import { TracingBeam } from "@/components/ui/tracing-beam";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "editeur", title: "1. Éditeur du site" },
  { id: "hebergement", title: "2. Hébergement" },
  { id: "propriete", title: "3. Propriété intellectuelle" },
  { id: "responsabilite", title: "4. Responsabilité" },
  { id: "droit", title: "5. Droit applicable" },
];

function StickyTOC({ active }: { active: string }) {
  return (
    <aside className="hidden lg:block lg:w-56 xl:w-64 shrink-0">
      <div className="sticky top-28 space-y-1">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
          Sommaire
        </p>
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`block py-1.5 pl-3 text-sm transition-all duration-200 border-l-2 ${
              active === s.id
                ? "border-violet-500 text-violet-500 font-semibold"
                : "border-transparent text-neutral-500 hover:text-foreground hover:border-neutral-300"
            }`}
          >
            {s.title}
          </a>
        ))}
      </div>
    </aside>
  );
}

export default function MentionsLegalesPage() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(s.id);
          }
        },
        { rootMargin: "-20% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
      {/* Hero header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        className="mb-16"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
          Transparence &amp; Légal
        </p>
        <h1 className="font-display text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
          Mentions Légales
        </h1>
      </motion.div>

      <div className="flex gap-12 lg:gap-20">
        {/* Sticky TOC */}
        <StickyTOC active={activeSection} />

        {/* Content */}
        <TracingBeam className="flex-1 min-w-0">
          <div className="space-y-16 max-w-3xl">
            {/* Section 1 */}
            <motion.section
              id="editeur"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            >
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                1. Éditeur du site
              </h2>
              <div className="space-y-2 text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">Raison sociale :</strong>{" "}
                  LevisWeb
                </p>
                <p>
                  <strong className="text-foreground">Adresse :</strong> 30
                  place centrale, 38380 Entre-Deux-Guiers, France
                </p>
                <p>
                  <strong className="text-foreground">Téléphone :</strong> 07 83
                  42 26 76
                </p>
                <p>
                  <strong className="text-foreground">Email :</strong>{" "}
                  <a
                    href="mailto:contact@levisweb.fr"
                    className="text-violet-500 hover:underline"
                  >
                    contact@levisweb.fr
                  </a>
                </p>
                <p>
                  <strong className="text-foreground">Activité :</strong>{" "}
                  Développement web freelance
                </p>
              </div>
            </motion.section>

            <div className="h-px bg-neutral-200 dark:bg-neutral-800" />

            {/* Section 2 */}
            <motion.section
              id="hebergement"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            >
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                2. Hébergement
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Ce site est hébergé par Vercel Inc., 340 S Lemon Ave #4133,
                Walnut, CA 91789, États-Unis.
              </p>
            </motion.section>

            <div className="h-px bg-neutral-200 dark:bg-neutral-800" />

            {/* Section 3 */}
            <motion.section
              id="propriete"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            >
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                3. Propriété intellectuelle
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                L&apos;ensemble du contenu de ce site (textes, images, code
                source) est protégé par le droit d&apos;auteur. Toute
                reproduction sans autorisation préalable est interdite.
              </p>
            </motion.section>

            <div className="h-px bg-neutral-200 dark:bg-neutral-800" />

            {/* Section 4 */}
            <motion.section
              id="responsabilite"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            >
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                4. Responsabilité
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                LevisWeb s&apos;efforce d&apos;assurer l&apos;exactitude des
                informations diffusées sur ce site mais ne peut garantir
                qu&apos;elles soient exemptes d&apos;erreurs.
              </p>
            </motion.section>

            <div className="h-px bg-neutral-200 dark:bg-neutral-800" />

            {/* Section 5 */}
            <motion.section
              id="droit"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            >
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                5. Droit applicable
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Les présentes mentions légales sont soumises au droit français.
                En cas de litige, les tribunaux français sont seuls compétents.
              </p>
            </motion.section>
          </div>
        </TracingBeam>
      </div>
    </div>
  );
}
