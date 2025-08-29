"use client";

import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";

interface TicketFormProps {
	onTicketCreated?: () => void;
}

interface PriorityOption {
	value: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
	label: string;
	color: string;
	description: string;
}

const priorityOptions: PriorityOption[] = [
	{
		value: "LOW",
		label: "Faible",
		color: "bg-green-100 text-green-800 border-green-200",
		description: "Question générale, amélioration non critique",
	},
	{
		value: "MEDIUM",
		label: "Moyenne",
		color: "bg-yellow-100 text-yellow-800 border-yellow-200",
		description: "Problème mineur, fonctionnalité souhaitée",
	},
	{
		value: "HIGH",
		label: "Élevée",
		color: "bg-orange-100 text-orange-800 border-orange-200",
		description: "Problème important, impact sur l'utilisation",
	},
	{
		value: "URGENT",
		label: "Urgente",
		color: "bg-red-100 text-red-800 border-red-200",
		description: "Site inaccessible, problème critique",
	},
];

export function TicketForm({ onTicketCreated }: TicketFormProps) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState<
		"LOW" | "MEDIUM" | "HIGH" | "URGENT"
	>("MEDIUM");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<{
		type: "success" | "error";
		text: string;
	} | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setMessage(null);

		try {
			const response = await fetch("/api/tickets", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title,
					description,
					priority,
				}),
			});

			if (response.ok) {
				setMessage({
					type: "success",
					text: "Ticket créé avec succès ! Vous recevrez une notification par email.",
				});
				setTitle("");
				setDescription("");
				setPriority("MEDIUM");
				onTicketCreated?.();
			} else {
				const error = await response.json();
				setMessage({
					type: "error",
					text: error.error || "Erreur lors de la création du ticket",
				});
			}
		} catch (error) {
			setMessage({
				type: "error",
				text: "Erreur de connexion. Veuillez réessayer.",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full max-w-2xl mx-auto">
			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
				<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
					🎫 Créer un ticket de support
				</h2>

				{message && (
					<div
						className={`p-4 rounded-lg mb-6 flex items-center gap-3 ${
							message.type === "success"
								? "bg-green-50 border border-green-200 text-green-800"
								: "bg-red-50 border border-red-200 text-red-800"
						}`}
					>
						{message.type === "success" ? (
							<CheckCircle className="w-5 h-5" />
						) : (
							<AlertCircle className="w-5 h-5" />
						)}
						<span>{message.text}</span>
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<Label
							htmlFor="title"
							className="text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Titre du ticket *
						</Label>
						<Input
							id="title"
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Décrivez brièvement votre demande"
							required
							className="mt-1"
						/>
					</div>

					<div>
						<Label
							htmlFor="description"
							className="text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Description détaillée *
						</Label>
						<Textarea
							id="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Décrivez en détail votre problème ou votre demande..."
							required
							rows={5}
							className="mt-1"
						/>
					</div>

					<div>
						<Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
							Niveau de priorité
						</Label>
						<div className="grid grid-cols-2 gap-3">
							{priorityOptions.map((option) => (
								<button
									key={option.value}
									type="button"
									onClick={() => setPriority(option.value)}
									className={`p-4 rounded-lg border-2 transition-all ${
										priority === option.value
											? `${option.color} border-current ring-2 ring-offset-2 ring-current`
											: "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
									}`}
								>
									<div className="text-left">
										<div className="font-semibold">
											{option.label}
										</div>
										<div className="text-sm opacity-80 mt-1">
											{option.description}
										</div>
									</div>
								</button>
							))}
						</div>
					</div>

					<div className="pt-4">
						<Button
							type="submit"
							disabled={
								loading || !title.trim() || !description.trim()
							}
							className="w-full"
						>
							{loading ? (
								<>
									<Loader2 className="w-4 h-4 mr-2 animate-spin" />
									Crée le ticket...
								</>
							) : (
								"🎫 Créer le ticket"
							)}
						</Button>
					</div>
				</form>

				<div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
					<h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
						💡 Conseils pour un ticket efficace
					</h3>
					<ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
						<li>• Soyez précis dans le titre et la description</li>
						<li>
							• Incluez les étapes pour reproduire le problème
						</li>
						<li>
							• Précisez votre navigateur et système
							d'exploitation
						</li>
						<li>• Joignez des captures d'écran si nécessaire</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
