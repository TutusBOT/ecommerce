import Product from "@/models/product";
import { connectMongo } from "@/utils/connectMongo";
import { getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
	api: {
		bodyParse: false,
	},
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession(req, res);
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
		// if (!session || !session.user)
		// 	return res.status(401).json({
		// 		error: "not_authenticated",
		// 		description:
		// 			"The user does not have an active session or is not authenticated",
		// 	});
		try {
			await connectMongo();
			const product = await Product.create(req.body);
			res.json({ product });
		} catch (error) {
			res.json({ error });
		}
	}
}
