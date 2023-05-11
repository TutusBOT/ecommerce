"use client";

import Button from "@/components/Button";
import { signOut } from "next-auth/react";

const SignoutButton = () => {
	const handleSignOut = async () => {
		await signOut({ redirect: true, callbackUrl: "/" });
	};

	return (
		<Button
			type="button"
			onClick={() => handleSignOut()}
			variant="outlined"
			className="text-xl"
		>
			Sign Out
		</Button>
	);
};
export default SignoutButton;
