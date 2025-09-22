import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const session = await getServerSession(authOptions);
		if (!session || !session.user?.id) {
			return NextResponse.json(
				{ error: "Non authentifié" },
				{ status: 401 }
			);
		}

		const { currentPassword, newPassword } = await req.json();
		if (!currentPassword || !newPassword || newPassword.length < 6) {
			return NextResponse.json(
				{ error: "Champs invalides" },
				{ status: 400 }
			);
		}

		const user = await prisma.user.findUnique({
			where: { id: session.user.id },
		});
		if (!user || !user.hashedPassword) {
			return NextResponse.json(
				{ error: "Utilisateur introuvable" },
				{ status: 404 }
			);
		}

		const ok = await bcrypt.compare(currentPassword, user.hashedPassword);
		if (!ok) {
			return NextResponse.json(
				{ error: "Mot de passe actuel incorrect" },
				{ status: 400 }
			);
		}

		const hashed = await bcrypt.hash(newPassword, 10);
		await prisma.user.update({
			where: { id: user.id },
			data: { hashedPassword: hashed },
		});

		return NextResponse.json({ success: true });
	} catch (err) {
		return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
	}
}
