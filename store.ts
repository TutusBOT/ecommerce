import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Product } from "./models/product";

interface AppState {
	cart: Array<{
		item: Product;
		count: number;
	}>;
	filters: {
		minPrice: number;
		maxPrice: number;
	};
	favourites: Product[];
}

interface AppActions {
	addToCart: (product: Product) => void;
	removeFromCart: (productId: string) => void;
	updateItemQuantity: (productId: string, quantity: number) => void;
	clearCart: () => void;
	setFilters: (filters: { minPrice: number; maxPrice: number }) => void;
	addFavourite: (product: Product) => void;
	removeFavourite: (product: Product) => void;
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
		filters: { minPrice: 0, maxPrice: 100000 },
		setFilters: (filters: { minPrice: number; maxPrice: number }) =>
			set(() => ({ filters })),
		favourites: [],
		addFavourite: (product: Product) =>
			set((state) => ({
				favourites: [...state.favourites, product],
			})),
		removeFavourite: (product: Product) =>
			set((state) => ({
				favourites: state.favourites.filter((p) => p._id !== product._id),
			})),
	}))
);
