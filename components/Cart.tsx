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
				<div className="absolute left-1/2 hidden w-20 -translate-x-1/2 rounded-lg border-[1px] border-gray-300 bg-white p-2 text-center text-sm transition-colors hover:bg-gray-100 group-hover:block">
					{cart.length ? "Check cart" : "Your cart is empty"}
				</div>
			</Link>
		</div>
	);
};
export default Cart;
