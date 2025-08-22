"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function TestThemeComplete() {
	return (
		<div className="min-h-screen p-8">
			{/* Header avec toggle de thème */}
			<div className="flex justify-between items-center mb-12">
				<h1 className="text-4xl font-bold text-gradient-cyan">
					Test Complet des Thèmes
				</h1>
				<ThemeToggle />
			</div>

			{/* Test des gradients de texte */}
			<section className="mb-12">
				<h2 className="text-2xl font-bold text-foreground mb-6">
					Gradients de Texte
				</h2>
				<div className="space-y-4">
					<h3 className="text-3xl font-bold text-gradient-cyan">
						Titre en Cyan (Light) / Violet (Dark)
					</h3>
					<h3 className="text-3xl font-bold text-gradient-violet">
						Titre en Violet (fixe)
					</h3>
					<p className="text-xl text-foreground">
						Texte normal adaptatif
					</p>
				</div>
			</section>

			{/* Test des boutons */}
			<section className="mb-12">
				<h2 className="text-2xl font-bold text-foreground mb-6">
					Boutons
				</h2>
				<div className="flex gap-4 flex-wrap">
					<Button className="btn-cyan-gradient">
						Bouton Cyan/Violet
					</Button>
					<Button variant="outline">Bouton Outline</Button>
					<Button variant="secondary">Bouton Secondary</Button>
				</div>
			</section>

			{/* Test des cartes avec ombres */}
			<section className="mb-12">
				<h2 className="text-2xl font-bold text-foreground mb-6">
					Cartes avec Ombres
				</h2>
				<div className="grid md:grid-cols-3 gap-6">
					<div className="p-6 bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl feature-shadow-1">
						<h3 className="text-xl font-bold text-foreground mb-2">
							Carte 1
						</h3>
						<p className="text-muted-foreground">
							Ombre cyan en light, violet en dark
						</p>
					</div>
					<div className="p-6 bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl feature-shadow-2">
						<h3 className="text-xl font-bold text-foreground mb-2">
							Carte 2
						</h3>
						<p className="text-muted-foreground">
							Ombre cyan en light, violet en dark
						</p>
					</div>
					<div className="p-6 bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl feature-shadow-3">
						<h3 className="text-xl font-bold text-foreground mb-2">
							Carte 3
						</h3>
						<p className="text-muted-foreground">
							Ombre cyan en light, violet en dark
						</p>
					</div>
				</div>
			</section>

			{/* Test des badges */}
			<section className="mb-12">
				<h2 className="text-2xl font-bold text-foreground mb-6">
					Badges
				</h2>
				<div className="flex gap-4 flex-wrap">
					<span className="pricing-badge-popular text-white px-4 py-2 rounded-full text-sm font-semibold">
						⭐ Populaire
					</span>
					<span className="pricing-badge-limited text-white px-4 py-2 rounded-full text-sm font-semibold">
						🔥 Offre Limitée
					</span>
					<span className="px-4 py-2 rounded-full text-sm font-semibold badge-tech-1">
						Badge Tech 1
					</span>
					<span className="px-4 py-2 rounded-full text-sm font-semibold badge-tech-2">
						Badge Tech 2
					</span>
				</div>
			</section>

			{/* Test des éléments de processus */}
			<section className="mb-12">
				<h2 className="text-2xl font-bold text-foreground mb-6">
					Éléments de Processus
				</h2>
				<div className="grid md:grid-cols-3 gap-8">
					<div className="text-center">
						<div className="w-20 h-20 mx-auto mb-4 process-circle-1 rounded-full flex items-center justify-center text-2xl text-white font-bold">
							1
						</div>
						<h3 className="text-xl font-bold text-foreground mb-2">
							Étape 1
						</h3>
						<div className="h-1 w-full process-line-1 rounded-full"></div>
					</div>
					<div className="text-center">
						<div className="w-20 h-20 mx-auto mb-4 process-circle-2 rounded-full flex items-center justify-center text-2xl text-white font-bold">
							2
						</div>
						<h3 className="text-xl font-bold text-foreground mb-2">
							Étape 2
						</h3>
						<div className="h-1 w-full process-line-2 rounded-full"></div>
					</div>
					<div className="text-center">
						<div className="w-20 h-20 mx-auto mb-4 process-circle-3 rounded-full flex items-center justify-center text-2xl text-white font-bold">
							3
						</div>
						<h3 className="text-xl font-bold text-foreground mb-2">
							Étape 3
						</h3>
					</div>
				</div>
			</section>

			{/* Test des options de quiz */}
			<section className="mb-12">
				<h2 className="text-2xl font-bold text-foreground mb-6">
					Options de Quiz
				</h2>
				<div className="space-y-3 max-w-md">
					<button className="w-full p-4 border border-neutral-500/30 rounded-lg text-left quiz-option-hover hover:bg-white/5 transition-all duration-200">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-lg flex items-center justify-center">
								🎯
							</div>
							<span className="text-foreground font-medium">
								Option 1
							</span>
						</div>
					</button>
					<button className="w-full p-4 border border-neutral-500/30 rounded-lg text-left quiz-option-hover hover:bg-white/5 transition-all duration-200">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-lg flex items-center justify-center">
								⚡
							</div>
							<span className="text-foreground font-medium">
								Option 2
							</span>
						</div>
					</button>
				</div>
			</section>

			{/* Test des cartes de tarifs */}
			<section className="mb-12">
				<h2 className="text-2xl font-bold text-foreground mb-6">
					Cartes de Tarifs
				</h2>
				<div className="grid md:grid-cols-3 gap-6">
					<div className="p-6 bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl pricing-card-basic">
						<h3 className="text-xl font-bold text-white mb-2">
							Basic
						</h3>
						<p className="text-white/80">
							Carte avec gradient cyan/violet
						</p>
					</div>
					<div className="p-6 bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl pricing-card-pro">
						<h3 className="text-xl font-bold text-white mb-2">
							Pro
						</h3>
						<p className="text-white/80">
							Carte avec gradient cyan/violet
						</p>
					</div>
					<div className="p-6 bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl pricing-card-enterprise">
						<h3 className="text-xl font-bold text-white mb-2">
							Enterprise
						</h3>
						<p className="text-white/80">
							Carte avec gradient cyan/violet
						</p>
					</div>
				</div>
			</section>

			{/* Instructions */}
			<section className="bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-6">
				<h2 className="text-2xl font-bold text-foreground mb-4">
					Instructions de Test
				</h2>
				<div className="space-y-2 text-muted-foreground">
					<p>• Utilisez le toggle de thème en haut à droite</p>
					<p>• Vérifiez que les couleurs changent entre cyan (light) et violet (dark)</p>
					<p>• Tous les éléments doivent s'adapter automatiquement</p>
					<p>• Les contrastes doivent rester lisibles dans les deux thèmes</p>
				</div>
			</section>
		</div>
	);
}
