"use client";

import { Button } from "@/components/ui/button";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { motion } from "framer-motion";
import Link from "next/link";

const advantages = [
	{
		icon: "📈",
		title: "Conversion optimisée",
		description:
			"Design pensé pour maximiser vos taux de conversion et transformer les visiteurs en clients.",
		delay: 0.2,
	},
	{
		icon: "🎨",
		title: "Design moderne",
		description:
			"Interface épurée et professionnelle qui inspire confiance et modernité.",
		delay: 0.4,
	},
	{
		icon: "✨",
		title: "Animations premium",
		description:
			"Micro-interactions et animations fluides pour une expérience utilisateur exceptionnelle.",
		delay: 0.6,
	},
];

const testimonials = [
	{
		name: "Marie Dubois",
		role: "CEO, TechStart",
		content:
			"Cette landing page a transformé notre conversion. Nos ventes ont augmenté de 300% !",
		avatar: "👩‍💼",
		delay: 0.1,
	},
	{
		name: "Thomas Martin",
		role: "Fondateur, InnovCorp",
		content:
			"Un design qui respire la confiance. Nos clients nous contactent plus facilement.",
		avatar: "👨‍💻",
		delay: 0.3,
	},
	{
		name: "Sophie Bernard",
		role: "Marketing Manager, GrowthPro",
		content:
			"Les animations sont parfaites. C'est exactement ce qu'il nous fallait pour nous démarquer.",
		avatar: "👩‍🎨",
		delay: 0.5,
	},
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: "easeOut",
		},
	},
};

