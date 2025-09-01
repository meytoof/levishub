import { authOptions } from "@/lib/auth";
import { sendInvitationEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// GET /api/admin/invitations - Liste toutes les invitations
export async function GET() {
	const session = await getServerSession(authOptions);
	if (!session || session.user.role !== "ADMIN") {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const invitations = await prisma.invitation.findMany({
			include: {
				client: {
					select: {
						name: true,
						companyName: true,
					},
				},
				createdBy: {
					select: {
						name: true,
						email: true,
					},
				},
			},
			orderBy: { createdAt: "desc" },
		});

		return NextResponse.json(invitations);
	} catch (error) {
		console.error("Erreur lors de la récupération des invitations:", error);
		return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
	}
}

// POST /api/admin/invitations - Créer une invitation
export async function POST(req: Request) {
	const session = await getServerSession(authOptions);
	if (!session || session.user.role !== "ADMIN") {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const { clientId, email } = await req.json();

		if (!clientId || !email) {
			return NextResponse.json(
				{ error: "clientId et email sont requis" },
				{ status: 400 }
			);
		}

		// Vérifier que le client existe
		const client = await prisma.client.findUnique({
			where: { id: clientId },
		});

		if (!client) {
			return NextResponse.json(
				{ error: "Client non trouvé" },
				{ status: 404 }
			);
		}

		// Vérifier qu'il n'y a pas déjà une invitation en cours pour cet email
		const existingInvitation = await prisma.invitation.findFirst({
			where: {
				email,
				status: "PENDING",
				expiresAt: { gt: new Date() },
			},
		});

		if (existingInvitation) {
			return NextResponse.json(
				{ error: "Une invitation est déjà en cours pour cet email" },
				{ status: 400 }
			);
		}

		// Générer un token unique
		const token = randomBytes(32).toString("hex");
		const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 jours

		const invitation = await prisma.invitation.create({
			data: {
				clientId,
				email,
				token,
				expiresAt,
				createdByUserId: session.user.id,
			},
		});

		// Envoyer l'email d'invitation
		const invitationUrl = `${
			process.env.NEXTAUTH_URL || "http://localhost:3000"
		}/invite/${token}`;

		const emailResult = await sendInvitationEmail({
			to: email,
			companyName: client.companyName,
			inviterName: session.user.name || "Administrateur",
			invitationUrl,
			expiresAt,
		});

		if (!emailResult.success) {
			console.error("Erreur envoi email:", emailResult.error);
			// On supprime l'invitation si l'email n'a pas pu être envoyé
			await prisma.invitation.delete({
				where: { id: invitation.id },
			});
			return NextResponse.json(
				{ error: "Erreur lors de l'envoi de l'email" },
				{ status: 500 }
			);
		}

		return NextResponse.json(
			{
				...invitation,
				inviteUrl: invitationUrl,
				emailSent: true,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Erreur lors de la création de l'invitation:", error);
		return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
	}
}
