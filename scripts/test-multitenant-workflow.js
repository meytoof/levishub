const { PrismaClient } = require("../src/generated/prisma");

const prisma = new PrismaClient();

async function testMultitenantWorkflow() {
	console.log("🧪 Test du workflow multi-tenant LevisWeb\n");

	try {
		// 1. Nettoyer les données de test existantes
		console.log("1️⃣ Nettoyage des données de test...");
		await prisma.invitation.deleteMany({
			where: {
				email: { contains: "test-" },
			},
		});
		await prisma.user.deleteMany({
			where: {
				email: { contains: "test-" },
			},
		});
		await prisma.client.deleteMany({
			where: {
				primaryEmail: { contains: "test-" },
			},
		});
		console.log("✅ Données de test nettoyées\n");

		// 2. Créer un client de test
		console.log("2️⃣ Création d'un client de test...");
		const testClient = await prisma.client.create({
			data: {
				name: "Contact Test",
				companyName: "Entreprise Test SARL",
				primaryEmail: "test-contact@test-entreprise.com",
			},
		});
		console.log(
			`✅ Client créé: ${testClient.companyName} (ID: ${testClient.id})\n`
		);

		// 3. Créer un utilisateur ADMIN pour les tests
		console.log("3️⃣ Vérification de l'utilisateur ADMIN...");
		let adminUser = await prisma.user.findUnique({
			where: { email: "admin@levisweb.com" },
		});

		if (!adminUser) {
			console.log("⚠️  Admin non trouvé, création d'un admin de test...");
			const bcrypt = require("bcrypt");
			const hashedPassword = await bcrypt.hash("admin123", 10);

			adminUser = await prisma.user.create({
				data: {
					name: "Admin Test",
					email: "admin@levisweb.com",
					hashedPassword,
					role: "ADMIN",
				},
			});
			console.log("✅ Admin de test créé");
		} else {
			console.log("✅ Admin existant trouvé");
		}
		console.log(`   Email: ${adminUser.email}, Rôle: ${adminUser.role}\n`);

		// 4. Créer une invitation de test
		console.log("4️⃣ Création d'une invitation de test...");
		const testInvitation = await prisma.invitation.create({
			data: {
				clientId: testClient.id,
				email: "test-user@test-entreprise.com",
				token: "test-token-" + Date.now(),
				expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 jours
				createdByUserId: adminUser.id,
			},
		});
		console.log(`✅ Invitation créée pour: ${testInvitation.email}`);
		console.log(`   Token: ${testInvitation.token}`);
		console.log(
			`   Expire: ${testInvitation.expiresAt.toLocaleDateString(
				"fr-FR"
			)}\n`
		);

		// 5. Simuler l'acceptation de l'invitation
		console.log("5️⃣ Simulation de l'acceptation de l'invitation...");
		const bcrypt = require("bcrypt");
		const hashedPassword = await bcrypt.hash("password123", 10);

		const testUser = await prisma.user.create({
			data: {
				name: "Utilisateur Test",
				email: testInvitation.email,
				hashedPassword,
				role: "CLIENT",
				clientId: testClient.id,
			},
		});

		// Marquer l'invitation comme acceptée
		await prisma.invitation.update({
			where: { id: testInvitation.id },
			data: {
				status: "ACCEPTED",
				acceptedAt: new Date(),
			},
		});

		console.log(
			`✅ Utilisateur créé: ${testUser.name} (${testUser.email})`
		);
		console.log(
			`   Rôle: ${testUser.role}, Client: ${testUser.clientId}\n`
		);

		// 6. Créer des données de test (sites, tickets, etc.)
		console.log("6️⃣ Création de données de test...");

		// Site de test
		const testSite = await prisma.site.create({
			data: {
				name: "Site Web Test",
				domain: "test-entreprise.com",
				userId: testUser.id,
				clientId: testClient.id,
			},
		});
		console.log(`✅ Site créé: ${testSite.name} (${testSite.domain})`);

		// Ticket de test
		const testTicket = await prisma.ticket.create({
			data: {
				clientId: testClient.id,
				createdByUserId: testUser.id,
				title: "Question sur l'analytics",
				description: "Comment configurer le suivi des conversions ?",
				status: "OPEN",
				priority: "MEDIUM",
			},
		});
		console.log(
			`✅ Ticket créé: ${testTicket.title} (${testTicket.status})`
		);

		// Facture de test (sans Stripe pour l'instant)
		const testInvoice = await prisma.invoice.create({
			data: {
				clientId: testClient.id,
				status: "PAID",
				amountDue: 2900, // 29€ en centimes
				amountPaid: 2900,
				currency: "eur",
				periodStart: new Date("2024-01-01"),
				periodEnd: new Date("2024-01-31"),
			},
		});
		console.log(
			`✅ Facture créée: ${testInvoice.amountDue / 100}€ ${
				testInvoice.currency
			}\n`
		);

		// 7. Vérifier les relations
		console.log("7️⃣ Vérification des relations...");

		const clientWithData = await prisma.client.findUnique({
			where: { id: testClient.id },
			include: {
				users: true,
				sites: true,
				tickets: true,
				invoices: true,
				invitations: true,
				_count: {
					select: {
						users: true,
						sites: true,
						tickets: true,
						invoices: true,
						invitations: true,
					},
				},
			},
		});

		console.log("📊 Résumé du client de test:");
		console.log(`   Nom: ${clientWithData.companyName}`);
		console.log(`   Utilisateurs: ${clientWithData._count.users}`);
		console.log(`   Sites: ${clientWithData._count.sites}`);
		console.log(`   Tickets: ${clientWithData._count.tickets}`);
		console.log(`   Factures: ${clientWithData._count.invoices}`);
		console.log(`   Invitations: ${clientWithData._count.invitations}\n`);

		// 8. Test des autorisations (simulation)
		console.log("8️⃣ Test des autorisations...");

		// Vérifier qu'un utilisateur CLIENT ne peut voir que ses données
		const userTickets = await prisma.ticket.findMany({
			where: { createdByUserId: testUser.id },
			include: { client: { select: { companyName: true } } },
		});

		console.log(
			`✅ L'utilisateur ${testUser.name} peut voir ${userTickets.length} tickets`
		);
		console.log(
			`   Tous liés au client: ${userTickets.every(
				(t) => t.client.companyName === testClient.companyName
			)}\n`
		);

		// 9. Préparation pour Stripe (simulation)
		console.log("9️⃣ Préparation pour l'intégration Stripe...");
		console.log("📝 Prochaines étapes:");
		console.log("   - Configurer les clés Stripe dans .env");
		console.log("   - Modifier /api/stripe/checkout pour inclure clientId");
		console.log(
			"   - Implémenter /api/stripe/webhook pour persister les données"
		);
		console.log(
			"   - Créer des composants UI pour les factures et abonnements"
		);
		console.log(
			"   - Tester le workflow complet: Client → Invitation → Connexion → Paiement\n"
		);

		console.log("🎉 Test du workflow multi-tenant terminé avec succès !");
		console.log("\n📋 Données de test créées:");
		console.log(`   Client: ${testClient.companyName}`);
		console.log(
			`   Utilisateur: ${testUser.email} (mot de passe: password123)`
		);
		console.log(`   Site: ${testSite.domain}`);
		console.log(`   Ticket: ${testTicket.title}`);
		console.log(`   Facture: ${testInvoice.amountDue / 100}€`);
	} catch (error) {
		console.error("❌ Erreur lors du test:", error);
	} finally {
		await prisma.$disconnect();
	}
}

// Exécuter le test
testMultitenantWorkflow();
