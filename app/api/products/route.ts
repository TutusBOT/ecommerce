import Product from "@/models/product";
import base64ToFile from "@/utils/base64ToFile";
import { connectMongo } from "@/lib/connectMongo";
import z from "zod";
import { NextResponse } from "next/server";

const productQuery = z.object({
	category: z.string().optional(),
	limit: z.preprocess((n) => {
		if (!n) return undefined;
		return parseFloat(z.string().parse(n));
	}, z.number().min(0).optional()),
	title: z.string().optional(),
});

export async function GET(request: Request) {
	try {
		await connectMongo();
		const { searchParams } = new URL(request.url);
		const params = productQuery.parse(searchParams);
		const products = await Product.find({
			title: new RegExp(params.title ?? "", "i"),
		})
			.limit(params.limit ? params.limit : 0)
			.populate("category")
			.exec();
		return NextResponse.json(products);
	} catch (error) {
		return NextResponse.json({ error });
	}
}

export async function POST(request: Request) {
	try {
		await connectMongo();
		const body = await request.json();
		const imagePath = await base64ToFile({
			base64: body.image,
			path: "products/",
			name: body.title,
		});
		const product = await Product.create({
			...body,
			image: imagePath,
		});
		return NextResponse.json({ product });
	} catch (error) {
		return NextResponse.json({ error });
	}
}
