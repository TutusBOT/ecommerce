"use client";

import { Product } from "@/models/product";
import { useAppStore } from "@/store";
import { useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { toast } from "react-toastify";
import z from "zod";

const amountSchema = z.preprocess((n) => {
	if (!n) return 1;
	return parseInt(z.string().parse(n));
}, z.number().positive());

const AddToCartButton = ({ product }: { product: Product }) => {
	const [amount, setAmount] = useState("1");

	const addToCart = useAppStore((state) => state.addToCart);
	const handleAddToCart = () => {
		const parsedAmount = amountSchema.parse(amount);
		if (!parsedAmount)
			return toast.error("Provide appropriate number of items.");
		for (let i = 0; i < parsedAmount; i++) {
			addToCart(product);
		}
		toast.success(`Added ${product.title} to cart`);
	};

	return (
		<div className="flex gap-2">
			<input
				type="number"
				min={1}
				value={amount}
				onChange={(e) => setAmount(e.target.value)}
				className="w-10 rounded-2xl border-[1px] border-gray-300 pl-2 outline-none"
			/>
			<button
				onClick={handleAddToCart}
				className="flex items-center gap-2 rounded-2xl bg-green-600 px-6 py-2 text-white transition-colors hover:bg-green-800"
			>
				<MdAddShoppingCart /> Add to cart
			</button>
		</div>
	);
};
export default AddToCartButton;
