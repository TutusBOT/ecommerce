import Category, { categorySchema } from "@/models/category";
import { connectMongo } from "@/lib/connectMongo";
import { ZodError } from "zod";
import { NextResponse } from "next/server";

// export default async function handler(
// 	req: NextApiRequest,
// 	res: NextApiResponse
// ) {
// 	await connectMongo();
// 	if (req.method === "GET") {
// 		try {
// 			const categories = await Category.find({});
// 			res.json(categories);
// 		} catch (error) {
// 			res.json({ error });
// 		}
// 	}
// 	if (req.method === "POST") {
// 		try {
// 			const categoryPayload = categorySchema.parse(req.body);
// 			const category = await Category.create(categoryPayload);
// 			res.json(category);
// 		} catch (error) {
// 			if (error instanceof ZodError) res.status(400).json({ error });
// 			else {
// 				res.json({ error });
// 			}
// 		}
// 	}
// }

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
