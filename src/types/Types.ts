import { Dispatch, SetStateAction } from 'react'

export type TReview = {
	slug: string
	text: string
	rating: number
}

type TAudio = {
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
	author?: [
		{
			name: string
			slug: string
		}
	]
}

export interface IBookInfo {
	audios: TAudio[]
	author: [{ name: string; slug: string }]
	category: [{ id: number; name: string; slug: string }]
	description: string
	genre: [{ name: string; slug: string }]
	image: TBookImg[]
	language: string
	narrator: [{ name: string; slug: string }]
	price: number
	reviews: [{ rating: number; text: string; name: string }]
	slug: string
	title: string
}

export type TCategory = {
	id: number
	name: string
	slug: string
}

export interface ICategoryInfo extends TCategory {
	books: IBookItem[]
}

export type THamburgerMenuProps = {
	isOpen: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
}
