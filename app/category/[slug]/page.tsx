import ProductPreview from "@/components/ProductPreview";
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
	const products = await ProductModel.find({}).populate("category");
	return JSON.parse(JSON.stringify(products));
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
