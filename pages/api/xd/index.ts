import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") res.send("get");
	if (req.method === "POST") res.json(req.body);
	res.send("xd");
}
