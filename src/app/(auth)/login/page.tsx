"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Navbar,
	NavbarLogo,
	NavBody,
	NavItems,
} from "@/components/ui/resizable-navbar";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function LoginPage() {
	const router = useRouter();
	const { data: session, status } = useSession();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Redirection automatique si déjà connecté
	useEffect(() => {
		if (status === "authenticated" && session?.user) {
			const redirectPath =
				session.user.role === "ADMIN" ? "/admin" : "/dashboard";
			router.push(redirectPath);
		}
	}, [session, status, router]);

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

		if (res?.ok) {
			// La redirection se fera automatiquement via useEffect
			// car la session sera mise à jour
		} else {
			setError("Identifiants invalides");
		}
	}

	// Si en cours de chargement de la session, afficher un loader
	if (status === "loading") {
		return (
			<>
				<Navbar>
					<NavBody>
						<NavbarLogo />
						<NavItems
							items={[
								{ name: "Accueil", link: "/" },
								{ name: "Services", link: "/services" },
								{ name: "Prix", link: "/pricing" },
								{ name: "Contact", link: "/contact" },
							]}
						/>
					</NavBody>
				</Navbar>
				<div className="min-h-screen pt-16 grid place-items-center px-4">
					<div className="text-center">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
						<p className="text-muted-foreground">
							Vérification de la session...
						</p>
					</div>
				</div>
			</>
		);
	}

	// Si déjà connecté, ne pas afficher le formulaire
	if (status === "authenticated") {
		return null; // La redirection se fera via useEffect
	}

	return (
		<>
			<Navbar>
				<NavBody>
					<NavbarLogo />
					<NavItems
						items={[
							{ name: "Accueil", link: "/" },
							{ name: "Services", link: "/services" },
							{ name: "Prix", link: "/pricing" },
							{ name: "Contact", link: "/contact" },
						]}
					/>
				</NavBody>
			</Navbar>

			<div className="min-h-screen pt-16 grid place-items-center px-4">
				<div className="w-full max-w-md opacity-0 animate-[fade-up_600ms_ease-out_forwards]">
					<Card
						className="backdrop-blur bg-background/60 shadow-xl"
						style={{ border: "1px solid hsl(0 0% 50% / .6)" }}
					>
						<CardHeader>
							<CardTitle className="text-2xl">
								Connexion
							</CardTitle>
						</CardHeader>
						<CardContent>
							<form onSubmit={onSubmit} className="space-y-4">
								<div>
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
										required
									/>
								</div>
								<div>
									<Label htmlFor="password">
										Mot de passe
									</Label>
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
								<p className="text-sm text-red-500 mt-2">
									{error}
								</p>
							)}
							<div className="mt-4 text-center">
								<p className="text-sm text-muted-foreground">
									Accès réservé aux utilisateurs autorisés
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
}
