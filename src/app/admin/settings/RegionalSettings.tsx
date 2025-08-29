"use client";

import { Save } from "lucide-react";
import { useState } from "react";

export default function RegionalSettings() {
	const [language, setLanguage] = useState("fr");
	const [timezone, setTimezone] = useState("Europe/Paris");
	const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");

	return (
		<div className="space-y-6">
			{/* Langue */}
			<div className="form-group">
				<label className="form-label">Langue</label>
				<select
					className="form-input form-select"
					value={language}
					onChange={(e) => setLanguage(e.target.value)}
				>
					<option value="fr">Français</option>
					<option value="en">English</option>
					<option value="es">Español</option>
					<option value="de">Deutsch</option>
				</select>
			</div>

			{/* Fuseau horaire */}
			<div className="form-group">
				<label className="form-label">Fuseau horaire</label>
				<select
					className="form-input form-select"
					value={timezone}
					onChange={(e) => setTimezone(e.target.value)}
				>
					<option value="Europe/Paris">Paris (UTC+1/+2)</option>
					<option value="Europe/London">Londres (UTC+0/+1)</option>
					<option value="America/New_York">
						New York (UTC-5/-4)
					</option>
					<option value="Asia/Tokyo">Tokyo (UTC+9)</option>
				</select>
			</div>

			{/* Format de date */}
			<div className="form-group">
				<label className="form-label">Format de date</label>
				<select
					className="form-input form-select"
					value={dateFormat}
					onChange={(e) => setDateFormat(e.target.value)}
				>
					<option value="DD/MM/YYYY">DD/MM/YYYY</option>
					<option value="MM/DD/YYYY">MM/DD/YYYY</option>
					<option value="YYYY-MM-DD">YYYY-MM-DD</option>
				</select>
			</div>

			{/* Aperçu */}
			<div className="p-4 bg-[#1a1a1a] rounded-lg">
				<h4 className="font-medium text-white mb-2">Aperçu</h4>
				<div className="text-sm text-[#a0a0a0] space-y-1">
					<p>
						Langue:{" "}
						{language === "fr"
							? "Français"
							: language === "en"
							? "English"
							: language}
					</p>
					<p>Fuseau: {timezone}</p>
					<p>Date: {new Date().toLocaleDateString("fr-FR")}</p>
				</div>
			</div>

			<button type="submit" className="btn btn-primary w-full">
				<Save className="w-4 h-4" />
				Sauvegarder les paramètres régionaux
			</button>
		</div>
	);
}
