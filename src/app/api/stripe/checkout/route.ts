import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST() {
	const secret = process.env.STRIPE_SECRET_KEY;
	const priceId = process.env.STRIPE_PRICE_ID;
	if (!secret || !priceId)
		return NextResponse.json(
			{ error: "Stripe not configured" },
			{ status: 400 }
		);
	const stripe = new Stripe(secret);
	const session = await stripe.checkout.sessions.create({
		mode: "subscription",
		line_items: [{ price: priceId, quantity: 1 }],
		success_url: `${process.env.APP_URL}/dashboard?success=1`,
		cancel_url: `${process.env.APP_URL}/dashboard?canceled=1`,
	});
	return NextResponse.json({ url: session.url });
}
