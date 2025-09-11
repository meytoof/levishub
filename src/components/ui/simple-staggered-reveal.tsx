"use client";

import React, { useEffect, useRef, useState } from "react";

interface SimpleStaggeredRevealProps {
	children: React.ReactNode;
	className?: string;
	staggerDelay?: number;
	duration?: number;
	threshold?: number;
}

export const SimpleStaggeredReveal = ({
	children,
	className = "",
	staggerDelay = 200,
	duration = 1.0,
	threshold = 0.2,
}: SimpleStaggeredRevealProps) => {
	const [scrollProgress, setScrollProgress] = useState(0);
	const [isVisible, setIsVisible] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleScroll = () => {
			if (!ref.current) return;

			const rect = ref.current.getBoundingClientRect();
			const windowHeight = window.innerHeight;

			// Calculer le pourcentage de visibilité de l'élément
			const elementTop = rect.top;
			const elementHeight = rect.height;
			const elementBottom = rect.bottom;

			// L'élément est visible s'il entre dans le viewport
			if (elementBottom > 0 && elementTop < windowHeight) {
				setIsVisible(true);

				// Calculer le pourcentage de scroll dans l'élément (plus lent)
				const visibleHeight =
					Math.min(elementBottom, windowHeight) -
					Math.max(elementTop, 0);
				const totalVisibleHeight = Math.min(
					elementHeight,
					windowHeight
				);

				// Ralentir drastiquement l'animation
				let rawProgress = visibleHeight / totalVisibleHeight;
				rawProgress = Math.max(0, Math.min(1, rawProgress));

				// Appliquer une courbe très lente - nécessite beaucoup plus de scroll
				const progress = Math.pow(rawProgress, 3); // Courbe cubique très lente

				setScrollProgress(progress);
			} else {
				setIsVisible(false);
				setScrollProgress(0);
			}
		};

		// Écouter le scroll
		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll(); // Appel initial

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const getTransform = (index: number, progress: number) => {
		const variations = [
			{ translateY: -60, scale: 0.8, rotate: -5 },
			{ translateY: -45, scale: 0.85, rotate: 3 },
			{ translateY: -70, scale: 0.75, rotate: -2 },
		];

		const variation = variations[index % variations.length];

		// Calculer le délai pour cet élément (beaucoup plus lent)
		const elementDelay = (index * staggerDelay) / 10000; // Très lent
		const elementProgress = Math.max(
			0,
			Math.min(
				1,
				(progress - elementDelay) / Math.max(0.1, 1 - elementDelay)
			)
		);

		// Interpolation smooth entre l'état initial et final
		const translateY = variation.translateY * (1 - elementProgress);
		const scale = variation.scale + (1 - variation.scale) * elementProgress;
		const rotate = variation.rotate * (1 - elementProgress);
		const opacity = elementProgress;

		return {
			opacity,
			transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
		};
	};

	return (
		<div ref={ref} className={className}>
			{React.Children.map(children, (child, index) => {
				const transform = getTransform(index, scrollProgress);

				return (
					<div
						key={index}
						style={{
							...transform,
							willChange: isVisible
								? "transform, opacity"
								: "auto",
						}}
					>
						{child}
					</div>
				);
			})}
		</div>
	);
};
