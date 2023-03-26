import Image from "next/image";
import Link from "next/link";

interface ProductPreview {
	id: string;
	image: string;
	title: string;
	price: number;
}

const ProductPreview = ({ id, image, title, price }: ProductPreview) => {
	return (
		<div>
			<Link href={`/product/${id}`}>
				<Image src={image} alt={title} width={100} height={100} />
				<p>{title}</p>
				<p>{price}</p>
			</Link>
		</div>
	);
};
export default ProductPreview;
