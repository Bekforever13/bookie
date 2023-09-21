type TReview = {
	rating: number
	text: string
	user_id: number
}

type TBookImg = {
	imageable_id: number
	imageable_type: string
	file_name: string
	is_main: number
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
}

export interface IBookInfo {
	audios: []
	author: [{ name: string; slug: string }]
	category: [{ id: number; name: string; slug: string }]
	description: string
	genre: [{ name: string; slug: string }]
	image: TBookImg[]
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
