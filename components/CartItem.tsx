import { useAppStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import IconButton from "./IconButton";
import {
	MdDeleteOutline,
	MdRemoveCircleOutline,
	MdAddCircleOutline,
} from "react-icons/md";

interface CartItem {
	id: string;
	image: string;
	title: string;
	price: number;
	count: number;
}

const CartItem = ({ id, image, title, price, count }: CartItem) => {
	const { updateItemQuantity, removeFromCart } = useAppStore((state) => state);

	const handleRemove = () => {
		if (count < 2) return removeFromCart(id);
		updateItemQuantity(id, count - 1);
	};

	return (
		<div className="w-full flex gap-4 items-center px-4 py-2 border-[1px] border-gray-400 rounded-md">
			<Link href={`/product/${id}`} className="flex items-center">
				<Image src={image} alt={title} width={80} height={80} />
				<p>{title}</p>
			</Link>
			<p>{price}</p>
			<p className="flex gap-2 items-center">
				<IconButton onClick={handleRemove}>
					<MdRemoveCircleOutline />
				</IconButton>{" "}
				{count}{" "}
				<IconButton onClick={() => updateItemQuantity(id, count + 1)}>
					<MdAddCircleOutline />
				</IconButton>
			</p>
			<IconButton onClick={() => removeFromCart(id)}>
				<MdDeleteOutline size={24} />
			</IconButton>
		</div>
	);
};
export default CartItem;
