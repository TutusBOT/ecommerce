import ProductModel, { Product } from "@/models/product";
import ProductPreview from "@/components/ProductPreview/ProductPreview";
import { connectMongo } from "@/lib/connectMongo";
import FeaturedProduct from "@/components/FeaturedProduct/FeaturedProduct";

const getProducts = async () => {
	await connectMongo();
	const products = await ProductModel.find({})
		.lean()
		.populate("category")
		.limit(8);
	return JSON.parse(JSON.stringify(products));
};

export default async function Home() {
	const products = await getProducts();
	if (!products) return "Error while fetching products";

	return (
		<main className="flex flex-col items-center justify-center px-4 pb-12">
			<FeaturedProduct product={products[1]} />
			<h2 className="mt-8 text-2xl">Recommended</h2>
			<div className="grid w-full max-w-screen-2xl grid-cols-2 items-center justify-items-center gap-4 py-4 sm:grid-cols-3 lg:grid-cols-4">
				{products.map((product: Product) => (
					<ProductPreview key={product._id} product={product} />
				))}
			</div>
		</main>
	);
}
