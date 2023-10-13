import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ConfigProvider, Modal, Select, message } from 'antd'
import styles from './BooksModal.module.scss'
import { adminStore } from 'src/store/admin/adminStore'
import { $host } from 'src/config/axios'
import { FormData } from 'src/types/Types'
import { useQueryClient } from 'react-query'
import { bookStore } from 'src/store/admin/booksStore'
import { ModalWindowProps, ModalWindowState } from 'src/types/Types'

const ModalWindow: React.FC<ModalWindowProps> = ({
	setModalIsOpen,
	...props
}) => {
	const queryClient = useQueryClient()
	const { authors, categories, genres, narrators } = adminStore()
	const { isEditingBook, setEditingBook, bookToEdit } = bookStore()
	const [formData, setFormData] = useState<FormData | null>(null)
	const [authorOptions, setAuthorOptions] = useState<ModalWindowState[]>([])
	const [categoriesOptions, setCategoriesOptions] = useState<
		ModalWindowState[]
	>([])
	const [selectedAuthor, setSelectedAuthor] = useState<string>('')
	const [selectedNarrator, setSelectedNarrator] = useState<string>('')
	const [selectedCategory, setSelectedCategory] = useState<string>('')
	const [selectedGenres, setSelectedGenres] = useState<string | string[]>([])
	const [genresOptions, setGenresOptions] = useState<ModalWindowState[]>([])
	const [narratorsOptions, setNarratorsOptions] = useState<ModalWindowState[]>(
		[]
	)
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm<FormData>()

	const handleCancel = () => {
		setModalIsOpen(false)
		reset()
		setSelectedAuthor('')
		setSelectedCategory('')
		setSelectedGenres([])
		setSelectedNarrator('')
	}

	const onSubmit = handleSubmit(data => {
		const request = isEditingBook
			? $host.put(`/books/${bookToEdit?.id}`, data)
			: $host.post('/books', data)

		request
			.then(() => {
				setEditingBook(false)
				setSelectedAuthor('')
				setSelectedCategory('')
				setSelectedGenres([])
				setSelectedNarrator('')
				message.success('Successfully!')
			})
			.catch(error => console.log(error))

		queryClient.invalidateQueries('admin-books')
		setModalIsOpen(false)
		reset()
	})

	const handleChange = (value: string | string[], name: string) => {
		switch (name) {
			case 'author':
			case 'language':
			case 'narrator':
			case 'category':
				setValue(name, value as string)
				break
			case 'genre':
				const genreValue = Array.isArray(value)
					? value.map(item => ({ id: Number(item), name: item, slug: item }))
					: []
				setValue(name, genreValue)
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
		<ConfigProvider
			theme={{
				token: {
					colorBgBase: '#d7e7f8',
				},
			}}
		>
			<Modal
				onCancel={handleCancel}
				onOk={onSubmit}
				style={{ background: 'var(--brand-color-3)' }}
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
							onChange={value => {
								handleChange(value, 'author')
								setSelectedAuthor(value)
							}}
							options={authorOptions}
							value={selectedAuthor}
						/>
						{errors.author && <span style={{ color: 'red' }}>*</span>}
					</label>
					<label>
						Gúrriń etiwshi:
						<Select
							style={{ width: '100%' }}
							placeholder='Select narrator'
							onChange={value => {
								handleChange(value, 'narrator')
								setSelectedNarrator(value)
							}}
							options={narratorsOptions}
							value={selectedNarrator}
						/>
						{errors.narrator && <span style={{ color: 'red' }}>*</span>}
					</label>
					<label>
						Kategoriya:
						<Select
							style={{ width: '100%' }}
							placeholder='Select category'
							onChange={value => {
								handleChange(value, 'category')
								setSelectedCategory(value)
							}}
							options={categoriesOptions}
							value={selectedCategory}
						/>
						{errors.category && <span style={{ color: 'red' }}>*</span>}
					</label>
					<label>
						Janr:
						<Select
							mode='multiple'
							allowClear
							style={{ width: '100%' }}
							placeholder='Select genre'
							onChange={value => {
								handleChange(value, 'genre')
								setSelectedGenres(value)
							}}
							options={genresOptions}
							value={selectedGenres}
						/>
						{errors.genre && <span style={{ color: 'red' }}>*</span>}
					</label>
				</form>
			</Modal>
		</ConfigProvider>
	)
}

export { ModalWindow }
