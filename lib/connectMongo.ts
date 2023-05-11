import mongoose from "mongoose";

export const connectMongo = async () => {
	if (mongoose.connection.readyState === 1) return null;
	return mongoose.connect(process.env.MONGO_URI!);
};
