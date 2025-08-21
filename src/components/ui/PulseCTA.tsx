"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface PulseCTAProps {
	href: string;
	children: React.ReactNode;
	className?: string;
	variant?: "primary" | "secondary";
	size?: "sm" | "md" | "lg";
}

export const PulseCTA = ({
	href,
	children,
	className,
	variant = "primary",
	size = "md",
}: PulseCTAProps) => {
	const sizeClasses = {
		sm: "px-6 py-2 text-sm",
		md: "px-8 py-3 text-base",
		lg: "px-10 py-4 text-lg",
	};

	const variantClasses = {
		primary:
			"bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-600 hover:to-fuchsia-600 text-white shadow-lg hover:shadow-xl",
		secondary:
			"bg-gradient-to-r from-fuchsia-500 to-rose-500 hover:from-fuchsia-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl",
	};

	return (
		<Link href={href}>
			<div className="relative inline-block group">
				{/* Effet de pulsation en arrière-plan */}
				<div
					className={cn(
						"absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500/20 to-fuchsia-500/20 transition-all duration-300 group-hover:scale-110 group-hover:opacity-60",
						variant === "secondary" &&
							"from-fuchsia-500/20 to-rose-500/20"
					)}
				/>

				{/* Bouton principal */}
				<Button
					className={cn(
						"relative z-10 transition-all duration-300 hover:-translate-y-1",
						sizeClasses[size],
						variantClasses[variant],
						className
					)}
				>
					{children}
				</Button>
			</div>
		</Link>
	);
};
