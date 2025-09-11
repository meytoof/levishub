"use client";

import { Edit3, Eye, EyeOff, Save } from "lucide-react";
import { useState } from "react";

export default function ProfileForm() {
	const [isEditing, setIsEditing] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	return (
		<form className="space-y-6">
			{/* Nom et Prénom */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="form-group">
					<label className="form-label">Prénom *</label>
					<input
						type="text"
						className="form-input"
						defaultValue="Admin"
						disabled={!isEditing}
					/>
				</div>
				<div className="form-group">
					<label className="form-label">Nom *</label>
					<input
						type="text"
						className="form-input"
						defaultValue="Principal"
						disabled={!isEditing}
					/>
				</div>
			</div>

			{/* Email */}
			<div className="form-group">
				<label className="form-label">Email *</label>
				<input
					type="email"
					className="form-input"
					defaultValue="admin@levisweb.com"
					disabled={!isEditing}
				/>
			</div>

			{/* Téléphone */}
			<div className="form-group">
				<label className="form-label">Téléphone</label>
				<input
					type="tel"
					className="form-input"
					defaultValue="+33 1 23 45 67 89"
					disabled={!isEditing}
				/>
			</div>

			{/* Adresse */}
			<div className="form-group">
				<label className="form-label">Adresse</label>
				<input
					type="text"
					className="form-input"
					defaultValue="123 Rue de la Tech, 75001 Paris"
					disabled={!isEditing}
				/>
			</div>

			{/* Mot de passe */}
			<div className="form-group">
				<label className="form-label">Nouveau mot de passe</label>
				<div className="relative">
					<input
						type={showPassword ? "text" : "password"}
						className="form-input pr-10"
						placeholder="Laissez vide pour ne pas changer"
						disabled={!isEditing}
					/>
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#666] hover:text-white"
						disabled={!isEditing}
					>
						{showPassword ? (
							<EyeOff className="w-4 h-4" />
						) : (
							<Eye className="w-4 h-4" />
						)}
					</button>
				</div>
			</div>

			{/* Actions */}
			<div className="flex items-center gap-4 pt-4">
				{isEditing ? (
					<>
						<button type="submit" className="btn btn-primary">
							<Save className="w-4 h-4" />
							Sauvegarder
						</button>
						<button
							type="button"
							onClick={() => setIsEditing(false)}
							className="btn btn-secondary"
						>
							Annuler
						</button>
					</>
				) : (
					<button
						type="button"
						onClick={() => setIsEditing(true)}
						className="btn btn-primary"
					>
						<Edit3 className="w-4 h-4" />
						Modifier
					</button>
				)}
			</div>
		</form>
	);
}
