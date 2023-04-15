import Product, { Product as ProductInterface } from "@/models/product";
import { connectMongo } from "@/lib/connectMongo";
import { NextResponse } from "next/server";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		await connectMongo();
		const product = await getProduct(params.id);
		return NextResponse.json(product);
	} catch (error) {
		return NextResponse.json(error);
	}
}

export async function PATCH(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		await connectMongo();
		const body = request.json();
		const product = await Product.findByIdAndUpdate(params.id, body, {
			upsert: true,
			new: true,
		});
		return NextResponse.json(product);
	} catch (error) {
		return NextResponse.json(error);
	}
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		await connectMongo();
		await Product.findByIdAndDelete(params.id);
		return NextResponse.json("", { status: 204 });
	} catch (error) {
		return NextResponse.json(error);
	}
}

export const getProduct = async (
	id: string | string[] | undefined
): Promise<ProductInterface> => {
	await connectMongo();
	return await Product.findById(id).populate("category").exec();
};
