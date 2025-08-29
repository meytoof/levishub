"use client";

import { Save } from "lucide-react";

export default function NotificationSettings() {
	return (
		<div className="space-y-6">
			{/* Notifications par email */}
			<div className="space-y-3">
				<h4 className="font-medium text-white">
					Notifications par email
				</h4>
				<label className="flex items-center gap-3 cursor-pointer">
					<input
						type="checkbox"
						className="form-checkbox"
						defaultChecked
					/>
					<span className="text-sm text-white">Nouveaux clients</span>
				</label>
				<label className="flex items-center gap-3 cursor-pointer">
					<input
						type="checkbox"
						className="form-checkbox"
						defaultChecked
					/>
					<span className="text-sm text-white">
						Tickets de support
					</span>
				</label>
				<label className="flex items-center gap-3 cursor-pointer">
					<input
						type="checkbox"
						className="form-checkbox"
						defaultChecked
					/>
					<span className="text-sm text-white">Paiements reçus</span>
				</label>
				<label className="flex items-center gap-3 cursor-pointer">
					<input type="checkbox" className="form-checkbox" />
					<span className="text-sm text-white">
						Maintenance système
					</span>
				</label>
			</div>

			{/* Notifications dans l'application */}
			<div className="space-y-3">
				<h4 className="font-medium text-white">
					Notifications dans l'application
				</h4>
				<label className="flex items-center gap-3 cursor-pointer">
					<input
						type="checkbox"
						className="form-checkbox"
						defaultChecked
					/>
					<span className="text-sm text-white">
						Sons de notification
					</span>
				</label>
				<label className="flex items-center gap-3 cursor-pointer">
					<input
						type="checkbox"
						className="form-checkbox"
						defaultChecked
					/>
					<span className="text-sm text-white">
						Notifications push
					</span>
				</label>
				<label className="flex items-center gap-3 cursor-pointer">
					<input type="checkbox" className="form-checkbox" />
					<span className="text-sm text-white">
						Notifications de bureau
					</span>
				</label>
			</div>

			<button type="submit" className="btn btn-primary w-full">
				<Save className="w-4 h-4" />
				Sauvegarder les préférences
			</button>
		</div>
	);
}
