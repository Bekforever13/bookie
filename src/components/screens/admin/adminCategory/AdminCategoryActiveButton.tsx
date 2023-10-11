import { Popconfirm, Space } from 'antd'
import React from 'react'
import { BsTrash } from 'react-icons/bs'
import { FiSave } from 'react-icons/fi'
import {
	PiPencilSimpleDuotone,
	PiPencilSimpleSlashDuotone,
} from 'react-icons/pi'
import { StyledButton } from 'src/components/ui'
import styles from './AdminCategory.module.scss'
import { TIdNameSlug, TReview, TUserData } from 'src/types/Types'

export interface ActionButtonsProps {
	record: TIdNameSlug
	isEdit: boolean
	itemToEdit: TIdNameSlug | TUserData | TReview | null
	handleBtnEdit: (record: TIdNameSlug) => void
	handleCancelEdit: () => void
	handleDelete: (id: number) => void
}

const AdminCategoryActiveButton: React.FC<ActionButtonsProps> = ({
	record,
	isEdit,
	itemToEdit,
	handleBtnEdit,
	handleCancelEdit,
	handleDelete,
}) => {
	const isEditing = isEdit && itemToEdit?.id === record.id
	const isDisabled = isEdit && !isEditing

	return (
		<Space className={styles.btns} size='middle'>
			<StyledButton
				color='var(--brand-color-1)'
				backgroundcolor='#fff'
				border='1px solid var(--brand-color-1)'
				onClick={() => handleBtnEdit(record)}
				disabled={isDisabled}
			>
				{isEdit && itemToEdit?.id === record.id ? (
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
				onConfirm={() => handleDelete(record.id)}
			>
				<StyledButton color='red' backgroundcolor='#fff' border='1px solid red'>
					<BsTrash />
				</StyledButton>
			</Popconfirm>
		</Space>
	)
}

export { AdminCategoryActiveButton }
