import React, { useRef, useState, useEffect } from 'react'
import styles from './Narrator.module.scss'
import { $host } from 'src/config/axios'
import { useQuery, useQueryClient } from 'react-query'
import { NameChangeModal } from 'src/components/shared'
import { TIdNameSlug } from 'src/types/Types'
import { Popconfirm, Space, Table } from 'antd'
import { StyledButton } from 'src/components/ui'
import { FiSave } from 'react-icons/fi'
import {
	PiPencilSimpleDuotone,
	PiPencilSimpleSlashDuotone,
} from 'react-icons/pi'
import { BsTrash } from 'react-icons/bs'
import { sharedStore } from 'src/store/admin/sharedStore'

const Narrator: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [total, setTotal] = useState(1)
	const inputRef = useRef<HTMLInputElement>(null)
	const queryClient = useQueryClient()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { isEdit, setIsEdit, itemToEdit, setItemToEdit } = sharedStore()
	const [newNarratorName, setNewNarratorName] = useState({
		name: '',
	})
	const { data, isLoading } = useQuery<TIdNameSlug[]>({
		queryKey: ['admin-narrators', currentPage],
		queryFn: getBooks,
	})
	async function getBooks() {
		const res = await $host.get(`/narrators?page=${currentPage}`)
		const totalNarrators = res.data.meta.total
		setTotal(totalNarrators)
		return res.data.data
	}

	const handleDelete = (id: number) => {
		$host
			.delete(`/narrators/${id}`)
			.then(() => queryClient.refetchQueries('admin-narrators'))
	}

	const handleSaveEdited = (id: number) => {
		$host.put(`/narrators/${id}`, newNarratorName).then(() => {
			queryClient.refetchQueries('admin-narrators')
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
			setNewNarratorName({ name: record.name })
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
							value={newNarratorName.name}
							onChange={e =>
								setNewNarratorName({
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
		<div className={styles.narrator}>
			<div className={styles.add}>
				<StyledButton
					color='var(--brand-color-1)'
					backgroundcolor='#fff'
					border='1px solid var(--brand-color-1)'
					onClick={showModal}
				>
					Add narrator
				</StyledButton>
				<NameChangeModal
					setModalIsOpen={setIsModalOpen}
					title='Narrator qosıw'
					open={isModalOpen}
					route='narrators'
				/>
			</div>
			{data && (
				<Table
					loading={isLoading}
					pagination={{
						total: total,
						current: currentPage,
						onChange: page => setCurrentPage(page),
					}}
					columns={columns}
					rowKey={(record: TIdNameSlug) => record.slug}
					dataSource={data}
				/>
			)}
		</div>
	)
}

export { Narrator }
