import z from "zod";
import Filters from "./Filters";
import ProductModel, { Product } from "@/models/product";
import ProductList from "./ProductList";
import { connectMongo } from "@/lib/connectMongo";

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

const getProducts = async ({
	title,
	category,
	minPrice,
	maxPrice,
}: z.infer<typeof searchParamsSchema>) => {
	try {
		await connectMongo();
		const products = await ProductModel.find({
			title: new RegExp(title ?? "", "i"),
		})
			.populate("category")
			.exec();
		return JSON.parse(JSON.stringify(products));
	} catch (error) {
		console.error(error);
		return [];
	}
};

const Page = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) => {
	let products;
	try {
		const searchFilters = searchParamsSchema.parse(searchParams);
		products = await getProducts(searchFilters);
	} catch (error) {
		products = await getProducts({ title: "" });
	}
	return (
		<div className="flex flex-col sm:flex-row">
			<Filters />
			<ProductList products={products} />
		</div>
	);
};
export default Page;
