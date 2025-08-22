"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";

const MouseEnterContext = createContext<
	[boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

interface Enhanced3DCardProps {
	children: React.ReactNode;
	className?: string;
	containerClassName?: string;
	intensity?: "low" | "medium" | "high";
	perspective?: number;
	glowColor?: "cyan" | "violet" | "auto";
	hoverScale?: number;
	hoverTranslateY?: number;
}

export const Enhanced3DCard = ({
	children,
	className,
	containerClassName,
	intensity = "medium",
	perspective = 1000,
	glowColor = "auto",
	hoverScale = 1.02,
	hoverTranslateY = -4,
}: Enhanced3DCardProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isMouseEntered, setIsMouseEntered] = useState(false);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	const intensityValues = {
		low: { rotateX: 5, rotateY: 5, translateZ: 20 },
		medium: { rotateX: 8, rotateY: 8, translateZ: 30 },
		high: { rotateX: 12, rotateY: 12, translateZ: 40 },
	};

	const glowColors = {
		cyan: "from-cyan-500/20 to-blue-600/20",
		violet: "from-violet-500/20 to-purple-600/20",
		auto: "from-cyan-500/20 to-blue-600/20 dark:from-violet-500/20 dark:to-purple-600/20",
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!containerRef.current) return;
		const { left, top, width, height } =
			containerRef.current.getBoundingClientRect();
		const x = (e.clientX - left - width / 2) / (width / 2);
		const y = (e.clientY - top - height / 2) / (height / 2);

		setMousePosition({ x, y });

		const { rotateX, rotateY, translateZ } = intensityValues[intensity];
		const finalRotateX = -y * rotateX;
		const finalRotateY = x * rotateY;

		containerRef.current.style.transform = `
      perspective(${perspective}px)
      rotateX(${finalRotateX}deg) 
      rotateY(${finalRotateY}deg) 
      translateZ(${translateZ}px)
      scale(${hoverScale})
      translateY(${hoverTranslateY}px)
    `;
	};

	const handleMouseEnter = () => {
		setIsMouseEntered(true);
	};

	const handleMouseLeave = () => {
		if (!containerRef.current) return;
		setIsMouseEntered(false);
		setMousePosition({ x: 0, y: 0 });
		containerRef.current.style.transform = `
      perspective(${perspective}px)
      rotateX(0deg) 
      rotateY(0deg) 
      translateZ(0px)
      scale(1)
      translateY(0px)
    `;
	};

	return (
		<MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
			<div
				className={cn(
					"relative transition-all duration-500 ease-out",
					containerClassName
				)}
				style={{ perspective: `${perspective}px` }}
			>
				<div
					ref={containerRef}
					onMouseEnter={handleMouseEnter}
					onMouseMove={handleMouseMove}
					onMouseLeave={handleMouseLeave}
					className={cn(
						"relative transition-all duration-500 ease-out",
						className
					)}
					style={{
						transformStyle: "preserve-3d",
					}}
				>
					{/* Effet de glow en arrière-plan */}
					<AnimatePresence>
						{isMouseEntered && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.3 }}
								className={cn(
									"absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br opacity-0 transition-all duration-500 ease-out",
									glowColors[glowColor],
									isMouseEntered && "opacity-100"
								)}
							/>
						)}
					</AnimatePresence>

					{/* Contenu principal */}
					<div className="relative z-10">{children}</div>
				</div>
			</div>
		</MouseEnterContext.Provider>
	);
};

export const CardBody = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div
			className={cn(
				"w-full h-full [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
				className
			)}
		>
			{children}
		</div>
	);
};

export const CardItem = ({
	as: Tag = "div",
	children,
	className,
	translateX = 0,
	translateY = 0,
	translateZ = 0,
	rotateX = 0,
	rotateY = 0,
	rotateZ = 0,
	...rest
}: {
	as?: React.ElementType;
	children: React.ReactNode;
	className?: string;
	translateX?: number | string;
	translateY?: number | string;
	translateZ?: number | string;
	rotateX?: number | string;
	rotateY?: number | string;
	rotateZ?: number | string;
	[key: string]: any;
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const [isMouseEntered] = useMouseEnter();

	useEffect(() => {
		handleAnimations();
	}, [isMouseEntered]);

	const handleAnimations = () => {
		if (!ref.current) return;
		if (isMouseEntered) {
			ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
		} else {
			ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
		}
	};

	return (
		<Tag
			ref={ref}
			className={cn("w-fit transition duration-300 ease-out", className)}
			{...rest}
		>
			{children}
		</Tag>
	);
};

// Hook pour utiliser le contexte
export const useMouseEnter = () => {
	const context = useContext(MouseEnterContext);
	if (context === undefined) {
		throw new Error(
			"useMouseEnter must be used within a MouseEnterProvider"
		);
	}
	return context;
};

// Composants spécialisés pour différents types de cartes
export const PricingCard3D = ({ children, ...props }: Enhanced3DCardProps) => (
	<Enhanced3DCard
		intensity="medium"
		perspective={1200}
		glowColor="cyan"
		hoverScale={1.02}
		hoverTranslateY={-4}
		className="bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-8 flex flex-col h-full"
		{...props}
	>
		{children}
	</Enhanced3DCard>
);

export const FeatureCard3D = ({ children, ...props }: Enhanced3DCardProps) => (
	<Enhanced3DCard
		intensity="low"
		perspective={1000}
		glowColor="auto"
		hoverScale={1.01}
		hoverTranslateY={-2}
		className="bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-6"
		{...props}
	>
		{children}
	</Enhanced3DCard>
);

export const QuizCard3D = ({ children, ...props }: Enhanced3DCardProps) => (
	<Enhanced3DCard
		intensity="high"
		perspective={1500}
		glowColor="cyan"
		hoverScale={1.03}
		hoverTranslateY={-6}
		className="bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-8"
		{...props}
	>
		{children}
	</Enhanced3DCard>
);
