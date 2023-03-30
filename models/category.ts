import { model, models, Schema } from "mongoose";

export interface Category {
	name: string;
	slug: string;
}

export const categorySchema = new Schema<Category>({
	name: {
		type: String,
		required: true,
	},
	slug: {
		type: String,
		required: true,
	},
});

const Category = models.Category || model("Category", categorySchema);

export default Category;
