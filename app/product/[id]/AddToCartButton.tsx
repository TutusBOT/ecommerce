"use client";

import { Product } from "@/models/product";
import { useAppStore } from "@/store";
import { toast } from "react-toastify";

const AddToCartButton = ({ product }: { product: Product }) => {
	const addToCart = useAppStore((state) => state.addToCart);
	const handleAddToCart = () => {
		addToCart(product);
		toast.success(`Added ${product.title} to cart`);
	};

	return <button onClick={handleAddToCart}>add to cart</button>;
};
export default AddToCartButton;
