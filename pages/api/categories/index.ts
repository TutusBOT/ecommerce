import Category, { categorySchema } from "@/models/category";
import { connectMongo } from "@/lib/connectMongo";
import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await connectMongo();
	if (req.method === "GET") {
		try {
			const categories = await Category.find({});
			res.json(categories);
		} catch (error) {
			res.json({ error });
		}
	}
	if (req.method === "POST") {
		try {
			const categoryPayload = categorySchema.parse(req.body);
			const category = await Category.create(categoryPayload);
			res.json(category);
		} catch (error) {
			if (error instanceof ZodError) res.status(400).json({ error });
			else {
				res.json({ error });
			}
		}
	}
}
