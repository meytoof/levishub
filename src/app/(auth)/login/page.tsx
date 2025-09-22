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
// import { StatefulButton } from "@/components/ui/stateful-button";
import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";

function LoginForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { data: session, status } = useSession();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [showForgotPassword, setShowForgotPassword] = useState(false);
	const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

	useEffect(() => {
		const message = searchParams.get("message");
		if (message) {
			toast.success(message);
		}
	}, [searchParams]);

	useEffect(() => {
		if (status === "authenticated" && session?.user) {
			const redirectPath =
				session.user.role === "ADMIN" ? "/admin" : "/dashboard";
			router.push(redirectPath);
		}
	}, [session, status, router]);

	async function handleLogin() {
		setError(null);
		if (!email.trim() || !password.trim()) {
			toast.error("Veuillez remplir tous les champs");
			return;
		}
		try {
			const res = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});
			if (res?.ok) {
				toast.success("Connexion réussie !");
				// Récupère la session pour connaître le rôle et rediriger immédiatement
				const newSession = await getSession();
				const redirectPath =
					newSession?.user?.role === "ADMIN"
						? "/admin"
						: "/dashboard";
				router.push(redirectPath);
			} else {
				throw new Error("Identifiants invalides");
			}
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Erreur de connexion";
			toast.error(errorMessage);
			setError(errorMessage);
			throw error;
		}
	}

	async function handleForgotPassword() {
		if (!forgotPasswordEmail.trim()) {
			toast.error("Veuillez entrer votre email");
			return;
		}
		try {
			const response = await fetch("/api/auth/forgot-password", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: forgotPasswordEmail }),
			});
			if (response.ok) {
				toast.success(
					"Si cet email existe, un lien de réinitialisation a été envoyé."
				);
				setShowForgotPassword(false);
				setForgotPasswordEmail("");
			} else {
				const errorData = await response.json();
				throw new Error(errorData.error || "Erreur lors de l'envoi");
			}
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Erreur lors de l'envoi";
			toast.error(errorMessage);
			throw error;
		}
	}

	if (status === "loading") {
		return (
			<div className="min-h-screen pt-16 grid place-items-center px-4">
				<div className="text-center">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
					<p className="text-muted-foreground">
						Vérification de la session...
					</p>
				</div>
			</div>
		);
	}
	if (status === "authenticated") return null;

	return (
		<div className="min-h-screen pt-16 grid place-items-center px-4">
			<div className="w-full max-w-md opacity-0 animate-[fade-up_600ms_ease-out_forwards]">
				<Card
					className="backdrop-blur bg-background/60 shadow-xl"
					style={{ border: "1px solid hsl(0 0% 50% / .6)" }}
				>
					<CardHeader>
						<CardTitle className="text-2xl">
							{showForgotPassword
								? "Mot de passe oublié"
								: "Connexion"}
						</CardTitle>
					</CardHeader>
					<CardContent>
						{!showForgotPassword ? (
							<>
								<form
									className="space-y-4"
									onSubmit={(e) => {
										e.preventDefault();
										handleLogin();
									}}
								>
									<div>
										<Label htmlFor="email">Email</Label>
										<Input
											id="email"
											type="email"
											name="email"
											autoComplete="email"
											autoFocus
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
											name="password"
											autoComplete="current-password"
											value={password}
											onChange={(e) =>
												setPassword(e.target.value)
											}
											required
										/>
									</div>
									<button
										type="submit"
										className="w-full relative inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus-visible:ring-blue-500 shadow-lg"
									>
										Se connecter
									</button>
								</form>
								{error && (
									<p className="text-sm text-red-500 mt-2">
										{error}
									</p>
								)}
								<div className="mt-4 text-center space-y-2">
									<p className="text-sm text-muted-foreground">
										Accès réservé aux utilisateurs autorisés
									</p>
									<button
										type="button"
										onClick={() =>
											setShowForgotPassword(true)
										}
										className="text-sm text-blue-600 hover:text-blue-700 underline"
									>
										Mot de passe oublié ?
									</button>
								</div>
							</>
						) : (
							<>
								<div className="space-y-4">
									<div>
										<Label htmlFor="forgotEmail">
											Email
										</Label>
										<Input
											id="forgotEmail"
											type="email"
											name="forgotEmail"
											autoComplete="email"
											value={forgotPasswordEmail}
											onChange={(e) =>
												setForgotPasswordEmail(
													e.target.value
												)
											}
											placeholder="Entrez votre email"
											required
										/>
									</div>
									<button
										type="button"
										onClick={handleForgotPassword}
										className="w-full relative inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-red-600 to-orange-600 text-white hover:from-red-700 hover:to-orange-700 focus-visible:ring-red-500 shadow-lg"
									>
										Envoyer le lien de réinitialisation
									</button>
								</div>
								<div className="mt-4 text-center">
									<button
										type="button"
										onClick={() =>
											setShowForgotPassword(false)
										}
										className="text-sm text-blue-600 hover:text-blue-700 underline"
									>
										Retour à la connexion
									</button>
								</div>
							</>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

export default function LoginPage() {
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
				<LoginForm />
			</Suspense>
		</>
	);
}
