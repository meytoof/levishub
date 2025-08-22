export default function TermsPage() {
	return (
		<div className="container mx-auto px-4 py-8 max-w-4xl">
			<h1 className="text-3xl font-bold text-foreground mb-8">
				Conditions Générales d'Utilisation
			</h1>

			<div className="prose prose-lg max-w-none">
				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-foreground mb-4">
						1. Acceptation des conditions
					</h2>
					<p className="text-muted-foreground mb-4 leading-relaxed">
						En accédant et en utilisant ce site web, vous acceptez
						d'être lié par ces conditions générales d'utilisation.
						Si vous n'acceptez pas ces conditions, veuillez ne pas
						utiliser ce site.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-foreground mb-4">
						2. Description des services
					</h2>
					<p className="text-muted-foreground mb-4 leading-relaxed">
						LevisHub propose des services de développement web
						freelance incluant la création de sites web,
						applications web, solutions sur mesure et services de
						maintenance technique.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-foreground mb-4">
						3. Utilisation du site
					</h2>
					<div className="text-muted-foreground mb-4 space-y-3">
						<p className="leading-relaxed">
							Vous vous engagez à utiliser ce site uniquement à
							des fins légales et de manière à ne pas restreindre
							ou inhiber l'utilisation et la jouissance du site
							par un tiers.
						</p>
						<p className="leading-relaxed">
							Il est interdit d'utiliser ce site pour :
						</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>
								Transmettre du contenu illégal, offensant ou
								diffamatoire
							</li>
							<li>
								Violer les droits de propriété intellectuelle
							</li>
							<li>
								Tenter d'accéder de manière non autorisée à nos
								systèmes
							</li>
							<li>
								Utiliser des robots ou des scripts automatisés
							</li>
						</ul>
					</div>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-foreground mb-4">
						4. Propriété intellectuelle
					</h2>
					<p className="text-muted-foreground mb-4 leading-relaxed">
						Tout le contenu de ce site (textes, images, code source,
						design) est protégé par le droit d'auteur et appartient
						à LevisHub. Toute reproduction, distribution ou
						modification sans autorisation écrite préalable est
						strictement interdite.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-foreground mb-4">
						5. Confidentialité et données personnelles
					</h2>
					<p className="text-muted-foreground mb-4 leading-relaxed">
						La collecte et le traitement de vos données personnelles
						sont régis par notre politique de confidentialité. En
						utilisant ce site, vous consentez à ce traitement
						conformément à cette politique.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-foreground mb-4">
						6. Liens externes
					</h2>
					<p className="text-muted-foreground mb-4 leading-relaxed">
						Ce site peut contenir des liens vers des sites web
						tiers. LevisHub n'exerce aucun contrôle sur ces sites et
						décline toute responsabilité quant à leur contenu ou à
						leurs pratiques.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-foreground mb-4">
						7. Limitation de responsabilité
					</h2>
					<p className="text-muted-foreground mb-4 leading-relaxed">
						LevisHub s'efforce de maintenir ce site à jour et
						fonctionnel, mais ne peut garantir qu'il soit exempt
						d'erreurs ou de dysfonctionnements. L'utilisation de ce
						site se fait à vos propres risques.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-foreground mb-4">
						8. Modifications des conditions
					</h2>
					<p className="text-muted-foreground mb-4 leading-relaxed">
						Nous nous réservons le droit de modifier ces conditions
						à tout moment. Les modifications entrent en vigueur dès
						leur publication sur le site. Il est de votre
						responsabilité de consulter régulièrement ces
						conditions.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-foreground mb-4">
						9. Droit applicable et juridiction
					</h2>
					<p className="text-muted-foreground mb-4 leading-relaxed">
						Ces conditions sont soumises au droit français. En cas
						de litige, les tribunaux français sont seuls compétents.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-foreground mb-4">
						10. Contact
					</h2>
					<p className="text-muted-foreground mb-4 leading-relaxed">
						Pour toute question concernant ces conditions générales
						d'utilisation, contactez-nous au 07 83 42 26 76 ou par
						email via notre page de contact.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-foreground mb-4">
						11. Dernière mise à jour
					</h2>
					<p className="text-muted-foreground mb-4 leading-relaxed">
						Ces conditions générales d'utilisation ont été mises à
						jour pour la dernière fois le
						{new Date().toLocaleDateString("fr-FR", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
						.
					</p>
				</section>
			</div>
		</div>
	);
}
