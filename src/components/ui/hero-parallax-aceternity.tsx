"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import React, { useLayoutEffect, useRef } from "react";
import { MarketingPreviewLink } from "./transition-link";

// Enregistrer les plugins GSAP côté client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Split du titre en caractères en préservant les gradients (Site web., Empire.)
const splitTitleToChars = (titleElement: HTMLElement): HTMLElement[] => {
  const chars: HTMLElement[] = [];

  const walk = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || "";
      if (!text.length) return;
      const parent = node.parentElement;
      const cls =
        parent?.classList.contains("bg-clip-text") ? parent.className : "";

      const parentText = parent?.textContent ?? "";
      for (const ch of text) {
        const span = document.createElement("span");
        span.textContent = ch === " " ? "\u00A0" : ch; // espace insécable pour éviter la collapse
        span.style.display = "inline-block";
        if (ch === " ") span.style.minWidth = "0.25em";
        if (cls) span.className = cls;
        if ((ch === "i" || ch === "I") && parentText.includes("Site"))
          span.classList.add("hero-i-site");
        if ((ch === "i" || ch === "I") && parentText.includes("Empire"))
          span.classList.add("hero-i-empire");
        chars.push(span);
        node.parentNode?.insertBefore(span, node);
      }
      node.parentNode?.removeChild(node);
      return;
    }
    if (
      node.nodeType === Node.ELEMENT_NODE &&
      (node as HTMLElement).tagName !== "BR"
    ) {
      Array.from(node.childNodes).forEach(walk);
    }
  };

  Array.from(titleElement.childNodes).forEach(walk);
  return chars;
};

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig,
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig,
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig,
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig,
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig,
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-900, 500]),
    springConfig,
  );
  return (
    <div className="relative" id="hero-section">
      <div
        ref={ref}
        className="h-[300vh] overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] bg-transparent z-10"
      >
        <Header />
        <motion.div
          style={{
            rotateX,
            rotateZ,
            translateY,
            opacity,
          }}
          className="relative z-10"
        >
          <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
            {firstRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                key={product.title}
              />
            ))}
          </motion.div>
          <motion.div className="flex flex-row  mb-20 space-x-20 ">
            {secondRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateXReverse}
                key={product.title}
              />
            ))}
          </motion.div>
          <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
            {thirdRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                key={product.title}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export const Header = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  
  // Scroll progress pour réaction au scroll
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };
  
  // Transformations réactives au scroll (moins agressives pour garder le texte visible)
  const titleScale = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [1, 0.92]),
    springConfig
  );
  const titleLetterSpacing = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [0, -0.01]),
    springConfig
  );
  const titleY = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [0, -40]),
    springConfig
  );
  const titleOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.4], [1, 0.85]),
    springConfig
  );

  useLayoutEffect(() => {
    if (!titleRef.current || !subtitleRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Animation par lettres du H1 avec effet 3D sur certaines lettres
      const tl = gsap.timeline({ delay: 0.1, defaults: { ease: "power4.out" } });

      const titleElement = titleRef.current!;
      const chars = splitTitleToChars(titleElement);

      const thinChars: HTMLElement[] = [];
      const otherChars: HTMLElement[] = [];

      chars.forEach((charEl) => {
        const ch = (charEl.textContent || "").replace(/\u00A0/g, " ").trim();
        if (/[IltiTI]/.test(ch)) {
          thinChars.push(charEl); // I, l, t, i → rotationY flip
        } else if (/[Oo]/.test(ch)) {
          thinChars.push(charEl); // O, o → rotationY flip aussi
        } else {
          otherChars.push(charEl);
        }
      });

      if (otherChars.length) {
        tl.fromTo(
          otherChars,
          {
            y: 40,
            opacity: 0,
            rotationX: 15,
            filter: "blur(4px)",
            transformOrigin: "50% 100%",
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            filter: "blur(0px)",
            duration: 1,
            stagger: 0.015,
          },
        );
      }

      if (thinChars.length) {
        tl.fromTo(
          thinChars,
          {
            rotationY: -90,
            opacity: 0,
            transformOrigin: "50% 50%",
          },
          {
            rotationY: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.02,
          },
          0.05,
        );
      }

      // 2. Animation du sous-titre (sans split pour préserver le span levis-i)
      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        "-=0.4",
      );

      // 3. Boucle rotation 3D sur les i (Site, Empire, Levis) toutes les ~3s, indépendants
      tl.add(() => {
        [".hero-i-site", ".hero-i-empire", ".levis-i"].forEach((sel, idx) => {
          const el = document.querySelector<HTMLElement>(sel);
          if (el) {
            gsap.to(el, {
              rotationY: 360,
              duration: 1.2,
              ease: "power2.inOut",
              transformOrigin: "50% 50%",
              repeat: -1,
              repeatDelay: 2.2,
              delay: idx * 0.4, // décalage pour que chaque i tourne à son propre rythme
            });
          }
        });
      });
    });

    // Animation GSAP pour le bouton "Commencer mon projet"
    const projectButton = document.querySelector(".project-cta-button");
    const projectSlideBg = document.querySelector(".project-slide-bg");

    if (projectButton && projectSlideBg) {
      // Position initiale : complètement à gauche et invisible
      gsap.set(projectSlideBg, {
        x: "-100%",
        skewX: -12,
        opacity: 0,
      });

      // Animation au hover
      projectButton.addEventListener("mouseenter", () => {
        gsap.to(projectSlideBg, {
          x: "0%",
          opacity: 1,
          scaleX: 1.2,
          duration: 0.9,
          ease: "power2.out",
        });
      });

      projectButton.addEventListener("mouseleave", () => {
        gsap.to(projectSlideBg, {
          x: "-100%",
          opacity: 0,
          scaleX: 1,
          duration: 0.9,
          ease: "power2.out",
        });
      });
    }

    // Animation GSAP pour le bouton "Voir mes services"
    const servicesButton = document.querySelector(".services-cta-button");
    const servicesSlideBg = document.querySelector(".services-slide-bg");

    if (servicesButton && servicesSlideBg) {
      // Position initiale : complètement à gauche et invisible
      gsap.set(servicesSlideBg, {
        x: "-100%",
        skewX: -12,
        opacity: 0,
      });

      // Animation au hover
      servicesButton.addEventListener("mouseenter", () => {
        gsap.to(servicesSlideBg, {
          x: "0%",
          opacity: 1,
          scaleX: 1.2,
          duration: 0.9,
          ease: "power2.out",
        });
      });

      servicesButton.addEventListener("mouseleave", () => {
        gsap.to(servicesSlideBg, {
          x: "-100%",
          opacity: 0,
          scaleX: 1,
          duration: 0.9,
          ease: "power2.out",
        });
      });
    }

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={headerRef}
      className="h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 relative z-30"
      role="banner"
    >
      {/* Main Content */}
      <div className="relative grid grid-cols-1 gap-8 lg:gap-16 items-center z-10">
        {/* Section principale : titre + description + CTA alignés verticalement */}
        <div className="lg:text-right order-1 lg:order-2">
          <motion.h1
            ref={titleRef}
            style={{
              scale: titleScale,
              letterSpacing: titleLetterSpacing,
              y: titleY,
              opacity: titleOpacity,
            }}
            className="hero-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[1] mb-6 lg:mb-8 text-center"
          >
            <span
              style={{
                textShadow:
                  "3px 3px 0px #000000, -3px -3px 0px #000000, 3px -3px 0px #000000, -3px 3px 0px #000000, 0px 0px 20px rgba(0,0,0,0.8)",
              }}
            >
              Nous gérons le{" "}
            </span>
            <span className="bg-[linear-gradient(135deg,#a855f7,#ec4899,#f43f5e)] dark:bg-gradient-to-r dark:from-cyan-400 dark:to-violet-400 bg-clip-text text-transparent">
              Site web.
            </span>
            <br />
            <span
              style={{
                textShadow:
                  "3px 3px 0px #000000, -3px -3px 0px #000000, 3px -3px 0px #000000, -3px 3px 0px #000000, 0px 0px 20px rgba(0,0,0,0.8)",
              }}
            >
              Vous gérez l&apos;{" "}
            </span>
            <span className="bg-[linear-gradient(135deg,#a855f7,#ec4899,#f43f5e)] dark:bg-gradient-to-r dark:from-violet-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Empire.
            </span>
          </motion.h1>
          <p
            ref={subtitleRef}
            className="text-base sm:text-lg md:text-xl text-slate-800 dark:text-gray-300 max-w-lg mx-auto leading-relaxed text-center mb-4"
          >
            Lev<span className="levis-i inline-block" style={{ transformOrigin: "50% 50%" }}>i</span>sWeb — développeur web freelance. Je conçois des sites vitrines,
            e‑commerce et backoffices sur mesure, optimisés pour la performance,
            le référencement et la conversion.
          </p>

          {/* Texte court au-dessus du call-to-action */}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mx-auto justify-center">
            <MarketingPreviewLink
              href="/contact"
              className="relative block overflow-hidden rounded-full p-px group w-full sm:w-auto"
              urlOverride="https://levisweb.net/contact"
              style={{
                borderRadius: "3.40282e+38px",
              }}
            >
              {/* Bouton principal */}
              <div className="relative flex sm:inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold no-underline cursor-pointer outline-offset-4 transition-all duration-500 transform group-hover:scale-105 text-white shadow-2xl hover:shadow-cyan-500/25 backdrop-blur-xl overflow-hidden project-cta-button border-2 border-white/40 hover:border-white/60 w-full sm:w-auto">
                <span className="relative z-10">Commencer mon projet</span>
                <div
                  className="project-slide-bg absolute top-0 left-0 h-full w-[180%] bg-gradient-to-r from-emerald-500 to-purple-600 transform -skew-x-12"
                  style={{
                    transform: "translateX(-100%) skewX(-12deg)",
                    opacity: 0,
                  }}
                ></div>
              </div>

              {/* Effet de bordure animée avec point lumineux */}
              <div className="absolute inset-0 -z-10 rounded-full">
                {/* SVG pour le contour parfaitement rond */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  className="absolute h-full w-full"
                  width="100%"
                  height="100%"
                >
                  <rect
                    fill="none"
                    width="100%"
                    height="100%"
                    rx="50%"
                    ry="50%"
                  ></rect>
                </svg>

                {/* Point lumineux qui orbite - VERSION ORIGINALE */}
                <div
                  ref={(el) => {
                    if (el) {
                      const tl = gsap.timeline({
                        repeat: -1,
                      });
                      // Côté haut (plus long)
                      tl.to(el, {
                        top: "8px",
                        left: "calc(100% - 8px)",
                        duration: 1.4,
                        ease: "none",
                      })
                        // Coin haut-droite (court)
                        .to(el, {
                          top: "calc(100% - 8px)",
                          left: "calc(100% - 8px)",
                          duration: 0.6,
                          ease: "none",
                        })
                        // Côté droite (plus long)
                        .to(el, {
                          top: "calc(100% - 8px)",
                          left: "8px",
                          duration: 1.4,
                          ease: "none",
                        })
                        // Coin bas-gauche (court)
                        .to(el, {
                          top: "8px",
                          left: "8px",
                          duration: 0.6,
                          ease: "none",
                        });
                    }
                  }}
                  className="absolute w-12 h-12 bg-cyan-400 rounded-full"
                  style={{
                    top: "8px",
                    left: "8px",
                    transform: "translate(-50%, -50%)",
                    filter:
                      "blur(2px) drop-shadow(0 0 16px rgba(34, 211, 238, 0.9))",
                  }}
                ></div>
              </div>
            </MarketingPreviewLink>
            <MarketingPreviewLink
              href="/services"
              className="relative border-2 border-white/40 hover:border-white/60 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-xl transition-all duration-500 transform hover:scale-105 text-center overflow-hidden services-cta-button w-full sm:w-auto"
              urlOverride="https://levisweb.net/services"
            >
              <span className="relative z-10">Mes offres</span>
              <div
                className="services-slide-bg absolute top-0 left-0 h-full w-[180%] bg-black transform -skew-x-12"
                style={{
                  transform: "translateX(-100%) skewX(-12deg)",
                  opacity: 0,
                }}
              ></div>
            </MarketingPreviewLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-80 w-[30rem] relative shrink-0"
    >
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-full"
      >
        <div className="block pointer-events-none">
          <img
            src={product.thumbnail}
            height="600"
            width="600"
            className="object-cover object-center absolute h-full w-full inset-0 opacity-70"
            alt={`Projet ${product.title} - Réalisation LevisWeb`}
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
        <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
          {product.title}
        </h2>
      </a>
    </motion.div>
  );
};
