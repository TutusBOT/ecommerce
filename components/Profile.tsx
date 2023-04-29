"use client";

import { MdAccountCircle } from "react-icons/md";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Profile = () => {
	const { push } = useRouter();
	const { data: session } = useSession();

	const handleProfileClick = () => {
		if (session?.user) {
			push("/profile");
		} else {
			signIn();
		}
	};

	const handleButtonClick = () => {
		if (session?.user) {
			signOut();
		} else {
			signIn();
		}
	};

	return (
		<div className="group relative">
			<div
				className="flex cursor-pointer flex-col"
				onClick={handleProfileClick}
			>
				{session?.user?.image ? (
					JSON.stringify(session.user.image)
				) : (
					<MdAccountCircle size={32} />
				)}
				<p className="text-xs">Profile</p>
			</div>
			<button
				className="absolute left-1/2 hidden w-20 -translate-x-1/2 rounded-lg border-[1px] border-gray-300 bg-white p-2 text-center text-sm transition-colors hover:bg-gray-100 group-hover:block"
				onClick={handleButtonClick}
			>
				{session?.user ? "Sign out" : "Sign in"}
			</button>
		</div>
	);
};
export default Profile;
