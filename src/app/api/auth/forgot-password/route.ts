import { sendPasswordResetEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const { email } = await request.json();

		if (!email) {
			return NextResponse.json(
				{ error: "Email requis" },
				{ status: 400 }
			);
		}

		// Vérifier si l'utilisateur existe
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			// Pour des raisons de sécurité, on ne révèle pas si l'email existe ou non
			return NextResponse.json(
				{
					message:
						"Si cet email existe, un lien de réinitialisation a été envoyé.",
				},
				{ status: 200 }
			);
		}

		// Générer un token unique
		const token = randomBytes(32).toString("hex");
		const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 heures

		// Supprimer les anciens tokens de reset pour cet utilisateur
		await prisma.passwordReset.deleteMany({
			where: { userId: user.id },
		});

		// Créer le nouveau token de reset
		await prisma.passwordReset.create({
			data: {
				userId: user.id,
				token,
				expiresAt,
			},
		});

		// Construire l'URL de reset
		const resetUrl = `${
			process.env.NEXTAUTH_URL || "http://localhost:3000"
		}/reset-password?token=${token}`;

		// Envoyer l'email
		const emailResult = await sendPasswordResetEmail({
			to: email,
			resetUrl,
			expiresAt,
		});

		if (!emailResult.success) {
			console.error("Erreur envoi email reset:", emailResult.error);
			return NextResponse.json(
				{ error: "Erreur lors de l'envoi de l'email" },
				{ status: 500 }
			);
		}

		return NextResponse.json({
			message:
				"Si cet email existe, un lien de réinitialisation a été envoyé.",
		});
	} catch (error) {
		console.error("Erreur forgot password:", error);
		return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
	}
}
