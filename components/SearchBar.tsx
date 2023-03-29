import { MdSearch } from "react-icons/md";
import IconButton from "./IconButton";

const SearchBar = () => {
	return (
		<div className="flex rounded-lg border border-gray-400">
			<input type="text" className="bg-transparent" />
			<IconButton>
				<MdSearch />
			</IconButton>
		</div>
	);
};
export default SearchBar;
