import mongoose, { Schema, Types, model, models, ObjectId } from "mongoose";
import z from "zod";
import { Category } from "./category";

export type Product = {
	category: Category;
} & z.infer<typeof productSchema>;

export const productSchema = z.object({
	_id: z.string(),
	title: z.string(),
	price: z.number(),
	description: z.string(),
	category: z.instanceof(Object).transform((id) => id.toString()),
	image: z.string().optional(),
	rating: z
		.object({
			rate: z.number(),
			count: z.number(),
		})
		.optional(),
});

const schema = new Schema({
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
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
		required: true,
	},
	image: String,
	rating: {
		rate: Number,
		count: Number,
	},
});

const Product = models.Product || model("Product", schema);

export default Product;
