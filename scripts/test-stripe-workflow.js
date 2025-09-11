const { PrismaClient } = require("../src/generated/prisma");
const Stripe = require("stripe");

const prisma = new PrismaClient();

async function testStripeWorkflow() {
	console.log("🚀 Test du workflow complet LevisWeb + Stripe\n");

	try {
		// Vérifier la configuration Stripe
		const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
		const stripePriceId = process.env.STRIPE_PRICE_ID;

		if (!stripeSecretKey || !stripePriceId) {
			console.log("⚠️  Configuration Stripe manquante");
			console.log("   Ajoutez dans .env:");
			console.log("   STRIPE_SECRET_KEY=sk_test_...");
			console.log("   STRIPE_PRICE_ID=price_...");
			console.log(
				"\n🔧 Création d'un test sans Stripe pour l'instant...\n"
			);
		} else {
			console.log("✅ Configuration Stripe détectée");
		}

		// 1. Nettoyer les données de test existantes
		console.log("1️⃣ Nettoyage des données de test...");
		await cleanupTestData();
		console.log("✅ Données de test nettoyées\n");

		// 2. Créer un client de test
		console.log("2️⃣ Création d'un client de test...");
		const testClient = await createTestClient();
		console.log(
			`✅ Client créé: ${testClient.companyName} (ID: ${testClient.id})\n`
		);

		// 3. Créer un utilisateur ADMIN
		console.log("3️⃣ Vérification de l'utilisateur ADMIN...");
		const adminUser = await ensureAdminUser();
		console.log(`✅ Admin: ${adminUser.email}\n`);

		// 4. Créer une invitation
		console.log("4️⃣ Création d'une invitation...");
		const invitation = await createTestInvitation(
			testClient.id,
			adminUser.id
		);
		console.log(`✅ Invitation créée pour: ${invitation.email}\n`);

		// 5. Simuler l'acceptation de l'invitation
		console.log("5️⃣ Simulation de l'acceptation de l'invitation...");
		const testUser = await acceptInvitation(invitation, testClient.id);
		console.log(
			`✅ Utilisateur créé: ${testUser.name} (${testUser.email})\n`
		);

		// 6. Créer des données de test
		console.log("6️⃣ Création de données de test...");
		const testData = await createTestData(testClient.id, testUser.id);
		console.log("✅ Données de test créées\n");

		// 7. Test de l'intégration Stripe (si configurée)
		if (stripeSecretKey && stripePriceId) {
			console.log("7️⃣ Test de l'intégration Stripe...");
			await testStripeIntegration(
				testClient,
				testUser,
				stripeSecretKey,
				stripePriceId
			);
		} else {
			console.log("7️⃣ Test Stripe ignoré (configuration manquante)");
			console.log("   Pour tester Stripe:");
			console.log("   1. Créez un compte Stripe test");
			console.log("   2. Créez un produit avec prix récurrent");
			console.log("   3. Ajoutez les clés dans .env");
			console.log("   4. Relancez ce test\n");
		}

		// 8. Vérification finale
		console.log("8️⃣ Vérification finale du workflow...");
		await verifyFinalState(testClient.id);

		console.log("🎉 Test du workflow complet terminé avec succès !");
		console.log("\n📋 Résumé des données créées:");
		console.log(`   Client: ${testClient.companyName}`);
		console.log(
			`   Utilisateur: ${testUser.email} (mot de passe: password123)`
		);
		console.log(`   Site: ${testData.site.domain}`);
		console.log(`   Ticket: ${testData.ticket.title}`);
		console.log(`   Facture: ${testData.invoice.amountDue / 100}€`);

		if (stripeSecretKey && stripePriceId) {
			console.log(
				`   Customer Stripe: ${testData.stripeCustomerId || "Non créé"}`
			);
		}

		console.log("\n🔗 URLs de test:");
		console.log(
			`   Admin Dashboard: http://localhost:3000/dashboard/admin`
		);
		console.log(`   Gestion Clients: http://localhost:3000/admin/clients`);
		console.log(`   Connexion: http://localhost:3000/login`);
		console.log(`   Dashboard Client: http://localhost:3000/dashboard`);
	} catch (error) {
		console.error("❌ Erreur lors du test:", error);
		console.error("Stack:", error.stack);
	} finally {
		await prisma.$disconnect();
	}
}

async function cleanupTestData() {
	const deletePromises = [
		prisma.invitation.deleteMany({
			where: { email: { contains: "test-" } },
		}),
		prisma.user.deleteMany({
			where: { email: { contains: "test-" } },
		}),
		prisma.client.deleteMany({
			where: { primaryEmail: { contains: "test-" } },
		}),
	];

	await Promise.all(deletePromises);
}

async function createTestClient() {
	return await prisma.client.create({
		data: {
			name: "Contact Test",
			companyName: "Entreprise Test SARL",
			primaryEmail: "test-contact@test-entreprise.com",
		},
	});
}

async function ensureAdminUser() {
	let adminUser = await prisma.user.findUnique({
		where: { email: "admin@levisweb.com" },
	});

	if (!adminUser) {
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
	}

	return adminUser;
}

async function createTestInvitation(clientId, adminUserId) {
	return await prisma.invitation.create({
		data: {
			clientId,
			email: "test-user@test-entreprise.com",
			token: "test-token-" + Date.now(),
			expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
			createdByUserId: adminUserId,
		},
	});
}

