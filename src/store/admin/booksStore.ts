import { create } from 'zustand'
import { IBookStore } from 'src/types/Types'

export const bookStore = create<IBookStore>(set => ({
	isEditingBook: false,
	bookToEdit: null,
	editingBookId: null,
	editingAuthor: '',
	editingNarrator: '',
	setEditingAuthor: payload => set({ editingAuthor: payload }),
	setEditingNarrator: payload => set({ editingNarrator: payload }),
	setEditingBookId: payload => set({ editingBookId: payload }),
	setEditingBook: payload => set({ isEditingBook: payload }),
	setBookToEdit: payload => set({ bookToEdit: payload }),
}))
