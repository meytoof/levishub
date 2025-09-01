import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		console.log("=== DÉBUT API REGISTER ===");
		const { name, email, password, invitationToken } = await request.json();

		// Debug: Afficher les données reçues
		console.log("Données reçues:", {
			name,
			email,
			password: password ? "***" : "undefined",
			invitationToken,
		});

		// Validation des données
		if (!name || !email || !password || !invitationToken) {
			console.log("Validation échouée:", {
				hasName: !!name,
				hasEmail: !!email,
				hasPassword: !!password,
				hasToken: !!invitationToken,
			});
			return NextResponse.json(
				{ error: "Tous les champs sont requis" },
				{ status: 400 }
			);
		}

		console.log("✅ Validation des champs OK");

		// Valider l'invitation d'abord
		console.log("🔍 Validation de l'invitation...");
		const invitation = await prisma.invitation.findUnique({
			where: { token: invitationToken },
			include: { client: true },
		});

		if (!invitation) {
			console.log("❌ Invitation non trouvée");
			return NextResponse.json(
				{ error: "Invitation invalide" },
				{ status: 400 }
			);
		}

		console.log("✅ Invitation trouvée:", invitation.id);

		if (invitation.status === "ACCEPTED") {
			console.log("❌ Invitation déjà utilisée");
			return NextResponse.json(
				{ error: "Invitation déjà utilisée" },
				{ status: 400 }
			);
		}

		if (invitation.expiresAt < new Date()) {
			console.log("❌ Invitation expirée");
			return NextResponse.json(
				{ error: "Invitation expirée" },
				{ status: 400 }
			);
		}

		if (invitation.email !== email) {
			console.log("❌ Email ne correspond pas");
			return NextResponse.json(
				{ error: "L'email ne correspond pas à l'invitation" },
				{ status: 400 }
			);
		}

		console.log("✅ Invitation valide");

		// Vérifier que l'utilisateur n'existe pas déjà (après validation de l'invitation)
		console.log("🔍 Vérification utilisateur existant...");
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			console.log("❌ Utilisateur déjà créé avec cet email");
			return NextResponse.json(
				{ error: "Un compte utilisateur existe déjà avec cet email" },
				{ status: 400 }
			);
		}

		console.log("✅ Email disponible pour création d'utilisateur");

		// Hasher le mot de passe
		console.log("🔐 Hashage du mot de passe...");
		const hashedPassword = await hash(password, 12);
		console.log("✅ Mot de passe hashé");

		// Créer l'utilisateur
		console.log("👤 Création de l'utilisateur...");
		const user = await prisma.user.create({
			data: {
				name,
				email,
				hashedPassword: hashedPassword,
				role: "CLIENT",
				clientId: invitation.clientId,
			},
		});

		console.log("✅ Utilisateur créé:", user.id);

		// Marquer l'invitation comme utilisée
		console.log("📝 Marquage de l'invitation comme utilisée...");
		await prisma.invitation.update({
			where: { id: invitation.id },
			data: {
				status: "ACCEPTED",
				acceptedAt: new Date(),
			},
		});

		console.log("✅ Invitation marquée comme utilisée");

		console.log("=== FIN API REGISTER - SUCCÈS ===");

		return NextResponse.json(
			{
				message: "Compte créé avec succès",
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
					role: user.role,
				},
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("=== ERREUR API REGISTER ===");
		console.error("Erreur complète:", error);
		console.error(
			"Stack trace:",
			error instanceof Error ? error.stack : "Pas de stack trace"
		);
		console.error("=== FIN ERREUR ===");
		return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
	}
}
