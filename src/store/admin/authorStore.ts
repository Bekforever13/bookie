import { create } from 'zustand'
import { IAuthorStore } from 'src/crm/types/types'

export const authorStore = create<IAuthorStore>(set => ({
	isEdit: false,
	authorToEdit: null,
	setIsEdit: payload => set({ isEdit: payload }),
	setAuthorToEdit: payload => set({ authorToEdit: payload }),
}))
