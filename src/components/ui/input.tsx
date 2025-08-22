"use client";
import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import * as React from "react";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		const radius = 100;
		const [visible, setVisible] = React.useState(false);

		const mouseX = useMotionValue(0);
		const mouseY = useMotionValue(0);

		function handleMouseMove({ currentTarget, clientX, clientY }: any) {
			const { left, top } = currentTarget.getBoundingClientRect();
			mouseX.set(clientX - left);
			mouseY.set(clientY - top);
		}

		return (
			<motion.div
				style={{
					background: useMotionTemplate`
				radial-gradient(
					${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
					#3b82f6,
					transparent 80%
				)
				`,
				}}
				onMouseMove={handleMouseMove}
				onMouseEnter={() => setVisible(true)}
				onMouseLeave={() => setVisible(false)}
				className="group/input rounded-lg p-[2px] transition duration-300"
			>
				<input
					type={type}
					className={cn(
						"shadow-input flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground transition duration-400 group-hover/input:shadow-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-[2px] focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
						className
					)}
					ref={ref}
					{...props}
				/>
			</motion.div>
		);
	}
);
Input.displayName = "Input";

export { Input };
