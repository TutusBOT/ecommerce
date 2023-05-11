import ProductModel, { Product } from "@/models/product";
import ProductPreview from "@/components/ProductPreview";
import { connectMongo } from "@/lib/connectMongo";

const getProducts = async () => {
	await connectMongo();
	const products = await ProductModel.find({}).populate("category").exec();
	return JSON.parse(JSON.stringify(products));
};

export default async function Home() {
	const products = await getProducts();
	if (!products) return "Error while fetching products";

	return (
		<main className="flex items-center justify-center">
			<div className="grid w-full max-w-screen-2xl grid-cols-4 items-center justify-items-center gap-4 py-4 px-4">
				{products.map((product: Product) => (
					<ProductPreview key={product._id} product={product} />
				))}
			</div>
		</main>
	);
}
