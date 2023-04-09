"use client";

import { useAppStore } from "@/store";
import Link from "next/link";
import { MdShoppingCart } from "react-icons/md";

const Cart = () => {
	const cart = useAppStore((state) => state.cart);
	return (
		<div className="group relative">
			<Link href="/cart">
				<div className="relative flex flex-col items-center">
					{cart.length ? (
						<div className="absolute -top-1 -right-1 flex h-4 w-4 place-content-center items-center justify-center rounded-full bg-blue-400 text-center text-xs text-white">
							{cart.length}
						</div>
					) : null}
					<MdShoppingCart size={32} />
					<p className="text-xs">Cart</p>
				</div>
				<div className="absolute hidden group-hover:block">
					{cart.length ? "Check cart" : "Cart is empty"}
				</div>
			</Link>
		</div>
	);
};
export default Cart;
