import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
        const hashedPassword = await hash("admin123", 12);

		const admin = await prisma.user.upsert({
			where: { email: "admin@levisweb.com" },
			update: {},
			create: {
				name: "Administrateur LevisWeb",
				email: "admin@levisweb.com",
				hashedPassword: hashedPassword,
				role: "ADMIN",
				emailVerified: new Date(),
			},
		});

		return NextResponse.json({
			success: true,
			message: "Administrateur créé avec succès",
			email: admin.email,
			password: "admin123",
		});
    } catch (error) {
		console.error("Erreur lors de la création:", error);
		return NextResponse.json(
			{ success: false, error: "Erreur lors de la création" },
			{ status: 500 }
		);
    }
}
