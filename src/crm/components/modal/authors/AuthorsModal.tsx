import React, { useState } from 'react'
import { Modal } from 'antd'
import { ModalWindowProps } from 'src/crm/types/types'
import styles from './AuthorsModal.module.scss'
import { $host } from 'src/config/axios'
import { useQueryClient } from 'react-query'

const AuthorsModal: React.FC<ModalWindowProps> = ({
	setIsModalOpen,
	...props
}) => {
	const [formData, setFormData] = useState({ name: '' })
	const queryClient = useQueryClient()

	const handleCancel = () => {
		setIsModalOpen(false)
	}

	const onSubmit = async () => {
		await $host.post('/authors', formData)
		queryClient.refetchQueries('admin-authors')
		setIsModalOpen(false)
		setFormData({ name: '' })
	}

	const handleChange = (value: string, name: string) => {
		setFormData(prevState => ({
			...prevState,
			[name]: value,
		}))
	}

	return (
		<Modal
			className={styles.modal}
			{...props}
			onCancel={handleCancel}
			onOk={onSubmit}
		>
			<form onSubmit={onSubmit}>
				<label>
					Name:
					<input
						type='text'
						value={formData.name}
						onChange={e => handleChange(e.target.value, 'name')}
					/>
				</label>
			</form>
		</Modal>
	)
}

export { AuthorsModal }
