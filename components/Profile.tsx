import { useUser } from "@auth0/nextjs-auth0/client";
import SignIn from "./SignIn";

const Profile = () => {
	return (
		<div className="group relative">
			<div>Your account</div>
			<div className="hidden group-hover:block absolute w-full bg-white">
				<SignIn />
			</div>
		</div>
	);
};
export default Profile;
