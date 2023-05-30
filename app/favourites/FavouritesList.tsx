"use client";

import useStore from "@/hooks/useStore";
import { useAppStore } from "@/store";
import FavouriteProduct from "./FavouriteProduct";

const FavouritesList = () => {
	const favourites = useStore(useAppStore, (state) => state.favourites);
	return (
		<main className="flex flex-col gap-4 py-4 px-4 sm:px-16">
			<ul className="flex flex-col gap-4 ">
				{favourites?.map((product) => (
					<FavouriteProduct product={product} key={product._id} />
				))}
			</ul>
			<div className="flex w-full justify-between text-lg">
				<div>
					{favourites?.length}{" "}
					{favourites?.length === 1 ? "product" : "products"}
				</div>
				<div>
					Total cost of your list: $
					{favourites
						?.map((product) => product.price)
						.reduce((sum, price) => sum + price, 0)}
				</div>
			</div>
			{favourites?.length === 0 && (
				<p className="absolute top-1/2 left-1/2 w-5/6 -translate-x-1/2 -translate-y-1/2 border-[1px] border-gray-300 p-4 text-center text-xl md:w-max">
					Your list is empty. Add new products to your list by clicking a heart
					icon next to them!
				</p>
			)}
		</main>
	);
};
export default FavouritesList;
