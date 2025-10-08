"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import "./services-section.css";

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
	{
		number: "00-1",
		title: "web design",
		features: [
			"/ Modern layouts",
			"/ Responsive design",
			"/ SEO-friendly structure",
			"/ Clear navigation",
			"/ Visual storytelling",
		],
		description:
			"I create websites that stand out from the competition and bring real value to businesses. Each project combines creativity and functionality to deliver the best digital solutions.",
		image: "https://images.unsplash.com/photo-1529336953121-ad5a0d43d0d2?w=800&h=600&fit=crop&crop=center",
	},
	{
		number: "00-2",
		title: "UX/UI design",
		features: [
			"/ User flows",
			"/ Wireframes & flows",
			"/ Interactive prototypes",
			"/ Design system",
		],
		description:
			"I design interfaces that balance logic and emotion. They are intuitive from the first click, easy to use, and keep users engaged — helping brands build stronger connections.",
		image: "https://images.unsplash.com/photo-1558603668-6570496b66f8?w=800&h=600&fit=crop&crop=center",
	},
	{
		number: "00-3",
		title: "creative design",
		features: [
			"/ Visual design",
			"/ Social media design",
			"/ presentation",
		],
		description:
			"My creative design is about visuals that speak for the brand. From eye-catching social media and stylish presentations to thoughtful visual concepts — everything is designed to inspire, connect, and deliver the best digital solutions.",
		image: "https://images.unsplash.com/photo-1537165924986-cc3568f5d454?w=800&h=600&fit=crop&crop=center",
	},
	{
		number: "00-4",
		title: "product and app design",
		features: [
			"/ Mobile & web apps",
			"/ Design systems",
			"/ Complex interactions",
			"/ Scalable solutions",
		],
		description:
			"Product and app design focused on simplicity, consistency, and growth — crafted to deliver the best digital solutions.",
		image: "https://images.unsplash.com/photo-1589271243958-d61e12b61b97?w=800&h=600&fit=crop&crop=center",
	},
	{
		number: "00-5",
		title: "development",
		features: [
			"/ Front-end",
			"/ Back-end",
			"/ No-code solutions",
			"/ Optimization",
			"/ Support",
		],
		description:
			"Full-cycle development with the best experts — from front-end to back-end. We deliver turnkey projects that are reliable, scalable, and built to last.",
		image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800&h=600&fit=crop&crop=center",
	},
];

