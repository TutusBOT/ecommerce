import z from "zod";

const searchParamsSchema = z.object({
	query: z.string(),
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
	query,
	category,
	minPrice,
	maxPrice,
}: z.infer<typeof searchParamsSchema>) => {
	const req = await fetch(
		`http://localhost:3000/products?title=${query}&category=${category}&limit=0`,
		{ next: { revalidate: 10 } }
	);
	return await req.json();
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
			{products.map((product: any) => (
				<div key={product._id}>{product.name}</div>
			))}
		</div>
	);
};
export default Page;
