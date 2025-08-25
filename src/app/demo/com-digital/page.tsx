"use client";

import { Button } from "@/components/ui/button";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { motion } from "framer-motion";
import Link from "next/link";

const examples = [
	{
		id: 1,
		title: "Post LinkedIn",
		description: "Maquette de post LinkedIn professionnel et engageant",
		content:
			"🚀 Nouveau projet terminé !\n\nNous avons créé une landing page moderne pour notre client TechCorp.\n\n✅ Design responsive\n✅ Performance optimisée\n✅ Conversion boostée\n\nRésultat : +150% de leads qualifiés !\n\n#WebDesign #Conversion #TechCorp",
		icon: "💼",
		delay: 0.1,
	},
	{
		id: 2,
		title: "Newsletter Responsive",
		description: "Newsletter moderne et adaptée à tous les appareils",
		content:
			"📧 Votre Newsletter Mensuelle\n\n🎯 Découvrez nos derniers projets\n💡 Conseils et astuces digitales\n📊 Tendances du moment\n\nRestez connecté avec nous !",
		icon: "📧",
		delay: 0.2,
	},
	{
		id: 3,
		title: "Bannière Hero",
		description: "Bannière d'accueil moderne et impactante",
		content:
			"Transformez votre vision en réalité digitale\n\nSites web modernes • Stratégies digitales • Formation\n\nDécouvrez nos services",
		icon: "🎨",
		delay: 0.3,
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
	},
};

