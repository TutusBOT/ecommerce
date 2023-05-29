import { Category } from "@/models/category";
import Link from "next/link";
import { AiFillHeart } from "react-icons/ai";
import Cart from "../Cart";
import Profile from "../Profile";
import SearchBar from "../SearchBar";
import CategoriesList from "./CategoriesList";

interface HeaderProps {
	categories: Category[];
}

const Header = ({ categories }: HeaderProps) => (
	<header className="flex flex-col">
		<nav className="w-full">
			<ul className="flex items-center justify-between gap-2 py-2 px-4 text-xl shadow-md sm:gap-4 sm:px-8">
				<li>
					<Link href="/">Home</Link>
				</li>
				<li className="hidden sm:block">
					<SearchBar />
				</li>
				<li className="item-center flex gap-4">
					<Link
						href="/favourites"
						className="flex flex-col items-center justify-center"
					>
						<AiFillHeart size={32} />
						<p className="text-xs">Favourites</p>
					</Link>
					<Cart />
					<Profile />
				</li>
			</ul>
		</nav>
		<div className="w-full bg-gray-100 px-4 text-xl shadow-md">
			<CategoriesList categories={categories} />
		</div>
	</header>
);
export default Header;
