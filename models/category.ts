import { model, models, Schema } from "mongoose";
import z from "zod";

export const categorySchema = z.object({
	name: z.string(),
	slug: z.string(),
});

export type Category = z.infer<typeof categorySchema>;

const schema = new Schema<Category>({
	name: {
		type: String,
		required: true,
	},
	slug: {
		type: String,
		required: true,
	},
});

const CategoryModel = models.Category || model("Category", schema);

export default CategoryModel;
