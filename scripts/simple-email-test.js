require("dotenv").config({ path: ".env.local" });

const { Resend } = require("resend");

async function testResend() {
	console.log("🧪 Test simple de Resend\n");

	// Vérifier la clé API
	if (!process.env.RESEND_API_KEY) {
		console.log("❌ Clé API Resend non trouvée dans .env.local");
		console.log("Ajoutez : RESEND_API_KEY=re_...");
		return;
	}

	console.log("✅ Clé API Resend trouvée");

	const resend = new Resend(process.env.RESEND_API_KEY);

	try {
		console.log("📧 Envoi d'un email de test...");

		const result = await resend.emails.send({
			from: "LevisHub <noreply@levishub.com>",
			to: ["test@example.com"],
			subject: "Test LevisHub - Resend",
			html: `
        <h1>🚀 Test LevisHub</h1>
        <p>Félicitations ! Votre configuration Resend fonctionne parfaitement.</p>
        <p>Date : ${new Date().toLocaleString("fr-FR")}</p>
      `,
		});

		console.log("✅ Email envoyé avec succès !");
		console.log("📋 Détails :", JSON.stringify(result, null, 2));
	} catch (error) {
		console.log("❌ Erreur lors de l'envoi :");
		console.log(error.message);

		if (error.message.includes("domain")) {
			console.log(
				"\n💡 Conseil : Configurez un domaine vérifié dans Resend"
			);
		}
	}
}

testResend();

