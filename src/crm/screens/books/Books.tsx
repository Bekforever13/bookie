import React, { useState, useEffect } from 'react'
import styles from './Books.module.scss'
import { BookCategories } from './BookCategories'
import { StyledButton } from 'src/components/ui/button/StyledButtons'
import { BookTable } from 'src/crm/components'
import { $host } from 'src/config/axios'
import { useQuery, useQueryClient } from 'react-query'
import { IBookInfo, TIdNameSlug, FormData } from 'src/types/Types'
import { adminStore } from 'src/store/adminStore'
import { ModalWindow } from 'src/crm/components/modal/ModalWindow'
import { Space } from 'antd'
import { BsPencil, BsTrash } from 'react-icons/bs'

const Books: React.FC = () => {
	const queryClient = useQueryClient()
	const {
		activeCategory,
		fetchAuthors,
		fetchCategories,
		fetchGenres,
		fetchNarrators,
		setEditingBook,
		setBookToEdit,
	} = adminStore()
	const [isModalOpen, setIsModalOpen] = useState(false)

	const showModal = () => {
		setIsModalOpen(true)
	}

	const { data } = useQuery<IBookInfo[]>({
		queryKey: ['admin-books', activeCategory, isModalOpen],
		queryFn: getBooks,
	})
	async function getBooks() {
		const res = await $host.get(`/books?category=${activeCategory}`)
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
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
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
			title: 'Slug',
			dataIndex: 'slug',
			key: 'slug',
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
							<span key={item.slug}>{item.name}</span>
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
						<StyledButton
							color='red'
							backgroundcolor='#fff'
							border='1px solid red'
							onClick={() => handleDelete(rec.id)}
						>
							<BsTrash />
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
				<ModalWindow
					setIsModalOpen={setIsModalOpen}
					title='Kitap qosıw'
					open={isModalOpen}
				/>
			</div>
			{data && <BookTable columns={columns} dataSource={data} />}
		</div>
	)
}

export { Books }
