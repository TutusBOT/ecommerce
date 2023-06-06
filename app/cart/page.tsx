"use client";

import CartItem from "@/app/cart/CartItem";
import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import useStore from "@/hooks/useStore";
import getStripe from "@/lib/get-stripe";
import { useAppStore } from "@/store";
import axios from "axios";
import Link from "next/link";
import { MdDeleteOutline, MdShoppingCart } from "react-icons/md";

const Cart = () => {
	const cart = useStore(useAppStore, (state) => state.cart);
	const clearCart = useAppStore((state) => state.clearCart);

	const redirectToCheckout = async () => {
		const {
			data: { id },
		} = await axios.post("/api/checkout_sessions", {
			items: cart?.map(({ item, count }) => {
				return { price: item.stripeId, quantity: count };
			}),
		});
		const stripe = await getStripe();
		await stripe?.redirectToCheckout({ sessionId: id });
	};

	return (
		<>
			<div className="flex items-center justify-between px-4 pt-4">
				<h2 className="flex items-center gap-2 text-2xl">
					Cart <MdShoppingCart />
				</h2>
				<div className="flex gap-2">
					{cart?.length && (
						<Button
							type="button"
							variant="filled"
							onClick={() => redirectToCheckout()}
							className="bg-green-500 hover:bg-green-600"
						>
							Checkout
						</Button>
					)}
					<IconButton onClick={() => clearCart()} type="button">
						Clear cart <MdDeleteOutline />
					</IconButton>
				</div>
			</div>
			<div className="flex flex-col items-center gap-2 px-4 pt-4 sm:gap-4 sm:px-16 xl:gap-8 ">
				{cart?.length ? (
					cart.map(({ item, count }) => (
						<CartItem
							id={item._id}
							price={item.price}
							title={item.title}
							image={item.image ?? ""}
							count={count}
							key={item._id}
						/>
					))
				) : (
					<div className="flex w-full flex-col items-center justify-center gap-8">
						<h3 className="text-3xl">Your cart is empty</h3>
						<Link
							href="/"
							className="rounded-3xl bg-blue-600 py-2 px-12 text-white transition-colors hover:bg-blue-700"
						>
							Go to homepage
						</Link>
					</div>
				)}
			</div>
		</>
	);
};
export default Cart;
