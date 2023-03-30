import Category from "@/models/category";
import { connectMongo } from "@/lib/connectMongo";
import { NextApiRequest, NextApiResponse } from "next";

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
			const category = await Category.create(req.body);
			res.json(category);
		} catch (error) {
			res.json({ error });
		}
	}
}
