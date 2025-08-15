"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function RegisterPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<string | null>(null);

	async function onSubmit(e: FormEvent) {
		e.preventDefault();
		setLoading(true);
		setMessage(null);
		const res = await fetch("/api/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, email, password }),
		});
		setLoading(false);
		if (res.ok) setMessage("Compte créé. Vous pouvez vous connecter.");
		else setMessage("Impossible de créer le compte.");
	}

	return (
		<div className="min-h-svh grid place-items-center px-4">
			<div className="w-full max-w-md opacity-0 animate-[fade-up_600ms_ease-out_forwards]">
				<Card
					className="backdrop-blur bg-background/60 shadow-xl"
					style={{ border: "1px solid hsl(0 0% 50% / .6)" }}
				>
					<CardHeader>
						<CardTitle className="text-2xl">
							Créer un compte
						</CardTitle>
					</CardHeader>
					<CardContent>
						<form onSubmit={onSubmit} className="space-y-4">
							<div>
								<Label htmlFor="name">Nom</Label>
								<Input
									id="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
							</div>
							<div>
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<div>
								<Label htmlFor="password">Mot de passe</Label>
								<Input
									id="password"
									type="password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									required
								/>
							</div>
							<Button
								type="submit"
								disabled={loading}
								className="w-full"
							>
								{loading ? "Création..." : "Créer"}
							</Button>
						</form>
						{message && <p className="text-sm mt-2">{message}</p>}
						<p className="text-sm text-muted-foreground mt-4">
							Déjà un compte ?{" "}
							<Link href="/login" className="underline">
								Se connecter
							</Link>
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
