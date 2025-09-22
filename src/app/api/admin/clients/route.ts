import { authOptions } from "@/lib/auth";
import { sendInvitationEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// GET /api/admin/clients - Récupérer tous les clients
export async function GET(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);
		if (!session || session.user.role !== "ADMIN") {
			return NextResponse.json(
				{ error: "Accès non autorisé" },
				{ status: 401 }
			);
		}

		const clients = await prisma.client.findMany({
			orderBy: { createdAt: "desc" },
			include: {
				users: {
					select: {
						id: true,
						name: true,
						email: true,
						role: true,
					},
				},
				invitations: {
					select: {
						id: true,
						email: true,
						token: true,
						status: true,
						expiresAt: true,
					},
				},
				_count: {
					select: {
						users: true,
						sites: true,
						tickets: true,
						invoices: true,
					},
				},
			},
		});

		return NextResponse.json(clients);
	} catch (error) {
		console.error("Erreur récupération clients:", error);
		return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
	}
}

// POST /api/admin/clients - Créer un nouveau client
export async function POST(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);
		if (!session || session.user.role !== "ADMIN") {
			return NextResponse.json(
				{ error: "Accès non autorisé" },
				{ status: 401 }
			);
		}

		const { name, companyName, primaryEmail } = await request.json();

		// Validation
		if (!name || !companyName || !primaryEmail) {
			return NextResponse.json(
				{ error: "Tous les champs obligatoires doivent être remplis" },
				{ status: 400 }
			);
		}

		// Vérifier si l'email existe déjà
		const existingClient = await prisma.client.findUnique({
			where: { primaryEmail },
		});

		if (existingClient) {
			return NextResponse.json(
				{ error: "Un client avec cet email existe déjà" },
				{ status: 400 }
			);
		}

		// Créer le client
		const client = await prisma.client.create({
			data: {
				name,
				companyName,
				primaryEmail,
			},
		});

		// Créer une invitation automatique
		const token = randomBytes(32).toString("hex");
		const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 jours

		const invitation = await prisma.invitation.create({
			data: {
				clientId: client.id,
				email: client.primaryEmail,
				token,
				expiresAt,
				createdByUserId: session.user.id,
			},
		});

		// Envoyer l'email d'invitation
        const baseUrl = process.env.NEXTAUTH_URL || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";
		const invitationUrl = `${baseUrl}/invite/${token}`;

		const emailResult = await sendInvitationEmail({
			to: client.primaryEmail,
			companyName: client.companyName,
			inviterName: session.user.name || "Administrateur",
			invitationUrl,
			expiresAt,
		});

		if (!emailResult.success) {
			console.error("Erreur envoi email invitation:", emailResult.error);
			// Supprimer l'invitation si l'email n'a pas pu être envoyé
			await prisma.invitation.delete({
				where: { id: invitation.id },
			});
			return NextResponse.json(
				{
					error: "Client créé mais l'email d'invitation n'a pas pu être envoyé",
				},
				{ status: 500 }
			);
		}

		return NextResponse.json(client, { status: 201 });
	} catch (error) {
		console.error("Erreur création client:", error);
		return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
	}
}
