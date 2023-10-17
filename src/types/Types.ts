import { Dispatch, SetStateAction } from 'react'
import { ModalProps, DrawerProps } from 'antd'

export interface ModalWindowProps extends ModalProps {
	setModalIsOpen: (el: boolean) => void
	route?: string
}

export interface IDrawerBooks extends DrawerProps {
	setModalIsOpen: (el: boolean) => void
}
export type TNewAudioData = {
	book_id: string
	title: string
	file: File | null
	is_free: number
}

export interface IColumns {
	dataIndex: string
	key: string
	title: string
}

export type ModalWindowState = {
	label: string
	value: string | number
}

export interface IPayment {
	id: number
	amount: number
	is_paid: boolean | null
	url: string
}

export interface IOrder {
	id: number
	status: number
	user: number
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
	bookToEdit: TFormData | null
	editingBookId: number | null
	editingAuthor: string
	editingNarrator: string
	setEditingAuthor: (payload: string) => void
	setEditingNarrator: (payload: string) => void
	setEditingBookId: (payload: number | null) => void
	setBookToEdit: (payload: TFormData | null) => void
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
	name: string
	phone: string
	role: string
}

type TBookImg = {
	id: number
	imageable_id: number
	imageable_type: string
	file_name: string
	is_main: number
	image_url: string
}

export interface IBookItem {
	audios: TAudio[]
	author?: TIdNameSlug[]
	quantity?: number
	title: string
	description: string
	image: TBookImg[]
	language: string
	price: number
	slug: string
	reviews?: TReview[]
	id: number
	category: TIdNameSlug[]
}

export type TFormData = {
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

export interface IAdminBookInfo {
	audios: TAudio[]
	author: TIdNameSlug
	category: string
	description: string
	id: number
	genre: TIdNameSlug[]
	image: TBookImg[]
	language: string
	narrator: TIdNameSlug
	price: number
	slug: string
	title: string
}

export interface IDrawerFormData {
	title: string
	description: string
	price: number
	language: string
	author_id: number
	narrator_id: number
	category_id: number
	genre_id: number[]
}
