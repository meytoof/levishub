import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    if (session.user.role !== "CLIENT")
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });

    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) {
      return NextResponse.json(
        { error: "Stripe non configuré", missing: "STRIPE_SECRET_KEY" },
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

    // Si pas de customer Stripe, retourner null
    if (!client.stripeCustomerId) {
      return NextResponse.json({ subscription: null });
    }

    // Récupérer les abonnements sans expansion imbriquée
    const subscriptions = await stripe.subscriptions.list({
      customer: client.stripeCustomerId,
      status: "all",
    });

    // Récupérer les informations du customer
    const customer = await stripe.customers.retrieve(client.stripeCustomerId);

    // Vérifier si le customer n'est pas supprimé
    if (customer.deleted) {
      return NextResponse.json({ error: "Customer supprimé" }, { status: 404 });
    }

    // Récupérer les factures récentes
    const invoices = await stripe.invoices.list({
      customer: client.stripeCustomerId,
      limit: 10,
    });

    // Enrichir les abonnements avec les détails des produits
    const enrichedSubscriptions = await Promise.all(
      subscriptions.data.map(async (sub) => {
        const enrichedItems = await Promise.all(
          sub.items.data.map(async (item) => {
            // Récupérer les détails du prix
            const price = await stripe.prices.retrieve(item.price.id);
            // Récupérer les détails du produit
            const product = await stripe.products.retrieve(
              price.product as string
            );

            return {
              id: item.id,
              quantity: item.quantity,
              price: {
                id: price.id,
                amount: price.unit_amount,
                currency: price.currency,
                interval: price.recurring?.interval,
                product: {
                  id: product.id,
                  name: product.name,
                  description: product.description,
                },
              },
            };
          })
        );

        return {
          id: sub.id,
          status: sub.status,
          current_period_start: sub.billing_cycle_anchor,
          current_period_end: sub.billing_cycle_anchor,
          cancel_at_period_end: false,
          canceled_at: sub.canceled_at,
          trial_start: sub.trial_start,
          trial_end: sub.trial_end,
          items: enrichedItems,
        };
      })
    );

    return NextResponse.json({
      customer: {
        id: customer.id,
        email: customer.email,
        name: customer.name,
        created: customer.created,
      },
      subscriptions: enrichedSubscriptions,
      invoices: invoices.data.map((invoice) => ({
        id: invoice.id,
        number: invoice.number,
        status: invoice.status,
        amount_paid: invoice.amount_paid,
        amount_due: invoice.amount_due,
        currency: invoice.currency,
        created: invoice.created,
        due_date: invoice.due_date,
        hosted_invoice_url: invoice.hosted_invoice_url,
        invoice_pdf: invoice.invoice_pdf,
      })),
    });
  } catch (error: unknown) {
    console.error("Stripe subscription fetch error:", error);
    return NextResponse.json(
      {
        error: "Erreur serveur Stripe",
        message: error instanceof Error ? error.message : "unknown",
      },
      { status: 500 }
    );
  }
}
