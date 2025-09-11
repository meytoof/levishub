"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

// Enregistrer le plugin ScrollTrigger
if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

interface GSAPProcessRevealProps {
	children: React.ReactNode;
	className?: string;
	staggerDelay?: number;
	duration?: number;
}

export const GSAPProcessReveal = ({
	children,
	className = "",
	staggerDelay = 0.2,
	duration = 1.0,
}: GSAPProcessRevealProps) => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const children = containerRef.current.children;
		const childrenArray = Array.from(children);

		// Configuration des animations pour chaque enfant
		childrenArray.forEach((child, index) => {
			const variations = [
				{ y: -80, scale: 0.7 }, // Diagnostic gratuit
				{ y: -60, scale: 0.8 }, // Conception agile
				{ y: -100, scale: 0.6 }, // Lancement & croissance
			];

			const variation = variations[index % variations.length];

			// Définir les points de déclenchement différents pour chaque élément
			const startPoints = [
				"top 95%", // Diagnostic gratuit - commence le plus tôt (gauche)
				"top 82%", // Conception agile - commence quand le 1er est à 35%
				"top 69%", // Lancement & croissance - commence quand le 2ème est à 35%
			];

			const endPoints = [
				"bottom 50%", // Diagnostic gratuit - se termine au milieu
				"bottom 30%", // Conception agile - se termine au milieu
				"bottom 10%", // Lancement & croissance - se termine le plus tard
			];

			// État initial
			gsap.set(child, {
				opacity: 0,
				y: variation.y,
				scale: variation.scale,
			});

			// Animation avec ScrollTrigger - déclenchement différent pour chaque élément
			gsap.to(child, {
				opacity: 1,
				y: 0,
				scale: 1,
				duration: duration,
				ease: "power2.out",
				scrollTrigger: {
					trigger: child,
					start: startPoints[index] || "top 80%",
					end: endPoints[index] || "bottom 20%",
					scrub: 1, // Animation liée au scroll (1 = smooth)
					// Pas de délai ici, le déclenchement se fait par les start/end points
				},
			});
		});

		// Cleanup
		return () => {
			ScrollTrigger.getAll().forEach((trigger) => {
				if (
					trigger.trigger === containerRef.current ||
					Array.from(children).includes(trigger.trigger as Element)
				) {
					trigger.kill();
				}
			});
		};
	}, [staggerDelay, duration]);

	return (
		<div ref={containerRef} className={className}>
			{children}
		</div>
	);
};
