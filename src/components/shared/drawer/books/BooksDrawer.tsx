import React from 'react'
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
	const { isEditingBook, bookToEdit, setBookToEdit } = bookStore()
	const queryClient = useQueryClient()
	const formRef = useRef<FormInstance>(null)
	const [author, setAuthor] = useState('')
	const [narrator, setNarrator] = useState('')
	const [price, setPrice] = useState('')
	const [form] = Form.useForm<any>()

	const { data: authors } = useQuery<TIdNameSlug[]>({
		queryKey: ['authors', author],
		queryFn: getAuthors,
		staleTime: 5 * 60 * 1000,
		cacheTime: 60 * 60 * 1000,
	})
	async function getAuthors() {
		const res = await $host.get(`/authors?search=${author}`)
		return res.data.data
	}
	const { data: narrators } = useQuery<TIdNameSlug[]>({
		queryKey: ['narrators', narrator],
		queryFn: getNarrators,
		staleTime: 5 * 60 * 1000,
		cacheTime: 60 * 60 * 1000,
	})
	async function getNarrators() {
		const res = await $host.get(`/narrators?search=${narrator}`)
		return res.data.data
	}

	const onClose = () => {
		formRef.current?.resetFields()
		setBookToEdit(null)
		setAuthor('')
		setNarrator('')
		setModalIsOpen(false)
		form.resetFields()
		form.setFieldsValue({ ...bookToEdit })
	}

	const handleChangeAuthor = (e: string) => setAuthor(e)

	const handleClickAuthor = (item: TIdNameSlug) => {
		form.setFieldsValue({ author_id: item.id })
		setAuthor(item.name)
	}

	const handleChangeNarrator = (e: string) => setNarrator(e)

	const handleClickNarrator = (item: TIdNameSlug) => {
		form.setFieldsValue({ narrator_id: item.id })
		setNarrator(item.name)
	}

	const onSubmit = (values: IDrawerFormData) => {
		console.log(values)
		const request = isEditingBook
			? $host.put(`/books/${bookToEdit?.id}`, values)
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
			})
	}

	React.useEffect(() => {
		setAuthor(bookToEdit?.author ?? '')
		setNarrator(bookToEdit?.narrator ?? '')
	}, [isEditingBook])

	React.useEffect(() => {
		form.resetFields()
		setBookToEdit(null)
	}, [isEditingBook, props.open])

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
							initialValue={bookToEdit?.category}
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
							initialValue={bookToEdit?.author}
						>
							<Input
								value={author}
								onChange={e => handleChangeAuthor(e.target.value)}
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
							initialValue={bookToEdit?.narrator}
						>
							<Input
								value={narrator}
								onChange={e => handleChangeNarrator(e.target.value)}
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
							rules={[
								{
									required: true,
									message: 'Please select genres',
								},
							]}
							initialValue={
								bookToEdit?.genre.length &&
								bookToEdit?.genre.map(item => item.id)
							}
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
							rules={[
								{
									required: true,
									message: 'Please enter description',
								},
							]}
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
