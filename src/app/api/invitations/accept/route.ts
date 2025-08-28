import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

// POST /api/invitations/accept - Accepter une invitation
export async function POST(req: Request) {
	try {
		const { token, password, name } = await req.json();

		if (!token || !password || !name) {
			return NextResponse.json(
				{ error: "Token, mot de passe et nom sont requis" },
				{ status: 400 }
			);
		}

		// Vérifier que l'invitation existe et est valide
		const invitation = await prisma.invitation.findUnique({
			where: { token },
			include: { client: true },
		});

		if (!invitation) {
			return NextResponse.json(
				{ error: "Invitation invalide" },
				{ status: 400 }
			);
		}

		if (invitation.status !== "PENDING") {
			return NextResponse.json(
				{ error: "Cette invitation a déjà été utilisée ou a expiré" },
				{ status: 400 }
			);
		}

		if (invitation.expiresAt < new Date()) {
			return NextResponse.json(
				{ error: "Cette invitation a expiré" },
				{ status: 400 }
			);
		}

		// Vérifier qu'il n'y a pas déjà un utilisateur avec cet email
		const existingUser = await prisma.user.findUnique({
			where: { email: invitation.email },
		});

		if (existingUser) {
			return NextResponse.json(
				{ error: "Un compte existe déjà avec cet email" },
				{ status: 400 }
			);
		}

		// Hasher le mot de passe
		const hashedPassword = await hash(password, 10);

		// Créer l'utilisateur et lier au client
		const user = await prisma.user.create({
			data: {
				name,
				email: invitation.email,
				hashedPassword,
				role: "CLIENT",
				clientId: invitation.clientId,
			},
		});

		// Marquer l'invitation comme acceptée
		await prisma.invitation.update({
			where: { id: invitation.id },
			data: {
				status: "ACCEPTED",
				acceptedAt: new Date(),
			},
		});

		return NextResponse.json({
			success: true,
			message: "Compte créé avec succès",
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		});
	} catch (error) {
		console.error("Erreur lors de l'acceptation de l'invitation:", error);
		return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
	}
}
