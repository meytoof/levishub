const { PrismaClient } = require("../src/generated/prisma");

const prisma = new PrismaClient();

async function updateQuentinRole() {
	console.log("👑 Mise à jour du rôle Quentin vers ADMIN...\n");

	try {
		const updatedUser = await prisma.user.update({
			where: { email: "quentinlevis@gmail.com" },
			data: {
				role: "ADMIN",
				name: "Quentin Levis", // Mettre à jour le nom aussi
				updatedAt: new Date(),
			},
		});

		console.log("✅ Rôle mis à jour avec succès !");
		console.log(`   Email: ${updatedUser.email}`);
		console.log(`   Nom: ${updatedUser.name}`);
		console.log(`   Rôle: ${updatedUser.role}`);
		console.log(
			`   Mis à jour le: ${updatedUser.updatedAt.toLocaleDateString(
				"fr-FR"
			)}`
		);
		console.log("\n🔑 Identifiants de connexion:");
		console.log(`   Email: quentinlevis@gmail.com`);
		console.log(`   Mot de passe: Knd38380@`);
		console.log(
			"\n🔗 Vous pouvez maintenant vous connecter en tant qu'ADMIN sur:"
		);
		console.log(`   http://localhost:3001/login`);
		console.log("\n📊 Accès aux fonctionnalités ADMIN:");
		console.log(`   - Dashboard Admin: /dashboard/admin`);
		console.log(`   - Gestion des clients: /admin/clients`);
		console.log(`   - Création d'invitations: /admin/invitations`);
	} catch (error) {
		if (error.code === "P2025") {
			console.error(
				"❌ Utilisateur non trouvé. Créez-le d'abord avec le script create-quentin-user.js"
			);
		} else {
			console.error("❌ Erreur lors de la mise à jour:", error);
		}
	} finally {
		await prisma.$disconnect();
	}
}

updateQuentinRole();
