import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2022-11-15",
});

export const config = {
	api: {
		bodyParser: false,
	},
};

export async function POST(request: Request) {
	let event;
	try {
		const buffer = Buffer.from(request.toString());
		const signature = request.headers.get("stripe-signature");
		event = stripe.webhooks.constructEvent(
			buffer,
			signature!,
			process.env.STRIPE_WEBHOOK_SECRET!
		);

		if (event.type === "checkout.session.completed") {
			console.log("Payment received");
		} else {
			console.log(`Unhandled event type: ${event.type}`);
		}
		return NextResponse.json({ received: true });
	} catch (error) {
		return NextResponse.json(error);
	}
}
