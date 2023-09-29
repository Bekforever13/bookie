import { ModalProps } from 'antd'
import { FormData, TIdNameSlug } from 'src/types/Types'

export interface ModalWindowProps extends ModalProps {
	setIsModalOpen: (el: boolean) => void
}

export type ModalWindowState = {
	label: string
	value: string | number
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
