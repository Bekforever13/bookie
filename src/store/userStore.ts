import { IBookItem } from 'src/assets/types/Types'
import { create } from 'zustand'

interface userState {
	favorites: IBookItem[]
	cart: IBookItem[]
	addToFavorite: (payload: IBookItem) => void
	removeFromFavorite: (payload: string) => void
	addToCart: (payload: IBookItem) => void
}

export const userStore = create<userState>()(set => ({
	favorites: [
		{
			title: 'esse reprehenderit',
			description:
				'autem enim voluptate impedit in modi exercitationem delectus expedita facilis aut exercitationem autem id sapiente veniam est natus recusandae nobis',
			price: 10000,
			language: 'english',
			slug: 'esse-reprehenderit-autem-enim-voluptate-impedit-in',
			image: [
				{
					imageable_id: 1,
					imageable_type: 'App\\Models\\Book',
					file_name: '1x4lCWklbv21Mp2WTcn2hijrSlhTXUN6RCl8KBel.jpg',
					is_main: 0,
				},
			],
			reviews: [
				{
					user_id: 4,
					text: 'dolorum doloribus molestiae doloremque aut',
					rating: 4,
				},
				{
					user_id: 4,
					text: 'rerum voluptatem nulla minus nemo',
					rating: 3,
				},
				{
					user_id: 4,
					text: 'this is review',
					rating: 4,
				},
			],
		},
		{
			title: 'esse reprehenderit',
			description:
				'autem enim voluptate impedit in modi exercitationem delectus expedita facilis aut exercitationem autem id sapiente veniam est natus recusandae nobis',
			price: 10000,
			language: 'english',
			slug: 'esse-reprehenderit-autem-enim-voluptate-impedit-in',
			image: [
				{
					imageable_id: 1,
					imageable_type: 'App\\Models\\Book',
					file_name: '1x4lCWklbv21Mp2WTcn2hijrSlhTXUN6RCl8KBel.jpg',
					is_main: 0,
				},
			],
			reviews: [
				{
					user_id: 4,
					text: 'dolorum doloribus molestiae doloremque aut',
					rating: 4,
				},
				{
					user_id: 4,
					text: 'rerum voluptatem nulla minus nemo',
					rating: 3,
				},
				{
					user_id: 4,
					text: 'this is review',
					rating: 4,
				},
			],
		},
	],
	cart: [],
	addToFavorite: payload =>
		set(state => ({ favorites: [...state.favorites, payload] })),
	removeFromFavorite: payload =>
		set(state => ({
			favorites: state.favorites.filter(item => item.slug !== payload),
		})),
	addToCart: payload =>
		set(state => ({ favorites: [...state.favorites, payload] })),
}))
