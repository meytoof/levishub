"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
	children: React.ReactNode;
	className?: string;
	delay?: number;
	duration?: number;
	threshold?: number;
	direction?: "up" | "down" | "left" | "right" | "scale";
}

export const ScrollReveal = ({
	children,
	className = "",
	delay = 0,
	duration = 0.8,
	threshold = 0.1,
	direction = "up",
}: ScrollRevealProps) => {
	const [isVisible, setIsVisible] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !isVisible) {
					// Délai avant l'animation - ne se déclenche qu'une seule fois
					setTimeout(() => {
						setIsVisible(true);
					}, delay);
				}
			},
			{
				threshold,
				// Déclencher l'animation quand l'élément est à 30% visible
				rootMargin: "0px 0px -30% 0px",
			}
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => {
			if (ref.current) {
				observer.unobserve(ref.current);
			}
		};
	}, [threshold, delay, isVisible]);

	const getInitialTransform = () => {
		switch (direction) {
			case "up":
				return "translateY(30px) scale(0.95)";
			case "down":
				return "translateY(-50px) scale(0.9)";
			case "left":
				return "translateX(30px) scale(0.95)";
			case "right":
				return "translateX(-30px) scale(0.95)";
			case "scale":
				return "scale(0.9)";
			default:
				return "translateY(30px) scale(0.95)";
		}
	};

	const getFinalTransform = () => {
		return "translateY(0) translateX(0) scale(1)";
	};

	return (
		<div
			ref={ref}
			className={className}
			style={{
				opacity: isVisible ? 1 : 0,
				transform: isVisible
					? getFinalTransform()
					: getInitialTransform(),
				transition: `all ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
				willChange: isVisible ? "auto" : "transform, opacity",
			}}
		>
			{children}
		</div>
	);
};
