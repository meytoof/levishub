export default function MentionsLegalesPage() {
	return (
		<div className="container mx-auto px-4 py-8 max-w-4xl">
			<h1 className="text-3xl font-bold text-foreground mb-8">
				Mentions Légales
			</h1>

			<div className="prose prose-lg max-w-none">
				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-foreground mb-4">
						1. Éditeur du site
					</h2>
					<div className="text-muted-foreground mb-4 space-y-2">
						<p>
							<strong>Raison sociale :</strong> LevisWeb
						</p>
						<p>
							<strong>Adresse :</strong> 30 place centrale, 38380
							Entre-Deux-Guiers, France
						</p>
						<p>
							<strong>Téléphone :</strong> 07 83 42 26 76
						</p>
						<p>
							<strong>Email :</strong> contact@levisweb.fr
						</p>
						<p>
							<strong>Activité :</strong> Développement web
							freelance
						</p>
					</div>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-foreground mb-4">
						2. Hébergement
					</h2>
					<p className="text-muted-foreground mb-4">
						Ce site est hébergé par Vercel Inc., 340 S Lemon Ave
						#4133, Walnut, CA 91789, États-Unis.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-foreground mb-4">
						3. Propriété intellectuelle
					</h2>
					<p className="text-muted-foreground mb-4">
						L'ensemble du contenu de ce site (textes, images, code
						source) est protégé par le droit d'auteur. Toute
						reproduction sans autorisation préalable est interdite.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-foreground mb-4">
						4. Responsabilité
					</h2>
					<p className="text-muted-foreground mb-4">
						LevisWeb s'efforce d'assurer l'exactitude des
						informations diffusées sur ce site mais ne peut garantir
						qu'elles soient exemptes d'erreurs.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-foreground mb-4">
						5. Droit applicable
					</h2>
					<p className="text-muted-foreground mb-4">
						Les présentes mentions légales sont soumises au droit
						français. En cas de litige, les tribunaux français sont
						seuls compétents.
					</p>
				</section>
			</div>
		</div>
	);
}
