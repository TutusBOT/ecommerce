"use client";

import { MdSearch } from "react-icons/md";
import IconButton from "./IconButton";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
	const { push } = useRouter();
	const [query, setQuery] = useState("");
	return (
		<div className="flex w-full rounded-lg border border-gray-400">
			<input
				type="text"
				className="bg-transparent pl-2 outline-none"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<IconButton
				onClick={() => {
					push(`/search?title=${query}`);
					setQuery("");
				}}
			>
				<MdSearch />
			</IconButton>
		</div>
	);
};
export default SearchBar;
