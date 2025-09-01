import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const token = searchParams.get("token");

	if (!token) {
		return NextResponse.json(
			{ error: "Token d'invitation requis" },
			{ status: 400 }
		);
	}

	try {
		// Rechercher l'invitation par token
		const invitation = await prisma.invitation.findUnique({
			where: { token },
			include: {
				client: {
					select: {
						id: true,
						name: true,
						companyName: true,
						primaryEmail: true,
					},
				},
			},
		});

		if (!invitation) {
			return NextResponse.json(
				{ error: "Invitation invalide" },
				{ status: 404 }
			);
		}

		// Vérifier si l'invitation a expiré
		if (invitation.expiresAt < new Date()) {
			return NextResponse.json(
				{ error: "Invitation expirée" },
				{ status: 410 }
			);
		}

		// Vérifier si l'invitation a déjà été utilisée
		if (invitation.status === "ACCEPTED") {
			return NextResponse.json(
				{ error: "Invitation déjà utilisée" },
				{ status: 409 }
			);
		}

		return NextResponse.json({
			invitation: {
				id: invitation.id,
				email: invitation.email,
				expiresAt: invitation.expiresAt,
				client: invitation.client,
			},
		});
	} catch (error) {
		console.error("Erreur validation invitation:", error);
		return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
	}
}
