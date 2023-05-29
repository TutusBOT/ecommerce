"use client";

import IconButton from "@/components/IconButton";
import { Product } from "@/models/product";
import { useAppStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { MdAddShoppingCart, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const FavouriteProduct = ({ product }: { product: Product }) => {
	const removeFavourite = useAppStore((state) => state.removeFavourite);
	const addToCart = useAppStore((state) => state.addToCart);

	const handleRemove = () => {
		removeFavourite(product);
		toast.info(`Removed ${product.title} from favourites.`);
	};

	const handleAddToCart = () => {
		addToCart(product);
		toast.success(`Added ${product.title} to cart.`);
	};

	return (
		<li className="flex w-full items-center justify-between gap-2 rounded-md border border-gray-400 px-4 py-2 sm:gap-4">
			<div className="flex items-center gap-2 sm:gap-4">
				<Link href={`/product/${product._id}`} className="flex items-center">
					<Image
						src={product.image ?? ""}
						alt={product.title}
						width={80}
						height={80}
					/>
					<p>{product.title}</p>
				</Link>
				<p>${product.price}</p>
			</div>
			<div className="flex items-center gap-2 sm:gap-4">
				<IconButton type="button" onClick={handleAddToCart}>
					<MdAddShoppingCart />
				</IconButton>
				<IconButton type="button" onClick={handleRemove}>
					<MdDelete />
				</IconButton>
			</div>
		</li>
	);
};
export default FavouriteProduct;
