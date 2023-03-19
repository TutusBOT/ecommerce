import Product from "@/models/product";
import { connectMongo } from "@/utils/connectMongo";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		try {
			await connectMongo();
			const products = await Product.find({}).exec();
			res.json(products);
		} catch (error) {
			res.json({ error });
		}
	}
	if (req.method === "POST") {
		try {
			await connectMongo();
			const product = await Product.create(req.body);
			res.json({ product });
		} catch (error) {
			res.json({ error });
		}
	}
}
