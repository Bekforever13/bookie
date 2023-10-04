import React, { useEffect, useRef, useState } from 'react'
import styles from './Genre.module.scss'
import { CustomTable, NameChangeModal } from 'src/crm/components'
import { $host } from 'src/config/axios'
import { useQuery, useQueryClient } from 'react-query'
import { Popconfirm, Space } from 'antd'
import { StyledButton } from 'src/components/ui/button/StyledButtons'
import { BsTrash } from 'react-icons/bs'
import {
	PiPencilSimpleDuotone,
	PiPencilSimpleSlashDuotone,
} from 'react-icons/pi'
import { FiSave } from 'react-icons/fi'
import { TIdNameSlug } from 'src/types/Types'
import { sharedStore } from 'src/store/admin/sharedStore'

const Genre: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [total, setTotal] = useState(1)
	const inputRef = useRef<HTMLInputElement>(null)
	const queryClient = useQueryClient()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { isEdit, setIsEdit, itemToEdit, setItemToEdit } = sharedStore()
	const [newGenre, setNewGenreName] = useState({
		name: '',
	})
	const { data } = useQuery<any[]>({
		queryKey: ['admin-genres', currentPage],
		queryFn: getBooks,
	})
	async function getBooks() {
		const res = await $host.get(`/genres?page=${currentPage}`)
		const totalGenres = res.data.meta.total
		setTotal(totalGenres)
		return res.data.data
	}

	const handleDelete = async (id: number) => {
		await $host.delete(`/genres/${id}`)
		queryClient.refetchQueries('admin-genres')
	}

	const handleSaveEdited = async (id: number) => {
		await $host.put(`/genres/${id}`, newGenre)
		queryClient.refetchQueries('admin-genres')
		setItemToEdit(null)
	}

	const handleBtnEdit = (record: TIdNameSlug) => {
		if (isEdit) {
			setIsEdit(false)
			handleSaveEdited(record.id)
		} else {
			setItemToEdit(record)
			setIsEdit(true)
			setNewGenreName({ name: record.name })
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
							value={newGenre.name}
							onChange={e =>
								setNewGenreName({
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
		<div className={styles.genre}>
			<div className={styles.add}>
				<StyledButton
					color='var(--brand-color-1)'
					backgroundcolor='#fff'
					border='1px solid var(--brand-color-1)'
					onClick={showModal}
				>
					Add genre
				</StyledButton>
				<NameChangeModal
					setIsModalOpen={setIsModalOpen}
					title='Genre qosıw'
					open={isModalOpen}
					route='genres'
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

export { Genre }
