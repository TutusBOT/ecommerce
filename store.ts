import { create } from "zustand";
import { IProduct } from "./models/product";

interface AppState {
	cart: Array<{
		item: IProduct;
		count: number;
	}>;
	addToCart: ({ item }: { item: IProduct }) => void;
	removeFromCart: ({ item }: { item: IProduct }) => void;
}

export const useAppStore = create<AppState>((set) => ({
	cart: [],
	addToCart: ({ item }) =>
		set((state) => {
			let itemIndex = null;
			for (let i = 0; i < state.cart.length; i++) {
				if (state.cart[i].item._id === item._id) itemIndex = i;
			}
			if (itemIndex === null)
				return { ...state, cart: [...state.cart, { item, count: 1 }] };
			const updatedCart = [...state.cart];
			updatedCart[itemIndex] = {
				item,
				count: updatedCart[itemIndex].count + 1,
			};
			return { ...state, cart: updatedCart };
		}),
	removeFromCart: ({ item }) =>
		set((state) => ({
			cart: state.cart.filter((i) => i.item._id !== item._id),
		})),
	resetCart: () => set(() => ({ cart: [] })),
}));
