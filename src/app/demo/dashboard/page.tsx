"use client";

import { Button } from "@/components/ui/button";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { motion } from "framer-motion";
import Link from "next/link";

const mockData = [
	{
		id: 1,
		name: "Jean Dupont",
		email: "jean.dupont@email.com",
		status: "Actif",
		revenue: "12,450 €",
		delay: 0.1,
	},
	{
		id: 2,
		name: "Marie Martin",
		email: "marie.martin@email.com",
		status: "Actif",
		revenue: "8,920 €",
		delay: 0.2,
	},
	{
		id: 3,
		name: "Pierre Durand",
		email: "pierre.durand@email.com",
		status: "Inactif",
		revenue: "5,340 €",
		delay: 0.3,
	},
	{
		id: 4,
		name: "Sophie Bernard",
		email: "sophie.bernard@email.com",
		status: "Actif",
		revenue: "15,780 €",
		delay: 0.4,
	},
];

const features = [
	{
		icon: "📊",
		title: "Gestion de données",
		description:
			"Centralisation et organisation efficace de toutes vos données business en temps réel.",
		delay: 0.5,
	},
	{
		icon: "👁️",
		title: "Visualisation claire",
		description:
			"Graphiques et tableaux intuitifs pour une compréhension immédiate de vos métriques.",
		delay: 0.6,
	},
	{
		icon: "🎯",
		title: "Adapté aux besoins B2B",
		description:
			"Interface spécialement conçue pour les entreprises et leurs enjeux spécifiques.",
		delay: 0.7,
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

export default function DemoDashboard() {
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
							Dashboard B2B
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
							Un outil clair et moderne pour piloter votre
							activité.
						</motion.p>
					</motion.div>
				</section>

				{/* Section principale avec graphique et table */}
				<section className="relative mx-auto max-w-7xl px-6 sm:px-8 py-12 sm:py-24">
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12"
					>
						{/* Graphique fictif */}
						<motion.div variants={itemVariants} className="group">
							<motion.div
								whileHover={{ scale: 1.02, y: -5 }}
								transition={{
									duration: 0.3,
									ease: "easeInOut",
								}}
								className="relative bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl group-hover:shadow-cyan-500/20"
							>
								<h3 className="text-xl sm:text-2xl font-bold mb-6 text-foreground">
									Évolution des ventes
								</h3>

								{/* Graphique placeholder */}
								<div className="w-full h-64 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-lg p-6 relative overflow-hidden">
									{/* Lignes du graphique */}
									<div className="absolute inset-0 flex items-end justify-between px-6 pb-6">
										<div className="w-8 bg-gradient-to-t from-cyan-500 to-transparent rounded-t-sm h-20"></div>
										<div className="w-8 bg-gradient-to-t from-blue-500 to-transparent rounded-t-sm h-32"></div>
										<div className="w-8 bg-gradient-to-t from-violet-500 to-transparent rounded-t-sm h-24"></div>
										<div className="w-8 bg-gradient-to-t from-cyan-500 to-transparent rounded-t-sm h-40"></div>
										<div className="w-8 bg-gradient-to-t from-blue-500 to-transparent rounded-t-sm h-28"></div>
										<div className="w-8 bg-gradient-to-t from-violet-500 to-transparent rounded-t-sm h-36"></div>
									</div>

									{/* Légende */}
									<div className="absolute bottom-2 left-6 flex space-x-4 text-xs">
										<div className="flex items-center space-x-2">
											<div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
											<span className="text-neutral-300">
												Q1
											</span>
										</div>
										<div className="flex items-center space-x-2">
											<div className="w-3 h-3 bg-blue-500 rounded-full"></div>
											<span className="text-neutral-300">
												Q2
											</span>
										</div>
										<div className="flex items-center space-x-2">
											<div className="w-3 h-3 bg-violet-500 rounded-full"></div>
											<span className="text-neutral-300">
												Q3
											</span>
										</div>
									</div>
								</div>

								<div className="mt-4 text-center">
									<div className="text-2xl font-bold text-cyan-400">
										+24%
									</div>
									<div className="text-sm text-muted-foreground">
										vs trimestre précédent
									</div>
								</div>
							</motion.div>
						</motion.div>

						{/* Table fictive */}
						<motion.div variants={itemVariants} className="group">
							<motion.div
								whileHover={{ scale: 1.02, y: -5 }}
								transition={{
									duration: 0.3,
									ease: "easeInOut",
								}}
								className="relative bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl group-hover:shadow-cyan-500/20"
							>
								<h3 className="text-xl sm:text-2xl font-bold mb-6 text-foreground">
									Top Clients
								</h3>

								<div className="overflow-hidden">
									<table className="w-full">
										<thead>
											<tr className="border-b border-neutral-500/30">
												<th className="text-left py-3 px-2 text-sm font-semibold text-neutral-300">
													Client
												</th>
												<th className="text-left py-3 px-2 text-sm font-semibold text-neutral-300">
													Email
												</th>
												<th className="text-left py-3 px-2 text-sm font-semibold text-neutral-300">
													Statut
												</th>
												<th className="text-left py-3 px-2 text-sm font-semibold text-neutral-300">
													CA
												</th>
											</tr>
										</thead>
										<tbody>
											{mockData.map((row) => (
												<tr
													key={row.id}
													className="border-b border-neutral-500/20"
												>
													<td className="py-3 px-2 text-sm text-foreground">
														{row.name}
													</td>
													<td className="py-3 px-2 text-sm text-muted-foreground">
														{row.email}
													</td>
													<td className="py-3 px-2">
														<span
															className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
																row.status ===
																"Actif"
																	? "bg-green-500/20 text-green-400"
																	: "bg-red-500/20 text-red-400"
															}`}
														>
															{row.status}
														</span>
													</td>
													<td className="py-3 px-2 text-sm font-semibold text-cyan-400">
														{row.revenue}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>

								<div className="mt-4 text-center">
									<div className="text-sm text-muted-foreground">
										Total:{" "}
										<span className="font-semibold text-foreground">
											42,490 €
										</span>
									</div>
								</div>
							</motion.div>
						</motion.div>
					</motion.div>
				</section>

				{/* Section fonctionnalités */}
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
							Fonctionnalités
						</motion.h2>
						<motion.p
							variants={itemVariants}
							className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto"
						>
							Tout ce dont vous avez besoin pour piloter votre
							activité
						</motion.p>
					</motion.div>

					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10"
					>
						{features.map((feature, index) => (
							<motion.div
								key={index}
								variants={itemVariants}
								transition={{ delay: feature.delay }}
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
									<div className="text-4xl sm:text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
										{feature.icon}
									</div>
									<h3 className="text-xl sm:text-2xl font-bold mb-4 text-foreground group-hover:text-cyan-400 transition-colors duration-300">
										{feature.title}
									</h3>
									<p className="text-muted-foreground leading-relaxed">
										{feature.description}
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
						transition={{ duration: 0.8, ease: "easeOut" }}
						viewport={{ once: true }}
						className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/10 via-blue-600/10 to-violet-500/10 border border-cyan-500/20 backdrop-blur-xl"
					>
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />

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
								Vous souhaitez un dashboard comme celui-ci ?
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
								Discutons de vos besoins et créons ensemble un
								tableau de bord qui vous donne le contrôle
								total.
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
											Discutons-en
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
