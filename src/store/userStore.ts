import { IBookItem } from 'src/assets/types/Types'
import { create } from 'zustand'
import Cookies from 'js-cookie'

interface userState {
	favorites: IBookItem[]
	cart: IBookItem[]
	addToFavorite: (payload: IBookItem) => void
	removeFromFavorite: (payload: string) => void
	addToCart: (payload: IBookItem) => void
	removeFromCart: (payload: string) => void
}

export const userStore = create<userState>()(set => {
	const favoritesFromCookie = Cookies.get('favorites')
	const favorites = favoritesFromCookie ? JSON.parse(favoritesFromCookie) : []
	const cartFromCookie = Cookies.get('cart')
	const cart = cartFromCookie ? JSON.parse(cartFromCookie) : []

	return {
		favorites,
		cart,
		addToFavorite: payload => {
			set((state: userState) => {
				const updatedFavorites = [...state.favorites, payload]
				Cookies.set('favorites', JSON.stringify(updatedFavorites))
				return { favorites: updatedFavorites }
			})
		},
		removeFromFavorite: payload => {
			set((state: userState) => {
				const updatedFavorites = state.favorites.filter(
					item => item.slug !== payload
				)
				Cookies.set('favorites', JSON.stringify(updatedFavorites))
				return { favorites: updatedFavorites }
			})
		},
		addToCart: payload => {
			set((state: userState) => {
				const updatedCart = [...state.cart, payload]
				Cookies.set('cart', JSON.stringify(updatedCart))
				return { cart: updatedCart }
			})
		},
		removeFromCart: payload => {
			set((state: userState) => {
				const updatedCart = state.cart.filter(item => item.slug !== payload)
				Cookies.set('cart', JSON.stringify(updatedCart))
				return { cart: updatedCart }
			})
		},
	}
})
