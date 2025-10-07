"use client";
import { ScrollTextAnimation } from "@/components/ui/scroll-text-animation";
import React from "react";

export const AboutSection: React.FC = () => {
	return (
		<main className="relative w-full h-screen bg-white overflow-hidden flex flex-col">
			{/* Contenu principal - Plein écran */}
			<div className="flex-1 w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
				{/* Grid 2 colonnes - Responsive */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl mx-auto w-full">
					{/* Colonne gauche - Description et skills */}
					<aside className="space-y-6 sm:space-y-8">
						{/* Description - SEO optimisé */}
						<p className="text-gray-600 text-sm sm:text-base leading-relaxed">
							<ScrollTextAnimation
								text="JE SUIS DÉVELOPPEUR WEB FREELANCE SPÉCIALISÉ DANS LA CRÉATION DE SITES MODERNES ET PERFORMANTS. MON EXPERTISE COUVRE TOUS LES ASPECTS DU DÉVELOPPEMENT WEB, DE LA CONCEPTION À LA MISE EN PRODUCTION."
								delay={1.8}
								duration={0.6}
								stagger={0.02}
								className="text-gray-600 text-sm sm:text-base leading-relaxed"
							/>
						</p>

						{/* Skills - Liste sémantique */}
						<ul className="space-y-3 sm:space-y-4">
							<li>
								<ScrollTextAnimation
									text="/ OPTIMISATION SEO"
									delay={2.0}
									duration={0.4}
									stagger={0.015}
									className="text-black text-sm font-medium tracking-wider"
								/>
							</li>
							<li>
								<ScrollTextAnimation
									text="/ SENIOR UX/UI DESIGNER"
									delay={2.2}
									duration={0.4}
									stagger={0.015}
									className="text-black text-sm font-medium tracking-wider"
								/>
							</li>
							<li>
								<ScrollTextAnimation
									text="/ SENIOR DÉVELOPPEUR FULLSTACK"
									delay={2.4}
									duration={0.4}
									stagger={0.015}
									className="text-black text-sm font-medium tracking-wider"
								/>
							</li>
						</ul>

						{/* Contact - Sémantique */}
						<address className="not-italic pt-6 sm:pt-8">
							<ScrollTextAnimation
								text="DISPONIBLE POUR COLLABORATION ↓"
								delay={2.6}
								duration={0.3}
								stagger={0.01}
								className="text-black text-sm font-medium tracking-wider cursor-pointer hover:underline block mb-2"
							/>
							<a
								href="mailto:quentinlevis@gmail.com"
								className="text-black text-sm underline cursor-pointer hover:text-gray-600 transition-colors"
							>
								<ScrollTextAnimation
									text="quentinlevis@gmail.com"
									delay={2.8}
									duration={0.3}
									stagger={0.01}
									className="text-black text-sm underline cursor-pointer"
								/>
							</a>
						</address>
					</aside>

					{/* Colonne droite - Titre principal - SEO H1 */}
					<div className="text-center lg:text-right">
						<h1 className="text-black font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight tracking-tight whitespace-nowrap">
							<ScrollTextAnimation
								text="À PROPOS"
								delay={2.6}
								duration={0.5}
								stagger={0.03}
								className="text-black font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight tracking-tight whitespace-nowrap block"
							/>
						</h1>
						<h1 className="text-black font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight tracking-tight whitespace-nowrap mt-1 sm:mt-2">
							<ScrollTextAnimation
								text="DE MOI"
								delay={3.0}
								duration={0.5}
								stagger={0.03}
								className="text-black font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight tracking-tight whitespace-nowrap block"
							/>
						</h1>
					</div>
				</div>

				{/* Section Projets Récents - Plein écran */}
				<section className="mt-16 sm:mt-20 lg:mt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
					<ScrollTextAnimation
						text="PROJETS RÉCENTS ↓"
						delay={0.2}
						duration={0.3}
						stagger={0.02}
						className="text-black text-sm font-medium tracking-wider mb-6 sm:mb-8"
					/>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
						{["SITE E-COMMERCE", "LANDING PAGE", "PORTFOLIO"].map(
							(project, index) => (
								<article
									key={project}
									className="group cursor-pointer"
								>
									<h3 className="text-black font-black text-xl sm:text-2xl lg:text-3xl tracking-[0.05em] font-mono group-hover:text-gray-500 transition-all duration-300 hover:scale-105">
										<ScrollTextAnimation
											text={project}
											delay={0.4 + index * 0.1}
											duration={0.25}
											stagger={0.015}
											className="text-black font-black text-xl sm:text-2xl lg:text-3xl tracking-[0.05em] font-mono group-hover:text-gray-500 transition-all duration-300 block hover:scale-105"
										/>
									</h3>
								</article>
							)
						)}
					</div>
				</section>
			</div>

			{/* Footer - Minimal */}
			<footer className="w-full px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6">
				<div className="text-black text-xs sm:text-sm font-mono opacity-60">
					LevisWeb 2024
				</div>
			</footer>
		</main>
	);
};
