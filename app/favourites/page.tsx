import { AiFillHeart } from "react-icons/ai";
import FavouritesList from "./FavouritesList";

const page = () => (
	<div>
		<h2 className="flex items-center gap-4 px-4 pt-4 text-2xl">
			Favourites <AiFillHeart />
		</h2>
		<FavouritesList />
	</div>
);
export default page;
