"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

interface Product {
	id: number;
	name: string;
	price: number;
	image: string;
	description: string;
}

interface CartItem extends Product {
	quantity: number;
}

const products: Product[] = [
	{
		id: 1,
		name: "Produit Premium",
		price: 99.99,
		image: "/api/placeholder/300/300",
		description: "Un produit exceptionnel de haute qualité",
	},
	{
		id: 2,
		name: "Solution Pro",
		price: 149.99,
		image: "/api/placeholder/300/300",
		description: "Solution professionnelle pour vos besoins",
	},
	{
		id: 3,
		name: "Pack Starter",
		price: 49.99,
		image: "/api/placeholder/300/300",
		description: "Pack de démarrage parfait pour débuter",
	},
	{
		id: 4,
		name: "Édition Limitée",
		price: 199.99,
		image: "/api/placeholder/300/300",
		description: "Édition exclusive en quantité limitée",
	},
];

export default function EcommerceDemo() {
	const [cart, setCart] = useState<CartItem[]>([]);
	const [isCartOpen, setIsCartOpen] = useState(false);

	const addToCart = (product: Product) => {
		setCart((prevCart) => {
			const existingItem = prevCart.find(
				(item) => item.id === product.id
			);
			if (existingItem) {
				return prevCart.map((item) =>
					item.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			}
			return [...prevCart, { ...product, quantity: 1 }];
		});
	};

	const removeFromCart = (productId: number) => {
		setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
	};

	const updateQuantity = (productId: number, quantity: number) => {
		if (quantity <= 0) {
			removeFromCart(productId);
			return;
		}
		setCart((prevCart) =>
			prevCart.map((item) =>
				item.id === productId ? { ...item, quantity } : item
			)
		);
	};

	const cartTotal = cart.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);
	const cartItemCount = cart.reduce(
		(total, item) => total + item.quantity,
		0
	);

	return (
		<div className="demo-container min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50">
			{/* Header */}
			<header className="demo-header demo-nav bg-white shadow-lg border-b border-blue-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<div className="flex justify-between items-center">
						<motion.h1
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							className="text-2xl font-bold text-blue-600"
						>
							MaBoutique
						</motion.h1>
						<nav className="flex items-center space-x-8">
							<a
								href="#"
								className="text-gray-600 hover:text-blue-600 transition-colors"
							>
								Accueil
							</a>
							<a
								href="#"
								className="text-gray-600 hover:text-blue-600 transition-colors"
							>
								Produits
							</a>
							<a
								href="#"
								className="text-gray-600 hover:text-blue-600 transition-colors"
							>
								À propos
							</a>
							<a
								href="#"
								className="text-gray-600 hover:text-blue-600 transition-colors"
							>
								Contact
							</a>
						</nav>
					</div>
				</div>
			</header>

			{/* Cart Sidebar */}
			{isCartOpen && (
				<motion.div
					initial={{ opacity: 0, x: 300 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: 300 }}
					className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 border-l border-gray-200"
				>
					<div className="p-6">
						<div className="flex items-center justify-between mb-6">
							<h3 className="text-xl font-bold text-gray-800">
								Panier
							</h3>
							<button
								onClick={() => setIsCartOpen(false)}
								className="text-gray-500 hover:text-gray-700"
							>
								✕
							</button>
						</div>

						{cart.length === 0 ? (
							<p className="text-gray-500 text-center py-8">
								Votre panier est vide
							</p>
						) : (
							<>
								<div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
									{cart.map((item) => (
										<div
											key={item.id}
											className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
										>
											<div className="w-12 h-12 bg-gradient-to-br from-blue-200 to-violet-200 rounded flex items-center justify-center">
												📦
											</div>
											<div className="flex-1">
												<h4 className="font-medium text-gray-800">
													{item.name}
												</h4>
												<p className="text-sm text-gray-600">
													{item.price.toFixed(2)} €
												</p>
											</div>
											<div className="flex items-center space-x-2">
												<button
													onClick={() =>
														updateQuantity(
															item.id,
															item.quantity - 1
														)
													}
													className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
												>
													-
												</button>
												<span className="w-8 text-center">
													{item.quantity}
												</span>
												<button
													onClick={() =>
														updateQuantity(
															item.id,
															item.quantity + 1
														)
													}
													className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
												>
													+
												</button>
											</div>
											<button
												onClick={() =>
													removeFromCart(item.id)
												}
												className="text-red-500 hover:text-red-700"
											>
												✕
											</button>
										</div>
									))}
								</div>

								<div className="border-t pt-4">
									<div className="flex justify-between items-center mb-4">
										<span className="font-bold text-gray-800">
											Total:
										</span>
										<span className="font-bold text-xl text-blue-600">
											{cartTotal.toFixed(2)} €
										</span>
									</div>
									<button className="w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-violet-700 transition-all duration-200">
										Commander
									</button>
								</div>
							</>
						)}
					</div>
				</motion.div>
			)}

			{/* Hero Section */}
			<section className="py-20 text-center">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="max-w-4xl mx-auto px-4"
				>
					<h2 className="text-5xl md:text-7xl font-bold mb-6">
						<span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
							Boutique
						</span>
						<br />
						<span className="text-gray-800">Moderne</span>
					</h2>
					<p className="text-xl text-gray-600 mb-8">
						Découvrez nos produits exceptionnels avec une expérience
						d'achat fluide
					</p>
				</motion.div>
			</section>

			{/* Products Grid */}
			<section className="py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.h3
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="text-3xl font-bold text-center mb-16 text-gray-800"
					>
						Nos <span className="text-blue-600">Produits</span>
					</motion.h3>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
						{products.map((product, index) => (
							<motion.div
								key={product.id}
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.6,
									delay: 0.4 + index * 0.1,
								}}
								whileHover={{ y: -10, scale: 1.02 }}
								className="group"
							>
								<div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
									<div className="h-48 bg-gradient-to-br from-blue-100 to-violet-100 flex items-center justify-center">
										<span className="text-blue-600 text-sm">
											Image du produit
										</span>
									</div>
									<div className="p-6">
										<h4 className="text-xl font-bold mt-2 mb-3 text-gray-800">
											{product.name}
										</h4>
										<p className="text-gray-600 mb-4">
											{product.description}
										</p>
										<div className="flex items-center justify-between">
											<span className="text-2xl font-bold text-blue-600">
												{product.price.toFixed(2)} €
											</span>
											<button
												onClick={() =>
													addToCart(product)
												}
												className="px-6 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg hover:from-blue-700 hover:to-violet-700 transition-all duration-200 hover:scale-105"
											>
												Ajouter au panier
											</button>
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="demo-footer bg-white border-t border-gray-200 py-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<p className="text-gray-600 mb-4">
						© 2024 MaBoutique. Tous droits réservés.
					</p>
					<div className="flex justify-center space-x-6">
						<a
							href="#"
							className="text-gray-600 hover:text-blue-600 transition-colors"
						>
							CGV
						</a>
						<a
							href="#"
							className="text-gray-600 hover:text-blue-600 transition-colors"
						>
							Mentions légales
						</a>
						<a
							href="#"
							className="text-gray-600 hover:text-blue-600 transition-colors"
						>
							Contact
						</a>
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
