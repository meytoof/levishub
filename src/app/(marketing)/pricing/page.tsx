import { FeatureCard3D } from "@/components/ui/enhanced-3d-card";
import { LimitedOffer } from "@/components/ui/limited-offer";
import { PricingQuiz } from "@/components/ui/pricing-quiz";
import { PulseCTA } from "@/components/ui/PulseCTA";
import { Check, Lock, Shield, Zap } from "lucide-react";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Tarifs - Développement Web Freelance | LevisWeb",
	description: "Tarifs transparents pour sites web, e-commerce et backoffice sur mesure. Solutions web professionnelles à des prix compétitifs.",
	keywords: "tarifs développement web, prix site web, freelance web, LevisWeb",
	openGraph: {
		title: "Tarifs - Développement Web Freelance | LevisWeb",
		description: "Tarifs transparents pour sites web, e-commerce et backoffice sur mesure. Solutions web professionnelles à des prix compétitifs.",
		url: "https://levisweb.net/pricing",
		type: "website",
	},
};

export default function PricingPage() {
	// Frais de création (paiement unique)
	const creationPlans = [
		{
			name: "Site Vitrine",
			price: "499",
			description: "Site professionnel pour présenter votre activité",
			features: [
				"Design personnalisé et responsive",
				"Jusqu'à 5 pages",
				"Formulaire de contact",
				"Optimisation SEO de base",
				"Intégration réseaux sociaux",
			],
			cta: "Démarrer mon projet",
			href: "/contact?plan=vitrine",
			variant: "primary" as const,
		},
		{
			name: "E-commerce",
			price: "1499",
			description: "Boutique en ligne complète",
			features: [
				"Site vitrine + catalogue produits",
				"Paiements Stripe sécurisés",
				"Gestion des commandes",
				"Gestion des stocks",
				"Backoffice administrateur",
			],
			cta: "Démarrer mon projet",
			href: "/contact?plan=ecommerce",
			variant: "primary" as const,
		},
		{
			name: "Sur Mesure",
			price: "Sur devis",
			description: "Solution personnalisée pour vos besoins spécifiques",
			features: [
				"Analyse de vos besoins",
				"Développement sur mesure",
				"Intégrations avancées",
				"API personnalisées",
				"Formation de votre équipe",
			],
			cta: "Demander un devis",
			href: "/contact?plan=custom",
			variant: "secondary" as const,
		},
	];

	// Plans d'abonnement mensuel (obligatoire)
	const subscriptionPlans = [
		{
			name: "Starter",
			price: "29",
			description: "Hébergement et sécurité de base",
			features: [
				"Hébergement haute performance",
				"Certificat SSL gratuit",
				"Sauvegardes automatiques",
				"Support par email",
				"Mises à jour de sécurité",
			],
			cta: "Choisir ce plan",
			href: "/contact?subscription=starter",
			variant: "primary" as const,
			popular: false,
		},
		{
			name: "Pro",
			price: "59",
			description: "Maintenance et support avancé",
			features: [
				"Tout du plan Starter",
				"Mises à jour du site",
				"Support prioritaire",
				"Monitoring 24/7",
				"Optimisations de performance",
			],
			cta: "Choisir ce plan",
			href: "/contact?subscription=pro",
			variant: "secondary" as const,
			popular: true,
		},
		{
			name: "Premium",
			price: "99",
			description: "Service complet et dédié",
			features: [
				"Tout du plan Pro",
				"SEO et analytics",
				"Support téléphonique",
				"Modifications mineures incluses",
				"Conseils stratégiques",
			],
			cta: "Choisir ce plan",
			href: "/contact?subscription=premium",
			variant: "primary" as const,
			popular: false,
		},
	];

	return (
		<div className="min-h-screen">
			<Script id="ld-json-breadcrumb" type="application/ld+json">
				{JSON.stringify({
					"@context": "https://schema.org",
					"@type": "BreadcrumbList",
					itemListElement: [
						{
							"@type": "ListItem",
							position: 1,
							name: "Accueil",
							item: "https://levisweb.net/",
						},
						{
							"@type": "ListItem",
							position: 2,
							name: "Tarifs",
							item: "https://levisweb.net/pricing",
						},
					],
				})}
			</Script>
			<div className="relative mx-auto max-w-7xl px-6 py-24">
				{/* Header de la page */}
				<div className="text-center mb-20">
					<h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-gradient-cyan">
						Tarifs transparents
					</h1>
					<p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						Des solutions web sur mesure à des prix compétitifs.
						Choisissez le plan qui correspond à vos besoins.
					</p>
				</div>

				{/* Offre limitée -20% */}
				<div className="mb-20">
					<LimitedOffer remainingSlots={8} totalSlots={10} />
				</div>

				{/* Section explicative - Pédagogie */}
				<div className="bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-8 mb-20 max-w-4xl mx-auto">
					<div className="text-center mb-6">
						<Shield className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
						<h2 className="text-2xl font-bold text-foreground mb-4">
							Comment fonctionnent nos tarifs ?
						</h2>
					</div>
					<div className="grid md:grid-cols-2 gap-8 text-muted-foreground">
						<div className="text-center">
							<div className="bg-cyan-500/20 rounded-lg p-4 mb-4">
								<Zap className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
								<h3 className="font-semibold text-foreground mb-2">
									Frais de création
								</h3>
								<p className="text-sm">
									Un paiement unique pour créer et mettre en
									ligne votre site
								</p>
							</div>
						</div>
						<div className="text-center">
							<div className="bg-cyan-500/20 rounded-lg p-4 mb-4">
								<Lock className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
								<h3 className="font-semibold text-foreground mb-2">
									Abonnement mensuel
								</h3>
								<p className="text-sm">
									Garantit que votre site reste sécurisé, en
									ligne et à jour
								</p>
							</div>
						</div>
					</div>
					<div className="text-center mt-6 p-4 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-lg">
						<p className="text-foreground font-medium">
							💡 <strong>Résultat :</strong> Vous savez exactement
							ce que vous payez, sans surprise !
						</p>
					</div>
				</div>

				{/* Quiz interactif */}
				<div className="mb-20">
					<PricingQuiz />
				</div>

				{/* Section 1: Frais de création (paiement unique) */}
				<div className="mb-20">
					<div className="text-center mb-12">
						<h2 className="text-4xl font-bold text-foreground mb-4">
							Frais de création
						</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Un investissement unique pour créer et mettre en
							ligne votre site web
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
						{creationPlans.map((plan, index) => (
							<div
								key={plan.name}
								className="relative group flex flex-col"
							>
								{/* Carte principale */}
								<FeatureCard3D
									className="flex flex-col h-full p-10"
									intensity="medium"
									glowColor="auto"
									containerClassName="bg-gradient-to-br from-white/10 via-white/5 to-white/10 dark:from-neutral-800/50 dark:via-neutral-900/50 dark:to-neutral-800/50 border border-neutral-400/30 dark:border-neutral-600/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
								>
									{/* En-tête de la carte */}
									<div className="text-center mb-8 flex-shrink-0">
										<h3 className="text-2xl font-bold text-foreground mb-4">
											{plan.name}
										</h3>
										<div className="mb-4">
											{plan.price === "Sur devis" ? (
												<span className="text-2xl font-bold text-cyan-400">
													{plan.price}
												</span>
											) : (
												<>
													{/* Prix barré original */}
													<div className="mb-2">
														<span className="text-2xl line-through text-muted-foreground">
															€{plan.price}
														</span>
													</div>
													{/* Prix remisé */}
													<div className="flex items-center justify-center gap-2">
														<span className="text-4xl font-bold text-foreground">
															€
														</span>
														<span className="text-5xl font-bold text-gradient-cyan">
															{Math.round(
																parseInt(
																	plan.price
																) * 0.8
															)}
														</span>
														<span className="text-lg text-cyan-400 font-semibold">
															-20%
														</span>
													</div>
												</>
											)}
										</div>
										<p className="text-muted-foreground leading-relaxed">
											{plan.description}
										</p>
									</div>

									{/* Liste des fonctionnalités */}
									<div className="flex-grow space-y-4 mb-8">
										{plan.features.map(
											(feature, featureIndex) => (
												<div
													key={featureIndex}
													className="flex items-start gap-3"
												>
													<div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mt-0.5">
														<Check className="w-3 h-3 text-white" />
													</div>
													<span className="text-muted-foreground leading-relaxed">
														{feature}
													</span>
												</div>
											)
										)}
									</div>

									{/* Bouton CTA */}
									<div className="text-center flex-shrink-0">
										<PulseCTA
											href={plan.href}
											variant={plan.variant}
											size="lg"
											className="w-full btn-cyan-gradient"
										>
											{plan.cta}
										</PulseCTA>
									</div>
								</FeatureCard3D>
							</div>
						))}
					</div>
				</div>

				{/* Section 2: Abonnement mensuel (obligatoire) */}
				<div className="mb-20">
					<div className="text-center mb-12">
						<h2 className="text-4xl font-bold text-foreground mb-4">
							Abonnement mensuel
						</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							🔒 <strong>Inclus avec chaque site</strong> -
							Garantit performance et sécurité continues
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
						{subscriptionPlans.map((plan, index) => (
							<div
								key={plan.name}
								className="relative group flex flex-col"
							>
								{/* Badge "Populaire" */}
								{plan.popular && (
									<div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
										<span className="pricing-badge-popular text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
											⭐ Populaire
										</span>
									</div>
								)}

								{/* Carte principale */}
								<FeatureCard3D
									className="flex flex-col h-full p-10"
									intensity="medium"
									glowColor="auto"
									containerClassName="bg-gradient-to-br from-white/10 via-white/5 to-white/10 dark:from-neutral-800/50 dark:via-neutral-900/50 dark:to-neutral-800/50 border border-neutral-400/30 dark:border-neutral-600/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
								>
									{/* En-tête de la carte */}
									<div className="text-center mb-8 flex-shrink-0">
										<h3 className="text-2xl font-bold text-foreground mb-4">
											{plan.name}
										</h3>
										<div className="mb-4">
											<span className="text-4xl font-bold text-foreground">
												€
											</span>
											<span className="text-5xl font-bold text-gradient-cyan">
												{plan.price}
											</span>
											<span className="text-xl text-muted-foreground">
												/mois
											</span>
										</div>
										<p className="text-muted-foreground leading-relaxed">
											{plan.description}
										</p>
									</div>

									{/* Liste des fonctionnalités */}
									<div className="flex-grow space-y-4 mb-8">
										{plan.features.map(
											(feature, featureIndex) => (
												<div
													key={featureIndex}
													className="flex items-start gap-3"
												>
													<div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mt-0.5">
														<Check className="w-3 h-3 text-white" />
													</div>
													<span className="text-muted-foreground leading-relaxed">
														{feature}
													</span>
												</div>
											)
										)}
									</div>

									{/* Bouton CTA */}
									<div className="text-center flex-shrink-0">
										<PulseCTA
											href={plan.href}
											variant={plan.variant}
											size="lg"
											className="w-full btn-cyan-gradient"
										>
											{plan.cta}
										</PulseCTA>
									</div>
								</FeatureCard3D>
							</div>
						))}
					</div>
				</div>

				{/* Section FAQ */}
				<div className="mb-20">
					<div className="text-center mb-12">
						<h2 className="text-4xl font-bold text-foreground mb-4">
							Questions fréquentes
						</h2>
					</div>

					<div className="max-w-4xl mx-auto space-y-6">
						<div className="bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-6">
							<h3 className="text-xl font-semibold text-foreground mb-3">
								❓ Pourquoi l&apos;abonnement est-il obligatoire
								?
							</h3>
							<p className="text-muted-foreground">
								Parce qu&apos;un site web a besoin d&apos;être
								hébergé, protégé et mis à jour en continu.
								L&apos;abonnement garantit que votre site reste
								sécurisé, performant et toujours accessible.
							</p>
						</div>

						<div className="bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-6">
							<h3 className="text-xl font-semibold text-foreground mb-3">
								❓ Puis-je changer de formule d&apos;abonnement
								?
							</h3>
							<p className="text-muted-foreground">
								Oui, à tout moment ! Vous pouvez passer
								d&apos;un plan à l&apos;autre selon
								l&apos;évolution de vos besoins.
							</p>
						</div>

						<div className="bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-6">
							<h3 className="text-xl font-semibold text-foreground mb-3">
								❓ Que se passe-t-il si j&apos;arrête
								l&apos;abonnement ?
							</h3>
							<p className="text-muted-foreground">
								Votre site sera mis hors ligne. Nous vous
								recommandons de maintenir l&apos;abonnement pour
								garantir la continuité de votre présence en
								ligne.
							</p>
						</div>
					</div>
				</div>

				{/* Section CTA finale */}
				<div className="text-center">
					<div className="bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-12 max-w-4xl mx-auto">
						<h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient-cyan">
							Prêt à démarrer votre projet ?
						</h2>
						<p className="text-xl text-muted-foreground mb-8 leading-relaxed">
							Contactez-nous pour discuter de vos besoins et
							obtenir un devis personnalisé. Nous vous
							accompagnerons à chaque étape de votre projet.
						</p>
						<PulseCTA
							href="/contact"
							variant="secondary"
							size="lg"
							className="btn-cyan-gradient"
						>
							Discuter de mon projet
						</PulseCTA>
					</div>
				</div>
			</div>
		</div>
	);
}
