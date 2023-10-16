import React, { useEffect, useRef, useState } from 'react'
import styles from './AdminCategory.module.scss'
import { $host } from 'src/config/axios'
import { useQuery, useQueryClient } from 'react-query'
import { StyledButton } from 'src/components/ui'
import { message } from 'antd'
import { TIdNameSlug } from 'src/types/Types'
import { sharedStore } from 'src/store/admin/sharedStore'
import { NameChangeModal } from 'src/components/shared'
import { AdminCategoryTable } from './AdminCategoryTable'
import { AdminCategoryActiveButton } from './AdminCategoryActiveButton'

const AdminCategory: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [total, setTotal] = useState(1)
	const inputRef = useRef<HTMLInputElement>(null)
	const queryClient = useQueryClient()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { isEdit, setIsEdit, itemToEdit, setItemToEdit } = sharedStore()
	const [newCategoryName, setNewCategoryName] = useState({ name: '' })

	const { data, isLoading } = useQuery<TIdNameSlug[]>({
		queryKey: ['admin-categories', currentPage],
		queryFn: getBooks,
	})
	async function getBooks() {
		const res = await $host.get(`/categories?page=${currentPage}`)
		const totalCategories = res.data.meta.total
		setTotal(totalCategories)
		return res.data.data
	}

	const handleDelete = async (id: number) => {
		await $host.delete(`/categories/${id}`).then(() => {
			queryClient.refetchQueries('admin-categories')
			message.error('Deleted!')
		})
	}

	const handleSaveEdited = async (id: number) => {
		await $host
			.put(`/categories/${id}`, newCategoryName)
			.then(() => message.success('Successfully edited'))
			.finally(() => {
				queryClient.refetchQueries('admin-categories')
				setItemToEdit(null)
			})
	}

	const handleBtnEdit = (record: TIdNameSlug) => {
		if (isEdit) {
			setIsEdit(false)
			handleSaveEdited(record.id)
		} else {
			setItemToEdit(record)
			setIsEdit(true)
			setNewCategoryName({ name: record.name })
		}
	}

	useEffect(() => inputRef.current?.focus(), [isEdit])

	const showModal = () => setIsModalOpen(true)

	const handleCancelEdit = () => {
		setIsEdit(false)
		setItemToEdit(null)
	}

	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			width: 300,
			render: (el: string, record: TIdNameSlug) => {
				if (record.id === itemToEdit?.id) {
					return (
						<input
							ref={inputRef}
							value={newCategoryName.name}
							onChange={e =>
								setNewCategoryName({
									name: e.target.value,
								})
							}
							type='text'
						/>
					)
				} else {
					return <>{el}</>
				}
			},
		},
		{
			title: 'Slug',
			dataIndex: 'slug',
			key: 'slug',
		},
		{
			title: 'Action',
			key: 'action',
			render: (_: string, record: TIdNameSlug) => (
				<AdminCategoryActiveButton
					isEdit={isEdit}
					itemToEdit={itemToEdit}
					handleBtnEdit={handleBtnEdit}
					handleCancelEdit={handleCancelEdit}
					handleDelete={handleDelete}
					record={record}
				/>
			),
		},
	]
	return (
		<div className={styles.category}>
			<div className={styles.add}>
				<StyledButton
					color='var(--brand-color-1)'
					backgroundcolor='#fff'
					border='1px solid var(--brand-color-1)'
					onClick={showModal}
				>
					Add category
				</StyledButton>
				<NameChangeModal
					setModalIsOpen={setIsModalOpen}
					title='Category qosıw'
					open={isModalOpen}
					route='categories'
				/>
			</div>
			{data && (
				<AdminCategoryTable
					loading={isLoading}
					data={data}
					total={total}
					columns={columns}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			)}
		</div>
	)
}

export { AdminCategory }
