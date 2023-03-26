import CartItem from "@/components/CartItem";
import IconButton from "@/components/IconButton";
import { useAppStore } from "@/store";
import Link from "next/link";
import { MdDeleteOutline } from "react-icons/md";

const Cart = () => {
	const cart = useAppStore((state) => state.cart);
	const clearCart = useAppStore((state) => state.clearCart);
	return (
		<>
			<div className="flex justify-between items-center">
				<h2 className="text-2xl">Cart</h2>
				<IconButton onClick={() => clearCart}>
					Clear cart <MdDeleteOutline />
				</IconButton>
			</div>
			<div className="flex">
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
					<div className="w-full flex flex-col justify-center items-center gap-8">
						<h3 className="text-3xl">Your cart is empty</h3>
						<Link
							href="/"
							className="bg-blue-600 text-white py-2 px-12 rounded-3xl transition-colors hover:bg-blue-700"
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
