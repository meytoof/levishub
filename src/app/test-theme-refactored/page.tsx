"use client";

import {
	ThemeBadge,
	ThemeButton,
	ThemeCard,
	ThemeProcessStep,
	ThemeText,
} from "@/components/ui/theme-components";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function TestThemeRefactored() {
	return (
		<div className="min-h-screen p-8">
			{/* Header avec toggle de thème */}
			<div className="flex justify-between items-center mb-12">
				<h1 className="text-4xl font-bold text-gradient-cyan">
					Test du Système Refactorisé
				</h1>
				<ThemeToggle />
			</div>

			{/* Test des composants ThemeText */}
			<section className="mb-12">
				<h2 className="text-2xl font-bold text-foreground mb-6">
					Composants ThemeText
				</h2>
				<div className="space-y-4">
					<ThemeText variant="auto" className="text-3xl">
						Auto - S'adapte au thème (Cyan/Violet)
					</ThemeText>
					<ThemeText variant="cyan" className="text-2xl">
						Cyan fixe
					</ThemeText>
					<ThemeText variant="violet" className="text-2xl">
						Violet fixe
					</ThemeText>
				</div>
			</section>

			{/* Test des composants ThemeButton */}
			<section className="mb-12">
				<h2 className="text-2xl font-bold text-foreground mb-6">
					Composants ThemeButton
				</h2>
				<div className="flex gap-4 flex-wrap">
					<ThemeButton variant="primary" size="sm">
						Petit
					</ThemeButton>
					<ThemeButton variant="primary" size="md">
						Moyen
					</ThemeButton>
					<ThemeButton variant="primary" size="lg">
						Grand
					</ThemeButton>
					<ThemeButton variant="secondary" size="md">
						Secondaire
					</ThemeButton>
					<ThemeButton href="/contact" variant="primary" size="md">
						Lien
					</ThemeButton>
				</div>
			</section>

			{/* Test des composants ThemeCard */}
			<section className="mb-12">
				<h2 className="text-2xl font-bold text-foreground mb-6">
					Composants ThemeCard
				</h2>
				<div className="grid md:grid-cols-3 gap-6">
					<ThemeCard shadow={1}>
						<h3 className="text-xl font-bold text-foreground mb-2">
							Carte avec ombre 1
						</h3>
						<p className="text-muted-foreground">
							Ombre cyan en light, violet en dark
						</p>
					</ThemeCard>
					<ThemeCard shadow={2}>
						<h3 className="text-xl font-bold text-foreground mb-2">
							Carte avec ombre 2
						</h3>
						<p className="text-muted-foreground">
							Ombre cyan en light, violet en dark
						</p>
					</ThemeCard>
					<ThemeCard shadow={3}>
						<h3 className="text-xl font-bold text-foreground mb-2">
							Carte avec ombre 3
						</h3>
						<p className="text-muted-foreground">
							Ombre cyan en light, violet en dark
						</p>
					</ThemeCard>
				</div>
			</section>

			{/* Test des composants ThemeBadge */}
			<section className="mb-12">
				<h2 className="text-2xl font-bold text-foreground mb-6">
					Composants ThemeBadge
				</h2>
				<div className="flex gap-4 flex-wrap">
					<ThemeBadge variant="popular">⭐ Populaire</ThemeBadge>
					<ThemeBadge variant="limited">🔥 Offre Limitée</ThemeBadge>
					<ThemeBadge variant="tech1">Badge Tech 1</ThemeBadge>
					<ThemeBadge variant="tech2">Badge Tech 2</ThemeBadge>
				</div>
			</section>

			{/* Test des composants ThemeProcessStep */}
			<section className="mb-12">
				<h2 className="text-2xl font-bold text-foreground mb-6">
					Composants ThemeProcessStep
				</h2>
				<div className="grid md:grid-cols-3 gap-8">
					<ThemeProcessStep
						number={1}
						title="Diagnostic"
						description="Analyse de vos besoins"
					/>
					<ThemeProcessStep
						number={2}
						title="Conception"
						description="Design et développement"
					/>
					<ThemeProcessStep
						number={3}
						title="Lancement"
						description="Mise en ligne"
						showLine={false}
					/>
				</div>
			</section>

			{/* Test des classes CSS directes */}
			<section className="mb-12">
				<h2 className="text-2xl font-bold text-foreground mb-6">
					Classes CSS Directes
				</h2>
				<div className="space-y-6">
					{/* Textes */}
					<div>
						<h3 className="text-xl font-bold text-foreground mb-3">
							Textes
						</h3>
						<div className="space-y-2">
							<h4 className="text-gradient-cyan text-2xl">
								Titre en Cyan/Violet
							</h4>
							<h4 className="text-gradient-violet text-xl">
								Sous-titre en Violet
							</h4>
						</div>
					</div>

					{/* Boutons */}
					<div>
						<h3 className="text-xl font-bold text-foreground mb-3">
							Boutons
						</h3>
						<div className="flex gap-4 flex-wrap">
							<button className="btn-cyan-gradient px-6 py-3 rounded-lg">
								Bouton Cyan/Violet
							</button>
						</div>
					</div>

					{/* Processus */}
					<div>
						<h3 className="text-xl font-bold text-foreground mb-3">
							Processus
						</h3>
						<div className="grid md:grid-cols-3 gap-8">
							<div className="text-center">
								<div className="w-20 h-20 mx-auto mb-4 process-circle-1 rounded-full flex items-center justify-center text-2xl text-white font-bold">
									1
								</div>
								<h4 className="text-lg font-bold text-foreground">
									Étape 1
								</h4>
								<div className="h-1 w-full process-line-1 rounded-full mt-4"></div>
							</div>
							<div className="text-center">
								<div className="w-20 h-20 mx-auto mb-4 process-circle-2 rounded-full flex items-center justify-center text-2xl text-white font-bold">
									2
								</div>
								<h4 className="text-lg font-bold text-foreground">
									Étape 2
								</h4>
								<div className="h-1 w-full process-line-2 rounded-full mt-4"></div>
							</div>
							<div className="text-center">
								<div className="w-20 h-20 mx-auto mb-4 process-circle-3 rounded-full flex items-center justify-center text-2xl text-white font-bold">
									3
								</div>
								<h4 className="text-lg font-bold text-foreground">
									Étape 3
								</h4>
							</div>
						</div>
					</div>

					{/* Ombres */}
					<div>
						<h3 className="text-xl font-bold text-foreground mb-3">
							Ombres
						</h3>
						<div className="grid md:grid-cols-3 gap-6">
							<div className="p-6 bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl feature-shadow-1">
								<h4 className="text-lg font-bold text-foreground mb-2">
									Ombre 1
								</h4>
								<p className="text-muted-foreground">
									Cyan en light, violet en dark
								</p>
							</div>
							<div className="p-6 bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl feature-shadow-2">
								<h4 className="text-lg font-bold text-foreground mb-2">
									Ombre 2
								</h4>
								<p className="text-muted-foreground">
									Cyan en light, violet en dark
								</p>
							</div>
							<div className="p-6 bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl feature-shadow-3">
								<h4 className="text-lg font-bold text-foreground mb-2">
									Ombre 3
								</h4>
								<p className="text-muted-foreground">
									Cyan en light, violet en dark
								</p>
							</div>
						</div>
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
					<p>
						• Vérifiez que les couleurs changent entre cyan (light)
						et violet (dark)
					</p>
					<p>• Tous les composants s'adaptent automatiquement</p>
					<p>
						• Les contrastes restent lisibles dans les deux thèmes
					</p>
					<p>
						• Le code est maintenant plus maintenable et
						réutilisable
					</p>
				</div>
			</section>

			{/* Avantages du nouveau système */}
			<section className="bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-6 mt-6">
				<h2 className="text-2xl font-bold text-foreground mb-4">
					🎯 Avantages du Nouveau Système
				</h2>
				<div className="grid md:grid-cols-2 gap-6">
					<div>
						<h3 className="text-lg font-bold text-foreground mb-3 text-red-400">
							❌ Avant (Spaghetti Code)
						</h3>
						<ul className="space-y-1 text-sm text-muted-foreground">
							<li>• Duplication de code CSS</li>
							<li>• Sélecteurs html.dark partout</li>
							<li>• Difficile à maintenir</li>
							<li>• Risque d'incohérences</li>
						</ul>
					</div>
					<div>
						<h3 className="text-lg font-bold text-foreground mb-3 text-green-400">
							✅ Après (Code Propre)
						</h3>
						<ul className="space-y-1 text-sm text-muted-foreground">
							<li>• Variables CSS centralisées</li>
							<li>• Classes réutilisables</li>
							<li>• Composants React typés</li>
							<li>• Maintenance facilitée</li>
							<li>• Cohérence garantie</li>
						</ul>
					</div>
				</div>
			</section>
		</div>
	);
}
