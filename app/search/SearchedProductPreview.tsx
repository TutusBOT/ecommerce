"use client";

import { Product } from "@/models/product";
import { useAppStore } from "@/store";
import Image from "next/image";
import { MdAddShoppingCart } from "react-icons/md";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AiFillHeart } from "react-icons/ai";
import useStore from "@/hooks/useStore";
import IconButton from "@/components/IconButton";

interface ProductPreviewProps {
	product: Product;
}

const ProductPreview = ({ product }: ProductPreviewProps) => {
	const { addToCart, addFavourite, removeFavourite } = useAppStore(
		(state) => state
	);
	const favourites = useStore(useAppStore, (state) => state.favourites);
	const isFavourite = favourites?.find(
		(favourite) => favourite._id === product._id
	);
	const { push } = useRouter();

	const handleAddToCart = () => {
		addToCart(product);
		toast.success(`Added ${product.title} to cart`);
	};

	const handleFavourite = () => {
		if (isFavourite) {
			removeFavourite(product);
			return toast.info(`Removed ${product.title} from favourites.`);
		}
		addFavourite(product);
		return toast.success(`Added ${product.title} to favourites.`);
	};

	return (
		<div className="group relative w-full rounded-lg border border-transparent transition-colors hover:border-gray-200 hover:shadow-lg">
			<div
				role="button"
				tabIndex={0}
				className="flex cursor-pointer flex-col px-4 py-2 md:flex-row md:items-start md:gap-4 md:text-xl xl:gap-6 xl:text-2xl"
				onClick={() => {
					push(`/product/${product._id}`);
				}}
				onKeyDown={(e) => {
					if (e.key === "Enter") push(`/product/${product._id}`);
				}}
			>
				<div className="relative h-[100px] w-[100px] md:h-[150px] md:w-[150px] lg:h-[200px] lg:w-[200px]">
					<Image
						src={product.image ?? "/products/placeholder.png"}
						alt={product.title}
						fill
						className="object-contain"
					/>
				</div>
				<p className="md:py-4">{product.title}</p>
				<div className="flex items-center justify-between md:py-4">
					<p>${product.price}</p>
				</div>
			</div>
			<IconButton
				type="button"
				onClick={handleFavourite}
				className={`absolute top-2 right-2 z-10 transition-opacity group-hover:opacity-100 ${
					isFavourite ? "opacity-100" : "opacity-100 sm:opacity-0"
				}`}
			>
				<AiFillHeart
					fill={isFavourite ? "red" : "black"}
					className="md:text-3xl"
				/>
			</IconButton>
			<IconButton
				type="button"
				onClick={handleAddToCart}
				className="absolute bottom-2 right-2 z-10 opacity-100 transition-opacity group-hover:opacity-100 sm:opacity-0"
			>
				<MdAddShoppingCart className="md:text-3xl" />
			</IconButton>
		</div>
	);
};
export default ProductPreview;
