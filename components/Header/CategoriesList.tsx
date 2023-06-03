"use client";

import { Category } from "@/models/category";
import Link from "next/link";
import { useState } from "react";
import Button from "../Button";
import SearchBar from "../SearchBar";

const CategoriesList = ({ categories }: { categories: Category[] }) => {
	const [show, setShow] = useState(false);

	return (
		<div className="relative z-10 flex items-center justify-between">
			<Button
				type="button"
				className="my-2 block sm:hidden"
				variant="outlined"
				onClick={() => setShow(!show)}
				onBlur={() => setShow(false)}
			>
				Categories
			</Button>
			<ul
				className={`absolute -left-4 top-14 flex flex-col gap-4 rounded-br-xl  bg-gray-100 pb-2 pr-2 pt-1 transition-opacity sm:static sm:flex-row sm:rounded-none sm:pb-0 sm:pr-0 ${
					show ? "flex" : "hidden sm:flex"
				}`}
			>
				{categories.map((category) => (
					<li
						key={category.slug}
						className="h-full border-0 border-gray-100 py-2  px-4 transition-all hover:border-x-gray-400 hover:border-t-gray-400 hover:bg-white hover:shadow-lg sm:rounded-t-lg sm:border-[1px]"
					>
						<Link href={`/category/${category.slug}`}>{category.name}</Link>
					</li>
				))}
			</ul>
			<div className="sm:hidden">
				<SearchBar />
			</div>
		</div>
	);
};
export default CategoriesList;
