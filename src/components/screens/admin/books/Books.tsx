import React, { useState, useEffect } from 'react'
import styles from './Books.module.scss'
import { BookCategories } from './BookCategories'
import { StyledButton } from 'src/components/ui'
import { $host } from 'src/config/axios'
import { useQuery, useQueryClient } from 'react-query'
import { TFormData } from 'src/types/Types'
import { adminStore } from 'src/store/admin/adminStore'
import { Popconfirm, Space, Table, message, TableColumnsType } from 'antd'
import { BsEye, BsPencil, BsTrash } from 'react-icons/bs'
import { bookStore } from 'src/store/admin/booksStore'
import { useNavigate } from 'react-router-dom'
import { BooksDrawer } from 'src/components/shared'
import { formatPrice } from 'src/services/services'

const Books: React.FC = () => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [total, setTotal] = useState(1)
	const {
		setEditingBook,
		setBookToEdit,
		setEditingBookId,
		setEditingAuthor,
		setEditingNarrator,
	} = bookStore()
	const {
		activeCategory,
		fetchAuthors,
		fetchCategories,
		fetchGenres,
		fetchNarrators,
	} = adminStore()

	const showModal = () => setIsModalOpen(true)

	const { data, isLoading } = useQuery<TFormData[]>({
		queryKey: ['admin-books', activeCategory, currentPage],
		queryFn: getBooks,
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

	const columns: TableColumnsType<TFormData> = [
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
			render: (_, record) => <>{formatPrice(record.price)}</>,
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
								setEditingAuthor(rec.author)
								setEditingNarrator(rec.narrator)
								setBookToEdit(rec)
								setEditingBookId(rec.id)
								setEditingBook(true)
								setIsModalOpen(true)
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
				<BooksDrawer
					setModalIsOpen={setIsModalOpen}
					title='Kitap qosıw'
					open={isModalOpen}
				/>
			</div>
			<Table
				loading={isLoading}
				pagination={{
					total: total,
					current: currentPage,
					onChange: page => setCurrentPage(page),
				}}
				columns={columns}
				dataSource={data as TFormData[]}
				rowKey={(record: TFormData) => record.title}
			/>
		</div>
	)
}

export { Books }
