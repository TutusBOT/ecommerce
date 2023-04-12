import Category, { categorySchema } from "@/models/category";
import { connectMongo } from "@/lib/connectMongo";
import { ZodError } from "zod";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		await connectMongo();
		const categories = await Category.find({});
		return NextResponse.json(categories);
	} catch (error) {
		return NextResponse.json({ error });
	}
}

export async function POST(request: Request) {
	try {
		const req = await request.json();
		await connectMongo();
		const categoryPayload = categorySchema.parse(req);
		const category = await Category.create(categoryPayload);
		return NextResponse.json(category);
	} catch (error) {
		if (error instanceof ZodError)
			return NextResponse.json({ error }, { status: 400 });
		else {
			return NextResponse.json({ error });
		}
	}
}
