export default function PrivacyPage() {
	return (
		<div className="container mx-auto px-4 py-8 max-w-4xl">
			<h1 className="text-3xl font-bold text-white mb-8">
				Politique de Confidentialité
			</h1>

			<div className="prose prose-lg max-w-none">
				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-white mb-4">
						1. Collecte des informations
					</h2>
					<p className="text-gray-200 mb-4 leading-relaxed">
						Nous collectons uniquement les informations nécessaires
						au bon fonctionnement de nos services et à la
						communication avec nos clients.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-gray-800 mb-4">
						2. Utilisation des données
					</h2>
					<p className="text-gray-600 mb-4">
						Vos données personnelles sont utilisées exclusivement
						pour la gestion de votre projet et la communication
						relative à nos services.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-gray-800 mb-4">
						3. Protection des données
					</h2>
					<p className="text-gray-600 mb-4">
						Nous mettons en œuvre toutes les mesures techniques et
						organisationnelles appropriées pour protéger vos données
						personnelles.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-gray-800 mb-4">
						4. Vos droits
					</h2>
					<p className="text-gray-600 mb-4">
						Conformément au RGPD, vous disposez d'un droit d'accès,
						de rectification, de suppression et d'opposition à vos
						données personnelles.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-gray-800 mb-4">
						5. Contact
					</h2>
					<p className="text-gray-600 mb-4">
						Pour toute question concernant la protection de vos
						données, contactez-nous au 07 83 42 26 76 ou par email
						via notre page de contact.
					</p>
				</section>
			</div>
		</div>
	);
}
