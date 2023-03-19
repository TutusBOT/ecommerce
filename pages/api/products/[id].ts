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
			const product = await Product.findById(req.query.id).exec();
			res.json(product);
		} catch (error) {
			res.json(error);
		}
	}
	if (req.method === "POST") res.json(req.body);
	if (req.method === "PATCH") {
		try {
			await connectMongo();
			const product = await Product.findByIdAndUpdate(req.query.id, req.body, {
				upsert: true,
				new: true,
			});
			console.log(product);
			res.json(product);
		} catch (error) {
			res.json(error);
		}
	}
}
