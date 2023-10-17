import React, { useCallback, useEffect, useMemo } from 'react'
import {
	Button,
	Col,
	Drawer,
	Form,
	FormInstance,
	Input,
	Row,
	Select,
	Space,
	message,
} from 'antd'
import { IDrawerBooks, IDrawerFormData, TIdNameSlug } from 'src/types/Types'
import { adminStore } from 'src/store/admin/adminStore'
import { $host } from 'src/config/axios'
import { useQuery, useQueryClient } from 'react-query'
import { bookStore } from 'src/store/admin/booksStore'
import { useRef, useState } from 'react'
import styles from './BooksDrawer.module.scss'

const { Option } = Select

const BooksDrawer: React.FC<IDrawerBooks> = ({ setModalIsOpen, ...props }) => {
	const { categories, genres } = adminStore()
	const {
		isEditingBook,
		bookToEdit,
		setBookToEdit,
		editingBookId,
		setEditingBookId,
		editingAuthor,
		editingNarrator,
		setEditingAuthor,
		setEditingNarrator,
	} = bookStore()
	const queryClient = useQueryClient()
	const formRef = useRef<FormInstance>(null)
	const [author, setAuthor] = useState('')
	const [narrator, setNarrator] = useState('')
	const [price, setPrice] = useState('')
	const [form] = Form.useForm<any>()

	const getAuthors = useCallback(async () => {
		const res = await $host.get(`/authors?search=${author}`)
		return res.data.data
	}, [author])

	const getNarrators = useCallback(async () => {
		const res = await $host.get(`/narrators?search=${narrator}`)
		return res.data.data
	}, [narrator])

	const { data: authors } = useQuery<TIdNameSlug[]>({
		queryKey: ['authors', author],
		queryFn: getAuthors,
		staleTime: 5 * 60 * 1000,
		cacheTime: 60 * 60 * 1000,
	})

	const { data: narrators } = useQuery<TIdNameSlug[]>({
		queryKey: ['narrators', narrator],
		queryFn: getNarrators,
		staleTime: 5 * 60 * 1000,
		cacheTime: 60 * 60 * 1000,
	})

	const onClose = useCallback(() => {
		formRef.current?.resetFields()
		setAuthor('')
		setNarrator('')
		setModalIsOpen(false)
		form.resetFields()
		form.setFieldsValue({ ...bookToEdit })
		setEditingBookId(null)
		setEditingAuthor('')
		setEditingNarrator('')
	}, [form, formRef, setModalIsOpen, bookToEdit, setEditingBookId])

	const handleClickAuthor = useCallback(
		(item: TIdNameSlug) => {
			form.setFieldsValue({ author_id: item.id })
			setAuthor(item.name)
		},
		[form]
	)

	const handleClickNarrator = useCallback(
		(item: TIdNameSlug) => {
			form.setFieldsValue({ narrator_id: item.id })
			setNarrator(item.name)
		},
		[form]
	)

	const onSubmit = useCallback(
		(values: IDrawerFormData) => {
			console.log(bookToEdit)
			const request = isEditingBook
				? $host.put(`/books/${editingBookId}`, values)
				: $host.post('/books', values)

			request
				.then(() => {
					message.success('Successfully!')
					formRef.current?.resetFields()
				})
				.catch(error => console.log(error))
				.finally(() => {
					queryClient.invalidateQueries('admin-books')
					setModalIsOpen(false)
					setEditingBookId(null)
				})
		},
		[isEditingBook, editingBookId, formRef, queryClient, setModalIsOpen]
	)

	useEffect(() => {
		setAuthor(editingAuthor)
		setNarrator(editingNarrator)
	}, [editingAuthor, editingNarrator])

	useEffect(() => {
		form.resetFields()
		setBookToEdit(null)
	}, [isEditingBook, props.open])

	const categoryValue = useMemo(() => {
		return categories.find(item => item.name === bookToEdit?.category)?.id
	}, [categories, bookToEdit])

	const genreValue = useMemo(() => {
		return bookToEdit?.genre.length && bookToEdit?.genre.map(item => item.id)
	}, [bookToEdit])

	return (
		<Drawer
			{...props}
			width={720}
			onClose={onClose}
			extra={
				<Space>
					<Button onClick={onClose}>Cancel</Button>
					<Button htmlType='submit' form='myForm' type='primary'>
						Submit
					</Button>
				</Space>
			}
		>
			<Form id='myForm' layout='vertical' onFinish={onSubmit} form={form}>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item
							name='title'
							label='Kitap atı'
							rules={[{ required: true, message: 'Please enter title' }]}
							initialValue={bookToEdit?.title}
						>
							<Input placeholder='Please enter title ' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							name='category_id'
							label='Kategoriya'
							rules={[{ required: true, message: 'Please enter category' }]}
							initialValue={categoryValue}
						>
							<Select placeholder='Please choose the category'>
								{categories.map(item => (
									<Option key={item.id} value={item.id}>
										{item.name}
									</Option>
								))}
							</Select>
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item
							name='price'
							label='Baha'
							rules={[{ required: true, message: 'Please enter price' }]}
							initialValue={bookToEdit?.price}
						>
							<Input
								type='number'
								style={{ width: '100%' }}
								placeholder='Price'
								onChange={e => setPrice(e.target.value)}
								value={price}
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							name='language'
							label='Til'
							rules={[{ required: true, message: 'Please choose the type' }]}
							initialValue={bookToEdit?.language}
						>
							<Input style={{ width: '100%' }} placeholder='Language' />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item
							name='author_id'
							label='Avtor'
							rules={[{ required: true, message: 'Please choose the author' }]}
							initialValue={
								editingAuthor !== '' &&
								authors?.find(item => {
									if (item.name === editingAuthor) {
										form.setFieldsValue({ author_id: item.id })
										return true
									}
									return false
								})?.id
							}
						>
							<Input
								value={author}
								onChange={e => setAuthor(e.target.value)}
								placeholder='Please enter author'
							/>
							<ul className={author ? styles.authors : styles.hidden}>
								{authors?.map(item => (
									<li
										className={author === item.name ? styles.hidden : ''}
										onClick={() => handleClickAuthor(item)}
										key={item.id}
									>
										{item.name}
									</li>
								))}
							</ul>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							name='narrator_id'
							label='Gúrriń etiwshi'
							rules={[
								{ required: true, message: 'Please choose the narrator' },
							]}
							initialValue={
								editingNarrator !== '' &&
								narrators?.find(item => {
									if (item.name === editingNarrator) {
										form.setFieldsValue({ narrator_id: item.id })
										return true
									}
									return false
								})?.id
							}
						>
							<Input
								value={narrator}
								onChange={e => setNarrator(e.target.value)}
								placeholder='Please enter narrator'
							/>
							<ul className={narrator ? styles.narrator : styles.hidden}>
								{narrators?.map(item => (
									<li
										className={narrator === item.name ? styles.hidden : ''}
										onClick={() => handleClickNarrator(item)}
										key={item.id}
									>
										{item.name}
									</li>
								))}
							</ul>
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={24}>
						<Form.Item
							name='genre_id'
							label='Janr'
							rules={[{ required: true, message: 'Please select genres' }]}
							initialValue={genreValue}
						>
							<Select mode='multiple' placeholder='Please choose the genre'>
								{genres?.map(item => (
									<Option key={item.id} value={item.id}>
										{item.name}
									</Option>
								))}
							</Select>
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={24}>
						<Form.Item
							name='description'
							label='Kitap haqqında maǵlıwmat'
							rules={[{ required: true, message: 'Please enter description' }]}
							initialValue={bookToEdit?.description}
						>
							<Input.TextArea rows={8} placeholder='Please enter description' />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Drawer>
	)
}

export { BooksDrawer }
