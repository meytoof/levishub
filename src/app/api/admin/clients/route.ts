import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// GET /api/admin/clients - Liste tous les clients
export async function GET() {
	const session = await getServerSession(authOptions);
	if (!session || session.user.role !== "ADMIN") {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const clients = await prisma.client.findMany({
			include: {
				users: {
					select: {
						id: true,
						name: true,
						email: true,
						role: true,
					},
				},
				_count: {
					select: {
						sites: true,
						tickets: true,
						invoices: true,
					},
				},
			},
			orderBy: { createdAt: "desc" },
		});

		return NextResponse.json(clients);
	} catch (error) {
		console.error("Erreur lors de la récupération des clients:", error);
		return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
	}
}

// POST /api/admin/clients - Créer un nouveau client
export async function POST(req: Request) {
	const session = await getServerSession(authOptions);
	if (!session || session.user.role !== "ADMIN") {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const { name, companyName, primaryEmail } = await req.json();

		if (!name || !companyName || !primaryEmail) {
			return NextResponse.json(
				{ error: "Tous les champs sont requis" },
				{ status: 400 }
			);
		}

		// Vérifier que l'email n'existe pas déjà
		const existingClient = await prisma.client.findUnique({
			where: { primaryEmail },
		});

		if (existingClient) {
			return NextResponse.json(
				{ error: "Un client avec cet email existe déjà" },
				{ status: 400 }
			);
		}

		const client = await prisma.client.create({
			data: {
				name,
				companyName,
				primaryEmail,
			},
		});

		return NextResponse.json(client, { status: 201 });
	} catch (error) {
		console.error("Erreur lors de la création du client:", error);
		return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
	}
}
