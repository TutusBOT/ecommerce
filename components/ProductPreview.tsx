import { Product } from "@/models/product";
import { useAppStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { MdAddShoppingCart } from "react-icons/md";
import IconButton from "./IconButton";

interface ProductPreview {
	product: Product;
}

const ProductPreview = ({ product }: ProductPreview) => {
	const addToCart = useAppStore((state) => state.addToCart);

	return (
		<div className="group w-full rounded-lg border border-transparent transition-colors hover:border-gray-200 hover:shadow-lg">
			<Link
				href={`/product/${product._id}`}
				className="flex flex-col px-4 py-2"
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
					<IconButton
						onClick={() => addToCart(product)}
						className="opacity-0 transition-opacity group-hover:opacity-100"
					>
						<MdAddShoppingCart />
					</IconButton>
				</div>
			</Link>
		</div>
	);
};
export default ProductPreview;
