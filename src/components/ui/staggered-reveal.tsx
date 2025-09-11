"use client";

import React, { useEffect, useRef, useState } from "react";

interface StaggeredRevealProps {
	children: React.ReactNode;
	className?: string;
	staggerDelay?: number;
	duration?: number;
	threshold?: number;
	direction?: "up" | "down" | "left" | "right" | "scale";
}

export const StaggeredReveal = ({
	children,
	className = "",
	staggerDelay = 100,
	duration = 0.8,
	threshold = 0.2,
	direction = "down",
}: StaggeredRevealProps) => {
	const [isVisible, setIsVisible] = useState(false);
	const [animatedElements, setAnimatedElements] = useState<boolean[]>([]);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !isVisible) {
					setIsVisible(true);

					// Animer chaque élément enfant avec un délai progressif
					const childElements = ref.current?.children;
					if (childElements) {
						const elementsArray = Array.from(childElements);
						setAnimatedElements(
							new Array(elementsArray.length).fill(false)
						);

						elementsArray.forEach((element, index) => {
							setTimeout(() => {
								setAnimatedElements((prev) => {
									const newState = [...prev];
									newState[index] = true;
									return newState;
								});
							}, index * staggerDelay);
						});
					}
				}
			},
			{
				threshold,
				rootMargin: "0px 0px -20% 0px",
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
	}, [threshold, staggerDelay, isVisible]);

	const getInitialTransform = (index: number) => {
		// Créer des variations différentes pour chaque élément
		const variations = [
			{ translateY: -60, scale: 0.8, rotate: -5 },
			{ translateY: -45, scale: 0.85, rotate: 3 },
			{ translateY: -70, scale: 0.75, rotate: -2 },
		];

		const variation = variations[index % variations.length];

		switch (direction) {
			case "up":
				return `translateY(30px) scale(0.95) rotate(0deg)`;
			case "down":
				return `translateY(${variation.translateY}px) scale(${variation.scale}) rotate(${variation.rotate}deg)`;
			case "left":
				return `translateX(30px) scale(0.95) rotate(0deg)`;
			case "right":
				return `translateX(-30px) scale(0.95) rotate(0deg)`;
			case "scale":
				return `scale(0.8) rotate(${variation.rotate}deg)`;
			default:
				return `translateY(${variation.translateY}px) scale(${variation.scale}) rotate(${variation.rotate}deg)`;
		}
	};

	const getFinalTransform = () => {
		return "translateY(0) translateX(0) scale(1) rotate(0deg)";
	};

	return (
		<div ref={ref} className={className}>
			{React.Children.map(children, (child, index) => (
				<div
					key={index}
					style={{
						opacity: isVisible && animatedElements[index] ? 1 : 0,
						transform:
							isVisible && animatedElements[index]
								? getFinalTransform()
								: getInitialTransform(index),
						transition: `all ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
						willChange:
							isVisible && animatedElements[index]
								? "auto"
								: "transform, opacity",
					}}
				>
					{child}
				</div>
			))}
		</div>
	);
};
