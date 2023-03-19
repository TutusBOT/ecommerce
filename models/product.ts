import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
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
	image: {
		data: Buffer,
		contentType: String,
	},
	rating: {
		rate: Number,
		count: Number,
	},
});

const Product = models.Product || model("Product", productSchema);

export default Product;
