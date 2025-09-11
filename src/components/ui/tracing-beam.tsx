"use client";
import { cn } from "@/lib/utils";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

export const TracingBeam = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"],
	});

	const contentRef = useRef<HTMLDivElement>(null);
	const [svgHeight, setSvgHeight] = useState(0);

	useEffect(() => {
		if (contentRef.current) {
			setSvgHeight(contentRef.current.offsetHeight);
		}
	}, []);

	const y1 = useSpring(
		useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
		{
			stiffness: 500,
			damping: 90,
		}
	);
	const y2 = useSpring(
		useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
		{
			stiffness: 500,
			damping: 90,
		}
	);

	return (
		<motion.div ref={ref} className={cn("relative w-full", className)}>
			{/* Faisceau lumineux positionné à droite */}
			<div className="absolute top-0 right-0 w-20 h-full pointer-events-none z-50">
				<motion.div className="relative w-full h-full">
					{/* Point de départ du faisceau */}
					<div className="absolute top-3 right-4 ">
						<motion.div
							transition={{
								duration: 0.2,
								delay: 0.5,
							}}
							animate={{
								boxShadow:
									scrollYProgress.get() > 0
										? "none"
										: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
							}}
							className="border-neutral-200 mr-[27px] flex h-4 w-4 items-center justify-center rounded-full border shadow-sm bg-white"
						>
							<motion.div
								transition={{
									duration: 0.2,
									delay: 0.5,
								}}
								animate={{
									backgroundColor:
										scrollYProgress.get() > 0
											? "white"
											: "#10b981",
									borderColor:
										scrollYProgress.get() > 0
											? "white"
											: "#059669",
								}}
								className="h-2 w-2 rounded-full border border-neutral-300 bg-white"
							/>
						</motion.div>
					</div>

					{/* SVG du faisceau */}
					<svg
						viewBox={`0 0 20 ${svgHeight}`}
						width="20"
						height={svgHeight}
						className="absolute top-0 right-4 block"
						aria-hidden="true"
					>
						<motion.path
							d={`M 1 0V -36 l 18 24 V ${
								svgHeight * 0.8
							} l -18 24V ${svgHeight}`}
							fill="none"
							stroke="#9091A0"
							strokeOpacity="0.16"
							transition={{
								duration: 10,
							}}
						></motion.path>
						<motion.path
							d={`M 1 0V -36 l 18 24 V ${
								svgHeight * 0.8
							} l -18 24V ${svgHeight}`}
							fill="none"
							stroke="url(#gradient)"
							strokeWidth="1.25"
							className="motion-reduce:hidden"
							transition={{
								duration: 10,
							}}
						></motion.path>
						<defs>
							<motion.linearGradient
								id="gradient"
								gradientUnits="userSpaceOnUse"
								x1="0"
								x2="0"
								y1={y1}
								y2={y2}
							>
								<stop
									stopColor="#18CCFC"
									stopOpacity="0"
								></stop>
								<stop stopColor="#18CCFC"></stop>
								<stop offset="0.325" stopColor="#6344F5"></stop>
								<stop
									offset="1"
									stopColor="#AE48FF"
									stopOpacity="0"
								></stop>
							</motion.linearGradient>
						</defs>
					</svg>
				</motion.div>
			</div>

			{/* Contenu principal */}
			<div ref={contentRef} className="w-full">
				{children}
			</div>
		</motion.div>
	);
};
