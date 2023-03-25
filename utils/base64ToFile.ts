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
		await fsp.mkdir(`./public/${path}`, { recursive: true });
		const filePath = `./public/${path + Date.now().toString() + name}.png`;
		const buffer = Buffer.from(fileContents, "base64");
		await fsp.writeFile(filePath, buffer);
		return filePath.replace("./public", "");
	} catch (error) {
		return console.error(error);
	}
}
