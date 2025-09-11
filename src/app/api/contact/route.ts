import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
	try {
		const { name, email, message } = await request.json();
		if (!name || !email || !message) {
			return NextResponse.json(
				{ error: "Champs requis" },
				{ status: 400 }
			);
		}

		const resend = new Resend(process.env.RESEND_API_KEY);
		const from =
			process.env.RESEND_FROM || "LevisWeb <onboarding@resend.dev>";
		const to = process.env.CONTACT_TO || process.env.RESEND_TO || email;

		await resend.emails.send({
			from,
			to: [to],
			subject: `Nouveau message de contact — ${name}`,
			html: `
				<h2>Nouveau message de contact</h2>
				<p><strong>Nom:</strong> ${name}</p>
				<p><strong>Email:</strong> ${email}</p>
				<p><strong>Message:</strong></p>
				<p>${message.replace(/\n/g, "<br/>")}</p>
			`,
		});

		return NextResponse.json({ ok: true });
	} catch (err) {
		console.error("/api/contact error:", err);
		return NextResponse.json({ error: "Erreur d'envoi" }, { status: 500 });
	}
}
