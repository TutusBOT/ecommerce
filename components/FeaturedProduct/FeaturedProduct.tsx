import { Product } from "@/models/product";
import Image from "next/image";
import Link from "next/link";
import AddButton from "./AddButton";

const FeaturedProduct = ({ product }: { product: Product }) => (
	<div className="mt-4 grid w-full grid-cols-1 rounded-xl bg-blue-500 p-4 text-white sm:grid-cols-2 sm:p-8">
		<div className=" flex flex-col gap-6 2xl:gap-8">
			<h2 className="text-center text-2xl sm:text-left sm:text-6xl">
				{product.title}
			</h2>
			<ul className="hidden list-disc pl-4 sm:block 2xl:text-lg">
				{product.description.map((section) => (
					<li key={section}>{section}</li>
				))}
			</ul>
			<div className="flex items-center justify-center gap-4 sm:justify-start">
				<Link
					href={`/product/${product._id}`}
					className="rounded-xl border-[1px] border-white py-2 px-4 transition-colors hover:bg-white hover:text-blue-500"
				>
					Read more
				</Link>
				<AddButton product={product} />
			</div>
		</div>
		<Link
			className="relative order-first flex h-32 w-full  justify-self-center sm:order-last sm:h-auto"
			href={`/product/${product._id}`}
		>
			<Image
				src={product.image ?? "/products/placeholder.png"}
				alt={product.title}
				fill
				className="object-contain"
				sizes="(max-width: 640px) 50vw, 30vw"
				priority
			/>
		</Link>
	</div>
);
export default FeaturedProduct;
