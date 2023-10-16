import { IBookItem } from 'src/types/Types'
import { create } from 'zustand'

interface userState {
	favorites: IBookItem[]
	cart: IBookItem[]
	booksToBuy: IBookItem[]
	addToFavorite: (payload: IBookItem) => void
	removeFromFavorite: (payload: string) => void
	addToCart: (payload: IBookItem) => void
	removeFromCart: (payload: string) => void
	addBooksToBuy: (payload: IBookItem) => void
	removeFromBooksToBuy: (payload: string) => void
	clearBooksToBuy: () => void
}

export const userStore = create<userState>()(set => {
	const favoritesFromLocalStorage = localStorage.getItem('favorites')
	const favorites = favoritesFromLocalStorage
		? JSON.parse(favoritesFromLocalStorage)
		: []
	const cartFromLocalStorage = localStorage.getItem('cart')
	const cart = cartFromLocalStorage ? JSON.parse(cartFromLocalStorage) : []
	const booksToBuy: IBookItem[] = []

	return {
		favorites,
		cart,
		booksToBuy,
		addToFavorite: payload => {
			set((state: userState) => {
				const updatedFavorites = [...state.favorites, payload]
				localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
				return { favorites: updatedFavorites }
			})
		},
		clearBooksToBuy: () => set({ booksToBuy: [] }),
		removeFromFavorite: payload => {
			set((state: userState) => {
				const updatedFavorites = state.favorites.filter(
					item => item.slug !== payload
				)
				localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
				return { favorites: updatedFavorites }
			})
		},
		addToCart: payload => {
			set((state: userState) => {
				const updatedCart = [...state.cart, payload]
				localStorage.setItem('cart', JSON.stringify(updatedCart))
				return { cart: updatedCart }
			})
		},
		removeFromCart: payload => {
			set((state: userState) => {
				const updatedCart = state.cart.filter(item => item.slug !== payload)
				localStorage.setItem('cart', JSON.stringify(updatedCart))
				return { cart: updatedCart }
			})
		},
		addBooksToBuy: payload => {
			set((state: userState) => {
				const updatedBooksToBuy = [...state.booksToBuy, payload]
				return { booksToBuy: updatedBooksToBuy }
			})
		},
		removeFromBooksToBuy: payload => {
			set((state: userState) => {
				const updatedBooksToBuy = state.booksToBuy.filter(
					item => item.slug !== payload
				)
				return { booksToBuy: updatedBooksToBuy }
			})
		},
	}
})
