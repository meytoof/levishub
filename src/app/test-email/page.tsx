"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export default function TestEmailPage() {
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<any>(null);

	const testEmailConnection = async () => {
		setLoading(true);
		setResult(null);

		try {
			const response = await fetch("/api/test-email", {
				method: "GET",
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			setResult(data);
		} catch (error) {
			console.error("Erreur test:", error);
			setResult({
				success: false,
				message: "Erreur lors du test",
				error: error instanceof Error ? error.message : String(error),
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
			<div className="max-w-2xl mx-auto">
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-white mb-4">
						🧪 Test Email Resend
					</h1>
					<p className="text-gray-300">
						Testez la configuration de votre service d'envoi
						d'emails
					</p>
				</div>

				<Card className="bg-white/10 backdrop-blur-lg border-white/20">
					<CardHeader>
						<CardTitle className="text-white">
							Configuration Email
						</CardTitle>
						<CardDescription className="text-gray-300">
							Vérifiez que votre clé API Resend fonctionne
							correctement
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
							<div>
								<p className="text-white font-medium">
									Service
								</p>
								<p className="text-gray-300 text-sm">Resend</p>
							</div>
							<div className="text-right">
								<p className="text-white font-medium">Statut</p>
								<p className="text-gray-300 text-sm">
									✅ Prêt à tester
								</p>
							</div>
						</div>

						<Button
							onClick={testEmailConnection}
							disabled={loading}
							className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
						>
							{loading
								? "Test en cours..."
								: "Tester la connexion"}
						</Button>

						{result && (
							<div
								className={`p-4 rounded-lg ${
									result.success
										? "bg-green-500/20 border border-green-500/30"
										: "bg-red-500/20 border border-red-500/30"
								}`}
							>
								<h3
									className={`font-medium mb-2 ${
										result.success
											? "text-green-300"
											: "text-red-300"
									}`}
								>
									{result.success ? "✅ Succès" : "❌ Échec"}
								</h3>
								<p className="text-gray-300 text-sm mb-2">
									{result.message}
								</p>
								{result.error && (
									<details className="text-gray-400 text-xs">
										<summary className="cursor-pointer">
											Voir les détails
										</summary>
										<pre className="mt-2 p-2 bg-black/20 rounded overflow-auto">
											{JSON.stringify(
												result.error,
												null,
												2
											)}
										</pre>
									</details>
								)}
							</div>
						)}
					</CardContent>
				</Card>

				<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
					<Card className="bg-white/10 backdrop-blur-lg border-white/20">
						<CardHeader>
							<CardTitle className="text-white">
								📧 Emails d'invitation
							</CardTitle>
							<CardDescription className="text-gray-300">
								Envoyés automatiquement lors de la création
								d'invitations
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ul className="text-gray-300 text-sm space-y-2">
								<li>• Template HTML moderne</li>
								<li>• Lien d'invitation sécurisé</li>
								<li>• Expiration automatique</li>
								<li>• Design responsive</li>
							</ul>
						</CardContent>
					</Card>

					<Card className="bg-white/10 backdrop-blur-lg border-white/20">
						<CardHeader>
							<CardTitle className="text-white">
								🎫 Notifications tickets
							</CardTitle>
							<CardDescription className="text-gray-300">
								Alertes pour les mises à jour de tickets
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ul className="text-gray-300 text-sm space-y-2">
								<li>• Nouveaux tickets (admin)</li>
								<li>• Mises à jour de statut</li>
								<li>• Liens directs vers les tickets</li>
								<li>• Design professionnel</li>
							</ul>
						</CardContent>
					</Card>
				</div>

				<div className="mt-8 text-center">
					<p className="text-gray-400 text-sm">
						💡 Conseil : Vérifiez vos logs Resend pour voir les
						emails envoyés
					</p>
				</div>
			</div>
		</div>
	);
}
