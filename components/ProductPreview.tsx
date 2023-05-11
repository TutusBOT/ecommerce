"use client";

import { Product } from "@/models/product";
import { useAppStore } from "@/store";
import Image from "next/image";
import { MdAddShoppingCart } from "react-icons/md";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import IconButton from "./IconButton";

interface ProductPreviewProps {
	product: Product;
}

const ProductPreview = ({ product }: ProductPreviewProps) => {
	const addToCart = useAppStore((state) => state.addToCart);
	const handleAddToCart = () => {
		addToCart(product);
		toast.success(`Added ${product.title} to cart`);
	};
	const { push } = useRouter();

	return (
		<div className="group relative w-full rounded-lg border border-transparent transition-colors hover:border-gray-200 hover:shadow-lg">
			<div
				role="button"
				tabIndex={0}
				className="flex cursor-pointer flex-col px-4 py-2"
				onClick={() => {
					push(`/product/${product._id}`);
				}}
				onKeyDown={(e) => {
					if (e.key === "Enter") push(`/product/${product._id}`);
				}}
			>
				<Image
					src={product.image ?? "/products/placeholder.png"}
					alt={product.title}
					width={100}
					height={100}
				/>
				<p>{product.title}</p>
				<div className="flex items-center justify-between">
					<p>{product.price}</p>
				</div>
			</div>
			<IconButton
				type="button"
				onClick={handleAddToCart}
				className="absolute bottom-2 right-2 z-10 opacity-0 transition-opacity group-hover:opacity-100"
			>
				<MdAddShoppingCart />
			</IconButton>
		</div>
	);
};
export default ProductPreview;
