export default function CGVPage() {
	return (
		<div className="container mx-auto px-4 py-8 max-w-4xl">
			<h1 className="text-3xl font-bold text-foreground mb-8">
				Conditions Générales de Vente
			</h1>

			<div className="prose prose-lg max-w-none">
				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-foreground mb-4">
						1. Présentation du service
					</h2>
					<p className="text-muted-foreground mb-4 leading-relaxed">
						LevisHub propose des services de développement web
						freelance incluant la création de sites web,
						applications web et solutions sur mesure.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-foreground mb-4">
						2. Tarifs et modalités de paiement
					</h2>
					<p className="text-muted-foreground mb-4 leading-relaxed">
						Les tarifs sont établis sur devis et peuvent varier
						selon la complexité du projet. Un acompte de 50% est
						demandé à la commande, le solde à la livraison.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-foreground mb-4">
						3. Délais de livraison
					</h2>
					<p className="text-muted-foreground mb-4 leading-relaxed">
						Les délais de livraison sont donnés à titre indicatif et
						peuvent être modifiés en fonction de la complexité du
						projet et de la charge de travail.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-foreground mb-4">
						4. Garanties
					</h2>
					<p className="text-muted-foreground mb-4 leading-relaxed">
						LevisHub s'engage à fournir un service de qualité et à
						corriger gratuitement les dysfonctionnements techniques
						pendant 30 jours après la livraison.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-foreground mb-4">
						5. Contact
					</h2>
					<p className="text-muted-foreground mb-4 leading-relaxed">
						Pour toute question concernant ces conditions,
						contactez-nous au 07 83 42 26 76 ou par email via notre
						page de contact.
					</p>
				</section>
			</div>
		</div>
	);
}
