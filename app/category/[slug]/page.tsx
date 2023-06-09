import ProductPreview from "@/components/ProductPreview/ProductPreview";
import { connectMongo } from "@/lib/connectMongo";
import ProductModel, { Product } from "@/models/product";

export const dynamic = "force-dynamic";

const getProducts = async ({
	limit,
	category,
}: {
	limit: number;
	category: string;
}) => {
	await connectMongo();
	const products = await ProductModel.find({})
		.limit(limit)
		.lean()
		.populate("category");
	const filteredProducts = products.filter(
		(product) => product.category.slug === category
	);
	return JSON.parse(JSON.stringify(filteredProducts));
};

const page = async ({ params }: any) => {
	const products: Product[] = await getProducts({
		limit: 0,
		category: params.slug,
	});
	return (
		<div className="mt-4 flex flex-col items-center justify-center gap-2 px-2 sm:px-4">
			<h2 className="text-2xl capitalize">{params.slug}</h2>
			<div className="grid w-full max-w-7xl grid-cols-1 border-t-[1px] border-gray-300 py-4 sm:grid-cols-3">
				{products.map((product) => (
					<ProductPreview key={product._id} product={product} />
				))}
			</div>
		</div>
	);
};
export default page;
