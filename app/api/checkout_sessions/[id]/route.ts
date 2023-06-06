import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2022-11-15",
});

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		if (!params.id.startsWith("cs_")) {
			throw Error("Incorrect CheckoutSession ID.");
		}
		const checkoutSession = await stripe.checkout.sessions.retrieve(params.id);
		return NextResponse.json(checkoutSession);
	} catch (error) {
		return NextResponse.json(error);
	}
}
