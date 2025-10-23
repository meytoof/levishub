import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    if (session.user.role !== "CLIENT")
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });

    const secret = process.env.STRIPE_SECRET_KEY;
    const appUrl = process.env.APP_URL;
    if (!secret || !appUrl) {
      const missing =
        !secret && !appUrl
          ? "STRIPE_SECRET_KEY, APP_URL"
          : !secret
          ? "STRIPE_SECRET_KEY"
          : "APP_URL";
      return NextResponse.json(
        { error: "Stripe non configuré", missing },
        { status: 400 }
      );
    }

    const stripe = new Stripe(secret);

    // Récupérer le client multi-tenant
    const clientId = session.user.clientId;
    if (!clientId)
      return NextResponse.json(
        { error: "Client introuvable" },
        { status: 400 }
      );

    const client = await prisma.client.findUnique({ where: { id: clientId } });
    if (!client)
      return NextResponse.json(
        { error: "Client introuvable" },
        { status: 404 }
      );

    let stripeCustomerId = client.stripeCustomerId ?? undefined;

    // Créer un customer Stripe s'il n'existe pas encore
    if (!stripeCustomerId) {
      const created = await stripe.customers.create({
        name: client.companyName || client.name,
        email: client.primaryEmail,
        metadata: {
          clientId: client.id,
          project: "LevisHub",
        },
      });
      stripeCustomerId = created.id;
      await prisma.client.update({
        where: { id: client.id },
        data: { stripeCustomerId },
      });
    }

    // Créer une session de portail de facturation
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${appUrl}/dashboard/invoices`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error: unknown) {
    console.error("Stripe portal session error:", error);
    return NextResponse.json(
      {
        error: "Erreur serveur Stripe",
        message: error instanceof Error ? error.message : "unknown",
      },
      { status: 500 }
    );
  }
}
