import Header from "@/components/Header/Header";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import CategoryModel from "@/models/category";
import { connectMongo } from "@/lib/connectMongo";
import React from "react";
import { getServerSession } from "next-auth";
import SessionProvider from "./SessionProvider";
import Toastify from "./Toastify";
import { authOptions } from "./api/auth/[...nextauth]/route";

const getCategories = async () => {
	await connectMongo();
	const categories = await CategoryModel.find({}).lean();
	return JSON.parse(JSON.stringify(categories));
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);
	const categories = await getCategories();
	return (
		<html lang="en">
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</head>
			<body className="relative min-h-screen">
				<SessionProvider session={session}>
					<Header categories={categories} />
					<Toastify />
					{children}
					<footer className="absolute bottom-0 w-screen bg-gray-100 py-2 px-4">
						Website made by Bartłomiej Tutak
					</footer>
				</SessionProvider>
			</body>
		</html>
	);
}

export const metadata = {
	title: "Ecommerce",
	description: "Ecommerce website made by Bartłomiej Tutak",
};
