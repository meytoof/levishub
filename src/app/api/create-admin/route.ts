import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
	try {
		const hashedPassword = await bcrypt.hash("admin123", 10);

		const admin = await prisma.user.upsert({
			where: { email: "admin@levishub.com" },
			update: {},
			create: {
				name: "Administrateur LevisHub",
				email: "admin@levishub.com",
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
	} finally {
		await prisma.$disconnect();
	}
}
