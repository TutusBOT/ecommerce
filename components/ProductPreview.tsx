"use client";

import { Product } from "@/models/product";
import { useAppStore } from "@/store";
import Image from "next/image";
import { MdAddShoppingCart } from "react-icons/md";
import IconButton from "./IconButton";
import { useRouter } from "next/navigation";

interface ProductPreview {
	product: Product;
}

const ProductPreview = ({ product }: ProductPreview) => {
	const addToCart = useAppStore((state) => state.addToCart);
	const { push } = useRouter();

	return (
		<div className="group relative w-full rounded-lg border border-transparent transition-colors hover:border-gray-200 hover:shadow-lg">
			<div
				className="flex cursor-pointer flex-col px-4 py-2"
				onClick={() => {
					push(`/product/${product._id}`);
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
				onClick={() => addToCart(product)}
				className="absolute bottom-2 right-2 z-10 opacity-0 transition-opacity group-hover:opacity-100"
			>
				<MdAddShoppingCart />
			</IconButton>
		</div>
	);
};
export default ProductPreview;
