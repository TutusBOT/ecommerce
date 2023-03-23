import { GetServerSideProps } from "next";
import { getProduct } from "../api/products/[id]";
import { IProduct } from "@/models/product";
import Head from "next/head";

const Product = ({ product }: { product: IProduct }) => {
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
					<div>
						<img src=""></img>
					</div>
					<div>
						<h2>{product.title}</h2>
						<p>{product.description}</p>
						<p>{product.price.toString()}zł</p>
						<p>{product.rating?.rate.toString()}</p>
					</div>
				</div>
			</main>
		</>
	);
};
export default Product;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { id } = ctx.query;
	const product = JSON.parse(JSON.stringify(await getProduct(id)));
	return {
		props: { product },
	};
};