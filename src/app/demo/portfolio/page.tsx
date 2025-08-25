"use client";

import { DemoThemeToggle } from "@/components/ui/demo-theme-toggle";
import { motion } from "framer-motion";
import Link from "next/link";
import "./portfolio-specific.css";

const projects = [
	{
		id: 1,
		title: "Application Web Moderne",
		description:
			"Développement d'une application web complète avec React et Node.js",
		image: "🚀",
		category: "Web App",
	},
	{
		id: 2,
		title: "Design System",
		description: "Création d'un système de design cohérent pour une marque",
		image: "🎨",
		category: "Design",
	},
	{
		id: 3,
		title: "E-commerce",
		description: "Plateforme de vente en ligne avec gestion des stocks",
		image: "🛒",
		category: "E-commerce",
	},
	{
		id: 4,
		title: "Application Mobile",
		description: "Application mobile cross-platform avec React Native",
		image: "📱",
		category: "Mobile",
	},
];

export default function Portfolio() {
	return (
		<div className="demo-container portfolio-section">
			{/* Header */}
			<header className="demo-header demo-nav portfolio-nav">
				<div className="max-w-7xl mx-auto px-6 py-4">
					<div className="flex justify-between items-center">
						<motion.h1
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent neon-glow"
						>
							Portfolio
						</motion.h1>
						<nav className="flex items-center space-x-8">
							<a
								href="#"
								className="text-gray-300 hover:text-cyan-400 transition-colors"
							>
								Accueil
							</a>
							<a
								href="#"
								className="text-gray-300 hover:text-cyan-400 transition-colors"
							>
								Projets
							</a>
							<a
								href="#"
								className="text-gray-300 hover:text-cyan-400 transition-colors"
							>
								À propos
							</a>
							<a
								href="#"
								className="text-gray-300 hover:text-cyan-400 transition-colors"
							>
								Contact
							</a>
							<DemoThemeToggle className="text-gray-300 hover:text-cyan-400" />
						</nav>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section className="portfolio-hero py-20">
				<div className="max-w-7xl mx-auto px-6 text-center">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-5xl md:text-6xl font-bold mb-6"
					>
						Créateur Digital
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
					>
						Je transforme vos idées en expériences digitales
						exceptionnelles
					</motion.p>
					<motion.button
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="portfolio-button px-8 py-4 rounded-lg text-lg font-semibold"
					>
						Voir mes projets
					</motion.button>
				</div>
			</section>

			{/* Projects Section */}
			<section className="py-20">
				<div className="max-w-7xl mx-auto px-6">
					<motion.h3
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-4xl font-bold text-center mb-16"
					>
						Mes Projets
					</motion.h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{projects.map((project, index) => (
							<motion.div
								key={project.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
								className="portfolio-card rounded-xl p-6 hover:scale-105 transition-transform duration-300"
							>
								<div className="text-4xl mb-4">
									{project.image}
								</div>
								<div className="text-xs text-cyan-400 mb-2">
									{project.category}
								</div>
								<h4 className="text-xl font-semibold mb-2">
									{project.title}
								</h4>
								<p className="text-gray-400 text-sm">
									{project.description}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section className="py-20">
				<div className="max-w-4xl mx-auto px-6 text-center">
					<motion.h3
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-4xl font-bold mb-8"
					>
						Travaillons ensemble
					</motion.h3>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className="text-xl text-gray-300 mb-8"
					>
						Vous avez un projet en tête ? Parlons-en !
					</motion.p>
					<motion.button
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="portfolio-button px-8 py-4 rounded-lg text-lg font-semibold"
					>
						Me contacter
					</motion.button>
				</div>
			</section>

			{/* Footer */}
			<footer className="demo-footer portfolio-footer">
				<div className="max-w-7xl mx-auto px-6 py-12 text-center">
					<p className="text-gray-400 mb-4">
						© 2024 Portfolio. Tous droits réservés.
					</p>
					<div className="flex justify-center space-x-6">
						<a
							href="#"
							className="text-gray-400 hover:text-cyan-400 transition-colors"
						>
							LinkedIn
						</a>
						<a
							href="#"
							className="text-gray-400 hover:text-cyan-400 transition-colors"
						>
							GitHub
						</a>
						<a
							href="#"
							className="text-gray-400 hover:text-cyan-400 transition-colors"
						>
							Twitter
						</a>
					</div>
				</div>
			</footer>

			{/* Bouton Retour */}
			<div className="demo-back-button">
				<Link href="/projets-demo">
					<button className="px-4 py-2 bg-cyan-500 text-black font-medium rounded-lg hover:bg-cyan-400 transition-all duration-200 shadow-lg">
						← Retour
					</button>
				</Link>
			</div>
		</div>
	);
}
