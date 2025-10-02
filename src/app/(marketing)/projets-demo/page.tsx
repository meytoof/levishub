"use client";

import { Button } from "@/components/ui/button";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { motion } from "framer-motion";
import Link from "next/link";
import Script from "next/script";

const demos = [
	{
		title: "E-commerce",
		description:
			"Un e-commerce moderne avec panier d'achat et gestion des produits.",
		link: "/demo/ecommerce",
		icon: "🛒",
		color: "from-cyan-500 to-blue-600",
	},
	{
		title: "Portfolio",
		description:
			"Un portfolio créatif avec des animations néon et un design moderne.",
		link: "/demo/portfolio",
		icon: "🎨",
		color: "from-violet-500 to-purple-600",
	},
	{
		title: "Site Vitrine",
		description:
			"Un site vitrine professionnel et sobre pour PME et artisans.",
		link: "/demo/vitrine",
		icon: "🏗️",
		color: "from-blue-500 to-cyan-600",
	},
	{
		title: "Blog Magazine",
		description:
			"Un blog éditorial avec une inspiration magazine et un design chaleureux.",
		link: "/demo/blog",
		icon: "📝",
		color: "from-violet-500 to-indigo-600",
	},
];

export default function ProjetsDemo() {
	return (
		<TracingBeam className="w-full">
			<main className="min-h-svh">
				<Script id="ld-json-projets-demo" type="application/ld+json">
					{JSON.stringify({
						"@context": "https://schema.org",
						"@type": "ItemList",
						name: "Projets Démo LevisWeb",
						description: "Découvrez différents exemples concrets de sites web réalisés par LevisWeb",
						itemListElement: [
							{
								"@type": "ListItem",
								position: 1,
								name: "E-commerce",
								url: "https://levisweb.net/demo/ecommerce",
								description: "Un e-commerce moderne avec panier d'achat et gestion des produits"
							},
							{
								"@type": "ListItem",
								position: 2,
								name: "Portfolio",
								url: "https://levisweb.net/demo/portfolio",
								description: "Un portfolio créatif avec des animations néon et un design moderne"
							},
							{
								"@type": "ListItem",
								position: 3,
								name: "Site Vitrine",
								url: "https://levisweb.net/demo/vitrine",
								description: "Un site vitrine professionnel et sobre pour PME et artisans"
							},
							{
								"@type": "ListItem",
								position: 4,
								name: "Blog Magazine",
								url: "https://levisweb.net/demo/blog",
								description: "Un blog éditorial avec une inspiration magazine et un design chaleureux"
							}
						]
					})}
				</Script>
				{/* Hero Section */}
				<section className="relative mx-auto max-w-7xl px-6 sm:px-8 py-12 sm:py-24 text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="mb-16"
					>
						<motion.h1
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gradient-cyan mb-6"
						>
							Projets Démo
						</motion.h1>
						<motion.p
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}
							className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
						>
							Découvrez différents exemples concrets de ce que je
							peux réaliser pour vous.
						</motion.p>
					</motion.div>

					{/* Grille des démos */}
					<section className="mb-20">
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.8, delay: 0.6 }}
							className="grid grid-cols-1 md:grid-cols-2 gap-8"
						>
							{demos.map((demo, index) => (
								<motion.div
									key={demo.title}
									initial={{ opacity: 0, y: 50 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.6,
										delay: 0.8 + index * 0.1,
									}}
									whileHover={{ scale: 1.02, y: -5 }}
									className="group"
								>
									<div className="relative bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl feature-shadow-1 h-full">
										{/* Icône */}
										<div className="text-4xl mb-4">
											{demo.icon}
										</div>

										{/* Contenu */}
										<h3 className="text-2xl font-bold mb-4 text-foreground">
											{demo.title}
										</h3>
										<p className="text-muted-foreground mb-6 leading-relaxed">
											{demo.description}
										</p>

										{/* Bouton avec gradient LevisWeb */}
										<Link href={demo.link}>
											<Button
												className="btn-cyan-gradient shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 hover:rotate-1"
												size="lg"
											>
												Voir la démo
											</Button>
										</Link>

										{/* Accent de couleur subtil */}
										<div
											className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${demo.color} opacity-10 rounded-full blur-3xl -translate-y-16 translate-x-16`}
										></div>
									</div>
								</motion.div>
							))}
						</motion.div>
					</section>

					{/* CTA Final */}
					<section>
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 1.2 }}
							className="text-center"
						>
							<div className="bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-3xl p-12 hover:bg-white/10 transition-all duration-300">
								<h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
									Vous avez un projet en tête ? Parlons-en !
								</h2>
								<p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
									Transformez votre vision en réalité avec
									LevisWeb. Des solutions web rapides, fiables
									et pensées pour générer des résultats.
								</p>
								<Link href="/contact">
									<Button
										size="lg"
										className="btn-cyan-gradient shadow-lg hover:shadow-xl px-8 py-4 text-lg transition-all duration-200 hover:scale-105 hover:rotate-1"
									>
										Me contacter
									</Button>
								</Link>
							</div>
						</motion.div>
					</section>
				</section>
			</main>
		</TracingBeam>
	);
}
