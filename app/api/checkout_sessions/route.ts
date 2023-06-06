import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2022-11-15",
});

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const session = await stripe.checkout.sessions.create({
			mode: "payment",
			payment_method_types: ["card"],
			line_items: body.items ?? [],
			success_url: `${request.headers.get(
				"origin"
			)}/success?sessionId={CHECKOUT_SESSION_ID}`,
			cancel_url: `${request.headers.get("origin")}/cart`,
		});
		return NextResponse.json(session);
	} catch (error) {
		return NextResponse.json({ error });
	}
}
