import { cn } from "@/lib/utils";
import * as React from "react";

export interface BackofficeButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "default" | "outline" | "secondary" | "ghost" | "destructive";
	size?: "default" | "sm" | "lg" | "icon";
}

const BackofficeButton = React.forwardRef<
	HTMLButtonElement,
	BackofficeButtonProps
>(({ className, variant = "default", size = "default", ...props }, ref) => {
	const baseClasses =
		"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900";

	const variantClasses = {
		default: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
		outline:
			"border border-gray-600 bg-transparent text-white hover:bg-gray-700",
		secondary: "bg-gray-700 text-white hover:bg-gray-600",
		ghost: "text-white hover:bg-gray-700",
		destructive: "bg-red-600 text-white hover:bg-red-700",
	};

	const sizeClasses = {
		default: "h-9 px-4 py-2",
		sm: "h-8 px-3 py-1.5",
		lg: "h-10 px-6 py-2",
		icon: "h-9 w-9 p-0",
	};

	return (
		<button
			className={cn(
				baseClasses,
				variantClasses[variant],
				sizeClasses[size],
				className
			)}
			ref={ref}
			{...props}
		/>
	);
});
BackofficeButton.displayName = "BackofficeButton";

export { BackofficeButton };
