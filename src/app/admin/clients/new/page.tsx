"use client";

import { StatefulButton } from "@/components/ui/stateful-button";
import { ArrowLeft, Building2, Loader2, Mail } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function NewClientPage() {
	const router = useRouter();
	const { data: session, status } = useSession();
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	// Protection d'authentification
	useEffect(() => {
		if (status === "loading") return; // En cours de chargement

		if (!session) {
			router.push("/login");
			return;
		}

		if (session.user.role !== "ADMIN") {
			router.push("/");
			return;
		}
	}, [session, status, router]);

	// Afficher un loader pendant la vérification
	if (status === "loading") {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Loader2 className="w-8 h-8 animate-spin text-white" />
			</div>
		);
	}

	// Ne pas afficher la page si pas authentifié
	if (!session || session.user.role !== "ADMIN") {
		return null;
	}

	const handleCreateClient = async () => {
		setError("");
		setSuccess("");

		// Récupérer les données du formulaire
		const form = document.querySelector("form") as HTMLFormElement;
		if (!form) {
			toast.error("Formulaire non trouvé");
			return;
		}

		const formData = new FormData(form);
		const clientData = {
			name: formData.get("name") as string,
			companyName: formData.get("companyName") as string,
			primaryEmail: formData.get("primaryEmail") as string,
		};

		// Validation côté client
		if (
			!clientData.name ||
			!clientData.companyName ||
			!clientData.primaryEmail
		) {
			toast.error("Tous les champs obligatoires doivent être remplis");
			return;
		}

		try {
			// Créer le client (l'invitation est créée automatiquement)
			const clientResponse = await fetch("/api/admin/clients", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(clientData),
			});

			if (!clientResponse.ok) {
				const errorData = await clientResponse.json();
				throw new Error(
					errorData.error || "Erreur lors de la création du client"
				);
			}

			const client = await clientResponse.json();

			toast.success(
				"Client créé avec succès ! L'invitation a été envoyée par email."
			);

			// Rediriger vers la liste des clients après 2 secondes
			setTimeout(() => {
				router.push("/admin/clients");
			}, 2000);
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Une erreur est survenue";
			toast.error(errorMessage);
			setError(errorMessage);
			throw err; // Re-throw pour que le StatefulButton reste en état d'erreur
		}
	};

	return (
		<>
			{/* Header avec navigation */}
			<div className="flex items-center justify-between mb-8">
				<div className="flex items-center gap-4">
					<Link href="/admin" className="btn btn-secondary">
						<ArrowLeft className="w-4 h-4" />
						Retour
					</Link>
					<div>
						<h1 className="text-3xl font-bold text-white mb-2">
							Nouveau Client
						</h1>
						<p className="text-[#a0a0a0]">
							Créez un nouveau client et envoyez-lui une
							invitation
						</p>
					</div>
				</div>
			</div>

			{/* Messages d'erreur/succès */}
			{error && (
				<div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
					<p className="text-red-300">{error}</p>
				</div>
			)}

			{success && (
				<div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
					<p className="text-green-300">{success}</p>
				</div>
			)}

			{/* Formulaire de création client */}
			<div className="max-w-2xl mx-auto">
				<div className="card">
					<div className="card-header">
						<h3 className="card-title flex items-center gap-2">
							<Building2 className="w-5 h-5 text-[#3b82f6]" />
							Informations du Client
						</h3>
					</div>
					<div className="card-content">
						<form className="space-y-6">
							{/* Informations entreprise */}
							<div className="space-y-4">
								<h4 className="text-lg font-medium text-white mb-3">
									Entreprise
								</h4>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="form-group">
										<label className="form-label">
											Nom de l'entreprise *
										</label>
										<input
											name="companyName"
											type="text"
											className="form-input"
											placeholder="Ex: Ma Startup SAS"
											required
										/>
									</div>
									<div className="form-group">
										<label className="form-label">
											Site web
										</label>
										<input
											type="url"
											className="form-input"
											placeholder="https://mastartup.com"
										/>
									</div>
								</div>
							</div>

							{/* Informations contact */}
							<div className="space-y-4">
								<h4 className="text-lg font-medium text-white mb-3">
									Contact Principal
								</h4>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="form-group">
										<label className="form-label">
											Nom du contact *
										</label>
										<input
											name="name"
											type="text"
											className="form-input"
											placeholder="Prénom Nom"
											required
										/>
									</div>
									<div className="form-group">
										<label className="form-label">
											Email principal *
										</label>
										<input
											name="primaryEmail"
											type="email"
											className="form-input"
											placeholder="contact@mastartup.com"
											required
										/>
									</div>
								</div>
								<div className="form-group">
									<label className="form-label">
										Téléphone
									</label>
									<input
										type="tel"
										className="form-input"
										placeholder="+33 1 23 45 67 89"
									/>
								</div>
							</div>

							{/* Informations projet */}
							<div className="space-y-4">
								<h4 className="text-lg font-medium text-white mb-3">
									Projet
								</h4>
								<div className="form-group">
									<label className="form-label">
										Description du projet
									</label>
									<textarea
										className="form-input"
										rows={3}
										placeholder="Décrivez brièvement le projet du client..."
									></textarea>
								</div>
								<div className="form-group">
									<label className="form-label">
										Budget estimé
									</label>
									<select className="form-input form-select">
										<option value="">
											Sélectionnez une fourchette
										</option>
										<option value="5000-10000">
											5 000€ - 10 000€
										</option>
										<option value="10000-25000">
											10 000€ - 25 000€
										</option>
										<option value="25000-50000">
											25 000€ - 50 000€
										</option>
										<option value="50000+">50 000€+</option>
									</select>
								</div>
							</div>

							{/* Actions */}
							<div className="flex items-center justify-center gap-4 pt-4">
								<StatefulButton
									onClick={handleCreateClient}
									variant="backoffice"
									className="btn btn-primary btn-lg"
								>
									<Mail className="w-5 h-5" />
									Créer le Client & Envoyer l'Invitation
								</StatefulButton>
							</div>
						</form>
					</div>
				</div>

				{/* Note sur le processus */}
				<div className="mt-6 p-4 bg-[#1a1a1a] border border-[#333] rounded-lg">
					<div className="flex items-start gap-3">
						<Mail className="w-5 h-5 text-[#3b82f6] mt-0.5" />
						<div>
							<h4 className="font-medium text-white mb-2">
								Processus automatique
							</h4>
							<p className="text-sm text-[#a0a0a0]">
								Une fois le client créé, un email d'invitation
								sera automatiquement envoyé. Le client pourra
								créer son compte et accéder à son dashboard. Le
								paiement se fera à la livraison de
								l'application.
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
