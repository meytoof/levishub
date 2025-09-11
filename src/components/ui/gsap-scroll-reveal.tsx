"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

// Enregistrer le plugin ScrollTrigger
if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

interface GSAPScrollRevealProps {
	children: React.ReactNode;
	className?: string;
	staggerDelay?: number;
	duration?: number;
}

export const GSAPScrollReveal = ({
	children,
	className = "",
	staggerDelay = 0.2,
	duration = 1.0,
}: GSAPScrollRevealProps) => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const children = containerRef.current.children;
		const childrenArray = Array.from(children);

		// Configuration des animations pour chaque enfant
		childrenArray.forEach((child, index) => {
			const variations = [
				{ x: -100, y: 0, scale: 0.7 }, // Gauche
				{ x: 0, y: -80, scale: 0.7 }, // Haut
				{ x: 100, y: 0, scale: 0.7 }, // Droite
			];

			const variation = variations[index % variations.length];

			// Définir les points de déclenchement identiques pour tous les éléments
			const startPoint = "top 90%"; // Tous commencent en même temps
			const endPoint = "bottom 20%"; // Tous se terminent en même temps

			// État initial
			gsap.set(child, {
				opacity: 0,
				x: variation.x,
				y: variation.y,
				scale: variation.scale,
			});

			// Animation avec ScrollTrigger - tous les éléments en même temps
			gsap.to(child, {
				opacity: 1,
				x: 0,
				y: 0,
				scale: 1,
				ease: "power2.out",
				scrollTrigger: {
					trigger: child,
					start: startPoint,
					end: endPoint,
					scrub: 1, // Animation smooth liée au scroll
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
