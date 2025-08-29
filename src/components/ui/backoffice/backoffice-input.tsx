import { cn } from "@/lib/utils";
import * as React from "react";

export interface BackofficeInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const BackofficeInput = React.forwardRef<
	HTMLInputElement,
	BackofficeInputProps
>(({ className, ...props }, ref) => {
	return (
		<input
			className={cn(
				"flex h-10 w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
				className
			)}
			ref={ref}
			{...props}
		/>
	);
});
BackofficeInput.displayName = "BackofficeInput";

export { BackofficeInput };
