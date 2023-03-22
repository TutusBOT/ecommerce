import fsp from "fs/promises";

interface Ibase64ToFile {
	base64: string;
	name: string;
	path: string;
}

export default async function base64ToFile({
	base64,
	name,
	path,
}: Ibase64ToFile) {
	const fileContents = base64.replace(/^data:image\/png;base64,/, "");

	try {
		await fsp.mkdir("./public/", { recursive: true });
		const filePath = `./public/${path + Date.now().toString() + name}`;
		await fsp.writeFile(filePath, fileContents, "base64");
		return filePath;
	} catch (error) {
		return console.error(error);
	}
}
