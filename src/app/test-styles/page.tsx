"use client";

import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function TestStyles() {
	return (
		<div className="min-h-screen p-8">
			{/* Header avec toggle de thème */}
			<div className="flex justify-between items-center mb-12">
				<h1 className="text-4xl font-bold text-gradient-cyan">
					Test des Styles
				</h1>
				<ThemeToggle />
			</div>

			{/* Test des gradients de texte */}
			<section className="mb-12">
				<h2 className="text-2xl font-bold text-foreground mb-6">
					Test des Gradients de Texte
				</h2>
				<div className="space-y-4">
					<h3 className="text-3xl font-bold text-gradient-cyan">
						Titre en Cyan/Violet (text-gradient-cyan)
					</h3>
					<h3 className="text-2xl font-bold text-gradient-violet">
						Titre en Violet fixe (text-gradient-violet)
					</h3>
					<p className="text-lg text-foreground">
						Ce texte devrait être en couleur normale (text-foreground)
					</p>
				</div>
			</section>

			{/* Test de la navbar */}
			<section className="mb-12">
				<h2 className="text-2xl font-bold text-foreground mb-6">
					Test de la Navbar
				</h2>
				<div className="bg-neutral-900 p-6 rounded-lg">
					<span className="font-bold text-xl navbar-logo">
						LevisHub
					</span>
					<p className="text-white mt-2">
						Le logo "LevisHub" devrait avoir un gradient adaptatif au thème
					</p>
				</div>
			</section>

			{/* Test des boutons */}
			<section className="mb-12">
				<h2 className="text-2xl font-bold text-foreground mb-6">
					Test des Boutons
				</h2>
				<div className="flex gap-4 flex-wrap">
					<button className="btn-cyan-gradient px-6 py-3 rounded-lg">
						Bouton Cyan/Violet
					</button>
				</div>
			</section>

			{/* Instructions */}
			<section className="bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-6">
				<h2 className="text-2xl font-bold text-foreground mb-4">
					Instructions de Test
				</h2>
				<div className="space-y-2 text-muted-foreground">
					<p>• Utilisez le toggle de thème en haut à droite</p>
					<p>• Vérifiez que "Test des Styles" change de couleur</p>
					<p>• Vérifiez que "LevisHub" a un gradient adaptatif</p>
					<p>• Vérifiez que le bouton s'adapte au thème</p>
				</div>
			</section>

			{/* État des classes CSS */}
			<section className="bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-6 mt-6">
				<h2 className="text-2xl font-bold text-foreground mb-4">
					État des Classes CSS
				</h2>
				<div className="space-y-2 text-sm text-muted-foreground">
					<p>✅ <code>text-gradient-cyan</code> - Définie dans globals.css</p>
					<p>✅ <code>text-gradient-violet</code> - Définie dans globals.css</p>
					<p>✅ <code>navbar-logo</code> - Définie dans globals.css</p>
					<p>✅ <code>btn-cyan-gradient</code> - Définie dans globals.css</p>
					<p>✅ <code>text-foreground</code> - Classe Tailwind par défaut</p>
				</div>
			</section>
		</div>
	);
}
