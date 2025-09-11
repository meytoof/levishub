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
}

export const GSAPScrollReveal = ({
	children,
	className = "",
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

			// État initial
			gsap.set(child, {
				opacity: 0,
				x: variation.x,
				y: variation.y,
				scale: variation.scale,
			});
		});

		// Animation avec ScrollTrigger - UN SEUL TRIGGER pour tout le conteneur
		gsap.to(childrenArray, {
			opacity: 1,
			x: 0,
			y: 0,
			scale: 1,
			ease: "none", // Pas d'easing pour une réactivité maximale
			scrollTrigger: {
				trigger: containerRef.current,
				start: "top 90%",
				end: "top 45%",
				scrub: 0, // Animation instantanée liée au scroll
			},
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
	}, []);

	return (
		<div ref={containerRef} className={className}>
			{children}
		</div>
	);
};
