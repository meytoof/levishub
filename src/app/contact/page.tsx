"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";

export default function ContactPage() {
	const [loading, setLoading] = useState(false);
	const [ok, setOk] = useState<string | null>(null);

	async function submit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		setOk(null);
		const form = e.target as HTMLFormElement;
		const data = Object.fromEntries(new FormData(form).entries());
		const res = await fetch("/api/contact", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		setLoading(false);
		setOk(res.ok ? "Message envoyé ✅" : "Échec de l'envoi ❌");
		if (res.ok) form.reset();
	}

	return (
		<main className="container py-16">
			<h1 className="text-3xl font-semibold">Contact</h1>
			<p className="mt-2 text-muted-foreground">
				Dites-nous en plus sur votre projet, nous revenons vers vous
				rapidement.
			</p>
			<form onSubmit={submit} className="mt-8 grid gap-4 max-w-xl">
				<div>
					<Label htmlFor="name" className="text-white">
						Votre nom
					</Label>
					<Input id="name" name="name" required />
				</div>
				<div>
					<Label htmlFor="email" className="text-white">
						Votre email
					</Label>
					<Input id="email" name="email" type="email" required />
				</div>
				<div>
					<Label htmlFor="message" className="text-white">
						Votre message
					</Label>
					<textarea
						id="message"
						name="message"
						className="min-h-32 w-full rounded-md border-none bg-gray-50 p-3 text-sm text-white bg-zinc-800 dark:text-white shadow-input focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400"
						required
					/>
				</div>
				<button className="h-11 rounded-md bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-medium">
					{loading ? "Envoi..." : "Envoyer"}
				</button>
				{ok && <p className="text-sm mt-2">{ok}</p>}
			</form>
		</main>
	);
}
