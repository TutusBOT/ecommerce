"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Button from "@/components/Button";

const SigninForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async () => {
		await signIn("credentials", {
			email,
			password,
			redirect: true,
			callbackUrl: "/",
		});
	};

	return (
		<div className="flex flex-col gap-6 rounded-xl border-[1px] border-gray-300 p-4 text-lg shadow-xl sm:p-8 sm:text-xl">
			<h2 className="mb-4 text-xl sm:text-3xl">Sign in</h2>

			<input
				type="email"
				value={email}
				className="rounded-xl border-[1px] border-gray-300 p-2 md:w-80"
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				value={password}
				className="rounded-xl border-[1px] border-gray-300 p-2 md:w-80"
				onChange={(e) => setPassword(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") handleSubmit();
				}}
			/>
			<Button type="button" variant="filled" onClick={handleSubmit}>
				Sign in
			</Button>
		</div>
	);
};
export default SigninForm;
