import { Product } from "@/models/product";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";

export const dynamic = "force-dynamic";

const getProduct = async (id: string) => {
	const req = await fetch(`http://localhost:3000/api/products/${id}`, {
		next: { revalidate: 10 },
	});
	return req.json();
};

const Product = async ({ params }: any) => {
	const product: Product = await getProduct(params.id);
	if (!product) return <>Product not found</>;
	return (
		<>
			<main className="flex flex-col items-center">
				<div>{`Ecommerce > ${product.category.name}`}</div>
				<div className="grid w-full grid-cols-2 2xl:w-[1536px]">
					<div className="relative">
						<Image
							src={product.image ?? ""}
							alt={product.title}
							fill
							className="object-contain"
						/>
					</div>
					<div className="flex">
						<div className="flex flex-col">
							<h2 className="text-4xl">{product.title}</h2>
							<p>{product.description}</p>
							<p>{product.rating?.rate.toString()}</p>
						</div>
						<div className="rounded-lg border-[1px] border-gray-300">
							<div>
								<p className="px-4 text-right text-3xl">
									{product.price.toString()} zł
								</p>
								<AddToCartButton product={product} />
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};
export default Product;
