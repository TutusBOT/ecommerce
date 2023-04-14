import { Product } from "@/models/product";
import ProductPreview from "@/components/ProductPreview";

const getProducts = async () => {
	const req = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products`, {
		next: { revalidate: 10 },
	});
	return await req.json();
};

export default async function Home() {
	const products = await getProducts();
	if (!products) return "Error while fetching products";

	return (
		<>
			<main>
				<div className="grid grid-cols-4 items-center justify-items-center gap-4 py-4 px-4">
					{products.map((product: Product) => (
						<ProductPreview key={product._id} product={product} />
					))}
				</div>
			</main>
		</>
	);
}
