// import React, { useState } from 'react'
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
import { IDrawerBooks, IDrawerFormData } from 'src/types/Types'
import { adminStore } from 'src/store/admin/adminStore'
import { $host } from 'src/config/axios'
import { useQueryClient } from 'react-query'
import { bookStore } from 'src/store/admin/booksStore'
import { useRef } from 'react'

const { Option } = Select

const BooksDrawer: React.FC<IDrawerBooks> = ({ setModalIsOpen, ...props }) => {
	const { authors, categories, genres, narrators } = adminStore()
	const { isEditingBook, bookToEdit } = bookStore()
	const queryClient = useQueryClient()
	const formRef = useRef<FormInstance>(null)
	// const [formData, setFormData] = useState<IDrawerFormData>()

	const onClose = () => {
		setModalIsOpen(false)
	}

	const onSubmit = (values: IDrawerFormData) => {
		const request = isEditingBook
			? $host.put(`/books/${bookToEdit?.id}`, values)
			: $host.post('/books', values)

		request
			.then(() => {
				message.success('Successfully!')
				formRef.current?.resetFields()
			})
			.catch(error => console.log(error))

		queryClient.invalidateQueries('admin-books')
		setModalIsOpen(false)
	}

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
			<Form id='myForm' layout='vertical' onFinish={onSubmit} ref={formRef}>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item
							name='title'
							label='Kitap atı'
							rules={[{ required: true, message: 'Please enter title' }]}
						>
							<Input placeholder='Please enter title ' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							name='category_id'
							label='Kategoriya'
							rules={[{ required: true, message: 'Please enter category' }]}
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
						>
							<Input
								type='number'
								style={{ width: '100%' }}
								placeholder='Price'
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							name='language'
							label='Til'
							rules={[{ required: true, message: 'Please choose the type' }]}
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
						>
							<Select placeholder='Please choose the author'>
								{authors.map(item => (
									<Option key={item.id} value={item.id}>
										{item.name}
									</Option>
								))}
							</Select>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							name='narrator_id'
							label='Gúrriń etiwshi'
							rules={[
								{ required: true, message: 'Please choose the narrator' },
							]}
						>
							<Select placeholder='Please choose the narrator'>
								{narrators.map(item => (
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
							name='genre_id'
							label='Janr'
							rules={[
								{
									required: true,
									message: 'please enter url description',
								},
							]}
						>
							<Select mode='multiple' placeholder='Please choose the genre'>
								{genres.map(item => (
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
									message: 'please enter url description',
								},
							]}
						>
							<Input.TextArea
								rows={8}
								placeholder='please enter url description'
							/>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Drawer>
	)
}

export { BooksDrawer }
