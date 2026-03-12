import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		// Protection par token secret
		const { token, email, password, name } = await request.json();
		const seedToken = process.env.SEED_TOKEN;

		if (!seedToken || token !== seedToken) {
			return NextResponse.json(
				{ success: false, error: "Non autorisé" },
				{ status: 401 }
			);
		}

		if (!email || !password) {
			return NextResponse.json(
				{ success: false, error: "Email et mot de passe requis" },
				{ status: 400 }
			);
		}

		const hashedPassword = await hash(password, 12);

		const admin = await prisma.user.upsert({
			where: { email },
			update: {},
			create: {
				name: name || "Administrateur LevisWeb",
				email,
				hashedPassword,
				role: "ADMIN",
				emailVerified: new Date(),
			},
		});

		return NextResponse.json({
			success: true,
			message: "Administrateur créé avec succès",
			email: admin.email,
		});
	} catch (error) {
		console.error("Erreur lors de la création:", error);
		return NextResponse.json(
			{ success: false, error: "Erreur lors de la création" },
			{ status: 500 }
		);
	}
}
