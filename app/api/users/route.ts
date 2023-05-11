import { connectMongo } from "@/lib/connectMongo";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import z from "zod";

const BRCYPT_SALT_ROUNDS = 10;

const requestSchema = z.object({
	email: z.string(),
	password: z.string(),
	isAdmin: z.boolean().optional(),
});

export async function POST(request: Request) {
	try {
		await connectMongo();
		const body = await request.json();
		const parsedBody = requestSchema.parse(body);
		const hashedPassword = await hash(parsedBody.password, BRCYPT_SALT_ROUNDS);
		const user = await User.create({
			hashedPassword,
			isAdmin: false,
			email: parsedBody.email,
		});
		return NextResponse.json({ email: user.email, isAdmin: user.isAdmin });
	} catch (error) {
		return NextResponse.json({ error });
	}
}
