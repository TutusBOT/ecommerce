"use client";

import useStore from "@/hooks/useStore";
import { Product } from "@/models/product";
import { useAppStore } from "@/store";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import SearchedProductPreview from "./SearchedProductPreview";

interface ProductListProps {
	products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
	const [showSorting, setShowSorting] = useState(false);
	const [sorting, setSorting] = useState<"featured" | "low" | "high">(
		"featured"
	);
	const filters = useStore(useAppStore, (state) => state.filters);

	const filteredProducts = products
		.filter(
			(product) =>
				!filters ||
				(product.price >= filters?.minPrice &&
					product.price <= filters?.maxPrice &&
					(filters.category
						? product.category.slug === filters.category
						: true))
		)
		.sort((a: Product, b: Product) => {
			if (sorting === "low") return a.price - b.price;
			if (sorting === "high") return b.price - a.price;
			return 0;
		});

	return (
		<div className="relative col-span-2 flex flex-col items-center justify-center gap-4 md:gap-8">
			<button
				type="button"
				className={`relative flex w-56 items-center justify-between gap-2 border-[1px] px-4 py-2 text-left text-xl ${
					showSorting
						? "rounded-t-xl border-x-gray-300 border-t-gray-300 border-b-white"
						: "rounded-xl   border-gray-300"
				}`}
				onClick={() => setShowSorting(!showSorting)}
				onBlur={() => setShowSorting(false)}
			>
				<div className="absolute -top-3 bg-white text-sm">Sorting</div>
				{sorting === "featured" && "Featured"}
				{sorting === "high" && "Price: high to low"}
				{sorting === "low" && "Price: low to high"}
				{showSorting ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
			</button>
			<div
				className={` absolute top-11 z-10 flex w-56 flex-col gap-2 rounded-b-xl border-[1px] border-gray-300 bg-white transition-opacity  ${
					showSorting
						? "pointer-events-auto opacity-100"
						: "pointer-events-none  opacity-0"
				}`}
			>
				<button
					type="button"
					onClick={() => {
						setSorting("featured");
						setShowSorting(false);
					}}
					className="px-4 text-left hover:bg-gray-200"
				>
					Featured
				</button>
				<button
					type="button"
					onClick={() => {
						setSorting("low");
						setShowSorting(false);
					}}
					className="px-4 text-left hover:bg-gray-200"
				>
					Price: low to high
				</button>
				<button
					type="button"
					onClick={() => {
						setSorting("high");
						setShowSorting(false);
					}}
					className="px-4 text-left hover:bg-gray-200"
				>
					Price: high to low
				</button>
			</div>

			<div className="flex w-full max-w-7xl flex-col gap-2 px-2">
				{filteredProducts.map((product) => (
					<SearchedProductPreview product={product} key={product._id} />
				))}
			</div>
		</div>
	);
};
export default ProductList;
