import { useAppStore } from "@/store";

const Cart = () => {
	const cart = useAppStore((state) => state);
	return (
		<div className="group relative">
			<div>Cart</div>
			<div className="hidden group-hover:block absolute">
				{cart.cart ? "Check cart" : "Cart is empty"}
			</div>
		</div>
	);
};
export default Cart;
