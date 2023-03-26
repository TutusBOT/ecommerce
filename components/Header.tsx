import Cart from "./Cart";
import Profile from "./Profile";

const Navbar = () => {
	return (
		<header>
			<nav>
				<ul className="flex justify-end shadow-md py-2 px-4 gap-4 text-xl">
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
