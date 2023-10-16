import React from 'react'
import { Select, message } from 'antd'
import { StyledButton } from 'src/components/ui'
import { TNewAudioData } from 'src/types/Types'
import { $host } from 'src/config/axios'
import { useParams } from 'react-router-dom'

interface AudioFormProps {
	setIsAdded: React.Dispatch<React.SetStateAction<number>>
	isAdded: number
}

const AudioForm: React.FC<AudioFormProps> = ({ setIsAdded }) => {
	const { id } = useParams()
	const fileInputRef = React.useRef<HTMLInputElement>(null)
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
				setIsAdded(prev => prev + 1)
				message.success('Qosıldı')
				setNewAudioData({
					book_id: id ? id : '',
					title: '',
					file: null,
					is_free: 1,
				})
				if (fileInputRef.current) {
					fileInputRef.current.value = ''
				}
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
					ref={fileInputRef}
					type='file'
					onChange={e =>
						setNewAudioData({
							...newAudioData,
							file: e.target.files?.[0] ? e.target.files?.[0] : null,
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
							is_free: e,
						})
					}
					value={newAudioData.is_free}
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
