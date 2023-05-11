import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SignoutButton from "./SignoutButton";

const page = async () => {
	const session = await getServerSession(authOptions);
	return (
		<div className="flex flex-col items-center justify-center gap-8 pt-24">
			<h2 className="text-4xl">Welcome, {session?.user?.email}</h2>
			{session?.user ? <SignoutButton /> : ""}
		</div>
	);
};
export default page;
