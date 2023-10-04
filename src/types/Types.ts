import { Dispatch, SetStateAction } from 'react'

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
	title: string
	description: string
	image: TBookImg[]
	language: string
	price: number
	slug: string
	reviews?: TReview[]
	id?: number
	author?: TIdNameSlug[]
}

export type FormData = {
	id: number
	title: string
	description: string
	price: number
	language: string
	author_id: string
	narrator_id: string
	category_id: string
	genre_id: string[]
}

export interface IBookInfo {
	id: number
	title: string
	description: string
	price: number
	language: string
	audios: TAudio[]
	author: TIdNameSlug[]
	category: TIdNameSlug[]
	genre: TIdNameSlug[]
	image: TBookImg[]
	narrator: TIdNameSlug[]
	reviews: TReview[]
	slug: string
}

export interface ICategoryInfo extends TIdNameSlug {
	books: IBookItem[]
}

export type THamburgerMenuProps = {
	isOpen: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
}
