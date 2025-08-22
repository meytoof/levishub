"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function TestCSSPage() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<div className="min-h-screen p-8">
			<div className="max-w-4xl mx-auto space-y-8">
				{/* Test avec styles inline */}
				<div className="text-center">
					<h1
						style={{
							background:
								"linear-gradient(135deg, #0891b2, #0e7490, #155e75)",
							backgroundClip: "text",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							color: "transparent",
							fontSize: "2.5rem",
							fontWeight: "bold",
						}}
						className="mb-4"
					>
						🎨 Test CSS avec Styles Inline
					</h1>
					<p className="text-lg text-gray-700">
						Thème actuel : <strong>{theme}</strong>
					</p>
					<div className="flex gap-4 justify-center mt-4">
						<button
							onClick={() => setTheme("light")}
							className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
						>
							Mode Light
						</button>
						<button
							onClick={() => setTheme("dark")}
							className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
						>
							Mode Dark
						</button>
					</div>
				</div>

				{/* Test des classes CSS personnalisées */}
				<div className="space-y-6">
					<h2 className="text-2xl font-bold text-gray-800">
						🧪 Test des Classes CSS Personnalisées
					</h2>

					<div className="grid md:grid-cols-2 gap-6">
						<div className="text-center p-6 bg-gray-100 rounded-lg">
							<h3 className="text-lg font-semibold text-gray-800 mb-2">
								Classe .text-gradient-cyan
							</h3>
							<p className="text-2xl font-bold text-gradient-cyan">
								Texte Cyan
							</p>
						</div>

						<div className="text-center p-6 bg-gray-100 rounded-lg">
							<h3 className="text-lg font-semibold text-gray-800 mb-2">
								Classe .text-gradient-violet
							</h3>
							<p className="text-2xl font-bold text-gradient-violet">
								Texte Violet
							</p>
						</div>
					</div>
				</div>

				{/* Test du background */}
				<div className="p-6 bg-gray-100 rounded-lg">
					<h3 className="text-xl font-bold text-gray-800 mb-3">
						🎨 Test du Background
					</h3>
					<p className="text-gray-700">
						Cette page devrait avoir un fond cyan en mode light et
						sombre en mode dark. Si vous voyez un fond blanc, le CSS
						ne se charge pas.
					</p>
				</div>

				{/* Debug info */}
				<div className="p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
					<h4 className="font-semibold text-yellow-800 mb-2">
						🐛 Informations de Debug
					</h4>
					<ul className="text-sm text-yellow-700 space-y-1">
						<li>• Thème détecté : {theme}</li>
						<li>
							• Classe HTML :{" "}
							{mounted
								? document.documentElement.className
								: "Chargement..."}
						</li>
						<li>• CSS chargé : {mounted ? "Oui" : "Non"}</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
