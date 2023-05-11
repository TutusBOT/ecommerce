import { Schema, model, models } from "mongoose";
import z from "zod";

export const userSchema = z.object({
	email: z.string().email(),
	isAdmin: z.boolean().optional(),
	hashedPassword: z.string(),
});

export type User = z.infer<typeof userSchema>;

const schema = new Schema<User>({
	email: {
		type: String,
		unique: true,
		required: true,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	hashedPassword: {
		type: String,
		required: true,
		minlength: 5,
	},
});

const Model = models.User || model("User", schema);

export default Model;
