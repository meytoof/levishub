import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/invitations/validate?token=... - Valider une invitation
export async function GET(request: NextRequest) {
	try {
		const token = request.nextUrl.searchParams.get("token");

		if (!token) {
			return NextResponse.json(
				{ error: "Token manquant" },
				{ status: 400 }
			);
		}

		const invitation = await prisma.invitation.findUnique({
			where: { token },
			include: {
				client: {
					select: {
						name: true,
						companyName: true,
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

		if (invitation.status !== "PENDING") {
			return NextResponse.json(
				{ error: "Cette invitation a déjà été utilisée" },
				{ status: 400 }
			);
		}

		if (invitation.expiresAt < new Date()) {
			return NextResponse.json(
				{ error: "Cette invitation a expiré" },
				{ status: 400 }
			);
		}

		return NextResponse.json({
			client: invitation.client,
			email: invitation.email,
			expiresAt: invitation.expiresAt,
		});
	} catch (error) {
		console.error("Erreur lors de la validation de l'invitation:", error);
		return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
	}
}
