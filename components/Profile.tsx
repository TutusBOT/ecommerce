import { useUser } from "@auth0/nextjs-auth0/client";
import SignIn from "./SignIn";
import { MdAccountCircle } from "react-icons/md";

const Profile = () => {
	return (
		<div className="group relative">
			<div className="flex flex-col">
				<MdAccountCircle size={32} />
				<p className="text-xs">Profile</p>
			</div>
			<div className="absolute hidden w-full bg-white group-hover:block">
				<SignIn />
			</div>
		</div>
	);
};
export default Profile;
