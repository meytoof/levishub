require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("../src/generated/prisma");

const prisma = new PrismaClient();

async function cleanupTestClient() {
	try {
		console.log("🧹 Nettoyage du client test@example.com...\n");

		// Trouver le client
		const client = await prisma.client.findUnique({
			where: { primaryEmail: "test@example.com" },
		});

		if (client) {
			console.log(
				`📊 Client trouvé: ${client.companyName} (${client.primaryEmail})`
			);

			// Supprimer les invitations associées
			const invitations = await prisma.invitation.findMany({
				where: { clientId: client.id },
			});

			console.log(`📧 Invitations trouvées: ${invitations.length}`);

			for (const invitation of invitations) {
				await prisma.invitation.delete({
					where: { id: invitation.id },
				});
				console.log(`🗑️  Invitation supprimée: ${invitation.email}`);
			}

			// Supprimer le client
			await prisma.client.delete({
				where: { id: client.id },
			});

			console.log(`✅ Client supprimé: ${client.companyName}`);
		} else {
			console.log("✅ Aucun client trouvé avec test@example.com");
		}
	} catch (error) {
		console.error("❌ Erreur:", error);
	} finally {
		await prisma.$disconnect();
	}
}

cleanupTestClient();
