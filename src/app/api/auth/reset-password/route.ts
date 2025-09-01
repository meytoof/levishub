import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const { token, password } = await request.json();

		if (!token || !password) {
			return NextResponse.json(
				{ error: "Token et mot de passe requis" },
				{ status: 400 }
			);
		}

		if (password.length < 6) {
			return NextResponse.json(
				{
					error: "Le mot de passe doit contenir au moins 6 caractères",
				},
				{ status: 400 }
			);
		}

		// Rechercher le token de reset
		const passwordReset = await prisma.passwordReset.findUnique({
			where: { token },
			include: { user: true },
		});

		if (!passwordReset) {
			return NextResponse.json(
				{ error: "Token de réinitialisation invalide" },
				{ status: 400 }
			);
		}

		if (passwordReset.used) {
			return NextResponse.json(
				{ error: "Ce token a déjà été utilisé" },
				{ status: 400 }
			);
		}

		if (passwordReset.expiresAt < new Date()) {
			return NextResponse.json(
				{ error: "Ce token a expiré" },
				{ status: 400 }
			);
		}

		// Hasher le nouveau mot de passe
		const hashedPassword = await hash(password, 12);

		// Mettre à jour le mot de passe de l'utilisateur
		await prisma.user.update({
			where: { id: passwordReset.userId },
			data: { hashedPassword },
		});

		// Marquer le token comme utilisé
		await prisma.passwordReset.update({
			where: { id: passwordReset.id },
			data: { used: true },
		});

		// Supprimer toutes les sessions de l'utilisateur pour forcer une nouvelle connexion
		await prisma.session.deleteMany({
			where: { userId: passwordReset.userId },
		});

		return NextResponse.json({
			message: "Mot de passe réinitialisé avec succès",
		});
	} catch (error) {
		console.error("Erreur reset password:", error);
		return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
	}
}
