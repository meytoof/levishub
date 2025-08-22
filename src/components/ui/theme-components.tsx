"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

// ===== COMPOSANTS DE THÈME RÉUTILISABLES =====

interface ThemeTextProps {
	children: ReactNode;
	className?: string;
	variant?: "cyan" | "violet" | "auto";
}

/**
 * Composant de texte avec gradient adaptatif au thème
 */
export function ThemeText({
	children,
	className,
	variant = "auto",
}: ThemeTextProps) {
	const baseClasses = "font-bold";

	const variantClasses = {
		cyan: "text-gradient-cyan",
		violet: "text-gradient-violet",
		auto: "text-gradient-cyan", // S'adapte automatiquement au thème
	};

	return (
		<span className={cn(baseClasses, variantClasses[variant], className)}>
			{children}
		</span>
	);
}

interface ThemeButtonProps {
	children: ReactNode;
	className?: string;
	variant?: "primary" | "secondary";
	size?: "sm" | "md" | "lg";
	onClick?: () => void;
	href?: string;
}

/**
 * Bouton avec gradient adaptatif au thème
 */
export function ThemeButton({
	children,
	className,
	variant = "primary",
	size = "md",
	onClick,
	href,
}: ThemeButtonProps) {
	const baseClasses =
		"btn-cyan-gradient font-semibold transition-all duration-200 hover:scale-105";

	const sizeClasses = {
		sm: "px-4 py-2 text-sm",
		md: "px-6 py-3 text-base",
		lg: "px-8 py-4 text-lg",
	};

	const variantClasses = {
		primary: "shadow-lg hover:shadow-xl",
		secondary: "shadow-md hover:shadow-lg",
	};

	const classes = cn(
		baseClasses,
		sizeClasses[size],
		variantClasses[variant],
		className
	);

	if (href) {
		return (
			<a href={href} className={classes}>
				{children}
			</a>
		);
	}

	return (
		<button onClick={onClick} className={classes}>
			{children}
		</button>
	);
}

interface ThemeCardProps {
	children: ReactNode;
	className?: string;
	variant?: "default" | "feature" | "pricing";
	shadow?: 1 | 2 | 3;
}

/**
 * Carte avec ombre adaptative au thème
 */
export function ThemeCard({
	children,
	className,
	variant = "default",
	shadow,
}: ThemeCardProps) {
	const baseClasses =
		"bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-6";

	const shadowClasses = shadow ? `feature-shadow-${shadow}` : "";
	const variantClasses = variant === "pricing" ? "pricing-card" : "";

	const classes = cn(baseClasses, shadowClasses, variantClasses, className);

	return <div className={classes}>{children}</div>;
}

interface ThemeBadgeProps {
	children: ReactNode;
	className?: string;
	variant?: "popular" | "limited" | "tech1" | "tech2";
}

/**
 * Badge avec style adaptatif au thème
 */
export function ThemeBadge({
	children,
	className,
	variant = "tech1",
}: ThemeBadgeProps) {
	const baseClasses = "px-3 py-1 rounded-full text-sm font-semibold";

	const variantClasses = {
		popular: "pricing-badge-popular text-white",
		limited: "pricing-badge-limited text-white",
		tech1: "badge-tech-1",
		tech2: "badge-tech-2",
	};

	const classes = cn(baseClasses, variantClasses[variant], className);

	return <span className={classes}>{children}</span>;
}

interface ThemeProcessStepProps {
	number: number;
	title: string;
	description?: string;
	className?: string;
	showLine?: boolean;
}

/**
 * Étape de processus avec cercle et ligne adaptatifs au thème
 */
export function ThemeProcessStep({
	number,
	title,
	description,
	className,
	showLine = true,
}: ThemeProcessStepProps) {
	const circleClasses = `w-16 h-16 mx-auto mb-4 process-circle-${number} rounded-full flex items-center justify-center text-2xl text-white font-bold`;
	const lineClasses = showLine
		? `process-line-${number} h-1 w-full rounded-full`
		: "";

	return (
		<div className={cn("text-center", className)}>
			<div className={circleClasses}>{number}</div>
			<h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
			{description && (
				<p className="text-muted-foreground mb-4">{description}</p>
			)}
			{showLine && <div className={lineClasses} />}
		</div>
	);
}

// ===== HOOKS UTILITAIRES =====

/**
 * Hook pour obtenir les couleurs du thème actuel
 */
export function useThemeColors() {
	return {
		light: {
			primary: "var(--light-primary)",
			primaryDark: "var(--light-primary-dark)",
			primaryDarker: "var(--light-primary-darker)",
			primaryDarkest: "var(--light-primary-darkest)",
			accent: "var(--light-accent)",
		},
		dark: {
			primary: "var(--dark-primary)",
			primaryDark: "var(--dark-primary-dark)",
			primaryDarker: "var(--dark-primary-darker)",
			primaryDarkest: "var(--dark-primary-darkest)",
			accent: "var(--dark-accent)",
		},
	};
}

// ===== UTILITAIRES DE STYLE =====

/**
 * Génère des classes CSS pour les gradients adaptatifs
 */
export function getThemeGradient(
	direction: "to-r" | "to-b" | "to-br" = "to-r"
) {
	return {
		light: `bg-gradient-${direction} from-cyan-500 to-blue-600`,
		dark: `bg-gradient-${direction} from-purple-500 to-pink-500`,
	};
}

/**
 * Génère des classes CSS pour les ombres adaptatives
 */
export function getThemeShadow(intensity: 1 | 2 | 3 = 1) {
	return `feature-shadow-${intensity}`;
}

/**
 * Génère des classes CSS pour les bordures adaptatives
 */
export function getThemeBorder(opacity: number = 0.3) {
	return `border-neutral-500/${opacity}`;
}
