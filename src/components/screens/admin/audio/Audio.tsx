import React, { useState } from 'react'
import styles from './Audio.module.scss'
import { $host } from 'src/config/axios'
import { useQuery, useQueryClient } from 'react-query'
import { BsSearch, BsTrash } from 'react-icons/bs'
import { TAudio } from 'src/types/Types'
import { Popconfirm, Select, message } from 'antd'
import { StyledButton } from 'src/components/ui'

const Audio: React.FC = () => {
	const [id, setId] = useState<string>('')
	const options = [
		{ label: 'Платный', value: '0' },
		{ label: 'Бесплатный', value: '1' },
	]
	const [newAudioData, setNewAudioData] = useState<{
		book_id: string
		title: string
		file: File | null
		is_free: number
	}>({
		book_id: '',
		title: '',
		file: null,
		is_free: 1,
	})
	const queryClient = useQueryClient()
	const { data } = useQuery<TAudio>({
		queryKey: ['admin-audios', id],
		queryFn: getAudio,
	})
	async function getAudio() {
		try {
			const res = await $host.get(`/audios/${id}`)
			return res.data.data
		} catch (error) {
			return Promise.reject(error)
		}
	}

	const handleDelete = async (id: number | undefined) => {
		if (id) {
			await $host.delete(`/audios/${id}`)
			queryClient.refetchQueries('admin-audios')
		}
	}

	const handleSubmit = async () => {
		if (newAudioData && newAudioData.file) {
			const formData = new FormData()
			formData.append('book_id', newAudioData.book_id.toString())
			formData.append('title', newAudioData.title)
			formData.append('file', newAudioData.file)
			formData.append('is_free', newAudioData.is_free.toString())

			await $host.post('/audios', formData).then(() => {
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
		<div className={styles.audio}>
			<div className={styles.left}>
				<div className={styles.wrapper}>
					<label className={styles.input}>
						<input
							value={id}
							onChange={e => setId(e.target.value)}
							type='text'
							placeholder='Audionı tabıw ushın kitaptıń id jazıń '
						/>
						<BsSearch />
					</label>
				</div>
				{data ? (
					<ul>
						<li>ID: {data.id}</li>
						<li>Title: {data.title}</li>
						<li>Slug: {data.slug}</li>
						<li>Is_free: {data.is_free}</li>
						<li>
							URL: <audio src={data.audio_url} controls />
						</li>
						<Popconfirm
							title='Вы действительно хотите удалить?'
							onConfirm={() => handleDelete(data.id)}
						>
							<StyledButton
								color='red'
								backgroundcolor='#fff'
								border='1px solid red'
							>
								<BsTrash />
							</StyledButton>
						</Popconfirm>
					</ul>
				) : (
					id !== '' && <h2>Selected id is invalid</h2>
				)}
			</div>
			<div className={styles.right}>
				<label>
					Book id:
					<input
						type='number'
						value={newAudioData.book_id}
						placeholder='Number...'
						onChange={e =>
							setNewAudioData(prevData => ({
								...prevData,
								book_id: e.target.value || '',
							}))
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
							setNewAudioData(prevData => ({
								...prevData,
								title: e.target.value,
							}))
						}
					/>
				</label>
				<label>
					File:
					<input
						type='file'
						onChange={e =>
							setNewAudioData(prevData => ({
								...prevData,
								file: e.target.files?.[0]
									? new File([e.target.files[0]], e.target.files[0].name)
									: null,
							}))
						}
					/>
				</label>
				<label>
					Is free:
					<Select
						options={options}
						onChange={e => console.log(e)}
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
			</div>
		</div>
	)
}

export { Audio }
