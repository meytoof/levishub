"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const articles = [
	{
		id: 1,
		title: "Les tendances du design web en 2024",
		excerpt:
			"Découvrez les nouvelles approches créatives qui façonnent le web moderne et transforment l'expérience utilisateur.",
		author: "Marie Dubois",
		date: "15 janvier 2024",
		category: "Design",
		readTime: "5 min",
		image: "/api/placeholder/400/250",
	},
	{
		id: 2,
		title: "Comment optimiser votre SEO naturel",
		excerpt:
			"Guide complet pour améliorer votre visibilité sur les moteurs de recherche et attirer plus de trafic qualifié.",
		author: "Pierre Martin",
		date: "12 janvier 2024",
		category: "SEO",
		readTime: "8 min",
		image: "/api/placeholder/400/250",
	},
	{
		id: 3,
		title: "L'importance de l'accessibilité web",
		excerpt:
			"Pourquoi créer des sites web accessibles à tous est essentiel pour l'inclusion numérique et l'expérience utilisateur.",
		author: "Sophie Bernard",
		date: "10 janvier 2024",
		category: "Accessibilité",
		readTime: "6 min",
		image: "/api/placeholder/400/250",
	},
];

const categories = [
	"Tous",
	"Design",
	"Développement",
	"SEO",
	"Accessibilité",
	"Marketing",
];

