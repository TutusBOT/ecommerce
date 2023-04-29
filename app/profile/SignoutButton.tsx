"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignoutButton = () => {
	const { push } = useRouter();

	const handleSignOut = () => {
		// signOut();
		push("/");
	};

	return <button onClick={() => handleSignOut()}>Sign Out</button>;
};
export default SignoutButton;
