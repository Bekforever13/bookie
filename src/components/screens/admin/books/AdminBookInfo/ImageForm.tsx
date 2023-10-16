import { message } from 'antd'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { StyledButton } from 'src/components/ui'
import { $host } from 'src/config/axios'
import styles from './AdminBookInfo.module.scss'

interface ImageFormProps {
	setIsAdded: React.Dispatch<React.SetStateAction<number>>
	isAdded: number
}

const ImageForm: React.FC<ImageFormProps> = ({ setIsAdded }) => {
	const { id } = useParams()
	const fileInputRef = React.useRef<HTMLInputElement>(null)
	const [data, setData] = useState<{
		book_id: string
		image: File | null
	}>({
		book_id: id ? id : '',
		image: null,
	})

	const handleSubmit = async () => {
		if (data.image) {
			const formData = new FormData()
			formData.append('book_id', data.book_id)
			formData.append('image', data.image)

			await $host.post('/images', formData).then(() => {
				setIsAdded(prev => prev + 1)
				message.success('Qosıldı')
				if (fileInputRef.current) {
					fileInputRef.current.value = ''
				}
			})
		}
	}

	return (
		<div className={styles.img}>
			<label>
				Image
				<input
					ref={fileInputRef}
					type='file'
					onChange={e =>
						setData(prevData => ({
							...prevData,
							image: e.target.files?.[0]
								? new File([e.target.files[0]], e.target.files[0].name)
								: null,
						}))
					}
				/>
			</label>
			<StyledButton
				color='var(--brand-color-1)'
				backgroundcolor='#fff'
				border='1px solid var(--brand-color-1)'
				onClick={handleSubmit}
			>
				Add image
			</StyledButton>
		</div>
	)
}

export { ImageForm }
