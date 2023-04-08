import z from "zod";
import Filters from "./Filters";
import { Product } from "@/models/product";
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

const getProducts = async ({
	title,
	category,
	minPrice,
	maxPrice,
}: z.infer<typeof searchParamsSchema>) => {
	try {
		const req = await fetch(
			`http://localhost:3000/api/products?title=${title}&limit=0`,
			{ next: { revalidate: 10 } }
		);
		return (await req.json()) as Product[];
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
	const searchFilters = searchParamsSchema.parse(searchParams);
	const products = await getProducts(searchFilters);
	return (
		<div>
			<Filters />
			<ProductList products={products} />
		</div>
	);
};
export default Page;
