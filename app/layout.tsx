import Header from "@/components/Header";
import UserProvider from "@/components/UserProvider";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import Toastify from "./Toastify";
import { connectMongo } from "@/lib/connectMongo";
import CategoryModel from "@/models/category";

const getCategories = async () => {
	await connectMongo();
	const categories = await CategoryModel.find({});
	return JSON.parse(JSON.stringify(categories));
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const categories = await getCategories();
	return (
		<html lang="en">
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</head>
			<body>
				<UserProvider>
					<Header categories={categories} />
					<Toastify />
					{children}
				</UserProvider>
			</body>
		</html>
	);
}

export const metadata = {
	title: "Ecommerce",
	description: "Ecommerce website made by Bartłomiej Tutak",
};
