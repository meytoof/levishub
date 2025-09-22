import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const AUDIT_BCC = process.env.EMAIL_AUDIT_BCC;

export interface EmailData {
	to: string;
	subject: string;
	html: string;
}

export interface InvitationEmailData {
	to: string;
	companyName: string;
	inviterName: string;
	invitationUrl: string;
	expiresAt: Date;
}

export interface TicketNotificationData {
	to: string;
	ticketTitle: string;
	ticketStatus: string;
	companyName: string;
	ticketUrl: string;
}

export interface TicketMessageNotificationData {
	to: string;
	ticketTitle: string;
	messagePreview: string;
	companyName: string;
	ticketUrl: string;
}

export interface TicketUpdateNotificationData {
	ticketId: string;
	title: string;
	status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
	priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
	clientName: string;
	clientEmail: string;
	updatedAt: Date;
	adminMessage?: string;
}

export interface PasswordResetEmailData {
	to: string;
	resetUrl: string;
	expiresAt: Date;
}

/**
 * Envoie un email d'invitation à un nouveau client
 */
export async function sendInvitationEmail(data: InvitationEmailData) {
	const { to, companyName, inviterName, invitationUrl, expiresAt } = data;

	const expiresIn = Math.ceil(
		(expiresAt.getTime() - Date.now()) / (1000 * 60 * 60)
	); // heures

		const html = `
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Invitation LevisWeb</title>
			<style>
				body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
				.container { max-width: 600px; margin: 0 auto; padding: 20px; }
				.header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
				.content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
				.button { display: inline-block; background: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
				.button:hover { background: #1d4ed8; }
				.footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
				.warning { background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 5px; margin: 20px 0; color: #92400e; }
				.link { color: #2563eb; word-break: break-all; }
			</style>
		</head>
		<body>
			<div class="container">
				<div class="header">
					<h1>🚀 Invitation LevisWeb</h1>
					<p>Bienvenue dans votre espace client</p>
				</div>

				<div class="content">
					<h2>Bonjour !</h2>

					<p><strong>${inviterName}</strong> vous invite à rejoindre votre espace client LevisWeb pour <strong>${companyName}</strong>.</p>

					<p>LevisWeb est votre plateforme de gestion pour :</p>
					<ul>
						<li>📊 Suivre vos projets web</li>
						<li>🎫 Créer des tickets de support</li>
						<li>📈 Consulter vos analytics</li>
						<li>💳 Gérer vos factures</li>
					</ul>

					<div style="text-align: center;">
						<a href="${invitationUrl}" class="button" style="color:#ffffff !important;">Créer mon compte</a>
					</div>

					<div class="warning">
						<strong>⚠️ Important :</strong> Cette invitation expire dans ${expiresIn} heures.
						Cliquez sur le bouton ci-dessus pour créer votre compte.
					</div>

					<p>Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :</p>
					<p class="link">${invitationUrl}</p>
				</div>

				<div class="footer">
					<p>LevisWeb - Développement Web Freelance</p>
					<p>Cette invitation a été envoyée automatiquement. Ne répondez pas à cet email.</p>
				</div>
			</div>
		</body>
		</html>
	`;

	try {
		// Utilise un expéditeur basé sur le domaine (meilleure délivrabilité)
		const domain = process.env.RESEND_DOMAIN || "levisweb.net";
		const defaultFrom = `LevisWeb <noreply@${domain}>`;
		const from = process.env.RESEND_FROM || defaultFrom;

		const result = await resend.emails.send({
			from,
			to: [to],
			subject: `Invitation LevisWeb - ${companyName}`,
			html: html,
			bcc: AUDIT_BCC ? [AUDIT_BCC] : undefined,
		});

		console.log("Email d'invitation envoyé:", result);
		return { success: true, data: result };
	} catch (error) {
		console.error("Erreur envoi email d'invitation:", error);
		return { success: false, error };
	}
}

/**
 * Envoie une notification de mise à jour de ticket
 */