async function acceptInvitation(invitation, clientId) {
	const bcrypt = require("bcrypt");
	const hashedPassword = await bcrypt.hash("password123", 10);

	const user = await prisma.user.create({
		data: {
			name: "Utilisateur Test",
			email: invitation.email,
			hashedPassword,
			role: "CLIENT",
			clientId,
		},
	});

	await prisma.invitation.update({
		where: { id: invitation.id },
		data: {
			status: "ACCEPTED",
			acceptedAt: new Date(),
		},
	});

	return user;
}

async function createTestData(clientId, userId) {
	const [site, ticket, invoice] = await Promise.all([
		prisma.site.create({
			data: {
				name: "Site Web Test",
				domain: "test-entreprise.com",
				userId,
				clientId,
			},
		}),
		prisma.ticket.create({
			data: {
				clientId,
				createdByUserId: userId,
				title: "Question sur l'analytics",
				description: "Comment configurer le suivi des conversions ?",
				status: "OPEN",
				priority: "MEDIUM",
			},
		}),
		prisma.invoice.create({
			data: {
				clientId,
				status: "PAID",
				amountDue: 2900,
				amountPaid: 2900,
				currency: "eur",
				periodStart: new Date("2024-01-01"),
				periodEnd: new Date("2024-01-31"),
			},
		}),
	]);

	return { site, ticket, invoice };
}

async function testStripeIntegration(
	client,
	user,
	stripeSecretKey,
	stripePriceId
) {
	try {
		const stripe = new Stripe(stripeSecretKey);

		// 1. Créer un customer Stripe
		console.log("   📝 Création du customer Stripe...");
		const stripeCustomer = await stripe.customers.create({
			email: user.email,
			name: user.name,
			metadata: {
				clientId: client.id,
				userId: user.id,
				companyName: client.companyName,
			},
		});

		console.log(`   ✅ Customer Stripe créé: ${stripeCustomer.id}`);

		// 2. Mettre à jour le client avec l'ID Stripe
		await prisma.client.update({
			where: { id: client.id },
			data: { stripeCustomerId: stripeCustomer.id },
		});
		console.log("   ✅ Client mis à jour avec stripeCustomerId");

		// 3. Créer une session de checkout
		console.log("   📝 Création de la session de checkout...");
		const checkoutSession = await stripe.checkout.sessions.create({
			customer: stripeCustomer.id,
			mode: "subscription",
			line_items: [{ price: stripePriceId, quantity: 1 }],
			success_url: `${
				process.env.NEXTAUTH_URL || "http://localhost:3000"
			}/dashboard?success=1`,
			cancel_url: `${
				process.env.NEXTAUTH_URL || "http://localhost:3000"
			}/dashboard?canceled=1`,
			metadata: {
				clientId: client.id,
				userId: user.id,
			},
		});

		console.log(`   ✅ Session de checkout créée: ${checkoutSession.id}`);
		console.log(`   🔗 URL de checkout: ${checkoutSession.url}`);

		// 4. Simuler un webhook de succès (pour les tests)
		console.log("   📝 Simulation d'un webhook de succès...");
		await simulateWebhookSuccess(stripe, checkoutSession, client.id);

		return stripeCustomer.id;
	} catch (error) {
		console.error("   ❌ Erreur Stripe:", error.message);
		return null;
	}
}

async function simulateWebhookSuccess(stripe, checkoutSession, clientId) {
	try {
		// Récupérer la subscription depuis la session
		const session = await stripe.checkout.sessions.retrieve(
			checkoutSession.id
		);
		if (session.subscription) {
			const subscription = await stripe.subscriptions.retrieve(
				session.subscription
			);

			// Créer une facture de test basée sur Stripe
			await prisma.invoice.create({
				data: {
					clientId,
					stripeInvoiceId: `sim_${Date.now()}`,
					status: "PAID",
					amountDue: subscription.items.data[0].price.unit_amount,
					amountPaid: subscription.items.data[0].price.unit_amount,
					currency: subscription.currency,
					periodStart: new Date(
						subscription.current_period_start * 1000
					),
					periodEnd: new Date(subscription.current_period_end * 1000),
					hostedInvoiceUrl: `https://dashboard.stripe.com/test/invoices/sim_${Date.now()}`,
				},
			});

			console.log("   ✅ Webhook simulé - Facture créée");
		}
	} catch (error) {
		console.log(
			"   ⚠️  Erreur lors de la simulation webhook:",
			error.message
		);
	}
}

async function verifyFinalState(clientId) {
	const clientWithData = await prisma.client.findUnique({
		where: { id: clientId },
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

	console.log("📊 État final du client:");
	console.log(`   Nom: ${clientWithData.companyName}`);
	console.log(`   Utilisateurs: ${clientWithData._count.users}`);
	console.log(`   Sites: ${clientWithData._count.sites}`);
	console.log(`   Tickets: ${clientWithData._count.tickets}`);
	console.log(`   Factures: ${clientWithData._count.invoices}`);
	console.log(`   Invitations: ${clientWithData._count.invitations}`);

	if (clientWithData.stripeCustomerId) {
		console.log(`   Customer Stripe: ${clientWithData.stripeCustomerId}`);
	}
}

// Exécuter le test
testStripeWorkflow();