export default function DemoComDigital() {
	return (
		<TracingBeam className="w-full">
			<main className="min-h-svh">
				{/* Hero Section */}
				<section className="relative mx-auto max-w-7xl px-6 sm:px-8 py-12 sm:py-24 text-center">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
						className="max-w-4xl mx-auto"
					>
						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.8,
								delay: 0.2,
								ease: [0.25, 0.46, 0.45, 0.94],
							}}
							className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 sm:mb-8 text-gradient-cyan leading-tight"
						>
							Communication Digitale
						</motion.h1>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.8,
								delay: 0.4,
								ease: [0.25, 0.46, 0.45, 0.94],
							}}
							className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 sm:mb-12 max-w-3xl mx-auto"
						>
							Exemples de contenus pour renforcer votre présence
							en ligne.
						</motion.p>
					</motion.div>
				</section>

				{/* Section exemples */}
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
							transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
							className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6 text-gradient-cyan"
						>
							Exemples de Contenus
						</motion.h2>
						<motion.p
							variants={itemVariants}
							transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
							className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto"
						>
							Création sur-mesure adaptée à votre audience
						</motion.p>
					</motion.div>

					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10"
					>
						{examples.map((example) => (
							<motion.div
								key={example.id}
								variants={itemVariants}
								transition={{ delay: example.delay }}
								className="group"
							>
								<motion.div
									whileHover={{ scale: 1.02, y: -5 }}
									transition={{
										duration: 0.3,
										ease: [0.4, 0, 0.2, 1],
									}}
									className="relative bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:shadow-2xl group-hover:shadow-cyan-500/20"
								>
									{/* Header de l'exemple */}
									<div className="p-6 border-b border-neutral-500/30">
										<div className="flex items-center space-x-3 mb-3">
											<div className="text-2xl">
												{example.icon}
											</div>
											<h3 className="text-xl font-bold text-foreground group-hover:text-cyan-400 transition-colors duration-300">
												{example.title}
											</h3>
										</div>
										<p className="text-muted-foreground text-sm">
											{example.description}
										</p>
									</div>

									{/* Contenu de l'exemple */}
									<div className="p-6">
										{/* Post LinkedIn */}
										{example.id === 1 && (
											<div className="bg-white/5 rounded-lg p-4 border border-neutral-500/20">
												<div className="flex items-center space-x-3 mb-3">
													<div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full"></div>
													<div>
														<div className="font-semibold text-foreground">
															LevisHub
														</div>
														<div className="text-xs text-muted-foreground">
															Il y a 2h • 🌐
														</div>
													</div>
												</div>
												<div className="text-sm text-foreground whitespace-pre-line">
													{example.content}
												</div>
												<div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-500/20">
													<div className="flex space-x-4 text-sm text-muted-foreground">
														<span>👍 24</span>
														<span>💬 8</span>
														<span>🔄 12</span>
													</div>
												</div>
											</div>
										)}

										{/* Newsletter */}
										{example.id === 2 && (
											<div className="bg-gradient-to-br from-violet-500/10 to-purple-600/10 rounded-lg p-4 border border-violet-500/20">
												<div className="text-center">
													<div className="text-2xl mb-2">
														📧
													</div>
													<div className="text-sm text-foreground whitespace-pre-line font-medium">
														{example.content}
													</div>
													<div className="mt-4">
														<Button className="bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm px-4 py-2">
															S'abonner
														</Button>
													</div>
												</div>
											</div>
										)}

										{/* Bannière Hero */}
										{example.id === 3 && (
											<div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-lg p-6 border border-cyan-500/20 text-center">
												<div className="text-3xl mb-4">
													🎨
												</div>
												<div className="text-lg font-bold text-foreground mb-2">
													Transformez votre vision
												</div>
												<div className="text-sm text-muted-foreground mb-4">
													en réalité digitale
												</div>
												<div className="text-xs text-cyan-400 mb-4">
													Sites web modernes •
													Stratégies digitales •
													Formation
												</div>
												<Button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm px-6 py-2">
													Découvrir
												</Button>
											</div>
										)}
									</div>

									{/* Footer avec texte explicatif */}
									<div className="p-6 bg-white/5 border-t border-neutral-500/30">
										<p className="text-sm text-muted-foreground text-center">
											Création sur-mesure adaptée à votre
											audience.
										</p>
									</div>

									{/* Badge "Démo" */}
									<div className="absolute top-4 right-4 bg-cyan-500 text-white text-xs px-2 py-1 rounded-full">
										Démo
									</div>
								</motion.div>
							</motion.div>
						))}
					</motion.div>
				</section>

				{/* Section avantages */}
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
							Pourquoi une communication digitale efficace ?
						</motion.h2>
						<motion.p
							variants={itemVariants}
							className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto"
						>
							Des avantages concrets pour votre business
						</motion.p>
					</motion.div>

					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10"
					>
						{[
							{
								icon: "🎯",
								title: "Audience ciblée",
								description:
									"Atteignez les bonnes personnes au bon moment avec un contenu personnalisé.",
								delay: 0.4,
							},
							{
								icon: "📈",
								title: "Engagement accru",
								description:
									"Contenu engageant qui suscite l'interaction et renforce votre communauté.",
								delay: 0.5,
							},
							{
								icon: "🚀",
								title: "Visibilité boostée",
								description:
									"Augmentez votre présence en ligne et votre reconnaissance de marque.",
								delay: 0.6,
							},
						].map((advantage, index) => (
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
										ease: [0.4, 0, 0.2, 1],
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

				{/* CTA Final */}
				<section className="relative mx-auto max-w-7xl px-6 sm:px-8 py-12 sm:py-24">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
						viewport={{ once: true }}
						className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500/20 via-purple-600/20 to-cyan-500/20 border border-violet-500/30 backdrop-blur-xl"
					>
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(147,51,234,0.2),transparent_50%),radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.2),transparent_50%)]" />

						<div className="relative px-8 sm:px-12 py-16 sm:py-20 text-center">
							<motion.h2
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.8,
									delay: 0.2,
									ease: [0.25, 0.46, 0.45, 0.94],
								}}
								viewport={{ once: true }}
								className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 sm:mb-8 text-gradient-cyan"
							>
								Besoin d'un coup de boost pour votre
								communication ?
							</motion.h2>

							<motion.p
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.8,
									delay: 0.4,
									ease: [0.25, 0.46, 0.45, 0.94],
								}}
								viewport={{ once: true }}
								className="text-lg sm:text-xl text-muted-foreground mb-10 sm:mb-12 max-w-3xl mx-auto leading-relaxed"
							>
								Une stratégie de communication digitale bien
								pensée peut transformer votre présence en ligne
								et attirer de nouveaux clients.
							</motion.p>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.8,
									delay: 0.6,
									ease: [0.25, 0.46, 0.45, 0.94],
								}}
								viewport={{ once: true }}
							>
								<Link href="/contact">
									<motion.div
										whileHover={{ scale: 1.05, rotate: 1 }}
										transition={{
											duration: 0.2,
											ease: [0.4, 0, 0.2, 1],
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
