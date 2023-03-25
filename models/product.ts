import { Schema, model, models } from "mongoose";

export interface IProduct {
	_id: string;
	title: string;
	price: number;
	description: string;
	category: string;
	image?: string;
	rating?: {
		rate: number;
		count: number;
	};
}

export const productSchema = new Schema<IProduct>({
	title: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	image: String,
	rating: {
		rate: Number,
		count: Number,
	},
});

const Product = models.Product || model("Product", productSchema);

export default Product;
