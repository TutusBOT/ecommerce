import { connectMongo } from "@/lib/connectMongo";
import Test from "@/models/testModel";

export default async function addTest(req: any, res: any) {
	try {
		console.log("CONNECTING TO MONGO");
		await connectMongo();
		console.log("CONNECTED TO MONGO");

		console.log("CREATING DOCUMENT");
		console.log(req.body.name);
		const test = await Test.create(req.body);
		console.log("CREATED DOCUMENT");

		res.json({ test });
	} catch (error) {
		console.log(error);
		res.json({ error });
	}
}
