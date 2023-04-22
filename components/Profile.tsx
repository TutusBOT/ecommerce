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
			<div className="absolute left-1/2 hidden w-20 -translate-x-1/2 rounded-lg border-[1px] border-gray-300 bg-white p-2 text-center text-sm group-hover:block">
				<SignIn />
			</div>
		</div>
	);
};
export default Profile;
