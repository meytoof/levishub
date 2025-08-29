import { cn } from "@/lib/utils";
import * as React from "react";

export interface BackofficeSelectProps
	extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const BackofficeSelect = React.forwardRef<
	HTMLSelectElement,
	BackofficeSelectProps
>(({ className, children, ...props }, ref) => {
	return (
		<div className="relative">
			<select
				className={cn(
					"appearance-none px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 min-w-[150px] pr-8",
					className
				)}
				ref={ref}
				{...props}
			>
				{children}
			</select>
			<div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
				<svg
					className="w-4 h-4 text-gray-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</div>
		</div>
	);
});
BackofficeSelect.displayName = "BackofficeSelect";

export { BackofficeSelect };
