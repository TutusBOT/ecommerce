"use client";

import useDebounce from "@/hooks/useDebounce";
import { Category } from "@/models/category";
import { useAppStore } from "@/store";
import { useEffect, useState } from "react";

const Filters = ({ categories }: { categories: Category[] }) => {
	const [minPrice, setMinPrice] = useState("");
	const [maxPrice, setMaxPrice] = useState("");
	const [category, setCategory] = useState("");
	const setFilters = useAppStore((state) => state.setFilters);
	const debouncedFilters = useDebounce(
		{
			minPrice: minPrice ? parseInt(minPrice, 10) : 0,
			maxPrice: maxPrice ? parseInt(maxPrice, 10) : 100000,
			category,
		},
		500
	);

	useEffect(() => {
		if (debouncedFilters) {
			setFilters(debouncedFilters);
		}
	}, [debouncedFilters, setFilters]);

	return (
		<div className="flex h-min flex-col gap-2 border-b-[1px] border-gray-300 px-2 pb-4 sm:border-[1px] sm:p-4 md:p-8 md:text-lg">
			<p>Ecommerce {category !== "" && `> ${category}`}</p>
			<h2 className="text-2xl md:text-3xl">Filters</h2>
			<div className="flex flex-col gap-2">
				<h3 className="mt-2 border-t-[1px] border-gray-300 pt-2 text-xl md:text-2xl">
					Category
				</h3>
				<div className="flex flex-col items-start justify-center gap-2">
					{category !== "" && (
						<button type="button" onClick={() => setCategory("")}>
							All categories
						</button>
					)}
					{categories.map((category) => (
						<button
							type="button"
							key={category.slug}
							onClick={() => setCategory(category.slug)}
						>
							{category.name}
						</button>
					))}
				</div>
				<h3 className="mt-2 border-t-[1px] border-gray-300 pt-2 text-xl md:text-2xl">
					Price
				</h3>
				<div className="flex items-center gap-2">
					<input
						className="w-16 rounded-lg border-[1px] border-gray-300 px-2 py-1 md:w-24"
						type="number"
						name=""
						id=""
						placeholder="from"
						value={minPrice}
						onChange={(e) => setMinPrice(e.target.value)}
					/>
					<div className="h-px w-2 bg-gray-300" />
					<input
						className="w-16 rounded-lg border-[1px] border-gray-300 px-2 py-1 md:w-24"
						type="number"
						name=""
						id=""
						placeholder="to"
						value={maxPrice}
						onChange={(e) => setMaxPrice(e.target.value)}
					/>
				</div>
			</div>
		</div>
	);
};
export default Filters;
