"use client";
import Link from "next/link";
import { motion } from "motion/react";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-neutral-950 text-white">
      {/* Animated top line */}
      <motion.div
        className="absolute top-0 left-0 h-px w-full origin-left bg-gradient-to-r from-transparent via-violet-500 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Giant background wordmark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden"
      >
        <span
          className="font-display whitespace-nowrap text-[22vw] font-bold uppercase leading-none text-white"
          style={{ opacity: 0.04 }}
        >
          LevisWeb
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-20">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-5 lg:col-span-1">
            <span className="font-display text-2xl font-bold navbar-logo">
              LevisWeb
            </span>
            <p className="max-w-xs text-sm leading-relaxed text-neutral-400">
              Développement web freelance — Sites modernes, rapides et optimisés
              SEO.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/levisweb"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="IG"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-700 text-neutral-400 transition-colors duration-200 hover:border-violet-500 hover:text-violet-400"
                aria-label="Instagram LevisWeb"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://twitter.com/levisweb"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="X"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-700 text-neutral-400 transition-colors duration-200 hover:border-violet-500 hover:text-violet-400"
                aria-label="Twitter/X LevisWeb"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.256 5.626zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Adresse */}
          <div className="space-y-5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Adresse
            </h4>
            <address className="not-italic space-y-1 text-sm text-neutral-400">
              <p>30 place centrale</p>
              <p>38380 Entre-Deux-Guiers</p>
              <p>France</p>
            </address>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Contact
            </h4>
            <div className="space-y-3 text-sm">
              <a
                href="tel:+33783422676"
                data-cursor="Tel"
                className="group flex items-center gap-2 text-neutral-400 transition-colors duration-200 hover:text-white"
              >
                <span className="text-neutral-600 group-hover:text-violet-400 transition-colors duration-200">07 83 42 26 76</span>
              </a>
              <Link
                href="/contact"
                data-cursor="Mail"
                className="group flex items-center gap-2 text-neutral-400 transition-colors duration-200 hover:text-white"
              >
                <span className="text-neutral-600 group-hover:text-violet-400 transition-colors duration-200">Nous contacter</span>
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Légal
            </h4>
            <div className="space-y-3 text-sm">
              {[
                { href: "/terms", label: "CGU" },
                { href: "/cgv", label: "CGV" },
                { href: "/privacy", label: "Confidentialité" },
                { href: "/mentions-legales", label: "Mentions légales" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  data-cursor="Voir"
                  className="block text-neutral-400 transition-colors duration-200 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-8 md:flex-row">
          <p className="text-xs text-neutral-600">
            &copy; {new Date().getFullYear()} LevisWeb. Tous droits réservés.
          </p>
          <p className="text-xs text-neutral-700">
            Fait avec soin en Chartreuse, France
          </p>
        </div>
      </div>
    </footer>
  );
}
