import Link from "next/link";
import Cart from "./Cart";
import Profile from "./Profile";
import SearchBar from "./SearchBar";

const Navbar = () => {
	return (
		<header className="flex flex-col">
			<nav className="w-full">
				<ul className="flex items-center justify-end gap-4 py-2 px-4 text-xl shadow-md">
					<li>
						<Link href="/">Home</Link>
					</li>
					<li>
						<SearchBar />
					</li>
					<li>
						<Cart />
					</li>
					<li>
						<Profile />
					</li>
				</ul>
			</nav>
			<div className="w-full">
				<ul className="flex gap-4">
					<li>Laptops</li>
					<li>Smartphones</li>
				</ul>
			</div>
		</header>
	);
};
export default Navbar;
