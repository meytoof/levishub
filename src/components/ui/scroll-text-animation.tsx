"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

// Enregistrer le plugin ScrollTrigger
if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

interface ScrollTextAnimationProps {
	text: string;
	className?: string;
	delay?: number;
	duration?: number;
	stagger?: number;
	trigger?: string;
	start?: string;
	end?: string;
	children?: React.ReactNode;
}

export const ScrollTextAnimation: React.FC<ScrollTextAnimationProps> = ({
	text,
	className = "",
	delay = 0,
	duration = 0.8,
	stagger = 0.1,
	trigger,
	start = "top 80%",
	end = "bottom 20%",
	children,
}) => {
	const textRef = useRef<HTMLDivElement>(null);
	const charsRef = useRef<HTMLSpanElement[]>([]);

	useEffect(() => {
		if (!textRef.current || charsRef.current.length === 0) return;

		const chars = charsRef.current;
		const totalChars = chars.length;
		const centerIndex = Math.floor(totalChars / 2);

		// Animation basée sur le pourcentage de scroll
		const updateAnimation = (progress: number) => {
			chars.forEach((char, index) => {
				// Calculer la distance du centre
				const distanceFromCenter = Math.abs(index - centerIndex);

				// Calculer le délai basé sur la distance du centre (normalisé entre 0 et 1)
				const maxDistance = totalChars / 2;
				const normalizedDelay = distanceFromCenter / maxDistance;

				// L'animation commence avec un délai basé sur la distance du centre
				// Le caractère central commence immédiatement, les extérieurs plus tard
				const startPoint = normalizedDelay * 0.2; // Les extérieurs commencent plus tôt
				const endPoint = Math.min(1, startPoint + 0.4); // Durée d'animation de 40% mais plus tôt

				// Calculer le pourcentage d'animation pour ce caractère
				const charProgress = Math.max(
					0,
					Math.min(
						1,
						(progress - startPoint) / (endPoint - startPoint)
					)
				);

				// Appliquer l'animation basée sur le pourcentage
				const y = -100 + 100 * charProgress;
				const opacity = charProgress;
				const rotateX = -90 + 90 * charProgress;

				gsap.set(char, {
					y: y,
					opacity: opacity,
					rotateX: rotateX,
					transformOrigin: "bottom center",
				});
			});
		};

		// Configuration ScrollTrigger - Animation continue
		const scrollTriggerConfig = {
			trigger: trigger || textRef.current,
			start: "top 95%", // Commence quand l'élément arrive à 95% de la viewport
			end: "center 60%", // Se termine quand le centre de l'élément atteint 60% de la viewport (plus tôt pour compenser la navbar)
			scrub: true, // Animation liée au scroll
			onUpdate: (self) => {
				updateAnimation(self.progress);
			},
		};

		// Créer le ScrollTrigger
		ScrollTrigger.create(scrollTriggerConfig);

		// Cleanup
		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	}, [text, delay, duration, stagger, trigger, start, end]);

	// Fonction pour créer les caractères
	const createCharacters = () => {
		return text.split("").map((char, index) => (
			<span
				key={index}
				ref={(el) => {
					if (el) charsRef.current[index] = el;
				}}
				className="inline-block max-w-full"
				style={{
					opacity: 0,
					transform: "translateY(-100px) rotateX(-90deg)",
					wordBreak: "break-all",
				}}
			>
				{char === " " ? "\u00A0" : char}
			</span>
		));
	};

	return (
		<span
			ref={textRef}
			className={`scroll-text-animation ${className} max-w-full overflow-hidden inline-block`}
		>
			{createCharacters()}
			{children}
		</span>
	);
};

// Composant spécialisé pour les titres
export const AnimatedTitle: React.FC<{
	children: string;
	className?: string;
	as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	delay?: number;
}> = ({ children, className = "", as: Component = "h2", delay = 0 }) => {
	return (
		<Component className={className}>
			<ScrollTextAnimation
				text={children}
				delay={delay}
				duration={1.2}
				stagger={0.15}
			/>
		</Component>
	);
};

// Composant spécialisé pour le texte courant
export const AnimatedText: React.FC<{
	children: string;
	className?: string;
	delay?: number;
}> = ({ children, className = "", delay = 0.5 }) => {
	return (
		<p className={className}>
			<ScrollTextAnimation
				text={children}
				delay={delay}
				duration={0.6}
				stagger={0.05}
			/>
		</p>
	);
};
