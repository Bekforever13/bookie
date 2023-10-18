import React from 'react'
import styles from './AdminBookInfo.module.scss'
import { useQuery } from 'react-query'
import { IAdminBookInfo, TAudio } from 'src/types/Types'
import { useLocation, useParams } from 'react-router-dom'
import { $host } from 'src/config/axios'
import no_photo from 'src/assets/images/no_photo.jpg'
import { formatPrice } from 'src/services/services'
import { BsPencil, BsTrash } from 'react-icons/bs'
import { Form, Popconfirm, Select, Spin, message } from 'antd'
import { StyledButton } from 'src/components/ui'
import { AudioForm } from './AudioForm'
import { ImageForm } from './ImageForm'

const AdminBookInfo: React.FC = () => {
	const fileInputRef = React.useRef<HTMLInputElement>(null)
	const options = [
		{ label: 'Платный', value: 0 },
		{ label: 'Бесплатный', value: 1 },
	]
	const [active, setActive] = React.useState('audio')
	const { id } = useParams()
	const { pathname } = useLocation()
	const [isAdded, setIsAdded] = React.useState(0)
	const { data, isLoading } = useQuery<IAdminBookInfo>({
		queryKey: [pathname, isAdded, 'admin-book-info'],
		queryFn: getBookInfo,
		staleTime: 5 * 60 * 1000,
		cacheTime: 60 * 60 * 1000,
	})

	async function getBookInfo() {
		const res = await $host.get(`/books/${id}`)
		return res.data.data
	}

	const handleDeleteAudio = async (id: number | undefined) => {
		if (id) {
			await $host.delete(`/audios/${id}`)
			setIsAdded(prev => prev + 1)
		}
	}

	const handleDeleteImage = async (id: number | undefined) => {
		if (id) {
			await $host.delete(`/images/${id}`)
			setIsAdded(prev => prev + 1)
		}
	}

	const handleClickActive = (str: string) => setActive(str)

	const handleClickAudioSelect = (
		e: { label: string; value: number },
		item: TAudio
	) => {
		$host
			.post(`/audios/${item.id}`, { _method: 'PUT', is_free: e })
			.then(() => {
				message.success('Audio ozgertildi')
				setIsAdded(isAdded + 1)
			})
	}

	const handleClickChangeAudio = (item: TAudio) => {
		fileInputRef.current?.click()
		fileInputRef.current?.addEventListener('change', event => {
			const file = (event.target as HTMLInputElement)?.files?.[0]
			if (file) {
				const formData = new FormData()
				formData.append('file_name', file)
				formData.append('_method', 'PUT')

				$host.post(`/audios/${item.id}`, formData).then(() => {
					message.success('Audio ozgertildi')
					setIsAdded(isAdded + 1)
				})
			}
		})
	}

	return (
		<Spin spinning={isLoading}>
			<div className={styles.AdminBookInfo}>
				{data && (
					<div className={styles.info}>
						<div className={styles.images}>
							{data.image[0] ? (
								data.image.map(item => (
									<div key={item.id} className={styles.img}>
										<img
											key={item.image_url}
											src={item.image_url}
											alt='book image'
										/>
										<Popconfirm
											title='Delete image?'
											onConfirm={() => handleDeleteImage(item.id)}
										>
											<button>
												<BsTrash />
											</button>
										</Popconfirm>
									</div>
								))
							) : (
								<img src={no_photo} alt='no photo' />
							)}
						</div>
						<Form className={styles.text}>
							<Form.Item label='Title'>
								<h5>{data.title}</h5>
							</Form.Item>
							<Form.Item label='Author'>
								<div>{data.author.name}</div>
							</Form.Item>
							<Form.Item label='Description'>
								<p>{data.description}</p>
							</Form.Item>
							<Form.Item label='Category'>
								<h5>{data.category}</h5>
							</Form.Item>
							<Form.Item label='Price'>
								<h5>{formatPrice(data?.price)} som</h5>
							</Form.Item>
							<Form.Item label='Narrators'>
								<div className={styles.narrators}>{data.narrator.name}</div>
							</Form.Item>
							<Form.Item label='Language'>
								<h5>{data.language}</h5>
							</Form.Item>
							<Form.Item label='Genres'>
								<div className={styles.genres}>
									{data.genre?.map(item => (
										<h5 key={item.id}>{item.name}</h5>
									))}
								</div>
							</Form.Item>
							<Form.Item label='Audio'>
								<div className={styles.audios}>
									{data.audios?.map(item => (
										<div className={styles.audio} key={item.audio_url}>
											<audio controls>
												<source src={item.audio_url} type='audio/mpeg' />
											</audio>
											<Select
												onSelect={e => handleClickAudioSelect(e, item)}
												style={{ width: '130px' }}
												options={options}
												value={item.is_free ? options[1] : options[0]}
											/>
											<label htmlFor='deleteButton'>
												<button
													id='deleteButton'
													style={{ color: 'blue' }}
													onClick={() => handleClickChangeAudio(item)}
												>
													<BsPencil />
												</button>
											</label>
											<input
												ref={fileInputRef}
												id='fileInput'
												type='file'
												style={{ display: 'none' }}
											/>
											<Popconfirm
												title='Delete audio?'
												onConfirm={() => handleDeleteAudio(item.id)}
											>
												<button>
													<BsTrash />
												</button>
											</Popconfirm>
										</div>
									))}
								</div>
							</Form.Item>
						</Form>
					</div>
				)}
				<div className={styles.audio_image}>
					<div className={styles.btns}>
						<StyledButton
							border='1px solid #2D71AE'
							backgroundcolor='transparent'
							color='#2D71AE'
							className={active === 'audio' ? styles.active : ''}
							onClick={() => handleClickActive('audio')}
						>
							Audio
						</StyledButton>
						<StyledButton
							border='1px solid #2D71AE'
							backgroundcolor='transparent'
							color='#2D71AE'
							className={active === 'image' ? styles.active : ''}
							onClick={() => handleClickActive('image')}
						>
							Image
						</StyledButton>
					</div>
					{active === 'audio' ? (
						<AudioForm isAdded={isAdded} setIsAdded={setIsAdded} />
					) : (
						<ImageForm isAdded={isAdded} setIsAdded={setIsAdded} />
					)}
				</div>
			</div>
		</Spin>
	)
}

export { AdminBookInfo }
