import { Schema, model, models } from "mongoose";
import { productSchema } from "./product";

const userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	picture: String,
	email_verified: Boolean,
	admin: {
		type: Boolean,
		default: false,
	},
	cart: [productSchema],
});

const User = models.User || model("User", userSchema);

export default User;