export default function DemoLandingSaas() {
	return (
		<TracingBeam className="w-full">
			<main className="min-h-svh">
				{/* Hero Section */}
				<section className="relative mx-auto max-w-7xl px-6 sm:px-8 py-12 sm:py-24 text-center">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
						className="max-w-4xl mx-auto"
					>
						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.8,
								delay: 0.2,
								ease: "easeOut",
							}}
							className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 sm:mb-8 text-gradient-cyan leading-tight"
						>
							Landing SaaS Premium
						</motion.h1>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.8,
								delay: 0.4,
								ease: "easeOut",
							}}
							className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 sm:mb-12 max-w-3xl mx-auto"
						>
							Une page moderne et animée pour séduire vos futurs
							clients.
						</motion.p>
					</motion.div>
				</section>

				{/* Section 1: Mockup illustratif */}
				<section className="relative mx-auto max-w-7xl px-6 sm:px-8 py-12 sm:py-24">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
						viewport={{ once: true }}
						className="relative"
					>
						{/* Mockup de la landing page */}
						<div className="relative mx-auto max-w-5xl">
							{/* Header mockup */}
							<div className="bg-white/10 backdrop-blur-xl border border-neutral-500/30 rounded-t-2xl p-6 flex items-center justify-between">
								<div className="flex items-center space-x-4">
									<div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl"></div>
									<span className="text-white font-bold text-xl">
										SaaSPro
									</span>
								</div>
								<div className="flex space-x-6">
									<span className="text-neutral-300">
										Fonctionnalités
									</span>
									<span className="text-neutral-300">
										Tarifs
									</span>
									<span className="text-neutral-300">
										Contact
									</span>
									<Button className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-6 py-2">
										Essai gratuit
									</Button>
								</div>
							</div>

							{/* Hero mockup */}
							<div className="bg-gradient-to-br from-violet-500/20 to-purple-600/20 backdrop-blur-xl border border-neutral-500/30 p-12 text-center">
								<h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
									Transformez votre business avec notre SaaS
								</h2>
								<p className="text-xl text-neutral-200 mb-8 max-w-3xl mx-auto">
									La solution complète pour automatiser vos
									processus et booster votre productivité
								</p>
								<div className="flex flex-col sm:flex-row gap-4 justify-center">
									<Button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 text-lg">
										Commencer maintenant
									</Button>
									<Button
										variant="outline"
										className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg"
									>
										Voir la démo
									</Button>
								</div>
							</div>

							{/* Features mockup */}
							<div className="bg-white/5 backdrop-blur-xl border border-neutral-500/30 p-8">
								<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
									<div className="text-center">
										<div className="text-3xl mb-3">🚀</div>
										<h3 className="font-semibold text-white mb-2">
											Rapide
										</h3>
										<p className="text-sm text-neutral-300">
											Performance optimale
										</p>
									</div>
									<div className="text-center">
										<div className="text-3xl mb-3">🔒</div>
										<h3 className="font-semibold text-white mb-2">
											Sécurisé
										</h3>
										<p className="text-sm text-neutral-300">
											Données protégées
										</p>
									</div>
									<div className="text-center">
										<div className="text-3xl mb-3">📱</div>
										<h3 className="font-semibold text-white mb-2">
											Responsive
										</h3>
										<p className="text-sm text-neutral-300">
											Tous appareils
										</p>
									</div>
								</div>
							</div>

							{/* Footer mockup */}
							<div className="bg-white/10 backdrop-blur-xl border border-neutral-500/30 rounded-b-2xl p-6 text-center">
								<span className="text-neutral-400">
									© 2024 SaaSPro - Tous droits réservés
								</span>
							</div>
						</div>
					</motion.div>
				</section>

				{/* Section 2: Avantages */}
				<section className="relative mx-auto max-w-7xl px-6 sm:px-8 py-12 sm:py-24">
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="text-center mb-12 sm:mb-16"
					>
						<motion.h2
							variants={itemVariants}
							className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6 text-gradient-cyan"
						>
							Pourquoi choisir cette landing ?
						</motion.h2>
						<motion.p
							variants={itemVariants}
							className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto"
						>
							Des avantages concrets qui font la différence
						</motion.p>
					</motion.div>

					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10"
					>
						{advantages.map((advantage, index) => (
							<motion.div
								key={index}
								variants={itemVariants}
								transition={{ delay: advantage.delay }}
								className="group"
							>
								<motion.div
									whileHover={{ scale: 1.02, y: -5 }}
									transition={{
										duration: 0.3,
										ease: "easeInOut",
									}}
									className="relative bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl group-hover:shadow-violet-500/20"
								>
									<div className="text-4xl sm:text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
										{advantage.icon}
									</div>
									<h3 className="text-xl sm:text-2xl font-bold mb-4 text-foreground group-hover:text-violet-400 transition-colors duration-300">
										{advantage.title}
									</h3>
									<p className="text-muted-foreground leading-relaxed">
										{advantage.description}
									</p>
								</motion.div>
							</motion.div>
						))}
					</motion.div>
				</section>

				{/* Section Témoignages */}
				<section className="relative mx-auto max-w-7xl px-6 sm:px-8 py-12 sm:py-24">
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="text-center mb-12 sm:mb-16"
					>
						<motion.h2
							variants={itemVariants}
							className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6 text-gradient-cyan"
						>
							Témoignages clients
						</motion.h2>
						<motion.p
							variants={itemVariants}
							className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto"
						>
							Ils ont transformé leur business avec notre solution
						</motion.p>
					</motion.div>

					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10"
					>
						{testimonials.map((testimonial, index) => (
							<motion.div
								key={index}
								variants={itemVariants}
								transition={{ delay: testimonial.delay }}
								className="group"
							>
								<motion.div
									whileHover={{ scale: 1.02, y: -5 }}
									transition={{
										duration: 0.3,
										ease: "easeInOut",
									}}
									className="relative bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl group-hover:shadow-cyan-500/20"
								>
									{/* Avatar */}
									<div className="text-center mb-6">
										<div className="w-16 h-16 mx-auto bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-2xl mb-4">
											{testimonial.avatar}
										</div>
									</div>

									{/* Contenu du témoignage */}
									<blockquote className="text-muted-foreground leading-relaxed mb-6 italic">
										"{testimonial.content}"
									</blockquote>

									{/* Informations client */}
									<div className="text-center">
										<div className="font-semibold text-foreground">
											{testimonial.name}
										</div>
										<div className="text-sm text-muted-foreground">
											{testimonial.role}
										</div>
									</div>
								</motion.div>
							</motion.div>
						))}
					</motion.div>
				</section>

				{/* CTA Final sur fond dégradé animé */}
				<section className="relative mx-auto max-w-7xl px-6 sm:px-8 py-12 sm:py-24">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
						viewport={{ once: true }}
						className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500/20 via-purple-600/20 to-cyan-500/20 border border-violet-500/30 backdrop-blur-xl"
					>
						{/* Fond animé */}
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(147,51,234,0.2),transparent_50%),radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.2),transparent_50%)]" />

						<div className="relative px-8 sm:px-12 py-16 sm:py-20 text-center">
							<motion.h2
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.8,
									delay: 0.2,
									ease: "easeOut",
								}}
								viewport={{ once: true }}
								className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 sm:mb-8 text-gradient-cyan"
							>
								Boostez votre SaaS avec une landing page
								performante !
							</motion.h2>

							<motion.p
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.8,
									delay: 0.4,
									ease: "easeOut",
								}}
								viewport={{ once: true }}
								className="text-lg sm:text-xl text-muted-foreground mb-10 sm:mb-12 max-w-3xl mx-auto leading-relaxed"
							>
								Une landing page qui convertit et qui vous
								démarque de la concurrence.
							</motion.p>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.8,
									delay: 0.6,
									ease: "easeOut",
								}}
								viewport={{ once: true }}
							>
								<Link href="/contact">
									<motion.div
										whileHover={{ scale: 1.05, rotate: 1 }}
										transition={{
											duration: 0.2,
											ease: "easeInOut",
										}}
									>
										<Button className="btn-cyan-gradient shadow-lg hover:shadow-xl px-10 sm:px-12 py-4 sm:py-5 text-lg sm:text-xl text-white border-0">
											Me contacter
										</Button>
									</motion.div>
								</Link>
							</motion.div>
						</div>
					</motion.div>
				</section>
			</main>
		</TracingBeam>
	);
}
