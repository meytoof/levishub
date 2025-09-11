const { PrismaClient } = require("@prisma/client");

// Import des fonctions email
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

// Fonctions email simplifiées pour le test
async function testResendConnection() {
	try {
		const result = await resend.emails.send({
			from: "LevisWeb <noreply@levisweb.com>",
			to: ["test@example.com"],
			subject: "Test connexion Resend",
			html: "<p>Test de connexion réussi !</p>",
		});

		console.log("Test Resend réussi:", result);
		return { success: true, data: result };
	} catch (error) {
		console.error("Test Resend échoué:", error);
		return { success: false, error };
	}
}

async function sendInvitationEmail(data) {
	const { to, companyName, inviterName, invitationUrl, expiresAt } = data;

	const expiresIn = Math.ceil(
		(expiresAt.getTime() - Date.now()) / (1000 * 60 * 60)
	);

	const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Invitation LevisWeb</title>
    </head>
    <body>
      <h1>🚀 Invitation LevisWeb</h1>
      <p><strong>${inviterName}</strong> vous invite à rejoindre votre espace client LevisWeb pour <strong>${companyName}</strong>.</p>
      <p>Lien d'invitation : ${invitationUrl}</p>
      <p>Expire dans ${expiresIn} heures.</p>
    </body>
    </html>
  `;

	try {
		const result = await resend.emails.send({
			from: "LevisWeb <noreply@levisweb.com>",
			to: [to],
			subject: `Invitation LevisWeb - ${companyName}`,
			html: html,
		});

		console.log("Email d'invitation envoyé:", result);
		return { success: true, data: result };
	} catch (error) {
		console.error("Erreur envoi email d'invitation:", error);
		return { success: false, error };
	}
}

async function sendTicketNotification(data) {
	const { to, ticketTitle, ticketStatus, companyName, ticketUrl } = data;

	const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Mise à jour ticket - LevisWeb</title>
    </head>
    <body>
      <h1>🎫 Mise à jour ticket</h1>
      <p>Le statut de votre ticket a été mis à jour :</p>
      <h3>${ticketTitle}</h3>
      <p>Statut : ${ticketStatus}</p>
      <p>Entreprise : ${companyName}</p>
      <p>Lien : ${ticketUrl}</p>
    </body>
    </html>
  `;

	try {
		const result = await resend.emails.send({
			from: "LevisWeb Support <support@levisweb.com>",
			to: [to],
			subject: `Ticket mis à jour - ${ticketTitle}`,
			html: html,
		});

		console.log("Notification ticket envoyée:", result);
		return { success: true, data: result };
	} catch (error) {
		console.error("Erreur envoi notification ticket:", error);
		return { success: false, error };
	}
}

const prisma = new PrismaClient();

async function testEmailWorkflow() {
	console.log("🧪 Test du workflow d'emails LevisWeb\n");

	try {
		// 1. Test de connexion Resend
		console.log("1️⃣ Test de connexion Resend...");
		const connectionTest = await testResendConnection();
		if (connectionTest.success) {
			console.log("✅ Connexion Resend réussie");
		} else {
			console.log("❌ Connexion Resend échouée:", connectionTest.error);
			return;
		}

		// 2. Récupérer un client de test
		console.log("\n2️⃣ Récupération d'un client de test...");
		const testClient = await prisma.client.findFirst({
			where: { isActive: true },
		});

		if (!testClient) {
			console.log("❌ Aucun client trouvé. Créez d'abord un client.");
			return;
		}

		console.log(`✅ Client trouvé: ${testClient.companyName}`);

		// 3. Test d'envoi d'email d'invitation
		console.log("\n3️⃣ Test d'envoi d'email d'invitation...");
		const invitationTest = await sendInvitationEmail({
			to: "test@example.com", // Email de test
			companyName: testClient.companyName,
			inviterName: "Administrateur Test",
			invitationUrl: "http://localhost:3000/invite/test-token",
			expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 jours
		});

		if (invitationTest.success) {
			console.log("✅ Email d'invitation envoyé avec succès");
		} else {
			console.log(
				"❌ Erreur envoi email d'invitation:",
				invitationTest.error
			);
		}

		// 4. Test d'envoi de notification de ticket
		console.log("\n4️⃣ Test d'envoi de notification de ticket...");
		const ticketTest = await sendTicketNotification({
			to: "test@example.com", // Email de test
			ticketTitle: "Test de notification",
			ticketStatus: "IN_PROGRESS",
			companyName: testClient.companyName,
			ticketUrl: "http://localhost:3000/dashboard/tickets",
		});

		if (ticketTest.success) {
			console.log("✅ Notification de ticket envoyée avec succès");
		} else {
			console.log(
				"❌ Erreur envoi notification ticket:",
				ticketTest.error
			);
		}

		// 5. Test avec un vrai client (si disponible)
		console.log("\n5️⃣ Test avec un vrai client...");
		const realClient = await prisma.client.findFirst({
			where: {
				isActive: true,
				primaryEmail: { not: null },
			},
		});

		if (realClient && realClient.primaryEmail !== "test@example.com") {
			console.log(
				`📧 Test avec l'email réel: ${realClient.primaryEmail}`
			);

			const realInvitationTest = await sendInvitationEmail({
				to: realClient.primaryEmail,
				companyName: realClient.companyName,
				inviterName: "Administrateur LevisWeb",
				invitationUrl: "http://localhost:3000/invite/real-test-token",
				expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
			});

			if (realInvitationTest.success) {
				console.log("✅ Email d'invitation réel envoyé avec succès");
			} else {
				console.log(
					"❌ Erreur envoi email réel:",
					realInvitationTest.error
				);
			}
		} else {
			console.log(
				"ℹ️ Aucun client avec email valide trouvé pour le test réel"
			);
		}

		console.log("\n🎉 Tests terminés !");
		console.log("\n📋 Résumé:");
		console.log("- Vérifiez vos logs Resend pour confirmer l'envoi");
		console.log("- Les emails de test sont envoyés à test@example.com");
		console.log(
			"- Configurez un domaine vérifié dans Resend pour la production"
		);
	} catch (error) {
		console.error("❌ Erreur lors des tests:", error);
	} finally {
		await prisma.$disconnect();
	}
}

// Exécuter les tests
testEmailWorkflow();
