import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Crée/actualise une configuration du portail Stripe via API (ADMIN uniquement)
export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  if (session.user.role !== "ADMIN")
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret)
    return NextResponse.json(
      { error: "Stripe non configuré" },
      { status: 400 }
    );

  const stripe = new Stripe(secret);

  // Exemple minimal inspiré de la doc Stripe:
  // https://docs.stripe.com/customer-management/integrate-customer-portal?lang=node
  const configuration = await stripe.billingPortal.configurations.create({
    features: {
      invoice_history: { enabled: true },
      payment_method_update: { enabled: true },
      subscription_cancel: { enabled: true },
      subscription_update: { enabled: true },
    },
  });

  return NextResponse.json({ configuration });
}
