"use client";

import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";

interface StatefulButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	onClick?: (
		event: React.MouseEvent<HTMLButtonElement>
	) => void | Promise<void>;
	className?: string;
	variant?: "default" | "backoffice";
}

export function StatefulButton({
	children,
	onClick,
	className,
	disabled,
	type = "button",
	variant = "default",
	...props
}: StatefulButtonProps) {
	const [state, setState] = useState<"idle" | "loading" | "success">("idle");

	const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
		if (state !== "idle" || disabled) return;

		setState("loading");

		try {
			if (onClick) {
				await onClick(event);
			}
			setState("success");

			// Reset to idle after 2 seconds
			setTimeout(() => {
				setState("idle");
			}, 2000);
		} catch (error) {
			// Reset to idle on error
			setState("idle");
			throw error; // Re-throw to let parent handle the error
		}
	};

	const baseStyles =
		"relative inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50";

	const variantStyles = {
		default:
			"bg-slate-900 text-white hover:bg-slate-700 focus-visible:ring-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-slate-300",
		backoffice:
			"bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus-visible:ring-blue-500 shadow-lg",
	};

	return (
		<button
			type={type}
			onClick={handleClick}
			disabled={disabled || state !== "idle"}
			className={cn(baseStyles, variantStyles[variant], className)}
			{...props}
		>
			<span
				className={cn(
					"transition-all duration-200",
					state === "loading" && "opacity-0",
					state === "success" && "opacity-0"
				)}
			>
				{children}
			</span>

			{state === "loading" && (
				<Loader2 className="absolute h-4 w-4 animate-spin" />
			)}

			{state === "success" && <Check className="absolute h-4 w-4" />}
		</button>
	);
}
