import Link from "next/link";

export function Footer() {
	return (
		<footer className="bg-gray-900 text-white py-12 mt-auto border-t border-gray-800">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Informations de l'entreprise */}
					<div className="space-y-4">
						<h3 className="text-xl font-semibold text-blue-400">
							LevisWeb
						</h3>
					<p className="text-gray-300 text-sm">
						Développement web freelance – Sites modernes, rapides et
						optimisés SEO.
					</p>
					</div>

					{/* Adresse */}
					<div className="space-y-4">
						<h4 className="text-lg font-medium text-blue-400">
							Adresse
						</h4>
						<address className="text-gray-300 text-sm not-italic">
							<p>30 place centrale</p>
							<p>38380 Entre-Deux-Guiers</p>
							<p>France</p>
						</address>
					</div>

					{/* Contact */}
					<div className="space-y-4">
						<h4 className="text-lg font-medium text-blue-400">
							Contact
						</h4>
						<div className="space-y-2 text-sm">
							<p className="text-gray-300">
								<a
									href="tel:+33783422676"
									className="hover:text-blue-400 transition-colors"
								>
									📞 07 83 42 26 76
								</a>
							</p>
							<p className="text-gray-300">
								<Link
									href="/contact"
									className="hover:text-blue-400 transition-colors"
								>
									📧 Nous contacter
								</Link>
							</p>
						</div>
					</div>

					{/* Liens légaux */}
					<div className="space-y-4">
						<h4 className="text-lg font-medium text-blue-400">
							Informations légales
						</h4>
						<div className="space-y-2 text-sm">
							<Link
								href="/terms"
								className="block text-gray-300 hover:text-blue-400 transition-colors"
							>
								📋 Conditions Générales d'Utilisation
							</Link>
							<Link
								href="/cgv"
								className="block text-gray-300 hover:text-blue-400 transition-colors"
							>
								📄 Conditions Générales de Vente
							</Link>
						</div>
					</div>
				</div>

				{/* Ligne de séparation */}
				<div className="border-t border-gray-700 mt-8 pt-8">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<p className="text-gray-400 text-sm">
							© {new Date().getFullYear()} LevisWeb. Tous droits
							réservés.
						</p>
						<div className="flex space-x-6 mt-4 md:mt-0">
							<Link
								href="/privacy"
								className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
							>
								Politique de confidentialité
							</Link>
							<Link
								href="/mentions-legales"
								className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
							>
								Mentions légales
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
