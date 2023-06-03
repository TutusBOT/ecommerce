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

	const handleButtonClick = async () => {
		if (session?.user) {
			await signOut({ redirect: false });
		} else {
			signIn();
		}
	};

	return (
		<div className="group relative">
			<div
				role="button"
				tabIndex={0}
				className="flex cursor-pointer flex-col"
				onClick={handleProfileClick}
				onKeyDown={(e) => {
					if (e.key === "Enter") handleProfileClick();
				}}
			>
				{session?.user?.image ? (
					JSON.stringify(session.user.image)
				) : (
					<MdAccountCircle size={32} />
				)}
				<p className="text-xs">Profile</p>
			</div>
			<button
				type="button"
				className="absolute left-1/2 z-20 hidden w-20 -translate-x-1/2 rounded-lg border-[1px] border-gray-300 bg-white p-2 text-center text-sm transition-colors hover:bg-gray-100 group-hover:block"
				onClick={handleButtonClick}
			>
				{session?.user ? "Sign out" : "Sign in"}
			</button>
		</div>
	);
};
export default Profile;
