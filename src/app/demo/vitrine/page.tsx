"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const services = [
	{
		id: 1,
		title: "Conception sur mesure",
		description: "Création de sites web adaptés à vos besoins spécifiques",
		icon: "🎨",
	},
	{
		id: 2,
		title: "Maintenance continue",
		description: "Suivi et mise à jour régulière de votre site web",
		icon: "🔧",
	},
	{
		id: 3,
		title: "Support technique",
		description: "Assistance technique et formation de vos équipes",
		icon: "💬",
	},
];

const testimonials = [
	{
		id: 1,
		name: "Marie Dubois",
		company: "Artisanat Plus",
		text: "Site professionnel qui reflète parfaitement notre savoir-faire artisanal.",
	},
	{
		id: 2,
		name: "Pierre Martin",
		company: "Services Pro",
		text: "Excellente collaboration et résultat conforme à nos attentes.",
	},
];

export default function VitrineDemo() {
	return (
		<div className="demo-container min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-gray-100">
			{/* Header */}
			<header className="demo-header demo-nav bg-white shadow-sm border-b border-gray-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="flex items-center justify-between">
						<motion.h1
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							className="text-2xl font-bold text-gray-800"
						>
							Artisanat Pro
						</motion.h1>
						<nav className="flex items-center space-x-8">
							<a
								href="#"
								className="text-gray-700 hover:text-blue-600 transition-colors"
							>
								Accueil
							</a>
							<a
								href="#"
								className="text-gray-700 hover:text-blue-600 transition-colors"
							>
								Services
							</a>
							<a
								href="#"
								className="text-gray-700 hover:text-blue-600 transition-colors"
							>
								Réalisations
							</a>
							<a
								href="#"
								className="text-gray-700 hover:text-blue-600 transition-colors"
							>
								Contact
							</a>
						</nav>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section className="py-20 text-center">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="max-w-4xl mx-auto px-4"
				>
					<h2 className="text-5xl md:text-7xl font-bold mb-6 text-gray-800">
						<span className="text-blue-600">Artisanat</span>
						<br />
						d'Excellence
					</h2>
					<p className="text-xl text-gray-600 mb-8">
						Découvrez notre savoir-faire traditionnel et nos
						services professionnels
					</p>
					<div className="flex justify-center space-x-4">
						<button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105">
							Nos services
						</button>
						<button className="px-8 py-3 border border-gray-600 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-200">
							Nous contacter
						</button>
					</div>
				</motion.div>
			</section>

			{/* Services Section */}
			<section className="py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.h3
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="text-3xl font-bold text-center mb-16 text-gray-800"
					>
						Nos <span className="text-blue-600">Services</span>
					</motion.h3>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{services.map((service, index) => (
							<motion.div
								key={service.id}
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.6,
									delay: 0.4 + index * 0.1,
								}}
								whileHover={{ y: -10, scale: 1.02 }}
								className="group"
							>
								<div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center">
									<div className="text-4xl mb-4">
										{service.icon}
									</div>
									<h4 className="text-xl font-bold mb-4 text-gray-800">
										{service.title}
									</h4>
									<p className="text-gray-600">
										{service.description}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* About Section */}
			<section className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}
						>
							<h3 className="text-3xl font-bold mb-6 text-gray-800">
								Notre{" "}
								<span className="text-blue-600">Histoire</span>
							</h3>
							<p className="text-gray-600 mb-6 leading-relaxed">
								Depuis plus de 20 ans, nous perpétuons les
								traditions artisanales tout en adoptant les
								technologies modernes pour offrir des services
								de qualité exceptionnelle.
							</p>
							<p className="text-gray-600 leading-relaxed">
								Notre équipe d'experts s'engage à vous
								accompagner dans tous vos projets avec
								professionnalisme et créativité.
							</p>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8, delay: 0.6 }}
							className="bg-gradient-to-br from-blue-100 to-gray-200 h-80 rounded-xl flex items-center justify-center"
						>
							<span className="text-blue-600 text-lg">
								Image de l'atelier
							</span>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className="py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.h3
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.8 }}
						className="text-3xl font-bold text-center mb-16 text-gray-800"
					>
						Témoignages{" "}
						<span className="text-blue-600">Clients</span>
					</motion.h3>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{testimonials.map((testimonial, index) => (
							<motion.div
								key={testimonial.id}
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.6,
									delay: 1.0 + index * 0.1,
								}}
								className="bg-white rounded-xl p-8 shadow-lg border border-gray-100"
							>
								<p className="text-gray-600 mb-6 italic">
									"{testimonial.text}"
								</p>
								<div>
									<p className="font-semibold text-gray-800">
										{testimonial.name}
									</p>
									<p className="text-blue-600">
										{testimonial.company}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-blue-600">
				<div className="max-w-4xl mx-auto text-center px-4">
					<motion.h3
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 1.2 }}
						className="text-3xl font-bold mb-6 text-white"
					>
						Prêt à démarrer votre projet ?
					</motion.h3>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 1.4 }}
						className="text-xl text-blue-100 mb-8"
					>
						Contactez-nous pour discuter de vos besoins et obtenir
						un devis personnalisé.
					</motion.p>
					<motion.button
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 1.6 }}
						className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-105"
					>
						Demander un devis
					</motion.button>
				</div>
			</section>

			{/* Footer */}
			<footer className="demo-footer bg-gray-800 text-white py-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						<div>
							<h4 className="text-lg font-bold mb-4">
								Artisanat Pro
							</h4>
							<p className="text-gray-300">
								Votre partenaire de confiance pour tous vos
								projets artisanaux.
							</p>
						</div>
						<div>
							<h4 className="text-lg font-bold mb-4">Services</h4>
							<ul className="space-y-2 text-gray-300">
								<li>Conception sur mesure</li>
								<li>Maintenance</li>
								<li>Support technique</li>
							</ul>
						</div>
						<div>
							<h4 className="text-lg font-bold mb-4">Contact</h4>
							<ul className="space-y-2 text-gray-300">
								<li>📧 contact@artisanatpro.fr</li>
								<li>📞 01 23 45 67 89</li>
								<li>📍 123 Rue de l'Artisanat</li>
							</ul>
						</div>
						<div>
							<h4 className="text-lg font-bold mb-4">
								Suivez-nous
							</h4>
							<div className="flex space-x-4">
								<a
									href="#"
									className="text-gray-300 hover:text-white"
								>
									LinkedIn
								</a>
								<a
									href="#"
									className="text-gray-300 hover:text-white"
								>
									Facebook
								</a>
							</div>
						</div>
					</div>
					<div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
						<p>© 2024 Artisanat Pro. Tous droits réservés.</p>
					</div>
				</div>
			</footer>

			{/* Back to LevisHub */}
			<div className="demo-back-button">
				<Link href="/projets-demo">
					<button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg">
						← Retour
					</button>
				</Link>
			</div>
		</div>
	);
}
