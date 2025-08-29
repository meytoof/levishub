import nodemailer from "nodemailer";

// Configuration du transporteur email
const transporter = nodemailer.createTransporter({
	host: process.env.SMTP_HOST || "smtp.gmail.com",
	port: parseInt(process.env.SMTP_PORT || "587"),
	secure: false, // true pour 465, false pour autres ports
	auth: {
		user: process.env.SMTP_USER || "quentinlevis@gmail.com",
		pass: process.env.SMTP_PASS || "",
	},
});

// Types pour les emails
interface TicketNotificationData {
	ticketId: string;
	title: string;
	description: string;
	priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
	clientName: string;
	clientEmail: string;
	createdAt: Date;
}

interface TicketUpdateData {
	ticketId: string;
	title: string;
	status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
	priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
	clientName: string;
	clientEmail: string;
	updatedAt: Date;
	adminMessage?: string;
}

// Fonction pour envoyer une notification de nouveau ticket
export async function sendNewTicketNotification(data: TicketNotificationData) {
	const priorityColors = {
		LOW: "#10b981", // Vert
		MEDIUM: "#f59e0b", // Jaune
		HIGH: "#f97316", // Orange
		URGENT: "#ef4444", // Rouge
	};

	const priorityLabels = {
		LOW: "Faible",
		MEDIUM: "Moyenne",
		HIGH: "Élevée",
		URGENT: "Urgente",
	};

	const mailOptions = {
		from: `"LevisHub Support" <${
			process.env.SMTP_USER || "quentinlevis@gmail.com"
		}>`,
		to: "quentinlevis@gmail.com",
		subject: `🎫 Nouveau ticket ${priorityLabels[data.priority]} - ${
			data.title
		}`,
		html: `
			<!DOCTYPE html>
			<html>
			<head>
				<meta charset="utf-8">
				<style>
					body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
					.container { max-width: 600px; margin: 0 auto; padding: 20px; }
					.header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
					.content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
					.priority-badge { display: inline-block; padding: 4px 12px; border-radius: 20px; color: white; font-weight: bold; font-size: 12px; }
					.ticket-info { background: white; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 4px solid ${
						priorityColors[data.priority]
					}; }
					.button { display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 6px; margin-top: 15px; }
					.footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
				</style>
			</head>
			<body>
				<div class="container">
					<div class="header">
						<h1>🎫 Nouveau Ticket Support</h1>
						<p>Un nouveau ticket a été créé par un client</p>
					</div>
					
					<div class="content">
						<div class="ticket-info">
							<h2>${data.title}</h2>
							<p><strong>Client:</strong> ${data.clientName} (${data.clientEmail})</p>
							<p><strong>Priorité:</strong> <span class="priority-badge" style="background-color: ${
								priorityColors[data.priority]
							}">${priorityLabels[data.priority]}</span></p>
							<p><strong>Date:</strong> ${data.createdAt.toLocaleDateString("fr-FR", {
								year: "numeric",
								month: "long",
								day: "numeric",
								hour: "2-digit",
								minute: "2-digit",
							})}</p>
							<p><strong>Description:</strong></p>
							<p style="background: white; padding: 10px; border-radius: 4px; border: 1px solid #ddd;">${
								data.description || "Aucune description fournie"
							}</p>
						</div>
						
						<a href="${
							process.env.NEXTAUTH_URL || "http://localhost:3000"
						}/admin/tickets" class="button">Voir le ticket</a>
					</div>
					
					<div class="footer">
						<p>Ceci est une notification automatique de LevisHub</p>
					</div>
				</div>
			</body>
			</html>
		`,
	};

	try {
		await transporter.sendMail(mailOptions);
		console.log("✅ Notification de nouveau ticket envoyée");
		return true;
	} catch (error) {
		console.error("❌ Erreur envoi email:", error);
		return false;
	}
}

// Fonction pour envoyer une notification de mise à jour de ticket
export async function sendTicketUpdateNotification(data: TicketUpdateData) {
	const statusLabels = {
		OPEN: "Ouvert",
		IN_PROGRESS: "En cours",
		RESOLVED: "Résolu",
		CLOSED: "Fermé",
	};

	const mailOptions = {
		from: `"LevisHub Support" <${
			process.env.SMTP_USER || "quentinlevis@gmail.com"
		}>`,
		to: data.clientEmail,
		subject: `📝 Mise à jour de votre ticket - ${data.title}`,
		html: `
			<!DOCTYPE html>
			<html>
			<head>
				<meta charset="utf-8">
				<style>
					body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
					.container { max-width: 600px; margin: 0 auto; padding: 20px; }
					.header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
					.content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
					.status-badge { display: inline-block; padding: 4px 12px; border-radius: 20px; color: white; font-weight: bold; font-size: 12px; background-color: #667eea; }
					.ticket-info { background: white; padding: 15px; border-radius: 6px; margin: 15px 0; }
					.button { display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 6px; margin-top: 15px; }
					.footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
				</style>
			</head>
			<body>
				<div class="container">
					<div class="header">
						<h1>📝 Mise à jour de votre ticket</h1>
						<p>Le statut de votre ticket a été modifié</p>
					</div>
					
					<div class="content">
						<div class="ticket-info">
							<h2>${data.title}</h2>
							<p><strong>Nouveau statut:</strong> <span class="status-badge">${
								statusLabels[data.status]
							}</span></p>
							<p><strong>Date de mise à jour:</strong> ${data.updatedAt.toLocaleDateString(
								"fr-FR",
								{
									year: "numeric",
									month: "long",
									day: "numeric",
									hour: "2-digit",
									minute: "2-digit",
								}
							)}</p>
							${
								data.adminMessage
									? `<p><strong>Message de l'équipe:</strong></p><p style="background: white; padding: 10px; border-radius: 4px; border: 1px solid #ddd;">${data.adminMessage}</p>`
									: ""
							}
						</div>
						
						<a href="${
							process.env.NEXTAUTH_URL || "http://localhost:3000"
						}/dashboard/tickets" class="button">Voir le ticket</a>
					</div>
					
					<div class="footer">
						<p>Ceci est une notification automatique de LevisHub</p>
					</div>
				</div>
			</body>
			</html>
		`,
	};

	try {
		await transporter.sendMail(mailOptions);
		console.log("✅ Notification de mise à jour de ticket envoyée");
		return true;
	} catch (error) {
		console.error("❌ Erreur envoi email:", error);
		return false;
	}
}

// Fonction de test pour vérifier la configuration SMTP
export async function testSMTPConnection() {
	try {
		await transporter.verify();
		console.log("✅ Connexion SMTP réussie");
		return true;
	} catch (error) {
		console.error("❌ Erreur connexion SMTP:", error);
		return false;
	}
}
