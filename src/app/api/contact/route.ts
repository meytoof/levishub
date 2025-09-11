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

		if (!process.env.RESEND_API_KEY) {
			console.error(
				"RESEND_API_KEY manquante - configure-la dans Vercel (Production)"
			);
			return NextResponse.json(
				{ error: "Email non configuré (RESEND_API_KEY manquante)" },
				{ status: 500 }
			);
		}

		const resend = new Resend(process.env.RESEND_API_KEY);
		const domain = process.env.RESEND_DOMAIN || "levisweb.net";
		const defaultFrom = `LevisWeb <noreply@${domain}>`;
		const from = process.env.RESEND_FROM || defaultFrom;
		const to = process.env.CONTACT_TO || `contact@${domain}`;

		const { error } = await resend.emails.send({
			from,
			to,
			subject: `Nouveau message de contact — ${name}`,
			replyTo: email,
			html: `
				<h2>Nouveau message de contact</h2>
				<p><strong>Nom:</strong> ${name}</p>
				<p><strong>Email:</strong> ${email}</p>
				<p><strong>Message:</strong></p>
				<p>${message.replace(/\n/g, "<br/>")}</p>
			`,
		});

		if (error) {
			console.error("Erreur Resend contact:", error);
			return NextResponse.json(
				{ error: "Erreur d'envoi" },
				{ status: 500 }
			);
		}

		return NextResponse.json({ ok: true });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ error: "Erreur d'envoi" }, { status: 500 });
	}
}
