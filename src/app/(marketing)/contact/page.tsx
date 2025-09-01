"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatefulButton } from "@/components/ui/stateful-button";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
	const [ok, setOk] = useState<string | null>(null);

	async function handleSubmit() {
		setOk(null);

		// Récupérer les données du formulaire
		const form = document.querySelector("form") as HTMLFormElement;
		if (!form) {
			toast.error("Formulaire non trouvé");
			return;
		}

		const data = Object.fromEntries(new FormData(form).entries());

		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (res.ok) {
				toast.success(
					"Message envoyé avec succès ! Nous vous répondrons rapidement."
				);
				form.reset();
			} else {
				const errorData = await res.json();
				throw new Error(
					errorData.error || "Erreur lors de l'envoi du message"
				);
			}
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Erreur lors de l'envoi";
			toast.error(errorMessage);
			throw error; // Re-throw pour que le StatefulButton reste en état d'erreur
		}
	}

	return (
		<main className="container py-16">
			<h1 className="text-3xl font-semibold text-foreground">Contact</h1>
			<p className="mt-2 text-muted-foreground">
				Dites-nous en plus sur votre projet, nous revenons vers vous
				rapidement.
			</p>
			<form className="mt-8 grid gap-4 max-w-xl">
				<div>
					<Label htmlFor="name" className="text-foreground">
						Votre nom
					</Label>
					<Input id="name" name="name" required />
				</div>
				<div>
					<Label htmlFor="email" className="text-foreground">
						Votre email
					</Label>
					<Input id="email" name="email" type="email" required />
				</div>
				<div>
					<Label htmlFor="message" className="text-foreground">
						Votre message
					</Label>
					<textarea
						id="message"
						name="message"
						className="min-h-32 w-full rounded-md border border-input bg-background p-3 text-sm text-foreground shadow-input focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-ring"
						required
					/>
				</div>
				<StatefulButton
					onClick={handleSubmit}
					className="h-11 rounded-md bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-medium hover:from-indigo-600 hover:to-fuchsia-600"
				>
					Envoyer
				</StatefulButton>
				{ok && <p className="text-sm mt-2 text-foreground">{ok}</p>}
			</form>
		</main>
	);
}
