import React, { useState } from 'react'
import styles from './Images.module.scss'
import { StyledButton } from 'src/components/ui'
import { $host } from 'src/config/axios'
import { Select, message } from 'antd'
import { useQuery } from 'react-query'
import { TFormData } from 'src/types/Types'

const { Option } = Select

const Images: React.FC = () => {
	const [data, setData] = useState<{
		book_id: string
		image: File | null
	}>({
		book_id: '',
		image: null,
	})

	const handleSubmit = async () => {
		if (data.image) {
			const formData = new FormData()
			formData.append('book_id', data.book_id)
			formData.append('image', data.image)

			await $host.post('/images', formData).then(() => {
				message.success('Qosıldı')
				setData({ book_id: '', image: null })
			})
		}
	}
	const { data: books } = useQuery<TFormData[]>({
		queryKey: ['admin-books'],
		queryFn: getBooks,
		staleTime: 5 * 60 * 1000,
		cacheTime: 60 * 60 * 1000,
	})

	async function getBooks() {
		const res = await $host.get('/books')
		return res.data.data
	}
	return (
		<div className={styles.images}>
			<h1>Add image</h1>
			<div>
				<label>
					Book
					<Select
						onSelect={e =>
							setData(prev => ({
								...prev,
								book_id: e,
							}))
						}
						placeholder='Please choose the book'
					>
						{books?.map(item => (
							<Option key={item.id} value={item.id}>
								{item.title}
							</Option>
						))}
					</Select>
				</label>
				<label>
					Image
					<input
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
		</div>
	)
}

export { Images }
