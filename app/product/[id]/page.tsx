import ProductModel, { Product as ProductInterface } from "@/models/product";
import Image from "next/image";
import { connectMongo } from "@/lib/connectMongo";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export const dynamic = "force-dynamic";

const getProduct = async (id: string) => {
	await connectMongo();
	const product = await ProductModel.findById(id).lean().populate("category");
	return JSON.parse(JSON.stringify(product));
};

const Product = async ({ params }: any) => {
	const product: ProductInterface = await getProduct(params.id);
	if (!product) return <>Product not found</>;
	return (
		<div className="flex flex-col items-center justify-center pb-12">
			<main className="max-w-7x flex flex-col items-center px-2 pt-8 sm:pt-16">
				<div className="block w-full text-lg sm:hidden">
					Ecommerce{" > "}
					<Link
						className="hover:underline"
						href={`category/${product.category.slug}`}
					>
						{product.category.name}
					</Link>
				</div>
				<div className="grid w-full grid-cols-1 grid-rows-2 sm:grid-cols-3 sm:grid-rows-1 2xl:w-[1536px]">
					<div className="relative w-full">
						<Image
							src={product.image ?? ""}
							alt={product.title}
							fill
							className="object-contain"
						/>
					</div>
					<div className="flex w-full flex-col gap-4 sm:col-start-2 sm:col-end-4">
						<div className="hidden w-full text-lg sm:block">
							Ecommerce{" > "}
							<Link
								className="hover:underline"
								href={`category/${product.category.slug}`}
							>
								{product.category.name}
							</Link>
						</div>
						<div className="flex py-4">
							<h2 className="text-4xl">{product.title}</h2>
						</div>
						<p className="text-3xl">${product.price.toString()}</p>
						<p className="flex gap-2">
							<strong>Rating: </strong>
							{product.rating?.rate.toString()}
						</p>
						<AddToCartButton product={product} />
						<div className="flex flex-col gap-4 pt-8">
							<strong className="text-3xl">Product details:</strong>{" "}
							<ul className="list-disc pl-6">
								{product.description.map((section) => (
									<li key={section}>{section}</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};
export default Product;