export const ServicesSection: React.FC = () => {
	const sectionRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Animation du titre "services" - lettres du centre vers l'extérieur
			if (titleRef.current) {
				const h2 = titleRef.current;
				const text = h2.textContent || "";
				h2.innerHTML = ""; // Clear content

				// Créer le wrapper span comme dans le HTML fourni
				const wrapper = document.createElement("span");
				wrapper.style.display = "inline-block";
				h2.appendChild(wrapper);

				// Créer chaque lettre
				const letters: HTMLElement[] = [];
				text.split("").forEach((char) => {
					const span = document.createElement("span");
					span.className = "letter";
					span.textContent = char;
					wrapper.appendChild(span);
					letters.push(span);
				});

				// Ordre d'animation: centre puis extérieur
				const mid = Math.floor(letters.length / 2);
				const animationOrder: number[] = [mid]; // Commence par le centre
				for (let distance = 1; distance <= mid; distance++) {
					if (letters[mid - distance])
						animationOrder.push(mid - distance);
					if (letters[mid + distance])
						animationOrder.push(mid + distance);
				}

				// Position initiale: lettres en haut avec transform3d
				gsap.set(letters, {
					y: "-120%",
					transform: "translate3d(0px, -120%, 0px)",
				});

				// Animation avec ScrollTrigger
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 80%", // Commence quand le haut de la section est à 80% de la hauteur de l'écran
						end: "top 40%", // Se termine quand le haut de la section est à 40% de la hauteur de l'écran
						scrub: 1,
						// Suppression du pin pour éviter que la section reste collée
					},
				});

				// Animer chaque lettre du centre vers l'extérieur
				animationOrder.forEach((index, i) => {
					tl.to(
						letters[index],
						{
							y: "0%",
							transform: "translate3d(0px, 0px, 0px)",
							ease: "power2.out",
							duration: 0.8,
						},
						i * 0.04
					);
				});
			}

			// Animations hover des services-block avec expansion intelligente
			const blocks = gsap.utils.toArray<HTMLElement>(".services-block");

			blocks.forEach((block, index) => {
				const number = block.querySelector(".services-block__number");
				const img = block.querySelector(
					".services-block__img img"
				) as HTMLElement | null;

				// Position initiale comme sur le site d'exemple
				gsap.set(block, {
					width: "20%", // Équivalent à 304rem en pourcentage
					clearProps: "all", // Nettoie les anciennes props GSAP
				});

				if (img) {
					gsap.set(img, {
						scale: 1.05,
						transformOrigin: "center center",
					});
				}

				if (number) {
					gsap.set(number, {
						scale: 1,
						transformOrigin: "top left",
					});
				}

				// Variables pour tracker l'état de la section
				let isHovered = false;
				let expandTimeout: NodeJS.Timeout | null = null;
				let contentTimeline: gsap.core.Timeline | null = null;

				// Fonction pour réinitialiser toutes les autres sections
				const resetOtherSections = (currentIndex: number) => {
					blocks.forEach((otherBlock, otherIndex) => {
						if (otherIndex !== currentIndex) {
							// Réinitialiser immédiatement la largeur
							otherBlock.style.width = "20%";

							// Réinitialiser les animations du contenu
							const otherNumber = otherBlock.querySelector(
								".services-block__number"
							);
							const otherImg = otherBlock.querySelector(
								".services-block__img img"
							) as HTMLElement | null;

							if (otherNumber) {
								gsap.set(otherNumber, { scale: 1 });
							}
							if (otherImg) {
								gsap.set(otherImg, { scale: 1.05 });
							}
						}
					});
				};

				// Déterminer la direction d'expansion basée sur la position de la souris
				const getExpansionDirection = (
					mouseX: number,
					blockRect: DOMRect
				) => {
					const blockCenterX = blockRect.left + blockRect.width / 2;
					const mouseFromCenter = mouseX - blockCenterX;

					// Cartes extrêmes (première et dernière)
					if (index === 0) {
						// Première carte (Web Design) - toujours vers la droite
						return "right";
					} else if (index === blocks.length - 1) {
						// Dernière carte (Development) - toujours vers la gauche
						return "left";
					} else {
						// Cartes du milieu - direction basée sur la position de la souris
						if (mouseFromCenter < -30) {
							return "right"; // Souris à gauche -> expansion vers la droite
						} else if (mouseFromCenter > 30) {
							return "left"; // Souris à droite -> expansion vers la gauche
						} else {
							return "center"; // Souris au centre -> expansion normale
						}
					}
				};

				// Hover enter avec détection de direction - animation réactive
				block.addEventListener("mouseenter", (e) => {
					const mouseX = e.clientX;
					const blockRect = block.getBoundingClientRect();
					const direction = getExpansionDirection(mouseX, blockRect);

					// Marquer comme survolé
					isHovered = true;

					// ÉTAPE CRUCIALE: Réinitialiser toutes les autres sections IMMÉDIATEMENT
					resetOtherSections(index);

					// Annuler les timeouts/anims précédents
					if (expandTimeout) clearTimeout(expandTimeout);
					if (contentTimeline) contentTimeline.kill();

					// Phase 1: Animation d'expansion avec CSS transition (plus smooth)
					block.style.width = "48%"; // Équivalent à 730rem en pourcentage

					// Phase 2: Animation du contenu APRÈS l'expansion (délai de 0.8s)
					expandTimeout = setTimeout(() => {
						// Vérifier que la souris est toujours dans la section
						if (!isHovered) return;

						// Timeline pour les animations du contenu une fois l'expansion terminée
						contentTimeline = gsap.timeline({
							defaults: {
								ease: "power2.out",
								overwrite: "auto",
								immediateRender: false,
								force3D: true,
							},
						});

						// Animations du contenu après expansion
						if (number) {
							contentTimeline.to(
								number,
								{ scale: 1.1, duration: 0.4 },
								0
							);
						}

						if (img) {
							contentTimeline.to(
								img,
								{ scale: 1, duration: 0.5 },
								0.1
							);
						}
					}, 800); // Attendre la fin de l'expansion CSS (0.8s)
				});

				// Hover leave - retour à l'état normal IMMÉDIAT
				block.addEventListener("mouseleave", () => {
					// Marquer comme non survolé
					isHovered = false;

					// Annuler les timeouts/anims en cours
					if (expandTimeout) clearTimeout(expandTimeout);
					if (contentTimeline) contentTimeline.kill();

					// IMMÉDIAT: Rétrécir le bloc sans délai
					block.style.width = "20%"; // Retour à la largeur normale IMMÉDIATEMENT

					// Réinitialiser le contenu en parallèle (GSAP instantané)
					if (number) {
						gsap.to(number, {
							scale: 1,
							duration: 0.3,
							ease: "power2.inOut",
							overwrite: "auto",
						});
					}

					if (img) {
						gsap.to(img, {
							scale: 1.05,
							duration: 0.3,
							ease: "power2.inOut",
							overwrite: "auto",
						});
					}
				});
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			className="services"
			id="services"
			style={{ pointerEvents: "auto", opacity: 1 }}
		>
			<div className="container">
				<div className="services__title">
					<h2 ref={titleRef} className="animation-title">
						service
					</h2>
					<div className="services__title-span">
						<span>dsgn/4</span>
					</div>
				</div>
			</div>

			<div className="services__wrapper">
				{servicesData.map((service, index) => (
					<div className="services-block" key={index}>
						<h4 className="services-block__number">
							{service.number}
						</h4>
						<h3 className="services-block__title">
							<span>{service.title}</span>
						</h3>
						<h3 className="services-block__second-title">
							<span>
								<span>//</span> {service.title}
							</span>
						</h3>
						<div className="services-block__second-middle">
							<ul className="services-block__list">
								{service.features.map(
									(feature, featureIndex) => (
										<li key={featureIndex}>
											<span>{feature}</span>
										</li>
									)
								)}
							</ul>
							<div className="services-block__img">
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img src={service.image} alt={service.title} />
								<div className="services-block__img-overlay">
									<span className="services-block__img-text-1">
										INNOVATIVE DESIGN
									</span>
									<span className="services-block__img-text-2">
										TIMELESS ARCHITECTURE
									</span>
								</div>
							</div>
						</div>
						<p className="services-block__text">
							{service.description}
						</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default ServicesSection;
