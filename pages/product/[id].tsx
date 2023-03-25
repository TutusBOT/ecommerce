import { GetServerSideProps } from "next";
import { getProduct } from "../api/products/[id]";
import { IProduct } from "@/models/product";
import Head from "next/head";
import Image from "next/image";
import { useAppStore } from "@/store";

const Product = ({ product }: { product: IProduct | null }) => {
	const state = useAppStore((state) => state);
	if (!product) return <>Product not found</>;
	return (
		<>
			<Head>
				<title>Ecommerce</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
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
						<button
							onClick={() => {
								state.addToCart({ item: product });
							}}
						>
							add to cart
						</button>
					</div>
				</div>
			</main>
		</>
	);
};
export default Product;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { id } = ctx.query;
	try {
		const product = JSON.parse(JSON.stringify(await getProduct(id)));
		return {
			props: { product },
		};
	} catch (error) {
		return {
			props: { product: null },
		};
	}
};
