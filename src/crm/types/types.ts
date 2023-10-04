import { ModalProps } from 'antd'
import { FormData, TIdNameSlug, TReview, TUserData } from 'src/types/Types'

export interface ModalWindowProps extends ModalProps {
	setIsModalOpen: (el: boolean) => void
	route?: string
}

export type ModalWindowState = {
	label: string
	value: string | number
}

export interface IOrder {
	id: number
	status_id: number
	user_id: number
	amount: number
	is_paid: boolean
	books: {
		id: number
		author_id: number
		narrator_id: number
		category_id: number
		title: string
		description: string
		price: number
		language: string
		slug: string
	}[]
	url: string
}

export interface IBookStore {
	isEditingBook: boolean
	bookToEdit: FormData | null
	setBookToEdit: (payload: FormData) => void
	setEditingBook: (payload: boolean) => void
}

export interface IAuthorStore {
	isEdit: boolean
	authorToEdit: TIdNameSlug | null
	setAuthorToEdit: (payload: TIdNameSlug | null) => void
	setIsEdit: (payload: boolean) => void
}

export interface ISharedStore {
	isEdit: boolean
	itemToEdit: TIdNameSlug | TUserData | TReview | null
	reviewToEdit: TReview | null
	setIsEdit: (payload: boolean) => void
	setItemToEdit: (payload: TIdNameSlug | TUserData | TReview | null) => void
	setReviewToEdit: (payload: TReview | null) => void
}
