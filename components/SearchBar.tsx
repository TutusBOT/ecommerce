"use client";

import { MdSearch } from "react-icons/md";
import { useState } from "react";
import { useRouter } from "next/navigation";
import IconButton from "./IconButton";

const SearchBar = () => {
	const { push } = useRouter();
	const [query, setQuery] = useState("");

	const handleSearch = () => {
		push(`/search?title=${query}`);
		setQuery("");
	};

	return (
		<div className="flex w-full rounded-lg border border-gray-400">
			<input
				type="text"
				className="bg-transparent pl-2 outline-none"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") handleSearch();
				}}
			/>
			<IconButton type="button" onClick={handleSearch}>
				<MdSearch />
			</IconButton>
		</div>
	);
};
export default SearchBar;
