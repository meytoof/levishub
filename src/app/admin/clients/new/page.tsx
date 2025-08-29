import { authOptions } from "@/lib/auth";
import { ArrowLeft, Building2, CheckCircle, Mail } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NewClientPage() {
	const session = await getServerSession(authOptions);
	if (!session) redirect("/login");
	if (session.user.role !== "ADMIN") redirect("/");

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
								<button
									type="submit"
									className="btn btn-primary btn-lg"
								>
									<CheckCircle className="w-5 h-5" />
									Créer le Client & Envoyer l'Invitation
								</button>
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
