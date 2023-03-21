import Product, { IProduct } from "@/models/product";
import { connectMongo } from "@/utils/connectMongo";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		try {
			await connectMongo();
			const product = await getProduct(req.query.id);
			res.json(product);
		} catch (error) {
			res.json(error);
		}
	}
	if (req.method === "PATCH") {
		try {
			await connectMongo();
			const product = await Product.findByIdAndUpdate(req.query.id, req.body, {
				upsert: true,
				new: true,
			});
			res.json(product);
		} catch (error) {
			res.json(error);
		}
	}
	if (req.method === "DELETE") {
		try {
			await connectMongo();
			await Product.findByIdAndDelete(req.query.id);
			res.status(204).send("");
		} catch (error) {
			res.json(error);
		}
	}
}

export const getProduct = async (
	id: string | string[] | undefined
): Promise<IProduct> => {
	return await Product.findById(id).exec();
};
