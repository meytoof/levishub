"use client";
import { AuthButtons } from "@/components/auth/AuthButtons";
import {
	MobileNavigation,
	Navbar,
	NavbarLogo,
	NavBody,
	NavItems,
} from "@/components/ui/resizable-navbar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import {
	motion,
	MotionValue,
	useScroll,
	useSpring,
	useTransform,
} from "motion/react";
import React, { useEffect, useRef } from "react";
// import SmokeEffect from "./smoke-effect";

// Enregistrer le plugin SplitText
if (typeof window !== "undefined") {
	gsap.registerPlugin(SplitText);
}

// Fonction SplitText simple pour diviser le texte en gardant les espaces
const splitText = (element: HTMLElement) => {
	const text = element.textContent || "";
	const words = text.split(" ");

	// Créer un wrapper pour chaque mot avec espace
	const wordElements = words.map((word) => {
		const span = document.createElement("span");
		span.textContent = word;
		span.style.display = "inline-block";
		span.style.marginRight = "0.25em"; // Espace entre les mots
		return span;
	});

	// Vider l'élément et ajouter les mots
	element.innerHTML = "";
	wordElements.forEach((word) => element.appendChild(word));

	return wordElements;
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
		springConfig
	);
	const translateXReverse = useSpring(
		useTransform(scrollYProgress, [0, 1], [0, -1000]),
		springConfig
	);
	const rotateX = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [15, 0]),
		springConfig
	);
	const opacity = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
		springConfig
	);
	const rotateZ = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [20, 0]),
		springConfig
	);
	const translateY = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [-900, 500]),
		springConfig
	);
	const navItems = [
		{ name: "Services", link: "/services" },
		{ name: "Projets Démo", link: "/projets-demo" },
		{ name: "Tarifs", link: "/pricing" },
		{ name: "Contact", link: "/contact" },
	];

	return (
		<div className="bg-black relative">
			<Navbar>
				<NavBody
					className="shadow-none levisweb-nav z-20"
					shrinkOnScroll={false}
				>
					<NavbarLogo />
					<NavItems items={navItems} />
					<div className="flex items-center gap-2">
						<ThemeToggle />
						<AuthButtons />
					</div>
				</NavBody>
				<MobileNavigation />
			</Navbar>
			<div className="h-16 lg:h-20" />

			<div
				ref={ref}
				className="h-[300vh] overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] bg-transparent z-10"
			>
				{/* Effet de fumée qui couvre toute la section hero */}
				{/* <SmokeEffect /> */}
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

	useEffect(() => {
		if (!titleRef.current || !subtitleRef.current) return;

		const ctx = gsap.context(() => {
			// Animation propre et fonctionnelle du h1
			const titleElement = titleRef.current!;

			// 1. Animation des mots normaux (Des, sites, pour)
			const textNodes = Array.from(titleElement.childNodes).filter(
				(node) =>
					node.nodeType === Node.TEXT_NODE && node.textContent?.trim()
			);

			textNodes.forEach((textNode) => {
				const words = textNode.textContent?.split(" ") || [];
				words.forEach((word) => {
					if (word.trim()) {
						const span = document.createElement("span");
						span.textContent = word + " ";
						span.style.display = "inline-block";
						span.style.marginRight = "0.25em";

						gsap.set(span, {
							y: 30,
							opacity: 0,
						});

						gsap.to(span, {
							y: 0,
							opacity: 1,
							duration: 0.6,
							ease: "power2.out",
							delay: Math.random() * 1.5,
						});

						textNode.parentNode?.insertBefore(span, textNode);
					}
				});
				textNode.remove();
			});

			// 2. Animation des spans avec gradients (modernes et convertir)
			const gradientSpans = titleRef.current?.querySelectorAll("span");
			if (gradientSpans) {
				gradientSpans.forEach((span, spanIndex) => {
					// Vérifier si c'est un span avec gradient (pas ceux qu'on vient de créer)
					if (span.className.includes("bg-gradient")) {
						gsap.set(span, {
							y: 30,
							opacity: 0,
						});

						gsap.to(span, {
							y: 0,
							opacity: 1,
							duration: 0.6,
							ease: "power2.out",
							delay: Math.random() * 1.5,
						});

						// Animation continue du gradient
						gsap.to(span, {
							backgroundPosition: "200% center",
							duration: 3 + spanIndex * 0.5,
							ease: "none",
							repeat: -1,
							yoyo: true,
							delay: 2 + spanIndex * 0.2,
						});
					}
				});
			}
		});

		// Animation SplitText pour le sous-titre
		const subtitleWords = splitText(subtitleRef.current!);

		subtitleWords.forEach((word) => {
			gsap.set(word, {
				y: 30,
				opacity: 0,
			});

			gsap.to(word, {
				y: 0,
				opacity: 1,
				duration: 0.6,
				ease: "power2.out",
				delay: 1.5 + Math.random() * 0.8,
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
			className="h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 relative z-30"
			role="banner"
		>
			{/* Main Content */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
				{/* Left Section - Main Headline (Mobile First) */}
				<div className="lg:text-right order-1 lg:order-2">
					<h1
						ref={titleRef}
						className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.9] mb-6 lg:mb-8"
					>
						<span
							style={{
								textShadow:
									"3px 3px 0px #000000, -3px -3px 0px #000000, 3px -3px 0px #000000, -3px 3px 0px #000000, 0px 0px 20px rgba(0,0,0,0.8)",
							}}
						>
							DES SITES
						</span>{" "}
						<span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
							MODERNES
						</span>{" "}
						<span
							style={{
								textShadow:
									"3px 3px 0px #000000, -3px -3px 0px #000000, 3px -3px 0px #000000, -3px 3px 0px #000000, 0px 0px 20px rgba(0,0,0,0.8)",
							}}
						>
							POUR
						</span>{" "}
						<span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
							CONVERTIR
						</span>
					</h1>
					<p
						ref={subtitleRef}
						className="text-base sm:text-lg md:text-xl text-gray-300 max-w-lg lg:ml-auto leading-relaxed"
						style={{
							textShadow:
								"2px 2px 0px #000000, -2px -2px 0px #000000, 2px -2px 0px #000000, -2px 2px 0px #000000, 0px 0px 15px rgba(0,0,0,0.6)",
						}}
					>
						LevisWeb — développeur web freelance. Je conçois des
						sites vitrines, e‑commerce et backoffices sur mesure,
						optimisés pour la performance, le référencement et la
						conversion.
					</p>
				</div>

				{/* Right Section - Call to Action (Mobile Second) */}
				<div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
					{/* Call to Action */}
					<p
						className="text-lg sm:text-xl md:text-2xl text-white/90 font-medium max-w-md leading-relaxed"
						style={{
							textShadow:
								"2px 2px 0px #000000, -2px -2px 0px #000000, 2px -2px 0px #000000, -2px 2px 0px #000000, 0px 0px 15px rgba(0,0,0,0.6)",
						}}
					>
						Choisissez votre projet, envoyez votre demande, et votre
						site web commence demain.
					</p>

					{/* CTA Buttons */}
					<div className="flex flex-col sm:flex-row gap-4">
						<a
							href="/contact"
							className="relative block overflow-hidden rounded-full p-px group"
							style={{
								borderRadius: "3.40282e+38px",
							}}
						>
							{/* Bouton principal */}
							<div className="relative inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold no-underline cursor-pointer outline-offset-4 transition-all duration-500 transform group-hover:scale-105 text-white shadow-2xl hover:shadow-cyan-500/25 backdrop-blur-xl overflow-hidden project-cta-button border-2 border-white/40 hover:border-white/60">
								<span className="relative z-10">
									Commencer mon projet
								</span>
								<div
									className="project-slide-bg absolute top-0 left-0 h-full w-[180%] bg-gradient-to-r from-emerald-500 to-purple-600 transform -skew-x-12"
									style={{
										transform:
											"translateX(-100%) skewX(-12deg)",
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

								{/* Point lumineux qui orbite */}
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
										filter: "blur(2px) drop-shadow(0 0 16px rgba(34, 211, 238, 0.9))",
									}}
								></div>
							</div>
						</a>
						<a
							href="/services"
							className="relative border-2 border-white/40 hover:border-white/60 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-xl transition-all duration-500 transform hover:scale-105 text-center overflow-hidden services-cta-button"
						>
							<span className="relative z-10">
								Voir mes services
							</span>
							<div
								className="services-slide-bg absolute top-0 left-0 h-full w-[180%] bg-black transform -skew-x-12"
								style={{
									transform:
										"translateX(-100%) skewX(-12deg)",
									opacity: 0,
								}}
							></div>
						</a>
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
