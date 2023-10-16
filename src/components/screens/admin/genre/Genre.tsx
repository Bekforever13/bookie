import React, { useEffect, useRef, useState } from 'react'
import styles from './Genre.module.scss'
import { NameChangeModal } from 'src/components/shared'
import { $host } from 'src/config/axios'
import { useQuery, useQueryClient } from 'react-query'
import { Popconfirm, Space, Table } from 'antd'
import { StyledButton } from 'src/components/ui'
import { BsTrash } from 'react-icons/bs'
import {
	PiPencilSimpleDuotone,
	PiPencilSimpleSlashDuotone,
} from 'react-icons/pi'
import { FiSave } from 'react-icons/fi'
import { TIdNameSlug } from 'src/types/Types'
import { sharedStore } from 'src/store/admin/sharedStore'

const Genre: React.FC = () => {
	const inputRef = useRef<HTMLInputElement>(null)
	const queryClient = useQueryClient()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { isEdit, setIsEdit, itemToEdit, setItemToEdit } = sharedStore()
	const [newGenre, setNewGenreName] = useState({ name: '' })
	const { data, isLoading } = useQuery<TIdNameSlug[]>({
		queryKey: ['admin-genres'],
		queryFn: getBooks,
	})
	async function getBooks() {
		const res = await $host.get('/genres')
		return res.data.data
	}

	const handleDelete = (id: number) => {
		$host
			.delete(`/genres/${id}`)
			.then(() => queryClient.refetchQueries('admin-genres'))
	}

	const handleSaveEdited = (id: number) => {
		$host.put(`/genres/${id}`, newGenre).then(() => {
			queryClient.refetchQueries('admin-genres')
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
			setNewGenreName({ name: record.name })
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
			render: (_: TIdNameSlug, rec: TIdNameSlug) => {
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
					setModalIsOpen={setIsModalOpen}
					title='Genre qosıw'
					open={isModalOpen}
					route='genres'
				/>
			</div>
			{data && (
				<Table
					loading={isLoading}
					columns={columns}
					dataSource={data}
					rowKey={(record: TIdNameSlug) => record.slug}
				/>
			)}
		</div>
	)
}

export { Genre }
