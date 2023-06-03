"use client";

import Button from "@/components/Button";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import z from "zod";

export const userRequestSchema = z.object({
	email: z.string(),
	password: z.string(),
	isAdmin: z.boolean().optional(),
});

const RegisterForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async () => {
		try {
			const body = userRequestSchema.parse({ email, password });
			axios.post(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users`, body);
		} catch (error) {
			toast(JSON.stringify(error));
		}
	};

	return (
		<div className="flex flex-col gap-6 rounded-xl border-[1px] border-gray-300 p-4 text-lg shadow-xl sm:p-8 sm:text-xl">
			<h2 className="mb-4 text-xl md:text-3xl">Sign up</h2>
			<input
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="rounded-xl border-[1px] border-gray-300 p-2 md:w-80"
			/>
			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className="rounded-xl border-[1px] border-gray-300 p-2 md:w-80"
			/>
			<Button type="button" onClick={handleSubmit} variant="filled">
				Sign up
			</Button>
		</div>
	);
};
export default RegisterForm;
