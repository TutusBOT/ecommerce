import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Product } from "./models/product";

interface AppState {
	cart: Array<{
		item: Product;
		count: number;
	}>;
}

interface AppActions {
	addToCart: (product: Product) => void;
	removeFromCart: (productId: string) => void;
	updateItemQuantity: (productId: string, quantity: number) => void;
	clearCart: () => void;
}

export const useAppStore = create<AppState & AppActions>()(
	devtools((set) => ({
		cart: [],
		addToCart: (product) =>
			set((state) => {
				const itemInCart = state.cart.find(
					(item) => item.item._id === product._id
				);
				if (itemInCart) {
					return {
						cart: state.cart.map((item) => {
							if (item.item._id === product._id)
								return { ...item, count: item.count + 1 };
							return item;
						}),
					};
				}
				return { cart: [...state.cart, { item: product, count: 1 }] };
			}),
		removeFromCart: (productId) =>
			set((state) => ({
				cart: state.cart.filter((i) => i.item._id !== productId),
			})),
		updateItemQuantity: (productId: string, quantity: number) =>
			set((state) => {
				const itemInCart = state.cart.find(
					(item) => item.item._id === productId
				);

				if (itemInCart) {
					return {
						cart: state.cart.map((item) => {
							if (item.item._id === productId) {
								return { ...item, count: quantity };
							}
							return item;
						}),
					};
				}

				return state;
			}),
		clearCart: () => set(() => ({ cart: [] })),
	}))
);
