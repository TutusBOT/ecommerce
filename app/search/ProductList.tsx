"use client";

import ProductPreview from "@/components/ProductPreview/ProductPreview";
import useStore from "@/hooks/useStore";
import { Product } from "@/models/product";
import { useAppStore } from "@/store";

interface ProductListProps {
	products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
	const filters = useStore(useAppStore, (state) => state.filters);
	const filteredProducts = products.filter(
		(product) =>
			!filters ||
			(product.price > filters?.minPrice && product.price < filters?.maxPrice)
	);
	return (
		<div className="flex items-center justify-center">
			<div className="w-full max-w-7xl">
				{filteredProducts.map((product) => (
					<ProductPreview product={product} key={product._id} />
				))}
			</div>
		</div>
	);
};
export default ProductList;
