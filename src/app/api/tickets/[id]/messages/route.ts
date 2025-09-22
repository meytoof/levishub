import { authOptions } from "@/lib/auth";
import { sendTicketMessageNotification } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// GET - Liste des messages d'un ticket
export async function GET(request: NextRequest, context: any) {
	const { id } = context.params as { id: string };
	try {
		const session = await getServerSession(authOptions);
		if (!session) {
			return NextResponse.json(
				{ error: "Non autorisé" },
				{ status: 401 }
			);
		}

		const ticket = await prisma.ticket.findUnique({ where: { id } });
		if (!ticket) {
			return NextResponse.json(
				{ error: "Ticket non trouvé" },
				{ status: 404 }
			);
		}

		// Contrôle d'accès multi-tenant: un client ne voit que ses tickets
		if (session.user.role === "CLIENT") {
			const user = await prisma.user.findUnique({
				where: { id: session.user.id },
				include: { client: true },
			});
			if (!user?.clientId || user.clientId !== ticket.clientId) {
				return NextResponse.json(
					{ error: "Accès refusé" },
					{ status: 403 }
				);
			}
		}

		const messages = await prisma.ticketMessage.findMany({
			where: { ticketId: id },
			include: {
				sender: {
					select: { id: true, name: true, email: true, role: true },
				},
			},
			orderBy: { createdAt: "asc" },
		});

		return NextResponse.json({ messages });
	} catch (error) {
		console.error("Erreur récupération messages:", error);
		return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
	}
}

// POST - Ajouter un message à un ticket
export async function POST(request: NextRequest, context: any) {
	const { id } = context.params as { id: string };
	try {
		const session = await getServerSession(authOptions);
		if (!session) {
			return NextResponse.json(
				{ error: "Non autorisé" },
				{ status: 401 }
			);
		}

		const { body } = await request.json();
		if (!body || typeof body !== "string" || !body.trim()) {
			return NextResponse.json(
				{ error: "Message requis" },
				{ status: 400 }
			);
		}

		const ticket = await prisma.ticket.findUnique({ where: { id } });
		if (!ticket) {
			return NextResponse.json(
				{ error: "Ticket non trouvé" },
				{ status: 404 }
			);
		}

		// Contrôle d'accès: le client ne peut poster que sur ses tickets
		if (session.user.role === "CLIENT") {
			const user = await prisma.user.findUnique({
				where: { id: session.user.id },
				include: { client: true },
			});
			if (!user?.clientId || user.clientId !== ticket.clientId) {
				return NextResponse.json(
					{ error: "Accès refusé" },
					{ status: 403 }
				);
			}
		}

		const message = await prisma.ticketMessage.create({
			data: {
				ticketId: id,
				senderId: session.user.id,
				body: body.trim(),
			},
		});

		// Mise à jour du statut si client envoie un message et ticket est RESOLVED/CLOSED → repasse IN_PROGRESS
		if (
			session.user.role === "CLIENT" &&
			["RESOLVED", "CLOSED"].includes(String(ticket.status))
		) {
			await prisma.ticket.update({
				where: { id },
				data: { status: "IN_PROGRESS" },
			});
		}

		// Notifications email
		try {
            const messagePreview = body.trim().slice(0, 200);
            const baseUrl = process.env.NEXTAUTH_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
			if (session.user.role === "CLIENT") {
                const adminEmail =
                    process.env.ADMIN_EMAIL || "quentinlevis@gmail.com";
				await sendTicketMessageNotification({
					to: adminEmail,
                    ticketTitle: `Nouveau message client`,
					messagePreview,
					companyName: String(ticket.clientId),
					ticketUrl: `${baseUrl}/admin/tickets`,
				});
			} else if (session.user.role === "ADMIN") {
                const fullTicket = await prisma.ticket.findUnique({
                    where: { id },
                    include: { client: true },
                });
				if (fullTicket?.client?.primaryEmail) {
					await sendTicketMessageNotification({
						to: fullTicket.client.primaryEmail,
                        ticketTitle: `Réponse de l'admin sur votre ticket`,
						messagePreview,
						companyName: fullTicket.client.companyName,
						ticketUrl: `${baseUrl}/dashboard/tickets/${id}`,
					});
				}
			}
		} catch (emailError) {
			console.error("Erreur notification message:", emailError);
		}

		return NextResponse.json({ message }, { status: 201 });
	} catch (error) {
		console.error("Erreur ajout message:", error);
		return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
	}
}
