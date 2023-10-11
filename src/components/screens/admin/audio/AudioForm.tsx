// AudioForm.tsx
import React from 'react'
import { Select } from 'antd'
import { TNewAudioData } from 'src/types/Types'
import { StyledButton } from 'src/components/ui'

type AudioFormProps = {
	newAudioData: TNewAudioData
	setNewAudioData: (data: TNewAudioData) => void
	handleSubmit: () => void
	disabled: boolean
}

const AudioForm: React.FC<AudioFormProps> = ({
	newAudioData,
	setNewAudioData,
	handleSubmit,
	// disabled
}) => {
	const options = [
		{ label: 'Платный', value: 0 },
		{ label: 'Бесплатный', value: 1 },
	]

	return (
		<>
			<label>
				Book id:
				<input
					type='number'
					value={newAudioData.book_id}
					placeholder='Number...'
					onChange={e =>
						setNewAudioData({
							...newAudioData,
							book_id: e.target.value || '',
						})
					}
				/>
			</label>
			<label>
				Title:
				<input
					type='text'
					value={newAudioData.title}
					placeholder='Title...'
					onChange={e =>
						setNewAudioData({
							...newAudioData,
							title: e.target.value,
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

export default AudioForm
