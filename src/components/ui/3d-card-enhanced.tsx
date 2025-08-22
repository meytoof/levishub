"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface Card3DProps {
	children: React.ReactNode;
	className?: string;
	containerClassName?: string;
	theme?: "light" | "dark" | "auto";
	hoverIntensity?: "low" | "medium" | "high";
	perspective?: number;
	rotateX?: number;
	rotateY?: number;
	translateZ?: number;
}

export const Card3D = ({
	children,
	className,
	containerClassName,
	theme = "auto",
	hoverIntensity = "medium",
	perspective = 1000,
	rotateX = 0,
	rotateY = 0,
	translateZ = 0,
}: Card3DProps) => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isHovered, setIsHovered] = useState(false);

	const intensityMultiplier = {
		low: 0.5,
		medium: 1,
		high: 1.5,
	}[hoverIntensity];

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		
		setMousePosition({ x, y });
	};

	const handleMouseEnter = () => setIsHovered(true);
	const handleMouseLeave = () => setIsHovered(false);

	// Calcul des rotations basées sur la position de la souris
	const centerX = 0.5;
	const centerY = 0.5;
	
	const rotateXValue = isHovered 
		? (mousePosition.y - centerY * 100) * 0.01 * intensityMultiplier
		: rotateX;
	
	const rotateYValue = isHovered 
		? (mousePosition.x - centerX * 100) * 0.01 * intensityMultiplier
		: rotateY;

	return (
		<div
			className={cn(
				"relative group perspective-1000",
				containerClassName
			)}
			style={{ perspective: `${perspective}px` }}
			onMouseMove={handleMouseMove}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<motion.div
				className={cn(
					"relative w-full h-full transition-all duration-500 ease-out",
					"transform-gpu preserve-3d",
					className
				)}
				animate={{
					rotateX: rotateXValue,
					rotateY: rotateYValue,
					translateZ: isHovered ? translateZ + 20 : translateZ,
				}}
				transition={{
					type: "spring",
					stiffness: 300,
					damping: 30,
				}}
			>
				{/* Effet de glow en arrière-plan */}
				<AnimatePresence>
					{isHovered && (
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
							transition={{ duration: 0.3 }}
							className={cn(
								"absolute inset-0 -z-10 rounded-2xl",
								"bg-gradient-to-br from-cyan-500/10 to-blue-600/10",
								"dark:from-violet-500/15 dark:to-rose-500/15",
								"blur-xl scale-110"
							)}
						/>
					)}
				</AnimatePresence>

				{/* Contenu principal */}
				<div className="relative z-10 w-full h-full">
					{children}
				</div>

				{/* Effet de bordure lumineuse */}
				<AnimatePresence>
					{isHovered && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							className={cn(
								"absolute inset-0 rounded-2xl",
								"bg-gradient-to-r from-cyan-400/20 via-transparent to-blue-500/20",
								"dark:from-violet-400/30 dark:via-transparent dark:to-rose-500/30",
								"border border-cyan-400/30 dark:border-violet-400/40"
							)}
						/>
					)}
				</AnimatePresence>
			</motion.div>
		</div>
	);
};

// Composant spécialisé pour les cartes de tarifs
export const PricingCard3D = ({
	children,
	className,
	...props
}: Omit<Card3DProps, "hoverIntensity" | "perspective">) => {
	return (
		<Card3D
			className={cn(
				"bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-8",
				"hover:bg-white/10 transition-all duration-500 ease-out",
				className
			)}
			hoverIntensity="medium"
			perspective={1200}
			{...props}
		>
			{children}
		</Card3D>
	);
};

// Composant spécialisé pour les cartes de fonctionnalités
export const FeatureCard3D = ({
	children,
	className,
	...props
}: Omit<Card3DProps, "hoverIntensity" | "perspective">) => {
	return (
		<Card3D
			className={cn(
				"bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-6",
				"hover:bg-white/10 transition-all duration-500 ease-out",
				className
			)}
			hoverIntensity="low"
			perspective={1000}
			{...props}
		>
			{children}
		</Card3D>
	);
};

// Composant spécialisé pour les cartes de quiz
export const QuizCard3D = ({
	children,
	className,
	...props
}: Omit<Card3DProps, "hoverIntensity" | "perspective">) => {
	return (
		<Card3D
			className={cn(
				"bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-6",
				"hover:bg-white/10 transition-all duration-500 ease-out",
				className
			)}
			hoverIntensity="high"
			perspective={1500}
			{...props}
		>
			{children}
		</Card3D>
	);
};
