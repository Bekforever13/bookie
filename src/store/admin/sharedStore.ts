import { create } from 'zustand'
import { ISharedStore } from 'src/types/Types'

export const sharedStore = create<ISharedStore>(set => ({
	isEdit: false,
	itemToEdit: null,
	reviewToEdit: null,
	setIsEdit: payload => set({ isEdit: payload }),
	setItemToEdit: payload => set({ itemToEdit: payload }),
	setReviewToEdit: payload => set({ reviewToEdit: payload }),
}))
