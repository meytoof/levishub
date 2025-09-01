import { authOptions } from "@/lib/auth";
import { sendTicketNotification } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// GET - Récupérer les tickets (admin: tous, client: seulement les siens)
export async function GET(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);
		if (!session) {
			return NextResponse.json(
				{ error: "Non autorisé" },
				{ status: 401 }
			);
		}

		const { searchParams } = new URL(request.url);
		const status = searchParams.get("status");
		const priority = searchParams.get("priority");
		const page = parseInt(searchParams.get("page") || "1");
		const limit = parseInt(searchParams.get("limit") || "10");
		const skip = (page - 1) * limit;

		// Construire les filtres
		const where: any = {};

		if (status) where.status = status;
		if (priority) where.priority = priority;

		// Si c'est un client, filtrer seulement ses tickets
		if (session.user.role === "CLIENT") {
			const user = await prisma.user.findUnique({
				where: { id: session.user.id },
				include: { client: true },
			});
			if (user?.clientId) {
				where.clientId = user.clientId;
			}
		}

		// Récupérer les tickets avec pagination
		const [tickets, total] = await Promise.all([
			prisma.ticket.findMany({
				where,
				include: {
					client: {
						select: {
							id: true,
							companyName: true,
							primaryEmail: true,
						},
					},
					createdBy: {
						select: {
							id: true,
							name: true,
							email: true,
						},
					},
				},
				orderBy: { createdAt: "desc" },
				skip,
				take: limit,
			}),
			prisma.ticket.count({ where }),
		]);

		return NextResponse.json({
			tickets,
			pagination: {
				page,
				limit,
				total,
				pages: Math.ceil(total / limit),
			},
		});
	} catch (error) {
		console.error("Erreur récupération tickets:", error);
		return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
	}
}

// POST - Créer un nouveau ticket
export async function POST(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);
		if (!session) {
			return NextResponse.json(
				{ error: "Non autorisé" },
				{ status: 401 }
			);
		}

		const body = await request.json();
		const { title, description, priority = "MEDIUM" } = body;

		// Validation des données
		if (!title || !description) {
			return NextResponse.json(
				{ error: "Titre et description requis" },
				{ status: 400 }
			);
		}

		// Récupérer les informations du client
		const user = await prisma.user.findUnique({
			where: { id: session.user.id },
			include: { client: true },
		});

		if (!user?.clientId) {
			return NextResponse.json(
				{ error: "Client non trouvé" },
				{ status: 400 }
			);
		}

		// Créer le ticket
		const ticket = await prisma.ticket.create({
			data: {
				title,
				description,
				priority,
				clientId: user.clientId,
				createdByUserId: session.user.id,
			},
			include: {
				client: {
					select: {
						id: true,
						companyName: true,
						primaryEmail: true,
					},
				},
				createdBy: {
					select: {
						id: true,
						name: true,
						email: true,
					},
				},
			},
		});

		// Envoyer la notification email à l'admin
		try {
			await sendTicketNotification({
				to: "quentinlevis@gmail.com", // Email de l'admin
				ticketTitle: ticket.title,
				ticketStatus: "OPEN",
				companyName: ticket.client.companyName,
				ticketUrl: `${
					process.env.NEXTAUTH_URL || "http://localhost:3000"
				}/admin/tickets`,
			});
		} catch (emailError) {
			console.error("Erreur envoi notification email:", emailError);
			// Ne pas faire échouer la création du ticket si l'email échoue
		}

		return NextResponse.json(ticket, { status: 201 });
	} catch (error) {
		console.error("Erreur création ticket:", error);
		return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
	}
}