export async function sendTicketNotification(data: TicketNotificationData) {
	const { to, ticketTitle, ticketStatus, companyName, ticketUrl } = data;

	const statusColors = {
		OPEN: "#dc2626",
		IN_PROGRESS: "#ea580c",
		RESOLVED: "#059669",
		CLOSED: "#6b7280",
	};

	const statusLabels = {
		OPEN: "Ouvert",
		IN_PROGRESS: "En cours",
		RESOLVED: "Résolu",
		CLOSED: "Fermé",
	};

	const html = `
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Mise à jour ticket - LevisWeb</title>
			<style>
				body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
				.container { max-width: 600px; margin: 0 auto; padding: 20px; }
				.header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
				.content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
				.status { display: inline-block; padding: 8px 16px; border-radius: 20px; color: white; font-weight: bold; }
				.button { display: inline-block; background: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
				.button:hover { background: #1d4ed8; }
				.footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
				.ticket-info { background: white; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid ${
					statusColors[ticketStatus as keyof typeof statusColors]
				}; }
			</style>
		</head>
		<body>
			<div class="container">
				<div class="header">
					<h1>🎫 Mise à jour ticket</h1>
					<p>${companyName}</p>
				</div>

				<div class="content">
					<h2>Bonjour !</h2>

					<p>Le statut de votre ticket a été mis à jour :</p>

					<div class="ticket-info">
						<h3 style="margin: 0 0 10px 0;">${ticketTitle}</h3>
						<span class="status" style="background: ${
							statusColors[
								ticketStatus as keyof typeof statusColors
							]
						};">
							${statusLabels[ticketStatus as keyof typeof statusLabels]}
						</span>
					</div>

					<div style="text-align: center;">
						<a href="${ticketUrl}" class="button">Voir le ticket</a>
					</div>

					<p>Connectez-vous à votre espace client pour plus de détails.</p>
				</div>

				<div class="footer">
					<p>LevisWeb - Support client</p>
					<p>Cette notification a été envoyée automatiquement. Ne répondez pas à cet email.</p>
				</div>
			</div>
		</body>
		</html>
	`;

	try {
		const result = await resend.emails.send({
			from: "LevisWeb Support <onboarding@resend.dev>",
			to: [to],
			subject: `Ticket mis à jour - ${ticketTitle}`,
			html: html,
			bcc: AUDIT_BCC ? [AUDIT_BCC] : undefined,
		});

		console.log("Notification ticket envoyée:", result);
		return { success: true, data: result };
	} catch (error) {
		console.error("Erreur envoi notification ticket:", error);
		return { success: false, error };
	}
}

