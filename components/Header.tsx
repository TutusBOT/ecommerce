import { Category } from "@/models/category";
import Link from "next/link";
import Cart from "./Cart";
import Profile from "./Profile";
import SearchBar from "./SearchBar";

interface HeaderProps {
	categories: Category[];
}

const Header = ({ categories }: HeaderProps) => (
	<header className="flex flex-col">
		<nav className="w-full">
			<ul className="flex items-center justify-between gap-4 py-2 px-8 text-xl shadow-md">
				<li>
					<Link href="/">Home</Link>
				</li>
				<li>
					<SearchBar />
				</li>
				<li className="item-center flex gap-4">
					<Cart />
					<Profile />
				</li>
			</ul>
		</nav>
		<div className="w-full bg-gray-100 px-4 text-xl shadow-md">
			<ul className="flex gap-4 pt-1">
				{categories.map((category) => (
					<li
						key={category.slug}
						className="h-full rounded-t-lg border-[1px] border-gray-100  py-2 px-4 transition-all hover:border-x-gray-400 hover:border-t-gray-400 hover:bg-white hover:shadow-lg"
					>
						<Link href={`/category/${category.slug}`}>{category.name}</Link>
					</li>
				))}
			</ul>
		</div>
	</header>
);
export default Header;
