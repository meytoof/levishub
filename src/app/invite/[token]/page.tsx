"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

interface InvitationData {
	client: {
		name: string;
		companyName: string;
	};
	email: string;
	expiresAt: string;
}

export default function AcceptInvitationPage({
	params,
}: {
	params: Promise<{ token: string }>;
}) {
	const router = useRouter();
	const [invitation, setInvitation] = useState<InvitationData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [token, setToken] = useState<string>("");

	useEffect(() => {
		// Récupérer le token depuis les params
		params.then((resolvedParams) => {
			setToken(resolvedParams.token);
		});
	}, [params]);

	useEffect(() => {
		if (!token) return;

		// Vérifier la validité de l'invitation
		fetch(`/api/invitations/validate?token=${token}`)
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					setError(data.error);
				} else {
					setInvitation(data);
				}
			})
			.catch(() => {
				setError("Erreur lors de la validation de l'invitation");
			})
			.finally(() => {
				setLoading(false);
			});
	}, [token]);

	async function onSubmit(e: FormEvent) {
		e.preventDefault();
		setError(null);

		if (password !== confirmPassword) {
			setError("Les mots de passe ne correspondent pas");
			return;
		}

		if (password.length < 6) {
			setError("Le mot de passe doit contenir au moins 6 caractères");
			return;
		}

		setSubmitting(true);

		try {
			const res = await fetch("/api/invitations/accept", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					token: token,
					password,
					name,
				}),
			});

			const data = await res.json();

			if (data.error) {
				setError(data.error);
			} else {
				// Rediriger vers la page de connexion avec un message de succès
				router.push(
					"/login?message=Compte créé avec succès. Vous pouvez maintenant vous connecter."
				);
			}
		} catch (error) {
			setError("Erreur lors de la création du compte");
		} finally {
			setSubmitting(false);
		}
	}

	if (loading) {
		return (
			<div className="min-h-svh grid place-items-center px-4">
				<div className="text-center">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
					<p>Vérification de l'invitation...</p>
				</div>
			</div>
		);
	}

	if (error || !invitation) {
		return (
			<div className="min-h-svh grid place-items-center px-4">
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle className="text-red-600">
							Invitation invalide
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-muted-foreground mb-4">
							{error || "Cette invitation n'est plus valide."}
						</p>
						<Button
							onClick={() => router.push("/login")}
							className="w-full"
						>
							Retour à la connexion
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="min-h-svh grid place-items-center px-4">
			<div className="w-full max-w-md">
				<Card className="backdrop-blur bg-background/60 shadow-xl">
					<CardHeader>
						<CardTitle className="text-2xl">
							Créer votre compte
						</CardTitle>
						<p className="text-muted-foreground">
							Vous avez été invité à rejoindre{" "}
							<span className="font-semibold">
								{invitation.client.companyName}
							</span>
						</p>
					</CardHeader>
					<CardContent>
						<form onSubmit={onSubmit} className="space-y-4">
							<div>
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									value={invitation.email}
									disabled
									className="bg-muted"
								/>
								<p className="text-xs text-muted-foreground mt-1">
									Cet email sera utilisé pour votre connexion
								</p>
							</div>
							<div>
								<Label htmlFor="name">Nom complet</Label>
								<Input
									id="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
									placeholder="Votre nom complet"
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
									placeholder="Minimum 6 caractères"
								/>
							</div>
							<div>
								<Label htmlFor="confirmPassword">
									Confirmer le mot de passe
								</Label>
								<Input
									id="confirmPassword"
									type="password"
									value={confirmPassword}
									onChange={(e) =>
										setConfirmPassword(e.target.value)
									}
									required
									placeholder="Retapez votre mot de passe"
								/>
							</div>
							<Button
								type="submit"
								disabled={submitting}
								className="w-full"
							>
								{submitting
									? "Création..."
									: "Créer mon compte"}
							</Button>
						</form>
						{error && (
							<p className="text-sm text-red-500 mt-2">{error}</p>
						)}
						<p className="text-xs text-muted-foreground mt-4">
							L'invitation expire le{" "}
							{new Date(invitation.expiresAt).toLocaleDateString(
								"fr-FR"
							)}
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
