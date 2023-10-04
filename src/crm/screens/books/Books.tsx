import React, { useState, useEffect } from 'react'
import styles from './Books.module.scss'
import { BookCategories } from './BookCategories'
import { StyledButton } from 'src/components/ui/button/StyledButtons'
import { CustomTable } from 'src/crm/components'
import { $host } from 'src/config/axios'
import { useQuery, useQueryClient } from 'react-query'
import { IBookInfo, TIdNameSlug, FormData } from 'src/types/Types'
import { adminStore } from 'src/store/admin/adminStore'
import { ModalWindow } from 'src/crm/components'
import { Popconfirm, Space } from 'antd'
import { BsPencil, BsTrash } from 'react-icons/bs'
import { bookStore } from 'src/store/admin/booksStore'

const Books: React.FC = () => {
	const queryClient = useQueryClient()
	const [currentPage, setCurrentPage] = useState(1)
	const [total, setTotal] = useState(1)
	const {
		activeCategory,
		fetchAuthors,
		fetchCategories,
		fetchGenres,
		fetchNarrators,
	} = adminStore()
	const { setEditingBook, setBookToEdit } = bookStore()
	const [isModalOpen, setIsModalOpen] = useState(false)

	const showModal = () => {
		setIsModalOpen(true)
	}

	const { data } = useQuery<IBookInfo[]>({
		queryKey: ['admin-books', activeCategory, isModalOpen],
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
	}

	const columns = [
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
		},
		{
			title: 'Language',
			dataIndex: 'language',
			key: 'language',
		},
		{
			title: 'Author',
			dataIndex: 'author',
			key: 'author',
		},
		{
			title: 'Narrator',
			dataIndex: 'narrator',
			key: 'narrator',
		},
		{
			title: 'Genre',
			dataIndex: 'genre',
			key: 'genre',
			render: (el: TIdNameSlug[]) => {
				return (
					<>
						{el?.map(item => (
							<span key={item.slug}>{item.name} </span>
						))}
					</>
				)
			},
		},
		{
			title: 'Category',
			dataIndex: 'category',
			key: 'category',
		},
		{
			title: 'Action',
			key: 'action',
			width: 200,
			ellipsis: true,
			render: (_: any, rec: FormData) => {
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
				<ModalWindow
					setIsModalOpen={setIsModalOpen}
					title='Kitap qosıw'
					open={isModalOpen}
				/>
			</div>
			<CustomTable
				total={total}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				columns={columns}
				dataSource={data as any}
			/>
		</div>
	)
}

export { Books }
