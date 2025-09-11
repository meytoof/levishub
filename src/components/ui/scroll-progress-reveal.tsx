"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollProgressRevealProps {
	children: React.ReactNode;
	className?: string;
	staggerDelay?: number;
	duration?: number;
}

export const ScrollProgressReveal = ({
	children,
	className = "",
	staggerDelay = 300,
	duration = 1.0,
}: ScrollProgressRevealProps) => {
	const [scrollY, setScrollY] = useState(0);
	const [elementTop, setElementTop] = useState(0);
	const [elementHeight, setElementHeight] = useState(0);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY);

			if (ref.current) {
				const rect = ref.current.getBoundingClientRect();
				setElementTop(rect.top + window.scrollY);
				setElementHeight(rect.height);
			}
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll(); // Appel initial

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const getTransform = (index: number) => {
		const variations = [
			{ translateY: -80, scale: 0.7, rotate: -8 },
			{ translateY: -60, scale: 0.8, rotate: 5 },
			{ translateY: -100, scale: 0.6, rotate: -3 },
		];

		const variation = variations[index % variations.length];

		// Calculer la position de l'élément par rapport au viewport
		const elementStart = elementTop - window.innerHeight * 0.8; // Commence quand l'élément est à 80% du viewport
		const elementEnd =
			elementTop + elementHeight + window.innerHeight * 0.2; // Se termine quand l'élément est à 20% du viewport

		// Calculer le progress basé sur la position de scroll
		const progress = Math.max(
			0,
			Math.min(1, (scrollY - elementStart) / (elementEnd - elementStart))
		);

		// Appliquer un délai pour chaque élément
		const elementDelay =
			(index * staggerDelay) / (elementEnd - elementStart);
		const elementProgress = Math.max(
			0,
			Math.min(1, (progress - elementDelay) / (1 - elementDelay))
		);

		// Interpolation avec une courbe très lente
		const easedProgress = Math.pow(elementProgress, 2.5);

		const translateY = variation.translateY * (1 - easedProgress);
		const scale = variation.scale + (1 - variation.scale) * easedProgress;
		const rotate = variation.rotate * (1 - easedProgress);
		const opacity = easedProgress;

		return {
			opacity,
			transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
		};
	};

	return (
		<div ref={ref} className={className}>
			{React.Children.map(children, (child, index) => {
				const transform = getTransform(index);

				return (
					<div
						key={index}
						style={{
							...transform,
							willChange: "transform, opacity",
						}}
					>
						{child}
					</div>
				);
			})}
		</div>
	);
};
