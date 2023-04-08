"use client";

import { Product } from "@/models/product";
import { useAppStore } from "@/store";

interface ProductList {
	products: Product[];
}

const ProductList = ({ products }: ProductList) => {
	const filters = useAppStore((state) => state.filters);

	const filteredProducts = products.filter((product) => {
		return product.price > filters.minPrice && product.price < filters.maxPrice;
	});
	return (
		<>
			{filteredProducts.map((product) => (
				<div key={product._id}>{product.title}</div>
			))}
		</>
	);
};
export default ProductList;
