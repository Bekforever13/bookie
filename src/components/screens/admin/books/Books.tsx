import React, { useState, useEffect } from 'react'
import styles from './Books.module.scss'
import { BookCategories } from './BookCategories'
import { StyledButton } from 'src/components/ui'
import { $host } from 'src/config/axios'
import { useQuery, useQueryClient } from 'react-query'
import { TFormData } from 'src/types/Types'
import { adminStore } from 'src/store/admin/adminStore'
// import { ModalWindow } from 'src/components/shared'
import { Popconfirm, Space, Table, message } from 'antd'
import { BsEye, BsPencil, BsTrash } from 'react-icons/bs'
import { bookStore } from 'src/store/admin/booksStore'
import { useNavigate } from 'react-router-dom'
import { BooksDrawer } from 'src/components/shared/modal/books/BooksDrawer'

const Books: React.FC = () => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [total, setTotal] = useState(1)
	const { setEditingBook, setBookToEdit } = bookStore()
	const {
		activeCategory,
		fetchAuthors,
		fetchCategories,
		fetchGenres,
		fetchNarrators,
	} = adminStore()

	const showModal = () => setIsModalOpen(true)

	const { data } = useQuery<TFormData[]>({
		queryKey: ['admin-books', activeCategory, isModalOpen, currentPage],
		queryFn: getBooks,
		staleTime: 5 * 60 * 1000,
		cacheTime: 60 * 60 * 1000,
	})

	async function getBooks() {
		const res = await $host.get(
			`/books?page=${currentPage}&category=${activeCategory}`
		)
		const totalBooks = res.data.meta.total
		setTotal(totalBooks)
		return res.data.data
	}

	const handleDelete = async (id: number) => {
		await $host.delete(`/books/${id}`)
		queryClient.refetchQueries('admin-books')
		message.error('Deleted!')
	}

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			width: 50,
		},
		{
			title: 'Title',
			dataIndex: 'title',
			key: 'title',
			width: 120,
			ellipsis: true,
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
			width: 200,
			ellipsis: true,
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
			width: 100,
		},
		{
			title: 'Author',
			dataIndex: 'author',
			key: 'author',
			width: 100,
		},
		{
			title: 'Category',
			dataIndex: 'category',
			key: 'category',
			width: 100,
		},
		{
			title: 'Action',
			key: 'action',
			width: 200,
			ellipsis: true,
			render: (_: TFormData, rec: TFormData) => {
				return (
					<Space className={styles.btns} size='middle'>
						<StyledButton
							color='var(--brand-color-1)'
							backgroundcolor='#fff'
							border='1px solid var(--brand-color-1)'
							onClick={() => {
								setEditingBook(true)
								setIsModalOpen(true)
								setBookToEdit(rec)
							}}
						>
							<BsPencil />
						</StyledButton>
						<Popconfirm
							title='Вы действительно хотите удалить?'
							onConfirm={() => handleDelete(rec.id)}
						>
							<StyledButton
								color='red'
								backgroundcolor='#fff'
								border='1px solid red'
							>
								<BsTrash />
							</StyledButton>
						</Popconfirm>
						<StyledButton
							color='var(--brand-color-1)'
							backgroundcolor='#fff'
							border='1px solid var(--brand-color-1)'
							onClick={() => navigate(`/admin/books/${rec.id}`)}
						>
							<BsEye />
						</StyledButton>
					</Space>
				)
			},
		},
	]

	useEffect(() => {
		fetchAuthors()
		fetchCategories()
		fetchGenres()
		fetchNarrators()
	}, [])

	return (
		<div className={styles.books}>
			<div className={styles.wrapper}>
				<BookCategories />
				<StyledButton
					border='none'
					backgroundcolor='var(--brand-color-1)'
					color='#fff'
					onClick={showModal}
				>
					Add book
				</StyledButton>
				{/* <ModalWindow
					setModalIsOpen={setIsModalOpen}
					title='Kitap qosıw'
					open={isModalOpen}
				/> */}
				<BooksDrawer
					setModalIsOpen={setIsModalOpen}
					title='Kitap qosıw'
					open={isModalOpen}
				/>
			</div>
			<Table
				pagination={{
					total: total,
					current: currentPage,
					onChange: page => setCurrentPage(page),
				}}
				columns={columns}
				dataSource={data as any}
				rowKey={(record: TFormData) => record.title}
			/>
		</div>
	)
}

export { Books }
