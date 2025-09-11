"use client";

import { ArrowRight, Clock, Sparkles, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { PulseCTA } from "./PulseCTA";

interface LimitedOfferProps {
	remainingSlots: number;
	totalSlots: number;
}

export function LimitedOffer({
	remainingSlots,
	totalSlots,
}: LimitedOfferProps) {
	const [count, setCount] = useState(remainingSlots);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		// Animation d'entrée
		setTimeout(() => setIsVisible(true), 500);

		// Animation du compteur
		const timer = setInterval(() => {
			setCount((prev) => {
				if (prev > 0) {
					return prev - 1;
				}
				return prev;
			});
		}, 100);

		return () => clearInterval(timer);
	}, [remainingSlots]);

	const percentage = ((totalSlots - remainingSlots) / totalSlots) * 100;
	const urgencyLevel =
		remainingSlots <= 3 ? "high" : remainingSlots <= 7 ? "medium" : "low";

	const getUrgencyColor = () => {
		switch (urgencyLevel) {
			case "high":
				return "from-red-500 to-rose-500";
			case "medium":
				return "from-orange-500 to-red-500";
			default:
				return "from-cyan-500 to-blue-600";
		}
	};

	const getUrgencyMessage = () => {
		switch (urgencyLevel) {
			case "high":
				return "⚡ Dernières places !";
			case "medium":
				return "🔥 Plus que quelques places !";
			default:
				return "🎯 Offre en cours";
		}
	};

	return (
		<div
			className={`transition-all duration-1000 relative pt-6 ${
				isVisible
					? "opacity-100 translate-y-0"
					: "opacity-0 translate-y-8"
			}`}
		>
			{/* Badge promotionnel - Positionné comme le badge "Populaire" */}
			<div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-20">
				<span className="pricing-badge-limited text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg animate-pulse block text-center whitespace-nowrap">
					🔥 OFFRE LIMITÉE -20%
				</span>
			</div>

			<div className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto relative overflow-visible mx-4 sm:mx-auto">
				{/* Effet de brillance en arrière-plan */}
				<div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/5 to-rose-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
				<div className="text-center mb-6 sm:mb-8 px-2">
					<Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-cyan-400 mx-auto mb-3 sm:mb-4" />
					<h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">
						🎁 Offre de lancement exclusive
					</h2>
					<p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
						Pour célébrer le lancement de LevisWeb, nous offrons une
						réduction de{" "}
						<strong className="text-cyan-400">20%</strong> sur la
						création de votre site web aux{" "}
						<strong className="text-cyan-400">
							10 premiers clients
						</strong>{" "}
						!
					</p>
				</div>

				{/* Compteur des premiers clients */}
				<div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center mb-6 sm:mb-8 px-2">
					<div className="text-center">
						<div className="mb-4">
							<Users className="w-12 h-12 text-cyan-400 mx-auto mb-2" />
							<h3 className="text-xl font-semibold text-foreground mb-2">
								Premiers clients
							</h3>
						</div>

						{/* Compteur animé */}
						<div className="text-6xl font-bold text-gradient-cyan mb-2">
							{count}
						</div>

						<p className="text-muted-foreground">
							sur {totalSlots} clients éligibles
						</p>

						{/* Barre de progression */}
						<div className="w-full bg-neutral-700 rounded-full h-3 mt-4">
							<div
								className={`h-3 rounded-full bg-gradient-to-r ${getUrgencyColor()} transition-all duration-1000`}
								style={{ width: `${percentage}%` }}
							/>
						</div>
						<p className="text-xs text-muted-foreground mt-2">
							{totalSlots - remainingSlots} clients déjà inscrits
						</p>
					</div>

					<div className="text-center">
						<div className="mb-4">
							<Clock className="w-12 h-12 text-cyan-400 mx-auto mb-2" />
							<h3 className="text-xl font-semibold text-foreground mb-2">
								État de l&apos;offre
							</h3>
						</div>

						<div
							className={`text-2xl font-bold mb-2 ${
								urgencyLevel === "high"
									? "text-red-400"
									: urgencyLevel === "medium"
									? "text-orange-400"
									: "text-cyan-400"
							}`}
						>
							{getUrgencyMessage()}
						</div>

						<div className="space-y-2 text-sm text-muted-foreground">
							{urgencyLevel === "high" && (
								<>
									<p>🚨 Plus que {remainingSlots} places !</p>
									<p>⏰ Cette offre se termine bientôt</p>
								</>
							)}
							{urgencyLevel === "medium" && (
								<>
									<p>🔥 Plus que {remainingSlots} places !</p>
									<p>💡 Réservez vite votre place</p>
								</>
							)}
							{urgencyLevel === "low" && (
								<>
									<p>
										🎯 {remainingSlots} places encore
										disponibles
									</p>
									<p>✨ Profitez de cette offre exclusive</p>
								</>
							)}
						</div>
					</div>
				</div>

				{/* Avantages de l'offre */}
				<div className="bg-white/5 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 mx-2">
					<h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4 text-center">
						✨ Ce que vous obtenez avec cette offre
					</h3>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						<div className="text-center">
							<div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-2">
								<span className="text-2xl">💰</span>
							</div>
							<h4 className="font-semibold text-foreground mb-1">
								-20% sur la création
							</h4>
							<p className="text-sm text-muted-foreground">
								Économies garanties
							</p>
						</div>
						<div className="text-center">
							<div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-2">
								<span className="text-2xl">🎯</span>
							</div>
							<h4 className="font-semibold text-foreground mb-1">
								Priorité absolue
							</h4>
							<p className="text-sm text-muted-foreground">
								Votre projet en premier
							</p>
						</div>
						<div className="text-center">
							<div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-2">
								<span className="text-2xl">🎁</span>
							</div>
							<h4 className="font-semibold text-foreground mb-1">
								Bonus exclusifs
							</h4>
							<p className="text-sm text-muted-foreground">
								Formation offerte
							</p>
						</div>
					</div>
				</div>

				{/* CTA principal */}
				<div className="text-center px-2">
					<PulseCTA
						href="/contact?offer=limited"
						variant="primary"
						size="lg"
						className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 btn-cyan-gradient w-full sm:w-auto max-w-xs"
					>
						<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
						Réserver mon créneau -20%
					</PulseCTA>

					<p className="text-xs sm:text-sm text-muted-foreground mt-3">
						💡 Offre limitée aux {totalSlots} premiers clients
						uniquement
					</p>
				</div>
			</div>
		</div>
	);
}
