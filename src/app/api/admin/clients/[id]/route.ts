import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// GET /api/admin/clients/[id] - Récupérer un client spécifique
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;
	try {
		const session = await getServerSession(authOptions);
		if (!session || session.user.role !== "ADMIN") {
			return NextResponse.json(
				{ error: "Accès non autorisé" },
				{ status: 401 }
			);
		}

		const client = await prisma.client.findUnique({
			where: { id },
			include: {
				users: {
					select: {
						id: true,
						name: true,
						email: true,
						role: true,
						createdAt: true,
					},
				},
				invitations: {
					select: {
						id: true,
						email: true,
						token: true,
						status: true,
						expiresAt: true,
						createdAt: true,
					},
				},
				tickets: {
					select: {
						id: true,
						title: true,
						status: true,
						priority: true,
						createdAt: true,
					},
					orderBy: { createdAt: "desc" },
					take: 5,
				},
				sites: {
					select: {
						id: true,
						name: true,
						domain: true,
						isActive: true,
						createdAt: true,
					},
				},
				invoices: {
					select: {
						id: true,
						status: true,
						amountDue: true,
						amountPaid: true,
						createdAt: true,
					},
					orderBy: { createdAt: "desc" },
					take: 5,
				},
			},
		});

		if (!client) {
			return NextResponse.json(
				{ error: "Client non trouvé" },
				{ status: 404 }
			);
		}

		return NextResponse.json(client);
	} catch (error) {
		console.error("Erreur récupération client:", error);
		return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
	}
}

// PUT /api/admin/clients/[id] - Mettre à jour un client
export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;
	try {
		const session = await getServerSession(authOptions);
		if (!session || session.user.role !== "ADMIN") {
			return NextResponse.json(
				{ error: "Accès non autorisé" },
				{ status: 401 }
			);
		}

		const { name, companyName, primaryEmail, isActive } =
			await request.json();

		// Validation
		if (!name || !companyName || !primaryEmail) {
			return NextResponse.json(
				{ error: "Tous les champs obligatoires doivent être remplis" },
				{ status: 400 }
			);
		}

		// Vérifier si l'email existe déjà (sauf pour ce client)
		const existingClient = await prisma.client.findFirst({
			where: {
				primaryEmail,
				id: { not: id },
			},
		});

		if (existingClient) {
			return NextResponse.json(
				{ error: "Cet email est déjà utilisé par un autre client" },
				{ status: 400 }
			);
		}

		const updatedClient = await prisma.client.update({
			where: { id },
			data: {
				name,
				companyName,
				primaryEmail,
				isActive: isActive ?? true,
			},
		});

		return NextResponse.json(updatedClient);
	} catch (error) {
		console.error("Erreur mise à jour client:", error);
		return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
	}
}

// DELETE /api/admin/clients/[id] - Supprimer un client
export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;
	try {
		const session = await getServerSession(authOptions);
		if (!session || session.user.role !== "ADMIN") {
			return NextResponse.json(
				{ error: "Accès non autorisé" },
				{ status: 401 }
			);
		}

		// Vérifier si le client existe
		const client = await prisma.client.findUnique({
			where: { id },
			include: {
				_count: {
					select: {
						users: true,
						tickets: true,
						sites: true,
						invoices: true,
					},
				},
			},
		});

		if (!client) {
			return NextResponse.json(
				{ error: "Client non trouvé" },
				{ status: 404 }
			);
		}

		// Vérifier s'il y a des données associées
		const hasData =
			client._count.users > 0 ||
			client._count.tickets > 0 ||
			client._count.sites > 0 ||
			client._count.invoices > 0;

		if (hasData) {
			return NextResponse.json(
				{
					error: "Impossible de supprimer ce client car il a des données associées (utilisateurs, tickets, sites, factures). Désactivez-le à la place.",
				},
				{ status: 400 }
			);
		}

		// Supprimer le client et toutes ses données associées
		await prisma.client.delete({
			where: { id },
		});

		return NextResponse.json(
			{ message: "Client supprimé avec succès" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Erreur suppression client:", error);
		return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
	}
}
