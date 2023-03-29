import Link from "next/link";
import Cart from "./Cart";
import Profile from "./Profile";
import SearchBar from "./SearchBar";

const Navbar = () => {
	return (
		<header>
			<nav>
				<ul className="flex justify-end gap-4 py-2 px-4 text-xl shadow-md">
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
		</header>
	);
};
export default Navbar;
