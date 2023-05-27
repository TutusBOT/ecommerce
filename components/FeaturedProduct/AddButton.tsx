"use client";

import { Product } from "@/models/product";
import { useAppStore } from "@/store";
import { MdShoppingCart } from "react-icons/md";
import { toast } from "react-toastify";
import Button from "../Button";

const AddButton = ({ product }: { product: Product }) => {
	const addToCart = useAppStore((state) => state.addToCart);

	const handleAddToCart = () => {
		addToCart(product);
		toast.success(`Added ${product.title} to cart`);
	};
	return (
		<Button
			type="button"
			variant="outlined"
			className="flex items-center justify-center gap-2"
			onClick={handleAddToCart}
		>
			<MdShoppingCart />
			Add to cart
		</Button>
	);
};
export default AddButton;
