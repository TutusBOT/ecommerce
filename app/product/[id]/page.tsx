import { Product } from "@/models/product";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";

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
			<main>
				<div>{`Ecommerce > ${product.category.name}`}</div>
				<div className="grid grid-cols-2">
					<div className="relative">
						<Image
							src={product.image ?? ""}
							alt={product.title}
							fill
							className="object-contain"
						/>
					</div>
					<div>
						<h2 className="text-4xl">{product.title}</h2>
						<p>{product.description}</p>
						<p>{product.price.toString()}zł</p>
						<p>{product.rating?.rate.toString()}</p>
						<AddToCartButton product={product} />
					</div>
				</div>
			</main>
		</>
	);
};
export default Product;
