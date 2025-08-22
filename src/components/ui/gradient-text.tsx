"use client";

import { cn } from "@/lib/utils";

interface GradientTextProps {
	children: React.ReactNode;
	className?: string;
	variant?: "cyan" | "violet" | "auto";
}

export function GradientText({
	children,
	className,
	variant = "auto",
}: GradientTextProps) {
	const getGradientClass = () => {
		switch (variant) {
			case "cyan":
				return "text-gradient-cyan";
			case "violet":
				return "text-gradient-violet";
			case "auto":
			default:
				return "text-gradient-cyan"; // S'adapte automatiquement au thème
		}
	};

	return (
		<span className={cn(getGradientClass(), className)}>{children}</span>
	);
}

// Composants spécialisés pour une utilisation rapide
export function CyanGradientText({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<span className={cn("text-gradient-cyan", className)}>{children}</span>
	);
}

export function VioletGradientText({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<span className={cn("text-gradient-violet", className)}>
			{children}
		</span>
	);
}
