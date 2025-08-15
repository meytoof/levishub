"use client";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";
import React from "react";

interface MacbookScrollProps {
	src?: string;
	showGradient?: boolean;
	title?: string | React.ReactNode;
	badge?: React.ReactNode;
	className?: string;
}

export const MacbookScroll = ({
	src = "https://images.unsplash.com/photo-1526378800653-83c4b4c3c2a0?w=800&auto=format&fit=crop&q=60",
	showGradient = true,
	title = "LevisHub Dashboard",
	badge,
	className,
}: MacbookScrollProps) => {
	const ref = React.useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});

	const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
	const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

	return (
		<div ref={ref} className={cn("w-full", className)}>
			<div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
				<div className="relative">
					<motion.div
						style={{ y, opacity }}
						className="relative z-10 mx-auto h-[400px] w-[600px] rounded-xl bg-gradient-to-b from-gray-900 to-gray-800 p-2 shadow-2xl"
					>
						<div className="flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
							<div className="text-center text-white">
								<h3 className="text-2xl font-bold mb-2">
									{title}
								</h3>
								{badge && (
									<div className="inline-block">{badge}</div>
								)}
							</div>
						</div>
					</motion.div>
					<div className="absolute inset-0 z-0 mx-auto h-[400px] w-[600px] rounded-xl bg-gradient-to-b from-gray-900 to-gray-800 p-2 shadow-2xl" />
					<div className="absolute inset-0 z-0 mx-auto h-[400px] w-[600px] rounded-xl bg-gradient-to-b from-gray-900 to-gray-800 p-2 shadow-2xl" />
				</div>
			</div>
			{showGradient && (
				<div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-t from-background via-transparent to-transparent" />
			)}
		</div>
	);
};
