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

			// Détecter si on est sur mobile
			const isMobile = window.innerWidth <= 1100;

			blocks.forEach((block, index) => {
				const number = block.querySelector(".services-block__number");

				// Position initiale selon la plateforme
				if (isMobile) {
					// Sur mobile : largeur 100%, pas de width dynamique
					gsap.set(block, {
						width: "100%",
						clearProps: "all",
					});
				} else {
					// Sur desktop : largeur 20%
					gsap.set(block, {
						width: "20%",
						clearProps: "all",
					});
				}

				// Récupérer tous les éléments pour l'initialisation
				const title = block.querySelector(
					".services-block__title"
				) as HTMLElement;
				const secondTitle = block.querySelector(
					".services-block__second-title"
				) as HTMLElement;
				const secondMiddle = block.querySelector(
					".services-block__second-middle"
				) as HTMLElement;
				const listItems = block.querySelectorAll(
					".services-block__list li"
				) as NodeListOf<HTMLElement>;
				const blockImg = block.querySelector(
					".services-block__img img"
				) as HTMLElement;
				const blockText = block.querySelector(
					".services-block__text"
				) as HTMLElement;

				// Initialiser tous les éléments à leur état par défaut
				if (title) gsap.set(title, { opacity: 1, y: 0 }); // Position normale
				if (number)
					gsap.set(number, { scale: 1, transformOrigin: "top left" });
				if (secondTitle) gsap.set(secondTitle, { opacity: 0, y: -20 });
				if (secondMiddle)
					gsap.set(secondMiddle, { opacity: 0.1, y: 30 }); // Légèrement visible
				if (listItems.length > 0)
					gsap.set(listItems, { opacity: 0.1, y: 20 }); // Légèrement visible
				if (blockImg)
					gsap.set(blockImg, {
						opacity: 0.1, // Légèrement visible
						y: 30,
						scale: 1.05,
						transformOrigin: "center center",
					});
				if (blockText) gsap.set(blockText, { opacity: 0 });

				// Variables pour tracker l'état de la section
				let isHovered = false;
				const expandTimeout: NodeJS.Timeout | null = null;
				let contentTimeline: gsap.core.Timeline | null = null;

				// Compresser toutes les autres sections lorsque l'une est active
				const resetOtherSections = (currentIndex: number) => {
					blocks.forEach((otherBlock, otherIndex) => {
						if (otherIndex !== currentIndex) {
							if (isMobile) {
								// Sur mobile : retirer la classe expanded et réinitialiser
								otherBlock.classList.remove("expanded");
								// Réinitialiser les animations du contenu
								const otherNumber = otherBlock.querySelector(
									".services-block__number"
								) as HTMLElement;
								const otherTitle = otherBlock.querySelector(
									".services-block__title"
								) as HTMLElement;
								if (otherNumber)
									gsap.set(otherNumber, { scale: 1 });
								if (otherTitle)
									gsap.set(otherTitle, { opacity: 1, y: 0 });
							} else {
								// Sur desktop : compresser les autres cartes
								otherBlock.style.width = "15%";

								// Réinitialiser tous les éléments à leur état initial (desktop uniquement)
								const otherNumber = otherBlock.querySelector(
									".services-block__number"
								) as HTMLElement;
								const otherTitle = otherBlock.querySelector(
									".services-block__title"
								) as HTMLElement;
								const otherSecondTitle =
									otherBlock.querySelector(
										".services-block__second-title"
									) as HTMLElement;
								const otherSecondMiddle =
									otherBlock.querySelector(
										".services-block__second-middle"
									) as HTMLElement;
								const otherListItems =
									otherBlock.querySelectorAll(
										".services-block__list li"
									) as NodeListOf<HTMLElement>;
								const otherImg = otherBlock.querySelector(
									".services-block__img img"
								) as HTMLElement;
								const otherText = otherBlock.querySelector(
									".services-block__text"
								) as HTMLElement;

								// Réinitialiser avec gsap.set pour éviter les transitions
								if (otherNumber)
									gsap.set(otherNumber, { scale: 1 });
								if (otherTitle)
									gsap.set(otherTitle, { opacity: 1, y: 0 });
								if (otherSecondTitle)
									gsap.set(otherSecondTitle, {
										opacity: 0,
										y: -20,
									});
								if (otherSecondMiddle)
									gsap.set(otherSecondMiddle, {
										opacity: 0.1,
										y: 30,
									});
								if (otherListItems.length > 0)
									gsap.set(otherListItems, {
										opacity: 0.1,
										y: 20,
									});
								if (otherImg)
									gsap.set(otherImg, {
										opacity: 0.1,
										y: 30,
										scale: 1.05,
									});
								if (otherText)
									gsap.set(otherText, { opacity: 0 });
							}
						}
					});
				};

				// Déterminer la direction d'expansion basée sur la position de la souris
				const getExpansionDirection = (
					mouseX: number,
					blockRect: DOMRect
				) => {
					// Cartes extrêmes (première et dernière) - FORCÉES
					if (index === 0) {
						// Première carte (Web Design) - toujours vers la droite
						return "right";
					} else if (index === blocks.length - 1) {
						// Dernière carte (Development) - TOUJOURS vers la gauche
						return "left";
					} else {
						// Cartes du milieu - direction basée sur la position de la souris
						const blockCenterX =
							blockRect.left + blockRect.width / 2;
						const mouseFromCenter = mouseX - blockCenterX;

						if (mouseFromCenter < -30) {
							return "right"; // Souris à gauche -> expansion vers la droite
						} else if (mouseFromCenter > 30) {
							return "left"; // Souris à droite -> expansion vers la gauche
						} else {
							return "center"; // Souris au centre -> expansion normale
						}
					}
				};

				// Système d'interaction selon la plateforme
				if (isMobile) {
					// Sur mobile : système de clic
					let isExpanded = false;

					block.addEventListener("click", () => {
						if (isExpanded) {
							// Fermer la carte
							block.classList.remove("expanded");
							isExpanded = false;

							// Réinitialiser les animations
							if (number) gsap.set(number, { scale: 1 });
							if (title) gsap.set(title, { opacity: 1, y: 0 });
							if (secondTitle)
								gsap.set(secondTitle, { opacity: 0, y: -20 });
							if (secondMiddle)
								gsap.set(secondMiddle, { opacity: 0.1, y: 30 });
							if (listItems.length > 0)
								gsap.set(listItems, { opacity: 0.1, y: 20 });
							if (blockImg)
								gsap.set(blockImg, {
									opacity: 0.1,
									y: 30,
									scale: 1.05,
								});
							if (blockText) gsap.set(blockText, { opacity: 0 });
						} else {
							// Fermer toutes les autres cartes d'abord
							blocks.forEach((otherBlock, otherIndex) => {
								if (otherIndex !== index) {
									otherBlock.classList.remove("expanded");
									// Réinitialiser les autres cartes
									const otherNumber =
										otherBlock.querySelector(
											".services-block__number"
										) as HTMLElement;
									const otherTitle = otherBlock.querySelector(
										".services-block__title"
									) as HTMLElement;
									if (otherNumber)
										gsap.set(otherNumber, { scale: 1 });
									if (otherTitle)
										gsap.set(otherTitle, {
											opacity: 1,
											y: 0,
										});
								}
							});

							// Ouvrir cette carte
							block.classList.add("expanded");
							isExpanded = true;

							// Animations d'ouverture - plus rapides sur mobile
							if (number)
								gsap.to(number, {
									scale: 1.1, // Plus subtil sur mobile
									duration: 0.3,
									ease: "power2.out",
								});
							if (title)
								gsap.to(title, {
									opacity: 0,
									y: -20,
									duration: 0.15,
									ease: "power2.in",
								});
							if (secondTitle)
								gsap.to(secondTitle, {
									opacity: 1,
									y: 0,
									duration: 0.25,
									ease: "power2.out",
									delay: 0.08,
								});
							if (secondMiddle)
								gsap.to(secondMiddle, {
									opacity: 1,
									y: 0,
									duration: 0.3,
									ease: "power2.out",
									delay: 0.15,
								});
							if (listItems.length > 0)
								gsap.to(listItems, {
									opacity: 1,
									y: 0,
									duration: 0.25,
									stagger: 0.03,
									ease: "power2.out",
									delay: 0.2,
								});
							if (blockImg)
								gsap.to(blockImg, {
									opacity: 1,
									y: 0,
									scale: 1,
									duration: 0.3,
									ease: "power2.out",
									delay: 0.2,
								});
							if (blockText)
								gsap.to(blockText, {
									opacity: 1,
									duration: 0.25,
									ease: "power2.out",
									delay: 0.3,
								});
						}
					});
				} else {
					// Sur desktop : système de hover
					block.addEventListener("mouseenter", (e) => {
						const mouseX = e.clientX;
						const blockRect = block.getBoundingClientRect();
						const direction = getExpansionDirection(
							mouseX,
							blockRect
						);
						// Marquer comme survolé
						isHovered = true;

						// ÉTAPE CRUCIALE: Réinitialiser toutes les autres sections IMMÉDIATEMENT
						resetOtherSections(index);

						// Annuler les timeouts/anims précédents
						// if (expandTimeout) clearTimeout(expandTimeout); // Temporairement désactivé
						if (contentTimeline) contentTimeline.kill();

						// Récupérer les éléments pour les animations
						const title = block.querySelector(
							".services-block__title"
						) as HTMLElement;
						const secondTitle = block.querySelector(
							".services-block__second-title"
						) as HTMLElement;
						const secondTitleText = block.querySelector(
							".services-block__second-title span span:last-child"
						) as HTMLElement;
						const secondTitlePrefix = block.querySelector(
							".services-block__second-title span span:first-child"
						) as HTMLElement;
						const secondMiddle = block.querySelector(
							".services-block__second-middle"
						) as HTMLElement;
						const listItems = block.querySelectorAll(
							".services-block__list li"
						) as NodeListOf<HTMLElement>;
						const blockImg = block.querySelector(
							".services-block__img img"
						) as HTMLElement;
						const blockText = block.querySelector(
							".services-block__text"
						) as HTMLElement;

						// Phase 1: Définir les largeurs selon la plateforme
						if (isMobile) {
							// Sur mobile : ajouter la classe expanded
							block.classList.add("expanded");
						} else {
							// Sur desktop : définir les largeurs (active à 40%, autres à 15%)
							block.style.width = "40%";
						}

						// Timeline principale pour toutes les animations
						contentTimeline = gsap.timeline({
							defaults: {
								ease: "power2.out",
								overwrite: "auto",
								immediateRender: false,
								force3D: true,
							},
						});

						// 1. Disparition rapide du titre principal vers le haut (0.1s)
						if (title) {
							contentTimeline.to(
								title,
								{
									opacity: 0,
									y: -50, // Vers le haut
									duration: 0.1,
									ease: "power2.in",
								},
								0
							);
						}

						// 2. Grossissement du numéro (commence immédiatement)
						if (number) {
							contentTimeline.to(
								number,
								{
									scale: 1.15, // Testé pour un effet visible mais pas trop
									duration: 0.6,
									ease: "power2.out",
								},
								0.1
							);
						}

						// 3. Apparition du second titre à 80% de l'expansion (0.64s)
						if (secondTitle) {
							contentTimeline.to(
								secondTitle,
								{
									opacity: 1,
									y: 0,
									duration: 0.4,
									ease: "power2.out",
								},
								0.64
							);

							// Délai léger entre le texte et les // - CORRECTION
							if (secondTitleText) {
								contentTimeline.fromTo(
									secondTitleText,
									{ opacity: 0, y: -10 },
									{
										opacity: 1,
										y: 0,
										duration: 0.2,
										ease: "power2.out",
									},
									0.64
								);
							}

							if (secondTitlePrefix) {
								contentTimeline.fromTo(
									secondTitlePrefix,
									{ opacity: 0, y: -10 },
									{
										opacity: 1,
										y: 0,
										duration: 0.2,
										ease: "power2.out",
									},
									0.7 // 0.06s après le texte pour un délai plus visible
								);
							}
						}

						// 4. Animation du contenu (liste + image) en même temps
						if (secondMiddle) {
							contentTimeline.to(
								secondMiddle,
								{
									opacity: 1,
									y: 0,
									duration: 0.5,
									ease: "power2.out",
								},
								0.8
							);
						}

						// Animation des items de liste de haut en bas
						if (listItems.length > 0) {
							contentTimeline.to(
								listItems,
								{
									opacity: 1,
									y: 0,
									duration: 0.4,
									stagger: 0.05, // Délai entre chaque item
									ease: "power2.out",
								},
								0.8
							);
						}

						// Animation de l'image de haut en bas avec ralenti
						if (blockImg) {
							contentTimeline.to(
								blockImg,
								{
									opacity: 1,
									y: 0,
									scale: 1,
									duration: 0.6,
									ease: "power3.out", // Ralenti sur la fin
								},
								0.8
							);
						}

						// 5. Animation du texte descriptif à 50% du timing du contenu (1.05s)
						if (blockText) {
							contentTimeline.to(
								blockText,
								{
									opacity: 1,
									duration: 0.3,
									ease: "power2.out",
								},
								1.05
							); // 0.8 + (0.5 * 0.5) = 1.05s
						}
					});

					// Hover leave - retour à l'état normal IMMÉDIAT
					block.addEventListener("mouseleave", () => {
						// Marquer comme non survolé
						isHovered = false;

						// Annuler les timeouts/anims en cours
						// if (expandTimeout) clearTimeout(expandTimeout); // Temporairement désactivé
						if (contentTimeline) contentTimeline.kill();

						// Récupérer tous les éléments pour la réinitialisation
						const title = block.querySelector(
							".services-block__title"
						) as HTMLElement;
						const secondTitle = block.querySelector(
							".services-block__second-title"
						) as HTMLElement;
						const secondMiddle = block.querySelector(
							".services-block__second-middle"
						) as HTMLElement;
						const listItems = block.querySelectorAll(
							".services-block__list li"
						) as NodeListOf<HTMLElement>;
						const blockImg = block.querySelector(
							".services-block__img img"
						) as HTMLElement;
						const blockText = block.querySelector(
							".services-block__text"
						) as HTMLElement;

						// IMMÉDIAT: Réinitialiser selon la plateforme
						if (isMobile) {
							// Sur mobile : retirer la classe expanded
							block.classList.remove("expanded");
						} else {
							// Sur desktop : réinitialiser toutes les largeurs à 20%
							blocks.forEach((blk) => (blk.style.width = "20%"));
						}

						// Réinitialiser tous les éléments instantanément avec gsap.set
						if (number) gsap.set(number, { scale: 1 });
						if (title) gsap.set(title, { opacity: 1, y: 0 });
						if (secondTitle)
							gsap.set(secondTitle, { opacity: 0, y: -20 });
						if (secondMiddle)
							gsap.set(secondMiddle, { opacity: 0.1, y: 30 });
						if (listItems.length > 0)
							gsap.set(listItems, { opacity: 0.1, y: 20 });
						if (blockImg)
							gsap.set(blockImg, {
								opacity: 0.1,
								y: 30,
								scale: 1.05,
							});
						if (blockText) gsap.set(blockText, { opacity: 0 });
					});
				} // Fermeture de la section else (desktop)
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
								<span>{"//"}</span> {service.title}
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
