import { create } from 'zustand'
import { IBookStore } from 'src/types/Types'

export const bookStore = create<IBookStore>(set => ({
	isEditingBook: false,
	bookToEdit: null,
	setEditingBook: payload => set({ isEditingBook: payload }),
	setBookToEdit: payload => set({ bookToEdit: payload }),
}))
