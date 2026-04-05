"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { useRef, useCallback } from "react";
import gsap from "gsap";
import { LineReveal } from "@/components/ui/line-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";

function HoverLink({ href, children, external = false }: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const underlineRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = useCallback(() => {
    if (underlineRef.current) {
      gsap.fromTo(underlineRef.current, { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 0.3, ease: "expo.out" });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (underlineRef.current) {
      gsap.to(underlineRef.current, { scaleX: 0, transformOrigin: "right", duration: 0.25, ease: "expo.in" });
    }
  }, []);

  const inner = (
    <span className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      <span
        ref={underlineRef}
        className="absolute bottom-0 left-0 w-full h-px bg-current"
        style={{ transform: "scaleX(0)", transformOrigin: "left" }}
      />
    </span>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="link"
        className="block text-neutral-400 hover:text-white transition-colors duration-200"
      >
        {inner}
      </a>
    );
  }

  return (
    <Link
      href={href}
      data-cursor="link"
      className="block text-neutral-400 hover:text-white transition-colors duration-200"
    >
      {inner}
    </Link>
  );
}

function SocialIcon({ href, label, rotationDeg = 15, children }: {
  href: string;
  label: string;
  rotationDeg?: number;
  children: React.ReactNode;
}) {
  const iconRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => {
    if (iconRef.current) {
      gsap.to(iconRef.current, { rotate: rotationDeg, scale: 1.2, duration: 0.4, ease: "back.out(1.5)" });
    }
  }, [rotationDeg]);

  const handleMouseLeave = useCallback(() => {
    if (iconRef.current) {
      gsap.to(iconRef.current, { rotate: 0, scale: 1, duration: 0.4, ease: "elastic.out(1, 0.4)" });
    }
  }, []);

  return (
    <MagneticButton strength={0.4}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 text-neutral-500 hover:border-violet-500/50 hover:text-violet-400 transition-colors duration-300"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={iconRef}>
          {children}
        </div>
      </a>
    </MagneticButton>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-neutral-950 text-white">
      {/* LineReveal top border */}
      <LineReveal
        className="absolute top-0 left-0 w-full"
        color="linear-gradient(to right, transparent, hsl(258 96% 67%), transparent)"
        height={1}
      />

      {/* Giant background watermark LevisWeb */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden"
      >
        <span
          className="font-display whitespace-nowrap text-[20vw] font-bold uppercase leading-none"
          style={{
            opacity: 0.06,
            background: "linear-gradient(to right, #06b6d4, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          LevisWeb
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-20">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-5 lg:col-span-1">
            <motion.span
              className="font-display text-2xl font-bold text-white inline-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            >
              LevisWeb
            </motion.span>
            <p className="max-w-xs text-sm leading-relaxed text-neutral-500">
              Développement web freelance — Sites modernes, rapides et optimisés
              SEO.
            </p>
            <div className="flex gap-3">
              <SocialIcon
                href="https://www.instagram.com/levisweb"
                label="Instagram LevisWeb"
                rotationDeg={12}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </SocialIcon>
              <SocialIcon
                href="https://twitter.com/levisweb"
                label="Twitter/X LevisWeb"
                rotationDeg={-12}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.256 5.626zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          {/* Adresse */}
          <div className="space-y-5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600">
              Adresse
            </h4>
            <address className="not-italic space-y-1 text-sm text-neutral-500">
              <p>30 place centrale</p>
              <p>38380 Entre-Deux-Guiers</p>
              <p>France</p>
            </address>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600">
              Contact
            </h4>
            <div className="space-y-3 text-sm">
              <HoverLink href="tel:+33783422676" external>
                07 83 42 26 76
              </HoverLink>
              <HoverLink href="/contact">
                Nous contacter
              </HoverLink>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600">
              Légal
            </h4>
            <div className="space-y-3 text-sm">
              {[
                { href: "/terms", label: "CGU" },
                { href: "/cgv", label: "CGV" },
                { href: "/privacy", label: "Confidentialité" },
                { href: "/mentions-legales", label: "Mentions légales" },
              ].map((item) => (
                <HoverLink key={item.href} href={item.href}>
                  {item.label}
                </HoverLink>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-neutral-900 pt-8 md:flex-row">
          <p className="text-xs text-neutral-700">
            &copy; {new Date().getFullYear()} LevisWeb. Tous droits réservés.
          </p>
          <p className="text-xs text-neutral-800">
            Fait avec soin en Chartreuse, France
          </p>
        </div>
      </div>
    </footer>
  );
}
