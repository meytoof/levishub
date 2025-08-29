"use client";

import { Monitor, Moon, Save, Sun } from "lucide-react";
import { useState } from "react";

export default function AppearanceSettings() {
	const [theme, setTheme] = useState("dark");
	const [uiDensity, setUiDensity] = useState("comfortable");
	const [fontSize, setFontSize] = useState("medium");

	return (
		<div className="space-y-6">
			{/* Thème */}
			<div className="form-group">
				<label className="form-label">Thème</label>
				<div className="grid grid-cols-3 gap-2">
					<button
						type="button"
						onClick={() => setTheme("light")}
						className={`p-3 rounded-lg border-2 transition-all ${
							theme === "light"
								? "border-[#3b82f6] bg-[#3b82f6]/10"
								: "border-[#333] hover:border-[#555]"
						}`}
					>
						<Sun className="w-6 h-6 mx-auto mb-2 text-[#f59e0b]" />
						<span className="text-xs text-white">Clair</span>
					</button>
					<button
						type="button"
						onClick={() => setTheme("dark")}
						className={`p-3 rounded-lg border-2 transition-all ${
							theme === "dark"
								? "border-[#3b82f6] bg-[#3b82f6]/10"
								: "border-[#333] hover:border-[#555]"
						}`}
					>
						<Moon className="w-6 h-6 mx-auto mb-2 text-[#3b82f6]" />
						<span className="text-xs text-white">Sombre</span>
					</button>
					<button
						type="button"
						onClick={() => setTheme("auto")}
						className={`p-3 rounded-lg border-2 transition-all ${
							theme === "auto"
								? "border-[#3b82f6] bg-[#3b82f6]/10"
								: "border-[#333] hover:border-[#555]"
						}`}
					>
						<Monitor className="w-6 h-6 mx-auto mb-2 text-[#10b981]" />
						<span className="text-xs text-white">Auto</span>
					</button>
				</div>
			</div>

			{/* Densité de l'interface */}
			<div className="form-group">
				<label className="form-label">Densité de l'interface</label>
				<select
					className="form-input form-select"
					value={uiDensity}
					onChange={(e) => setUiDensity(e.target.value)}
				>
					<option value="compact">Compacte</option>
					<option value="comfortable">Confortable</option>
					<option value="spacious">Spacieuse</option>
				</select>
			</div>

			{/* Taille de police */}
			<div className="form-group">
				<label className="form-label">Taille de police</label>
				<select
					className="form-input form-select"
					value={fontSize}
					onChange={(e) => setFontSize(e.target.value)}
				>
					<option value="small">Petite</option>
					<option value="medium">Moyenne</option>
					<option value="large">Grande</option>
				</select>
			</div>

			<button type="submit" className="btn btn-primary w-full">
				<Save className="w-4 h-4" />
				Sauvegarder l'apparence
			</button>
		</div>
	);
}
