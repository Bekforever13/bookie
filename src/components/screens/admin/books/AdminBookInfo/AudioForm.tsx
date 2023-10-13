import React from 'react'
import { Select, message } from 'antd'
import { StyledButton } from 'src/components/ui'
import { TNewAudioData } from 'src/types/Types'
import { $host } from 'src/config/axios'
import { useParams } from 'react-router-dom'
import { useQueryClient } from 'react-query'

interface AudioFormProps {
	setIsAdded: React.Dispatch<React.SetStateAction<number>>
	isAdded: number
}

const AudioForm: React.FC<AudioFormProps> = ({ setIsAdded }) => {
	const queryClient = useQueryClient()
	const { id } = useParams()
	const [newAudioData, setNewAudioData] = React.useState<TNewAudioData>({
		book_id: id ? id : '',
		title: '',
		file: null,
		is_free: 1,
	})
	const options = [
		{ label: 'Платный', value: 0 },
		{ label: 'Бесплатный', value: 1 },
	]

	const handleSubmit = async () => {
		if (newAudioData && newAudioData.file) {
			const formData = new FormData()
			formData.append('book_id', newAudioData.book_id.toString())
			formData.append('title', newAudioData.title)
			formData.append('file', newAudioData.file)
			formData.append('is_free', newAudioData.is_free.toString())

			await $host.post('/audios', formData).then(() => {
				queryClient.refetchQueries('admin-book-info')
				setIsAdded(prev => prev + 1)
				message.success('Qosıldı')
				setNewAudioData(prevData => ({
					...prevData,
					book_id: '',
					title: '',
					file: null,
					is_free: 1,
				}))
			})
		}
	}

	return (
		<>
			<label>
				Title:
				<input
					type='text'
					value={newAudioData?.title}
					placeholder='Title...'
					onChange={e =>
						setNewAudioData({
							...newAudioData,
							title: e.target.value,
							book_id:
								newAudioData?.book_id !== undefined ? newAudioData.book_id : '',
						})
					}
				/>
			</label>
			<label>
				File:
				<input
					type='file'
					onChange={e =>
						setNewAudioData({
							...newAudioData,
							file: e.target.files?.[0]
								? new File([e.target.files[0]], e.target.files[0].name)
								: null,
						})
					}
				/>
			</label>
			<label>
				Is free:
				<Select
					options={options}
					onChange={e =>
						setNewAudioData({
							...newAudioData,
							is_free: e.value,
						})
					}
					defaultValue={options[1]}
				/>
			</label>
			<StyledButton
				color='var(--brand-color-1)'
				backgroundcolor='#fff'
				border='1px solid var(--brand-color-1)'
				onClick={handleSubmit}
			>
				Add audio
			</StyledButton>
		</>
	)
}

export { AudioForm }
