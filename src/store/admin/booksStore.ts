import { create } from 'zustand'
import { IBookStore } from 'src/crm/types/types'

export const bookStore = create<IBookStore>(set => ({
	isEditingBook: false,
	bookToEdit: null,
	setEditingBook: payload => set({ isEditingBook: payload }),
	setBookToEdit: payload => set({ bookToEdit: payload }),
}))
