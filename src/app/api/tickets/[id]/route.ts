import { authOptions } from "@/lib/auth";
import { sendTicketUpdateNotification } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// GET - Récupérer un ticket spécifique
export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const session = await getServerSession(authOptions);
		if (!session) {
			return NextResponse.json(
				{ error: "Non autorisé" },
				{ status: 401 }
			);
		}

		const ticket = await prisma.ticket.findUnique({
			where: { id: params.id },
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

		if (!ticket) {
			return NextResponse.json(
				{ error: "Ticket non trouvé" },
				{ status: 404 }
			);
		}

		// Vérifier que l'utilisateur peut accéder à ce ticket
		if (session.user.role === "CLIENT") {
			const user = await prisma.user.findUnique({
				where: { id: session.user.id },
				include: { client: true },
			});
			if (user?.clientId !== ticket.clientId) {
				return NextResponse.json(
					{ error: "Accès refusé" },
					{ status: 403 }
				);
			}
		}

		return NextResponse.json(ticket);
	} catch (error) {
		console.error("Erreur récupération ticket:", error);
		return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
	}
}

// PATCH - Mettre à jour un ticket
export async function PATCH(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const session = await getServerSession(authOptions);
		if (!session) {
			return NextResponse.json(
				{ error: "Non autorisé" },
				{ status: 401 }
			);
		}

		const body = await request.json();
		const { status, priority, adminMessage } = body;

		// Récupérer le ticket actuel
		const currentTicket = await prisma.ticket.findUnique({
			where: { id: params.id },
			include: {
				client: {
					select: {
						id: true,
						companyName: true,
						primaryEmail: true,
					},
				},
			},
		});

		if (!currentTicket) {
			return NextResponse.json(
				{ error: "Ticket non trouvé" },
				{ status: 404 }
			);
		}

		// Seuls les admins peuvent modifier le statut et la priorité
		if (session.user.role !== "ADMIN") {
			return NextResponse.json(
				{ error: "Accès refusé" },
				{ status: 403 }
			);
		}

		// Préparer les données de mise à jour
		const updateData: any = {};
		if (status) updateData.status = status;
		if (priority) updateData.priority = priority;

		// Mettre à jour le ticket
		const updatedTicket = await prisma.ticket.update({
			where: { id: params.id },
			data: updateData,
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

		// Envoyer la notification email au client si le statut a changé
		if (status && status !== currentTicket.status) {
			try {
				await sendTicketUpdateNotification({
					ticketId: updatedTicket.id,
					title: updatedTicket.title,
					status: updatedTicket.status as any,
					priority: updatedTicket.priority as any,
					clientName: updatedTicket.client.companyName,
					clientEmail: updatedTicket.client.primaryEmail,
					updatedAt: updatedTicket.updatedAt,
					adminMessage,
				});
			} catch (emailError) {
				console.error("Erreur envoi notification email:", emailError);
			}
		}

		return NextResponse.json(updatedTicket);
	} catch (error) {
		console.error("Erreur mise à jour ticket:", error);
		return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
	}
}

// DELETE - Supprimer un ticket (admin seulement)
export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const session = await getServerSession(authOptions);
		if (!session || session.user.role !== "ADMIN") {
			return NextResponse.json(
				{ error: "Non autorisé" },
				{ status: 401 }
			);
		}

		await prisma.ticket.delete({
			where: { id: params.id },
		});

		return NextResponse.json({ message: "Ticket supprimé" });
	} catch (error) {
		console.error("Erreur suppression ticket:", error);
		return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
	}
}
