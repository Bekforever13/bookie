import React, { useState, useEffect } from 'react'
import { Modal } from 'antd'
import styles from './ReviewModal.module.scss'
import { $host } from 'src/config/axios'
import { useQueryClient } from 'react-query'
import { sharedStore } from 'src/store/admin/sharedStore'
import { ModalWindowProps } from 'src/types/Types'

const ReviewModal: React.FC<ModalWindowProps> = ({
	setModalIsOpen,
	...props
}) => {
	const { reviewToEdit } = sharedStore()
	const queryClient = useQueryClient()
	const [formData, setFormData] = useState({
		text: '',
		rating: 5,
	})

	useEffect(() => {
		if (reviewToEdit) {
			setFormData({
				text: reviewToEdit.text,
				rating: reviewToEdit.rating,
			})
		}
	}, [reviewToEdit])

	const handleCancel = () => {
		setModalIsOpen(false)
	}

	const onSubmit = async () => {
		await $host.put(`/reviews/${reviewToEdit?.id}`, formData)
		queryClient.refetchQueries(`admin-reviews`)
		console.log(reviewToEdit)
		setModalIsOpen(false)
		setFormData({ text: '', rating: 0 })
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
					Rating:
					<input
						type='number'
						min={1}
						max={5}
						value={formData.rating}
						onChange={e => handleChange(e.target.value, 'rating')}
					/>
				</label>
				<label>
					Text:
					<input
						type='text'
						value={formData.text}
						onChange={e => handleChange(e.target.value, 'text')}
					/>
				</label>
			</form>
		</Modal>
	)
}

export { ReviewModal }