export async function sendTicketMessageNotification(
	data: TicketMessageNotificationData
) {
	const { to, ticketTitle, messagePreview, companyName, ticketUrl } = data;

	const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nouveau message - LevisWeb</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
                .preview { background:#fff; border-left:4px solid #6366f1; padding:16px; border-radius:8px; }
                .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>💬 Nouveau message dans un ticket</h1>
                    <p>${companyName}</p>
                </div>
                <div class="content">
                    <h2>${ticketTitle}</h2>
                    <div class="preview">${messagePreview}</div>
                    <div style="text-align:center;">
                        <a href="${ticketUrl}" class="button">Ouvrir la conversation</a>
                    </div>
                </div>
                <div class="footer">LevisWeb - Support</div>
            </div>
        </body>
        </html>
    `;

    try {
        const domain = process.env.RESEND_DOMAIN || "levisweb.net";
        const defaultFrom = `LevisWeb Support <noreply@${domain}>`;
        const from = process.env.RESEND_FROM || defaultFrom;
        const result = await resend.emails.send({
            from,
            to: [to],
            subject: `Nouveau message - ${ticketTitle}`,
            html,
            bcc: AUDIT_BCC ? [AUDIT_BCC] : undefined,
        });

		console.log("Notification message envoyée:", result);
		return { success: true, data: result };
	} catch (error) {
		console.error("Erreur envoi notification message:", error);
		return { success: false, error };
	}
}

export async function sendTicketUpdateNotification(
	data: TicketUpdateNotificationData
) {
	const {
		title,
		status,
		priority,
		clientName,
		clientEmail,
		updatedAt,
		adminMessage,
	} = data;

	const statusLabels = {
		OPEN: "Ouvert",
		IN_PROGRESS: "En cours",
		RESOLVED: "Résolu",
		CLOSED: "Fermé",
	} as const;

	const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Statut du ticket mis à jour</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
                .pill { display:inline-block; padding:4px 10px; border-radius:9999px; background:#eef2ff; color:#3730a3; font-weight:bold; }
                .note { background:#fff; border-left:4px solid #10b981; padding:12px; border-radius:8px; margin-top:12px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>📢 Mise à jour du ticket</h1>
                    <p>${clientName}</p>
                </div>
                <div class="content">
                    <h2>${title}</h2>
                    <p>Statut: <span class="pill">${
						statusLabels[status]
					}</span> — Priorité: <strong>${priority}</strong></p>
                    <p>Mis à jour le ${new Date(updatedAt).toLocaleString(
						"fr-FR"
					)}.</p>
                    ${
						adminMessage
							? `<div class="note"><strong>Message:</strong><br/>${adminMessage}</div>`
							: ""
					}
                </div>
                <div class="footer">LevisWeb - Support</div>
            </div>
        </body>
        </html>
    `;

    try {
        const domain = process.env.RESEND_DOMAIN || "levisweb.net";
        const defaultFrom = `LevisWeb Support <noreply@${domain}>`;
        const from = process.env.RESEND_FROM || defaultFrom;
        const result = await resend.emails.send({
            from,
            to: [clientEmail],
            subject: `Mise à jour du ticket - ${title}`,
            html,
            bcc: AUDIT_BCC ? [AUDIT_BCC] : undefined,
        });
		console.log("Notification mise à jour envoyée:", result);
		return { success: true, data: result };
	} catch (error) {
		console.error("Erreur envoi notif mise à jour:", error);
		return { success: false, error };
	}
}

/**
 * Envoie un email de reset de mot de passe
 */
export async function sendPasswordResetEmail(data: PasswordResetEmailData) {
	const { to, resetUrl, expiresAt } = data;

	const expiresIn = Math.ceil(
		(expiresAt.getTime() - Date.now()) / (1000 * 60 * 60)
	); // heures

	const html = `
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Reset mot de passe - LevisWeb</title>
			<style>
				body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
				.container { max-width: 600px; margin: 0 auto; padding: 20px; }
				.header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
				.content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
				.button { display: inline-block; background: #dc2626; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
				.button:hover { background: #b91c1c; }
				.footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
				.warning { background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 5px; margin: 20px 0; color: #92400e; }
				.link { color: #dc2626; word-break: break-all; }
			</style>
		</head>
		<body>
			<div class="container">
				<div class="header">
					<h1>🔐 Reset mot de passe</h1>
					<p>LevisWeb - Sécurité</p>
				</div>

				<div class="content">
					<h2>Bonjour !</h2>

					<p>Vous avez demandé la réinitialisation de votre mot de passe LevisWeb.</p>

					<div style="text-align: center;">
						<a href="${resetUrl}" class="button">Réinitialiser mon mot de passe</a>
					</div>

					<div class="warning">
						<strong>⚠️ Important :</strong> Ce lien expire dans ${expiresIn} heures.
						Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.
					</div>

					<p>Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :</p>
					<p class="link">${resetUrl}</p>

					<p><strong>Sécurité :</strong> Ne partagez jamais ce lien avec quelqu'un d'autre.</p>
				</div>

				<div class="footer">
					<p>LevisWeb - Développement Web Freelance</p>
					<p>Cet email a été envoyé pour des raisons de sécurité. Ne répondez pas à cet email.</p>
				</div>
			</div>
		</body>
		</html>
	`;

	try {
		const result = await resend.emails.send({
			from: "LevisWeb Sécurité <onboarding@resend.dev>",
			to: [to],
			subject: "Reset mot de passe - LevisWeb",
			html: html,
			bcc: AUDIT_BCC ? [AUDIT_BCC] : undefined,
		});

		console.log("Email reset mot de passe envoyé:", result);
		return { success: true, data: result };
	} catch (error) {
		console.error("Erreur envoi email reset mot de passe:", error);
		return { success: false, error };
	}
}

/**
 * Test de connexion Resend
 */
export async function testResendConnection() {
	try {
		const result = await resend.emails.send({
			from: "LevisWeb <onboarding@resend.dev>",
			to: ["quentinlevis@gmail.com"], // Remplace par ton email si tu veux
			subject: "Test connexion Resend",
			html: "<p>Test de connexion réussi !</p>",
			bcc: AUDIT_BCC ? [AUDIT_BCC] : undefined,
		});

		console.log("Test Resend réussi:", result);
		return { success: true, data: result };
	} catch (error) {
		console.error("Test Resend échoué:", error);
		return { success: false, error };
	}
}
