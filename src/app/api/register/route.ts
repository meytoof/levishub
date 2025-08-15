import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { name, email, password } = await req.json();
		if (!email || !password)
			return NextResponse.json(
				{ error: "Missing fields" },
				{ status: 400 }
			);
		const exists = await prisma.user.findUnique({ where: { email } });
		if (exists)
			return NextResponse.json({ error: "User exists" }, { status: 400 });
		const hashedPassword = await hash(password, 10);
		await prisma.user.create({
			data: { name, email, hashedPassword, role: "CLIENT" },
		});
		return NextResponse.json({ ok: true });
	} catch (e) {
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
