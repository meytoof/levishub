"use client";

import { AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "./input";
import { Label } from "./label";
import { StatefulButton } from "./stateful-button";
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
	const [message, setMessage] = useState<{
		type: "success" | "error";
		text: string;
	} | null>(null);

	const handleSubmit = async () => {
		setMessage(null);

		// Validation côté client
		if (!title.trim() || !description.trim()) {
			toast.error("Veuillez remplir tous les champs obligatoires");
			return;
		}

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
				toast.success(
					"Ticket créé avec succès ! Vous recevrez une notification par email."
				);
				setTitle("");
				setDescription("");
				setPriority("MEDIUM");
				onTicketCreated?.();
			} else {
				const error = await response.json();
				throw new Error(
					error.error || "Erreur lors de la création du ticket"
				);
			}
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Erreur de connexion. Veuillez réessayer.";
			toast.error(errorMessage);
			setMessage({
				type: "error",
				text: errorMessage,
			});
			throw error; // Re-throw pour que le StatefulButton reste en état d'erreur
		}
	};

	return (
		<div className="w-full max-w-2xl mx-auto">
			<div className="rounded-lg border border-[#333] bg-[#1a1a1a] p-6">
				<h2 className="text-2xl font-bold text-white mb-6">
					🎫 Créer un ticket de support
				</h2>

				{message && (
					<div
						className={`p-4 rounded-lg mb-6 flex items-center gap-3 ${
							message.type === "success"
								? "bg-[#0f2e25] border border-[#166a57] text-[#86efac]"
								: "bg-[#2a0f12] border border-[#7f1d1d] text-[#fca5a5]"
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

				<form className="space-y-6">
					<div>
						<Label
							htmlFor="title"
							className="text-sm font-medium text-white"
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
							className="mt-1 p5"
						/>
					</div>

					<div>
						<Label
							htmlFor="description"
							className="text-sm font-medium text-white"
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
							className="mt-1 p5"
						/>
					</div>

					<div>
						<Label className="text-sm font-medium text-white mb-3 block">
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
											: "bg-[#121212] border-[#333] hover:bg-[#1a1a1a]"
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
						<StatefulButton
							onClick={handleSubmit}
							disabled={!title.trim() || !description.trim()}
							className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md mt-4"
						>
							🎫 Créer le ticket
						</StatefulButton>
					</div>
				</form>

				<div className="mt-6 p-4 bg-[#0f1b2e] border border-[#1f3a5f] rounded-lg">
					<h3 className="font-medium text-[#93c5fd] mb-2">
						💡 Conseils pour un ticket efficace
					</h3>
					<ul className="text-sm text-[#bfdbfe] space-y-1">
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
