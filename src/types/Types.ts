import { Dispatch, SetStateAction } from 'react'
import { ModalProps } from 'antd'

export interface ModalWindowProps extends ModalProps {
	setIsModalOpen: (el: boolean) => void
	route?: string
}

export type TNewAudioData = {
	book_id: string
	title: string
	file: File | null
	is_free: number
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

export type TReview = {
	id?: string
	text: string
	rating: number
	name?: string
	user_id?: number
}

export type TIdNameSlug = {
	id: number
	name: string
	slug: string
}

export type TAudio = {
	id?: number
	title: string
	is_free: boolean
	slug: string
	audio_url: string
}

export type TFeedback = {
	name: string
	rating: number
	description: string
}

export type TUserData = {
	id: number
	role_id: number
	name: string
	phone: string
	email: string | null
	role: string
}

type TBookImg = {
	imageable_id: number
	imageable_type: string
	file_name: string
	is_main: number
	image_url: string
}

export interface IBookItem {
	audios: TAudio[]
	author?: TIdNameSlug[]
	title: string
	description: string
	image: TBookImg[]
	language: string
	price: number
	slug: string
	reviews?: TReview[]
	id?: number
	category: TIdNameSlug[]
}

export type FormData = {
	id: number
	title: string
	description: string
	price: number
	language: string
	author: string
	narrator: string
	category: string
	genre: TIdNameSlug[]
	image: TBookImg[]
	slug: string
}

export interface IBookInfo {
	audios: TAudio[]
	author: TIdNameSlug[]
	category: TIdNameSlug[]
	description: string
	id: number
	genre: TIdNameSlug[]
	image: TBookImg[]
	language: string
	narrator: TIdNameSlug[]
	price: number
	reviews: TReview[]
	slug: string
	title: string
}

export interface ICategoryInfo extends TIdNameSlug {
	books: IBookItem[]
}

export type THamburgerMenuProps = {
	isOpen: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
}
