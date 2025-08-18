import { NextResponse } from "next/server";

export async function POST() {
	// TODO: Vérifier la signature webhook Stripe et mettre à jour la table Subscription
	return NextResponse.json({ received: true });
}

