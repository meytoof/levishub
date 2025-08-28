const { PrismaClient } = require("../src/generated/prisma");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function createQuentinUser() {
	console.log("👤 Création de l'utilisateur Quentin...\n");

	try {
		// Vérifier si l'utilisateur existe déjà
		const existingUser = await prisma.user.findUnique({
			where: { email: "quentinlevis@gmail.com" },
		});

		if (existingUser) {
			console.log("⚠️  L'utilisateur quentinlevis@gmail.com existe déjà");
			console.log(`   ID: ${existingUser.id}`);
			console.log(`   Nom: ${existingUser.name}`);
			console.log(`   Rôle: ${existingUser.role}`);
			console.log(
				`   Créé le: ${existingUser.createdAt.toLocaleDateString(
					"fr-FR"
				)}`
			);

			// Demander si on veut mettre à jour le mot de passe
			console.log("\n🔐 Voulez-vous mettre à jour le mot de passe ?");
			console.log(
				"   Relancez ce script avec l'argument '--update-password' pour forcer la mise à jour"
			);

			return;
		}

		// Hasher le mot de passe
		const hashedPassword = await bcrypt.hash("Knd38380@", 10);

		// Créer l'utilisateur
		const user = await prisma.user.create({
			data: {
				name: "Quentin Levis",
				email: "quentinlevis@gmail.com",
				hashedPassword: hashedPassword,
				role: "ADMIN", // Rôle ADMIN pour accès complet
				emailVerified: new Date(),
			},
		});

		console.log("✅ Utilisateur créé avec succès !");
		console.log(`   ID: ${user.id}`);
		console.log(`   Nom: ${user.name}`);
		console.log(`   Email: ${user.email}`);
		console.log(`   Rôle: ${user.role}`);
		console.log(
			`   Créé le: ${user.createdAt.toLocaleDateString("fr-FR")}`
		);
		console.log("\n🔑 Identifiants de connexion:");
		console.log(`   Email: quentinlevis@gmail.com`);
		console.log(`   Mot de passe: Knd38380@`);
		console.log("\n🔗 Vous pouvez maintenant vous connecter sur:");
		console.log(`   http://localhost:3001/login`);
	} catch (error) {
		console.error("❌ Erreur lors de la création:", error);
	} finally {
		await prisma.$disconnect();
	}
}

// Vérifier si on veut forcer la mise à jour du mot de passe
if (process.argv.includes("--update-password")) {
	updatePassword();
} else {
	createQuentinUser();
}

async function updatePassword() {
	console.log("🔐 Mise à jour du mot de passe...\n");

	try {
		const hashedPassword = await bcrypt.hash("Knd38380@", 10);

		const updatedUser = await prisma.user.update({
			where: { email: "quentinlevis@gmail.com" },
			data: {
				hashedPassword: hashedPassword,
				updatedAt: new Date(),
			},
		});

		console.log("✅ Mot de passe mis à jour avec succès !");
		console.log(`   Email: ${updatedUser.email}`);
		console.log(
			`   Mis à jour le: ${updatedUser.updatedAt.toLocaleDateString(
				"fr-FR"
			)}`
		);
		console.log("\n🔑 Nouveaux identifiants:");
		console.log(`   Email: quentinlevis@gmail.com`);
		console.log(`   Mot de passe: Knd38380@`);
	} catch (error) {
		if (error.code === "P2025") {
			console.error(
				"❌ Utilisateur non trouvé. Créez-le d'abord sans l'argument --update-password"
			);
		} else {
			console.error("❌ Erreur lors de la mise à jour:", error);
		}
	} finally {
		await prisma.$disconnect();
	}
}
