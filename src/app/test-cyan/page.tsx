"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function TestCyanPage() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<div className="min-h-screen p-8">
			<div className="max-w-4xl mx-auto space-y-8">
				{/* Header */}
				<div className="text-center">
					<h1 className="text-4xl font-bold text-gradient-cyan mb-4">
						🎨 Test de la Charte Graphique Cyan
					</h1>
					<p className="text-muted-foreground text-lg">
						Thème actuel : <strong>{theme}</strong>
					</p>
					<div className="flex gap-4 justify-center mt-4">
						<button
							onClick={() => setTheme("light")}
							className="px-4 py-2 bg-foreground text-background rounded-lg hover:opacity-80"
						>
							Mode Light
						</button>
						<button
							onClick={() => setTheme("dark")}
							className="px-4 py-2 bg-foreground text-background rounded-lg hover:opacity-80"
						>
							Mode Dark
						</button>
						<button
							onClick={() => setTheme("system")}
							className="px-4 py-2 bg-foreground text-background rounded-lg hover:opacity-80"
						>
							Système
						</button>
					</div>
				</div>

				{/* Test des couleurs */}
				<div className="grid md:grid-cols-2 gap-8">
					{/* Couleurs principales */}
					<div className="space-y-4">
						<h2 className="text-2xl font-bold text-foreground">
							🎯 Couleurs Principales
						</h2>

						<div className="space-y-3">
							<div className="p-4 bg-background border border-border rounded-lg">
								<p className="text-foreground font-semibold">
									Background
								</p>
								<p className="text-muted-foreground">
									Couleur de fond principale
								</p>
							</div>

							<div className="p-4 bg-foreground text-background rounded-lg">
								<p className="font-semibold">Foreground</p>
								<p className="opacity-80">
									Couleur de texte principale
								</p>
							</div>

							<div className="p-4 bg-muted rounded-lg">
								<p className="text-foreground font-semibold">
									Muted
								</p>
								<p className="text-muted-foreground">
									Arrière-plan secondaire
								</p>
							</div>
						</div>
					</div>

					{/* Test de contraste */}
					<div className="space-y-4">
						<h2 className="text-2xl font-bold text-foreground">
							📊 Test de Contraste
						</h2>

						<div className="space-y-3">
							<div className="p-4 bg-background-secondary border border-border rounded-lg">
								<p className="text-foreground font-semibold">
									Background Secondary
								</p>
								<p className="text-muted-foreground">
									Test de lisibilité
								</p>
							</div>

							<div className="p-4 bg-accent rounded-lg">
								<p className="text-accent-foreground font-semibold">
									Accent
								</p>
								<p className="text-muted-foreground">
									Arrière-plan d'accent
								</p>
							</div>

							<div className="p-4 bg-card border border-border rounded-lg">
								<p className="text-cardForeground font-semibold">
									Card
								</p>
								<p className="text-muted-foreground">
									Carte avec bordure
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Test des gradients de texte */}
				<div className="bg-muted p-6 rounded-lg">
					<h3 className="text-xl font-bold text-foreground mb-3">
						🌈 Test des Gradients de Texte
					</h3>
					<div className="grid md:grid-cols-2 gap-6">
						<div className="text-center">
							<h4 className="text-lg font-semibold text-foreground mb-2">
								Mode Light (Cyan)
							</h4>
							<p className="text-2xl font-bold text-gradient-cyan">
								Texte en Gradient Cyan
							</p>
							<p className="text-sm text-muted-foreground mt-2">
								#0891b2 → #0e7490 → #155e75
							</p>
						</div>
						<div className="text-center">
							<h4 className="text-lg font-semibold text-foreground mb-2">
								Mode Dark (Violet)
							</h4>
							<p className="text-2xl font-bold text-gradient-violet">
								Texte en Gradient Violet
							</p>
							<p className="text-sm text-muted-foreground mt-2">
								#7c3aed → #8b5cf6 → #a855f7
							</p>
						</div>
					</div>
				</div>

				{/* Informations sur le contraste */}
				<div className="bg-muted p-6 rounded-lg">
					<h3 className="text-xl font-bold text-foreground mb-3">
						ℹ️ Informations sur le Contraste
					</h3>
					<div className="text-muted-foreground space-y-2">
						<p>
							• <strong>Foreground</strong> : Bleu très foncé
							(#0c4a6e) sur fond cyan clair
						</p>
						<p>
							• <strong>Muted Foreground</strong> : Bleu foncé
							(#0369a1) pour contraste élevé
						</p>
						<p>
							• <strong>Ratio de contraste</strong> : Toujours
							supérieur à 3:1 pour la lisibilité
						</p>
						<p>
							• <strong>Thème Light</strong> : Fond cyan plus
							visible avec textes bleus foncés
						</p>
						<p>
							• <strong>Thème Dark</strong> : Fond sombre avec
							textes blancs (inchangé)
						</p>
						<p>
							• <strong>Gradients</strong> : Cyan sombre en light,
							Violet en dark
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
