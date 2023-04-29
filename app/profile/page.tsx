import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SignoutButton from "./SignoutButton";

const page = async () => {
	const session = await getServerSession(authOptions);
	return (
		<div>
			{session?.user?.name}
			{session?.user ? <SignoutButton /> : ""}
		</div>
	);
};
export default page;
