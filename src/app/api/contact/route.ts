import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
	try {
		const { name, email, message } = await request.json();
		if (!name || !email || !message) {
			return NextResponse.json(
				{ error: "Champs requis" },
				{ status: 400 }
			);
		}

		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT || 587),
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		});

		await transporter.sendMail({
			from: `LevisHub <${
				process.env.SMTP_FROM || process.env.SMTP_USER
			}>`,
			to: process.env.CONTACT_TO || process.env.SMTP_USER,
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
		console.error(err);
		return NextResponse.json({ error: "Erreur d'envoi" }, { status: 500 });
	}
}

