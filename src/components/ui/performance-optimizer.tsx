"use client";

import { Suspense, lazy, useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Types pour l'optimisation des performances
interface PerformanceConfig {
	enableLazyLoading?: boolean;
	enableIntersectionObserver?: boolean;
	enableScrollOptimization?: boolean;
	animationThreshold?: number;
	preloadDistance?: number;
}

interface LazyComponentProps {
	component: React.ComponentType<any>;
	props?: any;
	fallback?: React.ReactNode;
	preload?: boolean;
}

// Hook pour l'Intersection Observer optimisé
const useIntersectionObserver = (
	threshold: number = 0.1,
	rootMargin: string = "50px"
) => {
	const [isVisible, setIsVisible] = useState(false);
	const [hasAnimated, setHasAnimated] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !hasAnimated) {
					setIsVisible(true);
					setHasAnimated(true);
					// Arrêter l'observation après l'animation
					setTimeout(() => observer.disconnect(), 1000);
				}
			},
			{ threshold, rootMargin }
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => observer.disconnect();
	}, [threshold, rootMargin, hasAnimated]);

	return { ref, isVisible, hasAnimated };
};

// Hook pour optimiser les animations au scroll
const useScrollOptimization = (threshold: number = 16) => {
	const [scrollY, setScrollY] = useState(0);
	const [isScrolling, setIsScrolling] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout>();

	useEffect(() => {
		let ticking = false;

		const updateScroll = () => {
			setScrollY(window.scrollY);
			ticking = false;
		};

		const handleScroll = () => {
			if (!ticking) {
				requestAnimationFrame(updateScroll);
				ticking = true;
			}

			// Marquer comme en cours de scroll
			setIsScrolling(true);
			
			// Clear le timeout précédent
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			// Marquer comme arrêté après un délai
			timeoutRef.current = setTimeout(() => {
				setIsScrolling(false);
			}, threshold);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => {
			window.removeEventListener('scroll', handleScroll);
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [threshold]);

	return { scrollY, isScrolling };
};

// Composant de buffer de chargement intelligent
export const PerformanceBuffer = ({
	children,
	config = {},
	className = "",
}: {
	children: React.ReactNode;
	config?: PerformanceConfig;
	className?: string;
}) => {
	const [isReady, setIsReady] = useState(false);
	const [loadProgress, setLoadProgress] = useState(0);

	useEffect(() => {
		// Simulation du chargement progressif
		const timer = setInterval(() => {
			setLoadProgress(prev => {
				if (prev >= 100) {
					clearInterval(timer);
					setIsReady(true);
					return 100;
				}
				return prev + 10;
			});
		}, 50);

		return () => clearInterval(timer);
	}, []);

	if (!isReady) {
		return (
			<div className={`flex items-center justify-center min-h-[200px] ${className}`}>
				<div className="text-center">
					<div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
					<div className="w-48 bg-gray-200 rounded-full h-2">
						<div
							className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full transition-all duration-300"
							style={{ width: `${loadProgress}%` }}
						/>
					</div>
					<p className="text-sm text-gray-600 mt-2">Optimisation des performances... {loadProgress}%</p>
				</div>
			</div>
		);
	}

	return <>{children}</>;
};

// Composant de lazy loading optimisé
export const LazyComponent = ({
	component: Component,
	props = {},
	fallback,
	preload = false,
}: LazyComponentProps) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [shouldLoad, setShouldLoad] = useState(preload);

	useEffect(() => {
		if (preload) {
			setShouldLoad(true);
		}
	}, [preload]);

	useEffect(() => {
		if (shouldLoad) {
			// Simuler un délai de chargement minimal pour éviter le flash
			const timer = setTimeout(() => setIsLoaded(true), 100);
			return () => clearTimeout(timer);
		}
	}, [shouldLoad]);

	if (!shouldLoad) {
		return (
			<div className="min-h-[200px] bg-gray-100 rounded-lg animate-pulse" />
		);
	}

	if (!isLoaded) {
		return fallback || (
			<div className="min-h-[200px] bg-gradient-to-r from-cyan-100 to-blue-100 rounded-lg animate-pulse" />
		);
	}

	return <Component {...props} />;
};

// Composant d'animation différée avec intersection observer
export const DeferredAnimation = ({
	children,
	animation = "fade-up",
	delay = 0,
	threshold = 0.1,
	className = "",
}: {
	children: React.ReactNode;
	animation?: "fade-up" | "fade-in" | "scale-in" | "slide-left" | "slide-right";
	delay?: number;
	threshold?: number;
	className?: string;
}) => {
	const { ref, isVisible } = useIntersectionObserver(threshold);

	const animations = {
		"fade-up": {
			initial: { opacity: 0, y: 20 },
			animate: { opacity: 1, y: 0 },
		},
		"fade-in": {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
		},
		"scale-in": {
			initial: { opacity: 0, scale: 0.8 },
			animate: { opacity: 1, scale: 1 },
		},
		"slide-left": {
			initial: { opacity: 0, x: 20 },
			animate: { opacity: 1, x: 0 },
		},
		"slide-right": {
			initial: { opacity: 0, x: -20 },
			animate: { opacity: 1, x: 0 },
		},
	};

	const selectedAnimation = animations[animation];

	return (
		<div ref={ref} className={className}>
			<AnimatePresence>
				{isVisible && (
					<motion.div
						initial={selectedAnimation.initial}
						animate={selectedAnimation.animate}
						exit={selectedAnimation.initial}
						transition={{
							duration: 0.6,
							delay: delay * 0.1,
							ease: [0.4, 0, 0.2, 1],
						}}
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

// Hook pour précharger les composants
export const usePreloadComponent = (componentPath: string) => {
	const [isPreloaded, setIsPreloaded] = useState(false);

	const preload = useCallback(() => {
		if (!isPreloaded) {
			// Précharger le composant
			import(componentPath).then(() => {
				setIsPreloaded(true);
			});
		}
	}, [componentPath, isPreloaded]);

	useEffect(() => {
		// Précharger automatiquement après un délai
		const timer = setTimeout(preload, 2000);
		return () => clearTimeout(timer);
	}, [preload]);

	return { isPreloaded, preload };
};

// Composant de gestion des performances globales
export const PerformanceManager = ({
	children,
	config = {},
}: {
	children: React.ReactNode;
	config?: PerformanceConfig;
}) => {
	const { isScrolling } = useScrollOptimization();

	useEffect(() => {
		// Désactiver les animations pendant le scroll pour améliorer les performances
		if (isScrolling) {
			document.body.style.setProperty('--animation-duration', '0ms');
		} else {
			document.body.style.setProperty('--animation-duration', '300ms');
		}
	}, [isScrolling]);

	return (
		<div className={`performance-manager ${isScrolling ? 'scrolling' : ''}`}>
			{children}
		</div>
	);
};
