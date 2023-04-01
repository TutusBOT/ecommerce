"use client";

import { Product } from "@/models/product";
import { useAppStore } from "@/store";

const AddToCartButton = ({ product }: { product: Product }) => {
	const addToCart = useAppStore((state) => state.addToCart);

	return (
		<button
			onClick={() => {
				addToCart(product);
			}}
		>
			add to cart
		</button>
	);
};
export default AddToCartButton;
