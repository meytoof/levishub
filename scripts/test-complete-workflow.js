require("dotenv").config({ path: ".env" });

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function testCompleteWorkflow() {
	console.log("🧪 Test du workflow complet LevisWeb\n");

	try {
		// 1. Vérifier la base de données
		console.log("1️⃣ Vérification de la base de données...");

		const clients = await prisma.client.findMany();
		console.log(`   📊 ${clients.length} clients trouvés`);

		const users = await prisma.user.findMany();
		console.log(`   👥 ${users.length} utilisateurs trouvés`);

		const invitations = await prisma.invitation.findMany();
		console.log(`   📧 ${invitations.length} invitations trouvées`);

		const passwordResets = await prisma.passwordReset.findMany();
		console.log(
			`   🔐 ${passwordResets.length} resets de mot de passe trouvés`
		);

		// 2. Tester la création d'un client (simulation)
		console.log("\n2️⃣ Test de création de client...");

		const testClient = {
			name: "Test Client",
			companyName: "Test Company",
			primaryEmail: "test@example.com",
		};

		console.log(`   📝 Client à créer : ${testClient.companyName}`);
		console.log(`   📧 Email : ${testClient.primaryEmail}`);

		// 3. Tester la création d'une invitation (simulation)
		console.log("\n3️⃣ Test de création d'invitation...");

		const testInvitation = {
			email: "test@example.com",
			token: "test-token-123",
			expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 jours
		};

		console.log(`   📧 Email d'invitation : ${testInvitation.email}`);
		console.log(`   🔗 Token : ${testInvitation.token}`);
		console.log(
			`   ⏰ Expire le : ${testInvitation.expiresAt.toLocaleDateString(
				"fr-FR"
			)}`
		);

		// 4. Tester la création d'un reset de mot de passe (simulation)
		console.log("\n4️⃣ Test de reset de mot de passe...");

		const testPasswordReset = {
			email: "test@example.com",
			token: "reset-token-456",
			expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 heures
		};

		console.log(`   📧 Email de reset : ${testPasswordReset.email}`);
		console.log(`   🔗 Token : ${testPasswordReset.token}`);
		console.log(
			`   ⏰ Expire le : ${testPasswordReset.expiresAt.toLocaleDateString(
				"fr-FR"
			)}`
		);

		// 5. Vérifier les URLs générées
		console.log("\n5️⃣ URLs générées...");

		const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
		const invitationUrl = `${baseUrl}/invite/${testInvitation.token}`;
		const registerUrl = `${baseUrl}/register?token=${testInvitation.token}`;
		const resetUrl = `${baseUrl}/reset-password?token=${testPasswordReset.token}`;

		console.log(`   🎯 URL d'invitation : ${invitationUrl}`);
		console.log(`   📝 URL d'inscription : ${registerUrl}`);
		console.log(`   🔐 URL de reset : ${resetUrl}`);

		// 6. Vérifier les emails
		console.log("\n6️⃣ Configuration des emails...");

		if (process.env.RESEND_API_KEY) {
			console.log("   ✅ Clé API Resend configurée");
			console.log(`   📧 From email : onboarding@resend.dev`);
		} else {
			console.log("   ❌ Clé API Resend manquante");
		}

		// 7. Vérifier les variables d'environnement
		console.log("\n7️⃣ Variables d'environnement...");

		const requiredVars = [
			"NEXTAUTH_URL",
			"NEXTAUTH_SECRET",
			"DATABASE_URL",
			"RESEND_API_KEY",
		];

		requiredVars.forEach((varName) => {
			if (process.env[varName]) {
				console.log(`   ✅ ${varName} : Configuré`);
			} else {
				console.log(`   ❌ ${varName} : Manquant`);
			}
		});

		// 8. Workflow recommandé
		console.log("\n8️⃣ Workflow recommandé pour tester :");
		console.log("   📋 1. Créer un client via /admin/clients/new");
		console.log("   📧 2. Vérifier l'email d'invitation reçu");
		console.log("   🔗 3. Cliquer sur le lien d'invitation");
		console.log("   📝 4. Remplir le formulaire d'inscription");
		console.log("   ✅ 5. Vérifier la redirection vers /dashboard");
		console.log("   🔐 6. Tester 'Mot de passe oublié' sur /login");
		console.log("   📧 7. Vérifier l'email de reset reçu");
		console.log("   🔄 8. Réinitialiser le mot de passe");

		console.log("\n✅ Test du workflow terminé !");
		console.log("\n💡 Conseils :");
		console.log(
			"   • Utilisez un email valide pour recevoir les invitations"
		);
		console.log("   • Vérifiez votre dossier spam");
		console.log("   • Testez avec différents navigateurs/onglets");
		console.log("   • Vérifiez les logs dans la console du serveur");
	} catch (error) {
		console.error("❌ Erreur lors du test :", error);
	} finally {
		await prisma.$disconnect();
	}
}

testCompleteWorkflow();
