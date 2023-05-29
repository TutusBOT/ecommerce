"use client";

import CartItem from "@/app/cart/CartItem";
import IconButton from "@/components/IconButton";
import { useAppStore } from "@/store";
import Link from "next/link";
import { MdDeleteOutline, MdShoppingCart } from "react-icons/md";

const Cart = () => {
	const cart = useAppStore((state) => state.cart);
	const clearCart = useAppStore((state) => state.clearCart);
	return (
		<>
			<div className="flex items-center justify-between px-4 pt-4">
				<h2 className="flex items-center gap-2 text-2xl">
					Cart <MdShoppingCart />
				</h2>
				<IconButton onClick={() => clearCart()} type="button">
					Clear cart <MdDeleteOutline />
				</IconButton>
			</div>
			<div className="flex px-4 pt-4 sm:px-16">
				{cart.length ? (
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
