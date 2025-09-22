"use client";

import { Eye, EyeOff, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function SecuritySettings() {
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [submitting, setSubmitting] = useState(false);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!currentPassword || !newPassword || !confirmPassword) {
			toast.error("Veuillez remplir tous les champs");
			return;
		}
		if (newPassword !== confirmPassword) {
			toast.error("La confirmation ne correspond pas");
			return;
		}
		try {
			setSubmitting(true);
			const res = await fetch("/api/admin/change-password", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ currentPassword, newPassword }),
			});
			if (!res.ok) {
				const data = await res.json().catch(() => ({} as any));
				throw new Error(data.error || "Échec de la mise à jour");
			}
			toast.success("Mot de passe mis à jour");
			setCurrentPassword("");
			setNewPassword("");
			setConfirmPassword("");
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Erreur inconnue";
			toast.error(msg);
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<form className="space-y-6" onSubmit={handleSubmit}>
			{/* Changement de mot de passe */}
			<div className="form-group">
				<label className="form-label">Mot de passe actuel</label>
				<div className="relative">
					<input
						type={showCurrentPassword ? "text" : "password"}
						className="form-input pr-10"
						placeholder="Entrez votre mot de passe actuel"
						value={currentPassword}
						onChange={(e) => setCurrentPassword(e.target.value)}
						required
					/>
					<button
						type="button"
						onClick={() =>
							setShowCurrentPassword(!showCurrentPassword)
						}
						className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#666] hover:text-white"
					>
						{showCurrentPassword ? (
							<EyeOff className="w-4 h-4" />
						) : (
							<Eye className="w-4 h-4" />
						)}
					</button>
				</div>
			</div>

			<div className="form-group">
				<label className="form-label">Nouveau mot de passe</label>
				<div className="relative">
					<input
						type={showNewPassword ? "text" : "password"}
						className="form-input pr-10"
						placeholder="Entrez votre nouveau mot de passe"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						minLength={6}
						required
					/>
					<button
						type="button"
						onClick={() => setShowNewPassword(!showNewPassword)}
						className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#666] hover:text-white"
					>
						{showNewPassword ? (
							<EyeOff className="w-4 h-4" />
						) : (
							<Eye className="w-4 h-4" />
						)}
					</button>
				</div>
			</div>

			<div className="form-group">
				<label className="form-label">
					Confirmer le nouveau mot de passe
				</label>
				<div className="relative">
					<input
						type={showConfirmPassword ? "text" : "password"}
						className="form-input pr-10"
						placeholder="Confirmez votre nouveau mot de passe"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						minLength={6}
						required
					/>
					<button
						type="button"
						onClick={() =>
							setShowConfirmPassword(!showConfirmPassword)
						}
						className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#666] hover:text-white"
					>
						{showConfirmPassword ? (
							<EyeOff className="w-4 h-4" />
						) : (
							<Eye className="w-4 h-4" />
						)}
					</button>
				</div>
			</div>

			{/* Authentification à deux facteurs */}
			<div className="form-group">
				<label className="flex items-center gap-3 cursor-pointer">
					<input type="checkbox" className="form-checkbox" />
					<span className="text-sm text-white">
						Activer l'authentification à deux facteurs
					</span>
				</label>
				<p className="text-xs text-[#666] mt-1">
					Ajoutez une couche de sécurité supplémentaire à votre compte
				</p>
			</div>

			{/* Sessions actives */}
			<div className="form-group">
				<label className="flex items-center gap-3 cursor-pointer">
					<input
						type="checkbox"
						className="form-checkbox"
						defaultChecked
					/>
					<span className="text-sm text-white">
						Déconnexion automatique après inactivité
					</span>
				</label>
				<select className="form-input form-select mt-2">
					<option value="15">15 minutes</option>
					<option value="30">30 minutes</option>
					<option value="60">1 heure</option>
					<option value="120">2 heures</option>
				</select>
			</div>

			<button
				type="submit"
				className="btn btn-primary w-full"
				disabled={submitting}
			>
				<Save className="w-4 h-4" />
				{submitting
					? "Enregistrement..."
					: "Sauvegarder les paramètres de sécurité"}
			</button>
		</form>
	);
}
