type TReview = {
	rating: number
	text: string
	user_id: number
}

export interface IBookItem {
	title: string
	description: string
	image: string[]
	language: string
	price: number
	slug: string
	reviews?: TReview[]
	id?: number
}

export interface IBookInfo {
	audios: []
	author: [{ name: string; slug: string }]
	category: [{ id: number; name: string; slug: string }]
	description: string
	genre: [{ name: string; slug: string }]
	image: string[]
	language: string
	narrator: [{ name: string; slug: string }]
	price: number
	reviews: [{ rating: number; text: string; user_id: number }]
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
