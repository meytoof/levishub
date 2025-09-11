"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
					setInvitation(data.invitation);
				}
			})
			.catch(() => {
				setError("Erreur lors de la validation de l'invitation");
			})
			.finally(() => {
				setLoading(false);
			});
	}, [token]);

	const handleAcceptInvitation = () => {
		// Rediriger vers la page d'inscription avec le token
		router.push(`/register?token=${token}`);
	};

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
							🎉 Invitation acceptée !
						</CardTitle>
						<p className="text-muted-foreground">
							Vous avez été invité à rejoindre{" "}
							<span className="font-semibold">
								{invitation.client.companyName}
							</span>
						</p>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
							<h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
								📧 Email : {invitation.email}
							</h3>
							<p className="text-sm text-blue-800 dark:text-blue-200">
								Cet email sera utilisé pour votre compte
								LevisWeb
							</p>
						</div>

						<div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
							<h3 className="font-medium text-green-900 dark:text-green-100 mb-2">
								✅ Invitation valide
							</h3>
							<p className="text-sm text-green-800 dark:text-green-200">
								Expire le{" "}
								{new Date(
									invitation.expiresAt
								).toLocaleDateString("fr-FR")}
							</p>
						</div>

						<Button
							onClick={handleAcceptInvitation}
							className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium"
						>
							🚀 Créer mon compte
						</Button>

						<p className="text-xs text-muted-foreground text-center">
							Vous serez redirigé vers le formulaire de création
							de compte
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
