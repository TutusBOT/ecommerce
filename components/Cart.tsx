import { useAppStore } from "@/store";
import Link from "next/link";

const Cart = () => {
	const cart = useAppStore((state) => state.cart);
	return (
		<div className="group relative">
			<Link href="/cart">
				<div>Cart</div>
				<div className="hidden group-hover:block absolute">
					{cart.length ? "Check cart" : "Cart is empty"}
				</div>
			</Link>
		</div>
	);
};
export default Cart;
