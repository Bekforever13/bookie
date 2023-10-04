import React, { useEffect, useRef, useState } from 'react'
import styles from './Category.module.scss'
import { $host } from 'src/config/axios'
import { useQuery, useQueryClient } from 'react-query'
import { CustomTable, NameChangeModal } from 'src/crm/components'
import { StyledButton } from 'src/components/ui/button/StyledButtons'
import { Popconfirm, Space } from 'antd'
import { BsTrash } from 'react-icons/bs'
import {
	PiPencilSimpleDuotone,
	PiPencilSimpleSlashDuotone,
} from 'react-icons/pi'
import { FiSave } from 'react-icons/fi'
import { TIdNameSlug } from 'src/types/Types'
import { sharedStore } from 'src/store/admin/sharedStore'

const Category: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [total, setTotal] = useState(1)
	const inputRef = useRef<HTMLInputElement>(null)
	const queryClient = useQueryClient()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { isEdit, setIsEdit, itemToEdit, setItemToEdit } = sharedStore()
	const [newCategoryName, setNewCategoryName] = useState({
		name: '',
	})
	const { data } = useQuery<any[]>({
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
		await $host.delete(`/categories/${id}`)
		queryClient.refetchQueries('admin-categories')
	}

	const handleSaveEdited = async (id: number) => {
		await $host.put(`/categories/${id}`, newCategoryName)
		queryClient.refetchQueries('admin-categories')
		setItemToEdit(null)
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
	useEffect(() => {
		inputRef.current?.focus()
	}, [isEdit])

	const showModal = () => {
		setIsModalOpen(true)
	}

	const handleCancelEdit = () => {
		setIsEdit(false)
		setItemToEdit(null)
	}

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
		},
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
			render: (_: any, rec: TIdNameSlug) => {
				const isEditing = isEdit && itemToEdit?.id === rec.id
				const isDisabled = isEdit && !isEditing
				return (
					<Space className={styles.btns} size='middle'>
						<StyledButton
							color='var(--brand-color-1)'
							backgroundcolor='#fff'
							border='1px solid var(--brand-color-1)'
							onClick={() => handleBtnEdit(rec)}
							disabled={isDisabled}
						>
							{isEdit && itemToEdit?.id === rec.id ? (
								<FiSave />
							) : (
								<PiPencilSimpleDuotone />
							)}
						</StyledButton>
						{isEdit && !isDisabled && (
							<StyledButton
								color='var(--typography-secondary)'
								backgroundcolor='#fff'
								border='1px solid var(--typography-secondary)'
								onClick={handleCancelEdit}
								disabled={isDisabled}
							>
								<PiPencilSimpleSlashDuotone />
							</StyledButton>
						)}

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
					setIsModalOpen={setIsModalOpen}
					title='Category qosıw'
					open={isModalOpen}
					route='categories'
				/>
			</div>
			{data && (
				<CustomTable
					total={total}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					columns={columns}
					dataSource={data}
				/>
			)}
		</div>
	)
}

export { Category }
