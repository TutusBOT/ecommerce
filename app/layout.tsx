import Header from "@/components/Header";
import UserProvider from "@/components/UserProvider";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import Toastify from "./Toastify";

const getCategories = async () => {
	const req = await fetch("http://localhost:3000/api/categories");
	return await req.json();
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
