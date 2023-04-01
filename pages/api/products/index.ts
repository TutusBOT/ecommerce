import Product, { Product as IProduct } from "@/models/product";
import base64ToFile from "@/utils/base64ToFile";
import { connectMongo } from "@/lib/connectMongo";
import { getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession(req, res);
	await connectMongo();
	if (req.method === "GET") {
		try {
			const products = await getProducts(0);
			res.json(products);
		} catch (error) {
			res.json({ error });
		}
	}
	if (req.method === "POST") {
		// if (!session || !session.user)
		// 	return res.status(401).json({
		// 		error: "not_authenticated",
		// 		description:
		// 			"The user does not have an active session or is not authenticated",
		// 	});
		try {
			const imagePath = await base64ToFile({
				base64: req.body.image,
				path: "products/",
				name: req.body.title,
			});
			const product = await Product.create({
				...req.body,
				image: imagePath,
			});
			res.json({ product });
		} catch (error) {
			res.json({ error });
		}
	}
}

export const getProducts = async (limit: number) => {
	await connectMongo();
	return (await Product.find({})
		.limit(limit)
		.populate("category")
		.exec()) as IProduct[];
};
