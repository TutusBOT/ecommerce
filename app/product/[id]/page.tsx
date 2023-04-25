import ProductModel, { Product as ProductInterface } from "@/models/product";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";
export const dynamic = "force-dynamic";
import { connectMongo } from "@/lib/connectMongo";
import Link from "next/link";

const getProduct = async (id: string) => {
	await connectMongo();
	const product = await ProductModel.findById(id).populate("category");
	return JSON.parse(JSON.stringify(product));
};

const Product = async ({ params }: any) => {
	const product: ProductInterface = await getProduct(params.id);
	if (!product) return <>Product not found</>;
	return (
		<div className="flex flex-col items-center justify-center">
			<div className="w-full px-8 pt-4 text-lg">
				Ecommerce{" > "}
				<Link
					className="hover:underline"
					href={`category/${product.category.slug}`}
				>
					{product.category.name}
				</Link>
			</div>
			<main className="max-w-7x flex flex-col items-center pt-8">
				<div className="grid w-full grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 2xl:w-[1536px]">
					<div className="relative w-full">
						<Image
							src={product.image ?? ""}
							alt={product.title}
							fill
							className="object-contain"
						/>
					</div>
					<div className="flex w-full flex-col gap-2">
						<div className="flex">
							<h2 className="text-4xl">{product.title}</h2>
						</div>
						<div className="grid gap-2 lg:grid-cols-2">
							<div className="flex flex-col border-[1px] border-gray-300">
								<p>
									<strong>Description:</strong> {product.description}
								</p>
								<p>
									<strong>Rating: </strong>
									{product.rating?.rate.toString()}
								</p>
							</div>
							<div className="rounded-lg border-[1px] border-gray-300 pt-2">
								<div>
									<p className="px-4 text-right text-3xl">
										{product.price.toString()} zł
									</p>
									<AddToCartButton product={product} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};
export default Product;
