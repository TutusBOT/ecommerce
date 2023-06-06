"use client";

import { useAppStore } from "@/store";
import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";

const Page = ({ searchParams }: { searchParams: { sessionId: string } }) => {
	const { sessionId } = searchParams;
	const clearCart = useAppStore((state) => state.clearCart);

	useEffect(() => {
		const finishCheckout = async () => {
			const req = await axios.get(`/api/checkout_sessions/${sessionId}`);
			if (req.data) clearCart();
		};
		finishCheckout();
	});

	if (!sessionId)
		return (
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-red-500">
				Something went wrong
			</div>
		);

	return (
		<main className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-4 text-center text-2xl">
			<h2>Your order was successful!</h2>
			<p>Thank you for purchasing in our store. </p>
			<Link
				href="/"
				className="rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600"
			>
				Return to the home page
			</Link>
		</main>
	);
};
export default Page;
