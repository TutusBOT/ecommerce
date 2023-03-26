import User from "@/models/user";
import { connectMongo } from "@/lib/connectMongo";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default withApiAuthRequired(
	async (req: NextApiRequest, res: NextApiResponse) => {
		const xd = await getSession(req, res);
		console.log(xd);
		if (req.method === "GET") {
			try {
				await connectMongo();
				const user = await User.findOne(req.body.email);
				res.json(user);
			} catch (error) {
				res.json(error);
			}
		}
		if (req.method === "POST") {
			try {
				await connectMongo();
				const user = await User.create(req.body);
				res.json(user);
			} catch (error) {
				res.json(error);
			}
		}
		if (req.method === "PATCH") {
			try {
				await connectMongo();
				const user = await User.findOneAndUpdate(req.body.email, req.body, {
					upsert: true,
					new: true,
				});
				res.json(user);
			} catch (error) {
				res.json(error);
			}
		}
		if (req.method === "DELETE") {
			try {
				await connectMongo();
				await User.findOneAndDelete(req.body.email);
				res.status(204).send("");
			} catch (error) {
				res.json(error);
			}
		}
	}
);
