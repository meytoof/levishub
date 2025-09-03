"use client";

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
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";

function ResetPasswordForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [token, setToken] = useState<string>("");

	useEffect(() => {
		const tokenParam = searchParams.get("token");
		if (tokenParam) {
			setToken(tokenParam);
		}
		setLoading(false);
	}, [searchParams]);

	async function handleResetPassword() {
		setError(null);
		if (!password.trim() || !confirmPassword.trim()) {
			toast.error("Veuillez remplir tous les champs");
			return;
		}
		if (password !== confirmPassword) {
			toast.error("Les mots de passe ne correspondent pas");
			return;
		}
		if (password.length < 6) {
			toast.error("Le mot de passe doit contenir au moins 6 caractères");
			return;
		}
		try {
			const response = await fetch("/api/auth/reset-password", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ token, password }),
			});
			if (response.ok) {
				toast.success("Mot de passe réinitialisé avec succès !");
				router.push(
					"/login?message=Mot de passe réinitialisé. Vous pouvez maintenant vous connecter."
				);
			} else {
				const errorData = await response.json();
				throw new Error(
					errorData.error || "Erreur lors de la réinitialisation"
				);
			}
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Erreur lors de la réinitialisation";
			toast.error(errorMessage);
			setError(errorMessage);
			throw error;
		}
	}

	if (loading) {
		return (
			<div className="min-h-screen pt-16 grid place-items-center px-4">
				<div className="text-center">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
					<p className="text-muted-foreground">Chargement...</p>
				</div>
			</div>
		);
	}

	if (!token) {
		useRouter().push("/login");
		return null;
	}

	return (
		<div className="min-h-screen pt-16 grid place-items-center px-4">
			<div className="w-full max-w-md opacity-0 animate-[fade-up_600ms_ease-out_forwards]">
				<Card
					className="backdrop-blur bg-background/60 shadow-xl"
					style={{ border: "1px solid hsl(0 0% 50% / .6)" }}
				>
					<CardHeader>
						<CardTitle className="text-2xl">
							🔐 Réinitialiser le mot de passe
						</CardTitle>
						<p className="text-sm text-muted-foreground">
							Choisissez un nouveau mot de passe sécurisé
						</p>
					</CardHeader>
					<CardContent>
						<form className="space-y-4">
							<div>
								<Label htmlFor="password">
									Nouveau mot de passe
								</Label>
								<Input
									id="password"
									type="password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									placeholder="Minimum 6 caractères"
									required
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
									placeholder="Répétez votre mot de passe"
									required
								/>
							</div>
							<StatefulButton
								onClick={handleResetPassword}
								className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-medium"
							>
								Réinitialiser le mot de passe
							</StatefulButton>
						</form>
						{error && (
							<p className="text-sm text-red-500 mt-2">{error}</p>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

export default function ResetPasswordPage() {
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
			<Suspense
				fallback={
					<div className="min-h-screen pt-16 grid place-items-center px-4">
						<div className="text-center">
							<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
							<p className="text-muted-foreground">
								Chargement...
							</p>
						</div>
					</div>
				}
			>
				<ResetPasswordForm />
			</Suspense>
		</>
	);
}
