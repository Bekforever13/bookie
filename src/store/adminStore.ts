import { create } from 'zustand'
import { $host } from 'src/config/axios'
import { FormData, TIdNameSlug } from 'src/types/Types'

interface adminState {
	activeCategory: string
	authors: TIdNameSlug[]
	narrators: TIdNameSlug[]
	genres: TIdNameSlug[]
	categories: TIdNameSlug[]
	isEditingBook: boolean
	bookToEdit: FormData | null
	setActiveCategory: (payload: string) => void
	setBookToEdit: (payload: FormData) => void
	setEditingBook: (paylaod: boolean) => void
	fetchAuthors: () => void
	fetchNarrators: () => void
	fetchGenres: () => void
	fetchCategories: () => void
}

export const adminStore = create<adminState>(set => ({
	activeCategory: '',
	authors: [],
	narrators: [],
	genres: [],
	categories: [],
	isEditingBook: false,
	bookToEdit: null,
	setEditingBook: payload => set({ isEditingBook: payload }),
	setBookToEdit: payload => set({ bookToEdit: payload }),
	setActiveCategory: payload => set({ activeCategory: payload }),
	fetchAuthors: () => {
		$host
			.get('/authors')
			.then(response => {
				set({ authors: response.data.data })
			})
			.catch(error => {
				console.error('Ошибка при выполнении запроса:', error)
			})
	},
	fetchCategories: () => {
		$host
			.get('/categories')
			.then(response => {
				set({ categories: response.data.data })
			})
			.catch(error => {
				console.error('Ошибка при выполнении запроса:', error)
			})
	},
	fetchGenres: () => {
		$host
			.get('/genres')
			.then(response => {
				set({ genres: response.data.data })
			})
			.catch(error => {
				console.error('Ошибка при выполнении запроса:', error)
			})
	},
	fetchNarrators: () => {
		$host
			.get('/narrators')
			.then(response => {
				set({ narrators: response.data.data })
			})
			.catch(error => {
				console.error('Ошибка при выполнении запроса:', error)
			})
	},
}))
