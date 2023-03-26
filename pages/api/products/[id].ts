import Product, { Product as ProductInteface } from "@/models/product";
import { connectMongo } from "@/lib/connectMongo";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await connectMongo();
	if (req.method === "GET") {
		try {
			const product = await getProduct(req.query.id);
			res.json(product);
		} catch (error) {
			res.json(error);
		}
	}
	if (req.method === "PATCH") {
		try {
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
			await Product.findByIdAndDelete(req.query.id);
			res.status(204).send("");
		} catch (error) {
			res.json(error);
		}
	}
}

export const getProduct = async (
	id: string | string[] | undefined
): Promise<ProductInteface> => {
	await connectMongo();
	return await Product.findById(id).exec();
};
