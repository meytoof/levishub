"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DebugThemePage() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme, resolvedTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return <div>Chargement...</div>;

	return (
		<div className="min-h-screen p-8">
			<div className="max-w-2xl mx-auto space-y-6">
				<h1 className="text-3xl font-bold">Debug Thème</h1>

				<div className="p-4 border rounded">
					<h2 className="text-xl font-semibold mb-2">
						État du thème
					</h2>
					<p>
						Thème sélectionné: <strong>{theme}</strong>
					</p>
					<p>
						Thème résolu: <strong>{resolvedTheme}</strong>
					</p>
					<p>
						Mounted: <strong>{mounted ? "Oui" : "Non"}</strong>
					</p>
				</div>

				<div className="p-4 border rounded">
					<h2 className="text-xl font-semibold mb-2">
						Changer le thème
					</h2>
					<div className="space-x-2">
						<button
							onClick={() => setTheme("light")}
							className="px-4 py-2 bg-blue-500 text-white rounded"
						>
							Light
						</button>
						<button
							onClick={() => setTheme("dark")}
							className="px-4 py-2 bg-gray-800 text-white rounded"
						>
							Dark
						</button>
						<button
							onClick={() => setTheme("system")}
							className="px-4 py-2 bg-green-500 text-white rounded"
						>
							System
						</button>
					</div>
				</div>

				<div className="p-4 border rounded">
					<h2 className="text-xl font-semibold mb-2">
						Test des couleurs
					</h2>
					<div className="grid grid-cols-2 gap-4">
						<div className="p-4 bg-white border rounded">
							<p className="text-black">Fond blanc, texte noir</p>
						</div>
						<div className="p-4 bg-black border rounded">
							<p className="text-white">Fond noir, texte blanc</p>
						</div>
					</div>
				</div>

				<div className="p-4 border rounded">
					<h2 className="text-xl font-semibold mb-2">Console</h2>
					<p>Ouvrez la console du navigateur pour voir les logs</p>
					<button
						onClick={() => {
							console.log("Theme:", theme);
							console.log("ResolvedTheme:", resolvedTheme);
							console.log(
								"Document classes:",
								document.documentElement.className
							);
						}}
						className="px-4 py-2 bg-yellow-500 text-black rounded"
					>
						Log dans la console
					</button>
				</div>
			</div>
		</div>
	);
}
