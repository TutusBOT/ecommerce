import { useAppStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import {
	MdDeleteOutline,
	MdRemoveCircleOutline,
	MdAddCircleOutline,
} from "react-icons/md";
import IconButton from "../../components/IconButton";

interface CartItemProps {
	id: string;
	image: string;
	title: string;
	price: number;
	count: number;
}

const CartItem = ({ id, image, title, price, count }: CartItemProps) => {
	const { updateItemQuantity, removeFromCart } = useAppStore((state) => state);

	const handleRemove = () => {
		if (count < 2) return removeFromCart(id);
		return updateItemQuantity(id, count - 1);
	};

	return (
		<div className="flex w-full items-center justify-between gap-4 rounded-md border border-gray-400 px-4 py-2">
			<div className="flex items-center gap-2 sm:gap-4">
				<Link href={`/product/${id}`} className="flex items-center">
					<Image src={image} alt={title} width={80} height={80} />
					<p>{title}</p>
				</Link>
			</div>
			<div className="flex items-center gap-2">
				<p>${price * count}</p>
				<IconButton type="button" onClick={handleRemove}>
					<MdRemoveCircleOutline />
				</IconButton>{" "}
				{count}{" "}
				<IconButton
					type="button"
					onClick={() => updateItemQuantity(id, count + 1)}
				>
					<MdAddCircleOutline />
				</IconButton>
				<IconButton type="button" onClick={() => removeFromCart(id)}>
					<MdDeleteOutline size={24} />
				</IconButton>
			</div>
		</div>
	);
};
export default CartItem;
