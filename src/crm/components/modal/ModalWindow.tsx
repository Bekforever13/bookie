import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Modal, ModalProps, Select } from 'antd'
import styles from './ModalWindow.module.scss'
import { adminStore } from 'src/store/adminStore'
import { $host } from 'src/config/axios'
import { FormData } from 'src/types/Types'
import { useQueryClient } from 'react-query'

interface Props extends ModalProps {
	setIsModalOpen: (el: boolean) => void
}

type TState = {
	label: string
	value: string | number
}

const ModalWindow: React.FC<Props> = ({ setIsModalOpen, ...props }) => {
	const queryClient = useQueryClient()
	const {
		authors,
		categories,
		genres,
		narrators,
		isEditingBook,
		setEditingBook,
		bookToEdit,
	} = adminStore()
	const [formData, setFormData] = useState<FormData | null>(null)
	const [authorOptions, setAuthorOptions] = useState<TState[]>([])
	const [categoriesOptions, setCategoriesOptions] = useState<TState[]>([])
	const [genresOptions, setGenresOptions] = useState<TState[]>([])
	const [narratorsOptions, setNarratorsOptions] = useState<TState[]>([])
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm<FormData>()

	const handleCancel = () => {
		setIsModalOpen(false)
		reset()
	}

	const onSubmit = handleSubmit(data => {
		const request = isEditingBook
			? $host.put(`/books/${bookToEdit?.id}`, data)
			: $host.post('/books', data)

		request.then(() => setEditingBook(false)).catch(error => console.log(error))

		queryClient.invalidateQueries('admin-books')
		setIsModalOpen(false)
		reset()
	})

	const handleChange = (value: string | string[], name: string) => {
		switch (name) {
			case 'title':
			case 'author_id':
			case 'description':
			case 'price':
			case 'language':
			case 'narrator_id':
			case 'category_id':
			case 'genre_id':
				setValue(name, value)
				break
		}
	}

	useEffect(() => {
		authors.forEach(item => {
			if (!authorOptions.some(option => option.label === item.slug)) {
				setAuthorOptions(prev => [
					...prev,
					{ value: item.id as unknown as string, label: item.slug },
				])
			}
		})
		categories.forEach(item => {
			if (
				item.id !== undefined &&
				!categoriesOptions.some(option => option.label === item.slug)
			) {
				setCategoriesOptions(prev => [
					...prev,
					{ value: item.id as unknown as string, label: item.slug },
				])
			}
		})
		genres.forEach(item => {
			if (!genresOptions.some(option => option.label === item.slug)) {
				setGenresOptions(prev => [
					...prev,
					{ value: item.id as unknown as string, label: item.slug },
				])
			}
		})
		narrators.forEach(item => {
			if (!narratorsOptions.some(option => option.label === item.slug)) {
				setNarratorsOptions(prev => [
					...prev,
					{ value: item.id as unknown as string, label: item.slug },
				])
			}
		})
		if (bookToEdit) {
			setFormData(bookToEdit)
		}
	}, [authors, categories, genres, narrators, bookToEdit])

	return (
		<Modal
			onCancel={handleCancel}
			onOk={onSubmit}
			className={styles.modal}
			{...props}
		>
			<form onSubmit={onSubmit}>
				<label>
					Kitap atı:
					<input
						type='text'
						{...register('title', { required: true })}
						defaultValue={isEditingBook ? formData?.title : ''}
					/>
					{errors.title && <span style={{ color: 'red' }}>*</span>}
				</label>
				<label>
					Kitap haqqında maǵlıwmat:
					<input
						type='text'
						{...register('description', { required: true })}
						defaultValue={isEditingBook ? formData?.description : ''}
					/>
					{errors.description && <span style={{ color: 'red' }}>*</span>}
				</label>
				<label>
					Baha:
					<input
						type='number'
						{...register('price', { required: true })}
						defaultValue={isEditingBook ? formData?.price : ''}
					/>
					{errors.price && <span style={{ color: 'red' }}>*</span>}
				</label>
				<label>
					Til:
					<input
						type='text'
						{...register('language', { required: true })}
						defaultValue={isEditingBook ? formData?.language : ''}
					/>
					{errors.language && <span style={{ color: 'red' }}>*</span>}
				</label>
				<label>
					Author:
					<Select
						style={{ width: '100%' }}
						placeholder='Select author'
						onChange={value => handleChange(value, 'author_id')}
						options={authorOptions}
						defaultValue={isEditingBook ? formData?.author_id : undefined}
					/>
					{errors.author_id && <span style={{ color: 'red' }}>*</span>}
				</label>
				<label>
					Gúrriń etiwshi:
					<Select
						style={{ width: '100%' }}
						placeholder='Select narrator'
						onChange={value => handleChange(value, 'narrator_id')}
						options={narratorsOptions}
						defaultValue={isEditingBook ? formData?.narrator_id : undefined}
					/>
					{errors.narrator_id && <span style={{ color: 'red' }}>*</span>}
				</label>
				<label>
					Kategoriya:
					<Select
						style={{ width: '100%' }}
						placeholder='Select category'
						onChange={value => handleChange(value, 'category_id')}
						options={categoriesOptions}
						defaultValue={isEditingBook ? formData?.category_id : undefined}
					/>
					{errors.category_id && <span style={{ color: 'red' }}>*</span>}
				</label>
				<label>
					Janr:
					<Select
						mode='multiple'
						allowClear
						style={{ width: '100%' }}
						placeholder='Select genre'
						onChange={value => handleChange(value, 'genre_id')}
						options={genresOptions}
						defaultValue={isEditingBook ? formData?.genre_id : undefined}
					/>
					{errors.genre_id && <span style={{ color: 'red' }}>*</span>}
				</label>
			</form>
		</Modal>
	)
}

export { ModalWindow }
