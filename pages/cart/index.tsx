import { useAppStore } from "@/store";

const Cart = () => {
	const cart = useAppStore((state) => state.cart);
	console.log(cart);
	return <div>{JSON.stringify(cart)}</div>;
};
export default Cart;
