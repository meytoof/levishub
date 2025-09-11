const { PrismaClient } = require("../src/generated/prisma");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function createAdmin() {
	try {
		const hashedPassword = await bcrypt.hash("admin123", 10);

		const admin = await prisma.user.upsert({
			where: { email: "admin@levisweb.com" },
			update: {},
			create: {
				name: "Administrateur LevisWeb",
				email: "admin@levisweb.com",
				hashedPassword: hashedPassword,
				role: "ADMIN",
				emailVerified: new Date(),
			},
		});

		console.log("✅ Administrateur créé avec succès:", admin.email);
		console.log("🔑 Mot de passe: admin123");
	} catch (error) {
		console.error("❌ Erreur lors de la création:", error);
	} finally {
		await prisma.$disconnect();
	}
}

createAdmin();
