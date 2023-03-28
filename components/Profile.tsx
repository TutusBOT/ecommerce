import { useUser } from "@auth0/nextjs-auth0/client";
import SignIn from "./SignIn";

const Profile = () => {
	return (
		<div className="group relative">
			<div>Your account</div>
			<div className="absolute hidden w-full bg-white group-hover:block">
				<SignIn />
			</div>
		</div>
	);
};
export default Profile;
