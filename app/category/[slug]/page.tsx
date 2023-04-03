import ProductPreview from "@/components/ProductPreview";
import { Product } from "@/models/product";

const getProducts = async ({
	limit,
	category,
}: {
	limit: number;
	category: string;
}) => {
	const req = await fetch(
		`http://localhost:3000/api/products?limit=${limit}&category=${category}`,
		{ next: { revalidate: 10 } }
	);
	return await req.json();
};

const page = async ({ params }: any) => {
	const products: Product[] = await getProducts({
		limit: 0,
		category: params.slug,
	});
	return (
		<div className="grid">
			{products.map((product) => (
				<ProductPreview key={product._id} product={product} />
			))}
		</div>
	);
};
export default page;
