"use client";

import useDebounce from "@/hooks/useDebounce";
import { useAppStore } from "@/store";
import { useEffect, useState } from "react";

const Filters = () => {
	const [minPrice, setMinPrice] = useState("");
	const [maxPrice, setMaxPrice] = useState("");
	const setFilters = useAppStore((state) => state.setFilters);
	const filters = useAppStore((state) => state.filters);
	const debouncedFilters = useDebounce(
		{
			minPrice: minPrice ? parseInt(minPrice) : 0,
			maxPrice: maxPrice ? parseInt(maxPrice) : 100000,
		},
		1000
	);

	useEffect(() => {
		if (debouncedFilters) {
			setFilters(debouncedFilters);
		}
	}, [debouncedFilters, setFilters]);

	return (
		<div className="flex flex-col gap-2">
			<h2 className="text-2xl">Filters</h2>
			<div className="flex flex-col gap-2">
				<h3 className="text-xl">Price</h3>
				<div className="flex items-center gap-2 text-lg">
					<input
						className="rounded-lg border-[1px] border-gray-300 px-2 py-1"
						type="number"
						name=""
						id=""
						placeholder="from"
						value={minPrice}
						onChange={(e) => setMinPrice(e.target.value)}
					/>
					<div className="h-px w-4 bg-gray-300" />
					<input
						className="rounded-lg border-[1px] border-gray-300 px-2 py-1"
						type="number"
						name=""
						id=""
						placeholder="to"
						value={maxPrice}
						onChange={(e) => setMaxPrice(e.target.value)}
					/>
				</div>
			</div>
			Filters: {JSON.stringify(filters)}
		</div>
	);
};
export default Filters;
