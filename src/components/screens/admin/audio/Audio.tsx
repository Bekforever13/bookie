import React, { useState } from 'react'
import styles from './Audio.module.scss'
import { $host } from 'src/config/axios'
import { useQuery, useQueryClient } from 'react-query'
import { TAudio, TNewAudioData } from 'src/types/Types'
import { message } from 'antd'
import AudioSearch from './AudioSearch'
import AudioInfo from './AudioInfo'
import AudioForm from './AudioForm'

const Audio: React.FC = () => {
	const [id, setId] = useState<string>('')
	const [newAudioData, setNewAudioData] = useState<TNewAudioData>({
		book_id: '',
		title: '',
		file: null,
		is_free: 1,
	})
	const [isLoading, setIsLoading] = useState<boolean>(false) // Флаг для отслеживания состояния загрузки

	const queryClient = useQueryClient()
	const { data, isError } = useQuery<TAudio>({
		queryKey: ['admin-audios', id],
		queryFn: getAudio,
		staleTime: 5 * 60 * 1000,
		cacheTime: 60 * 60 * 1000,
	})

	async function getAudio() {
		try {
			setIsLoading(true) // Устанавливаем флаг загрузки в true перед выполнением запроса
			const res = await $host.get(`/audios/${id}`)
			return res.data.data
		} catch (error) {
			return Promise.reject(error)
		} finally {
			setIsLoading(false) // Устанавливаем флаг загрузки в false после выполнения запроса
		}
	}

	// delete audio from backend
	const handleDelete = async (id: number | undefined) => {
		if (id) {
			await $host.delete(`/audios/${id}`)
			queryClient.refetchQueries('admin-audios')
		}
	}

	// add new audio to backend
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
				<AudioSearch id={id} setId={setId} />
				{data ? (
					<AudioInfo data={data} handleDelete={handleDelete} />
				) : (
					isError && <h2>Selected id is invalid</h2>
				)}
			</div>
			<div className={styles.right}>
				<AudioForm
					newAudioData={newAudioData}
					setNewAudioData={setNewAudioData}
					handleSubmit={handleSubmit}
					disabled={isLoading}
				/>
			</div>
		</div>
	)
}

export { Audio }
