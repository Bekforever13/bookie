import { create } from 'zustand'
import { ISharedStore } from 'src/crm/types/types'

export const sharedStore = create<ISharedStore>(set => ({
	isEdit: false,
	itemToEdit: null,
	reviewToEdit: null,
	setIsEdit: payload => set({ isEdit: payload }),
	setItemToEdit: payload => set({ itemToEdit: payload }),
	setReviewToEdit: payload => set({ reviewToEdit: payload }),
}))
