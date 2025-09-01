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
import { StatefulButton } from "@/components/ui/stateful-button";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function RegisterPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { data: session, status } = useSession();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [invitation, setInvitation] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	const token = searchParams.get("token");

	useEffect(() => {
		if (status === "authenticated" && session?.user) {
			if (session.user.role === "CLIENT") {
				router.push("/dashboard");
			}
		}
	}, [session, status, router]);

	useEffect(() => {
		if (token) {
			validateInvitation();
		} else {
			setLoading(false);
		}
	}, [token]);

	const validateInvitation = async () => {
		try {
			const response = await fetch(
				`/api/invitations/validate?token=${token}`
			);
			if (response.ok) {
				const data = await response.json();
				console.log("Données reçues de l'API validate:", data); // Debug log
				setInvitation(data.invitation);
			} else {
				toast.error("Invitation invalide ou expirée");
				router.push("/login");
			}
		} catch (error) {
			toast.error("Erreur lors de la validation de l'invitation");
			router.push("/login");
		} finally {
			setLoading(false);
		}
	};

	// Validation du mot de passe
	const validatePassword = (password: string) => {
		const minLength = 8;
		const hasUpperCase = /[A-Z]/.test(password);
		const hasLowerCase = /[a-z]/.test(password);
		const hasNumbers = /\d/.test(password);
		const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

		if (password.length < minLength) {
			return "Le mot de passe doit contenir au moins 8 caractères";
		}
		if (!hasUpperCase) {
			return "Le mot de passe doit contenir au moins une majuscule";
		}
		if (!hasLowerCase) {
			return "Le mot de passe doit contenir au moins une minuscule";
		}
		if (!hasNumbers) {
			return "Le mot de passe doit contenir au moins un chiffre";
		}
		if (!hasSpecialChar) {
			return "Le mot de passe doit contenir au moins un caractère spécial (!@#$%^&*)";
		}
		return null;
	};

	async function handleRegister() {
		setError(null);

		// Vérifier que l'invitation est chargée
		if (!invitation) {
			toast.error("Erreur : Invitation non trouvée");
			return;
		}

		// Validation côté client
		if (!password.trim() || !confirmPassword.trim()) {
			toast.error("Veuillez remplir tous les champs");
			return;
		}

		// Validation du mot de passe
		const passwordError = validatePassword(password);
		if (passwordError) {
			toast.error(passwordError);
			return;
		}

		if (password !== confirmPassword) {
			toast.error("Les mots de passe ne correspondent pas");
			return;
		}

		try {
			// Debug: Afficher l'invitation complète
			console.log("Invitation complète:", invitation); // Debug log
			console.log("invitation.client:", invitation.client); // Debug log
			console.log("invitation.client.name:", invitation.client?.name); // Debug log

			// Debug: Afficher les données qui vont être envoyées
			const requestData = {
				name: invitation.client.name, // Utiliser le nom de l'invitation
				email: invitation.email, // Utiliser l'email de l'invitation
				password,
				invitationToken: token,
			};
			console.log("Données à envoyer:", {
				...requestData,
				password: "***",
				invitationToken: token ? "***" : "undefined",
			});

			const response = await fetch("/api/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestData),
			});

			if (response.ok) {
				toast.success(
					"Compte créé avec succès ! Connexion automatique..."
				);

				const signInResult = await signIn("credentials", {
					email: invitation.email,
					password,
					redirect: false,
				});

				if (signInResult?.ok) {
					router.push("/dashboard");
				} else {
					router.push(
						"/login?message=Compte créé avec succès. Veuillez vous connecter."
					);
				}
			} else {
				const errorData = await response.json();
				throw new Error(
					errorData.error || "Erreur lors de la création du compte"
				);
			}
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Erreur lors de la création du compte";
			toast.error(errorMessage);
			setError(errorMessage);
			throw error;
		}
	}

	if (status === "loading" || loading) {
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
							Validation de l'invitation...
						</p>
					</div>
				</div>
			</>
		);
	}

	if (!token) {
		router.push("/login");
		return null;
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
								Créer votre mot de passe
							</CardTitle>
							{invitation && (
								<p className="text-sm text-muted-foreground">
									Bienvenue chez{" "}
									{invitation.client.companyName}
								</p>
							)}
						</CardHeader>
						<CardContent>
							<form className="space-y-4">
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
										placeholder="Minimum 8 caractères, majuscule, chiffre et caractère spécial"
										required
									/>
									<p className="text-xs text-muted-foreground mt-1">
										Le mot de passe doit contenir au moins 8
										caractères, une majuscule, une
										minuscule, un chiffre et un caractère
										spécial (!@#$%^&*)
									</p>
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
										placeholder="Répétez votre mot de passe"
										required
									/>
								</div>
								<StatefulButton
									onClick={handleRegister}
									className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium"
								>
									Créer mon compte
								</StatefulButton>
							</form>
							{error && (
								<p className="text-sm text-red-500 mt-2">
									{error}
								</p>
							)}
							<div className="mt-4 text-center">
								<p className="text-sm text-muted-foreground">
									Vous avez déjà un compte ?{" "}
									<Button
										variant="link"
										className="p-0 h-auto"
										onClick={() => router.push("/login")}
									>
										Se connecter
									</Button>
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
}
