import z from "zod";
import ProductModel from "@/models/product";
import { connectMongo } from "@/lib/connectMongo";
import CategoryModel from "@/models/category";
import Filters from "./Filters";
import ProductList from "./ProductList";

const searchParamsSchema = z.object({
	title: z.string(),
	category: z.string().optional(),
	minPrice: z.preprocess((p) => {
		if (!p) return undefined;
		return parseFloat(z.string().parse(p));
	}, z.number().positive().optional()),
	maxPrice: z.preprocess((p) => {
		if (!p) return undefined;
		return parseFloat(z.string().parse(p));
	}, z.number().positive().optional()),
});

const getProducts = async ({ title }: z.infer<typeof searchParamsSchema>) => {
	try {
		await connectMongo();
		const products = await ProductModel.find({
			title: new RegExp(title ?? "", "i"),
		})
			.lean()
			.populate("category")
			.exec();
		return JSON.parse(JSON.stringify(products));
	} catch (error) {
		console.error(error);
		return [];
	}
};

const getCategories = async () => {
	await connectMongo();
	const categories = await CategoryModel.find({}).lean();
	return JSON.parse(JSON.stringify(categories));
};

const Page = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) => {
	const categories = await getCategories();
	let products;
	try {
		const searchFilters = searchParamsSchema.parse(searchParams);
		products = await getProducts(searchFilters);
	} catch (error) {
		products = await getProducts({ title: "" });
	}

	return (
		<div className="flex flex-col gap-4 pb-12 pt-4 md:grid md:grid-cols-3 md:px-16">
			<Filters categories={categories} />
			<ProductList products={products} />
		</div>
	);
};
export default Page;
