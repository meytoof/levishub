import { PulseCTA } from "@/components/ui/PulseCTA";
import { Check } from "lucide-react";

export default function PricingPage() {
	const plans = [
		{
			name: "Starter",
			price: "29",
			description: "Parfait pour démarrer votre présence en ligne",
			features: [
				"Site vitrine responsive",
				"Design personnalisé",
				"Hébergement inclus",
				"Support par email",
				"Maintenance continue",
			],
			cta: "Commencer",
			href: "/contact?plan=starter",
			variant: "primary" as const,
			popular: false,
		},
		{
			name: "Pro",
			price: "79",
			description: "Solution complète pour votre business",
			features: [
				"Site vitrine + backoffice",
				"Paiements Stripe intégrés",
				"Analytics et tracking",
				"Rôles Admin/Client",
				"Maintenance continue",
				"Formations incluses",
			],
			cta: "Choisir Pro",
			href: "/contact?plan=pro",
			variant: "secondary" as const,
			popular: true,
		},
		{
			name: "Business",
			price: "149",
			description: "Plateforme complète pour votre croissance",
			features: [
				"E-commerce complet",
				"Backoffice avancé",
				"API personnalisée",
				"Intégrations multiples",
				"Maintenance continue",
				"Support prioritaire",
				"Formations dédiées",
			],
			cta: "Démarrer Business",
			href: "/contact?plan=business",
			variant: "primary" as const,
			popular: false,
		},
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
			{/* Header de la page */}
			<div className="relative mx-auto max-w-7xl px-6 py-24">
				<div className="text-center mb-20">
					<h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent">
						Tarifs transparents
					</h1>
					<p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						Des solutions web sur mesure à des prix compétitifs.
						Choisissez le plan qui correspond à vos besoins.
					</p>
				</div>

				{/* Grille des cartes de tarifs */}
				<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
					{plans.map((plan, index) => (
						<div
							key={plan.name}
							className={`
								relative group flex flex-col
								${plan.popular ? "ring-2 ring-fuchsia-500/50" : ""}
							`}
						>
							{/* Badge "Populaire" */}
							{plan.popular && (
								<div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
									<span className="bg-gradient-to-r from-fuchsia-500 to-rose-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
										⭐ Populaire
									</span>
								</div>
							)}

							{/* Carte principale */}
							<div className="relative bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-8 flex flex-col h-full hover:bg-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-fuchsia-500/20 group-hover:scale-105">
								{/* Effet de glow en arrière-plan */}
								<div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

								{/* En-tête de la carte */}
								<div className="text-center mb-8 flex-shrink-0">
									<h3 className="text-3xl font-bold text-white mb-4">
										{plan.name}
									</h3>
									<div className="mb-4">
										<span className="text-4xl font-bold text-white">
											€
										</span>
										<span className="text-6xl font-bold bg-gradient-to-r from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">
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
												<div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-full flex items-center justify-center mt-0.5">
													<Check className="w-3 h-3 text-white" />
												</div>
												<span className="text-muted-foreground leading-relaxed">
													{feature}
												</span>
											</div>
										)
									)}
								</div>

								{/* Bouton CTA - Toujours en bas */}
								<div className="text-center flex-shrink-0">
									<PulseCTA
										href={plan.href}
										variant={plan.variant}
										size="lg"
										className="w-full"
									>
										{plan.cta}
									</PulseCTA>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Section CTA finale */}
				<div className="text-center mt-20">
					<div className="bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-12 max-w-4xl mx-auto">
						<h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent">
							Besoin d&apos;une solution personnalisée ?
						</h2>
						<p className="text-xl text-muted-foreground mb-8 leading-relaxed">
							Votre projet ne correspond à aucun de nos plans ?
							Contactez-nous pour un devis sur mesure adapté à vos
							besoins spécifiques.
						</p>
						<PulseCTA
							href="/contact?plan=custom"
							variant="secondary"
							size="lg"
						>
							Demander un devis personnalisé
						</PulseCTA>
					</div>
				</div>

				{/* Informations supplémentaires */}
				<div className="text-center mt-16">
					<p className="text-muted-foreground mb-4">
						Tous nos plans incluent :
					</p>
					<div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
						<span>✅ Hébergement sécurisé</span>
						<span>✅ Certificat SSL</span>
						<span>✅ Sauvegardes automatiques</span>
						<span>✅ Support technique</span>
						<span>✅ Mises à jour gratuites</span>
					</div>
				</div>
			</div>
		</div>
	);
}
