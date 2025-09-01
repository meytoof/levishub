require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("../src/generated/prisma");

const prisma = new PrismaClient();

async function checkTestData() {
	try {
		console.log("🔍 Vérification des données de test...\n");

		// Vérifier les clients
		const clients = await prisma.client.findMany();
		console.log(`📊 Clients trouvés: ${clients.length}`);
		clients.forEach((client) => {
			console.log(
				`  - ${client.companyName} (${client.primaryEmail}) - ID: ${client.id}`
			);
		});

		// Vérifier les utilisateurs
		const users = await prisma.user.findMany();
		console.log(`\n👥 Utilisateurs trouvés: ${users.length}`);
		users.forEach((user) => {
			console.log(
				`  - ${user.name} (${user.email}) - Rôle: ${
					user.role
				} - ClientId: ${user.clientId || "NULL"}`
			);
		});

		// Vérifier les invitations
		const invitations = await prisma.invitation.findMany();
		console.log(`\n📧 Invitations trouvées: ${invitations.length}`);
		invitations.forEach((invitation) => {
			console.log(
				`  - ${invitation.email} - Statut: ${invitation.status} - ClientId: ${invitation.clientId} - Expire: ${invitation.expiresAt}`
			);
		});

		// Vérifier spécifiquement l'email de test
		const testEmail = "test@example.com";
		const testUser = await prisma.user.findUnique({
			where: { email: testEmail },
		});

		if (testUser) {
			console.log(
				`\n⚠️  ATTENTION: Un utilisateur existe déjà avec l'email ${testEmail}`
			);
			console.log(`   ID: ${testUser.id}`);
			console.log(`   Nom: ${testUser.name}`);
			console.log(`   Rôle: ${testUser.role}`);
			console.log(`   ClientId: ${testUser.clientId || "NULL"}`);

			const shouldDelete = process.argv.includes("--delete");
			if (shouldDelete) {
				console.log("\n🗑️  Suppression de l'utilisateur de test...");
				await prisma.user.delete({
					where: { id: testUser.id },
				});
				console.log("✅ Utilisateur supprimé");
			} else {
				console.log(
					"\n💡 Pour supprimer cet utilisateur, lancez: node scripts/check-test-data.js --delete"
				);
			}
		} else {
			console.log(
				`\n✅ Aucun utilisateur trouvé avec l'email ${testEmail}`
			);
		}
	} catch (error) {
		console.error("❌ Erreur:", error);
	} finally {
		await prisma.$disconnect();
	}
}

checkTestData();