export default function BlogDemo() {
	return (
		<div className="demo-container min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
			{/* Header */}
			<header className="demo-header demo-nav bg-white shadow-sm border-b border-amber-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="flex items-center justify-between">
						<motion.h1
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							className="text-2xl font-bold text-amber-800"
						>
							Magazine Web
						</motion.h1>
						<nav className="flex items-center space-x-8">
							<a
								href="#"
								className="text-amber-700 hover:text-amber-900 transition-colors"
							>
								Accueil
							</a>
							<a
								href="#"
								className="text-amber-700 hover:text-amber-900 transition-colors"
							>
								Articles
							</a>
							<a
								href="#"
								className="text-amber-700 hover:text-amber-900 transition-colors"
							>
								À propos
							</a>
							<a
								href="#"
								className="text-amber-700 hover:text-amber-900 transition-colors"
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
					<h2 className="text-5xl md:text-7xl font-bold mb-6 text-amber-800">
						<span className="text-orange-600">Magazine</span>
						<br />
						Web
					</h2>
					<p className="text-xl text-amber-700 mb-8">
						Découvrez les dernières tendances et conseils du monde
						du web
					</p>
					<div className="flex justify-center space-x-4">
						<button className="px-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all duration-200 hover:scale-105">
							Lire les articles
						</button>
						<button className="px-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all duration-200">
							S'abonner
						</button>
					</div>
				</motion.div>
			</section>

			{/* Categories */}
			<section className="py-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-wrap justify-center gap-4">
						{categories.map((category, index) => (
							<motion.button
								key={category}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.6,
									delay: 0.2 + index * 0.1,
								}}
								className={`px-6 py-2 rounded-full transition-all duration-200 ${
									category === "Tous"
										? "bg-amber-600 text-white"
										: "bg-white text-amber-700 hover:bg-amber-100 border border-amber-200"
								}`}
							>
								{category}
							</motion.button>
						))}
					</div>
				</div>
			</section>

			{/* Featured Articles */}
			<section className="py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.h3
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="text-3xl font-bold text-center mb-16 text-amber-800"
					>
						Articles{" "}
						<span className="text-orange-600">À la Une</span>
					</motion.h3>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{articles.map((article, index) => (
							<motion.article
								key={article.id}
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.6,
									delay: 0.6 + index * 0.1,
								}}
								whileHover={{ y: -10, scale: 1.02 }}
								className="group"
							>
								<div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-100">
									<div className="h-48 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
										<span className="text-amber-600 text-sm">
											Image de l'article
										</span>
									</div>
									<div className="p-6">
										<div className="flex items-center justify-between mb-3">
											<span className="text-sm font-medium text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
												{article.category}
											</span>
											<span className="text-sm text-amber-500">
												{article.readTime}
											</span>
										</div>
										<h4 className="text-xl font-bold mb-3 text-amber-800 group-hover:text-orange-600 transition-colors">
											{article.title}
										</h4>
										<p className="text-amber-700 mb-4 leading-relaxed">
											{article.excerpt}
										</p>
										<div className="flex items-center justify-between">
											<div className="text-sm text-amber-600">
												<p className="font-medium">
													{article.author}
												</p>
												<p>{article.date}</p>
											</div>
											<button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all duration-200 hover:scale-105">
												Lire l'article
											</button>
										</div>
									</div>
								</div>
							</motion.article>
						))}
					</div>
				</div>
			</section>

			{/* Newsletter Section */}
			<section className="py-20 bg-gradient-to-r from-amber-600 to-orange-600">
				<div className="max-w-4xl mx-auto text-center px-4">
					<motion.h3
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 1.0 }}
						className="text-3xl font-bold mb-6 text-white"
					>
						Restez informé !
					</motion.h3>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 1.2 }}
						className="text-xl text-amber-100 mb-8"
					>
						Recevez nos derniers articles et conseils directement
						dans votre boîte mail.
					</motion.p>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 1.4 }}
						className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
					>
						<input
							type="email"
							placeholder="Votre email"
							className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-opacity-50"
						/>
						<button className="px-6 py-3 bg-white text-amber-600 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-105 font-medium">
							S'abonner
						</button>
					</motion.div>
				</div>
			</section>

			{/* About Section */}
			<section className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8, delay: 1.6 }}
						>
							<h3 className="text-3xl font-bold mb-6 text-amber-800">
								À propos de{" "}
								<span className="text-orange-600">
									Magazine Web
								</span>
							</h3>
							<p className="text-amber-700 mb-6 leading-relaxed">
								Magazine Web est une publication dédiée aux
								professionnels et passionnés du développement
								web, du design et du marketing digital.
							</p>
							<p className="text-amber-700 leading-relaxed">
								Notre équipe d'experts partage ses connaissances
								et expériences pour vous aider à rester à la
								pointe de la technologie web.
							</p>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8, delay: 1.8 }}
							className="bg-gradient-to-br from-amber-100 to-orange-100 h-80 rounded-xl flex items-center justify-center"
						>
							<span className="text-amber-600 text-lg">
								Image de l'équipe
							</span>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="demo-footer bg-amber-800 text-white py-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						<div>
							<h4 className="text-lg font-bold mb-4">
								Magazine Web
							</h4>
							<p className="text-amber-200">
								Votre source d'inspiration pour le développement
								web moderne.
							</p>
						</div>
						<div>
							<h4 className="text-lg font-bold mb-4">
								Catégories
							</h4>
							<ul className="space-y-2 text-amber-200">
								<li>Design</li>
								<li>Développement</li>
								<li>SEO</li>
								<li>Marketing</li>
							</ul>
						</div>
						<div>
							<h4 className="text-lg font-bold mb-4">Contact</h4>
							<ul className="space-y-2 text-amber-200">
								<li>📧 contact@magazineweb.fr</li>
								<li>📞 01 23 45 67 89</li>
								<li>📍 123 Rue du Web</li>
							</ul>
						</div>
						<div>
							<h4 className="text-lg font-bold mb-4">
								Suivez-nous
							</h4>
							<div className="flex space-x-4">
								<a
									href="#"
									className="text-amber-200 hover:text-white"
								>
									LinkedIn
								</a>
								<a
									href="#"
									className="text-amber-200 hover:text-white"
								>
									Twitter
								</a>
								<a
									href="#"
									className="text-amber-200 hover:text-white"
								>
									Facebook
								</a>
							</div>
						</div>
					</div>
					<div className="border-t border-amber-700 mt-8 pt-8 text-center text-amber-200">
						<p>© 2024 Magazine Web. Tous droits réservés.</p>
					</div>
				</div>
			</footer>

			{/* Back to LevisHub */}
			<div className="demo-back-button">
				<Link href="/projets-demo">
					<button className="px-4 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-all duration-200 shadow-lg">
						← Retour
					</button>
				</Link>
			</div>
		</div>
	);
}
