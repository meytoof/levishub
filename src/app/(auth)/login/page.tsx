"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function onSubmit(e: FormEvent) {
		e.preventDefault();
		setLoading(true);
		setError(null);
		const res = await signIn("credentials", {
			email,
			password,
			redirect: false,
		});
		setLoading(false);
		if (res?.ok) router.push("/dashboard");
		else setError("Identifiants invalides");
	}

	return (
		<div className="min-h-svh grid place-items-center px-4">
			<div className="w-full max-w-md opacity-0 animate-[fade-up_600ms_ease-out_forwards]">
				<Card
					className="backdrop-blur bg-background/60 shadow-xl"
					style={{ border: "1px solid hsl(0 0% 50% / .6)" }}
				>
					<CardHeader>
						<CardTitle className="text-2xl">Connexion</CardTitle>
					</CardHeader>
					<CardContent>
						<form onSubmit={onSubmit} className="space-y-4">
							<div>
								<Label htmlFor="email" className="text-white">Email</Label>
								<Input
									id="email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<div>
								<Label htmlFor="password" className="text-white">Mot de passe</Label>
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
								{loading ? "Connexion..." : "Se connecter"}
							</Button>
						</form>
						{error && (
							<p className="text-sm text-red-500 mt-2">{error}</p>
						)}
						<p className="text-sm text-muted-foreground mt-4">
							Pas de compte ?{" "}
							<Link href="/register" className="underline">
								Créer un compte
							</Link>
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
