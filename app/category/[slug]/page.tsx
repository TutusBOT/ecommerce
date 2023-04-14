import ProductPreview from "@/components/ProductPreview";
import { Product } from "@/models/product";

export const dynamic = "force-dynamic";

const getProducts = async ({
	limit,
	category,
}: {
	limit: number;
	category: string;
}) => {
	const req = await fetch(
		`${process.env.NEXT_PUBLIC_SITE_URL}/api/products?limit=${limit}&category=${category}`,
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
