import mongoose, { Schema, model, models } from "mongoose";
import z from "zod";
import { Category } from "./category";

export const productSchema = z.object({
	_id: z.string(),
	title: z.string(),
	price: z.number(),
	description: z.array(z.string()),
	category: z.instanceof(Object).transform((id) => id.toString()),
	image: z.string().optional(),
	rating: z
		.object({
			rate: z.number(),
			count: z.number(),
		})
		.optional(),
});

export type Product = {
	category: Category;
} & z.infer<typeof productSchema>;

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
		type: [String],
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

const Model = models.Product || model("Product", schema);

export default Model;
