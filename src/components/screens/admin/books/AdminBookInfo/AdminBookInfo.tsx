import React from 'react'
import styles from './AdminBookInfo.module.scss'
import { useQuery } from 'react-query'
import { IAdminBookInfo } from 'src/types/Types'
import { useLocation, useParams } from 'react-router-dom'
import { $host } from 'src/config/axios'
import no_photo from 'src/assets/images/no_photo.jpg'
import { formatPrice } from 'src/services/services'
import { BsTrash } from 'react-icons/bs'
import { Popconfirm, Spin } from 'antd'
import { StyledButton } from 'src/components/ui'
import { AudioForm } from './AudioForm'
import { ImageForm } from './ImageForm'

const AdminBookInfo: React.FC = () => {
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
						<div className={styles.text}>
							<h5>{data.title}</h5>
							<div>
								{Array.isArray(data.author) &&
									data.author.map(item => <div key={item.id}>{item.name}</div>)}
							</div>
							<p>{data.description}</p>
							<h5>{data.category}</h5>
							<h5>{formatPrice(data?.price)} som</h5>
							<div className={styles.narrators}>
								{Array.isArray(data.narrator) &&
									data.narrator.map(item => (
										<div key={item.id}>{item.name}</div>
									))}
							</div>
							<h5>{data.language}</h5>
							<div className={styles.genres}>
								{data.genre?.map(item => (
									<h5 key={item.id}>{item.name}</h5>
								))}
							</div>
							<div className={styles.audios}>
								{data.audios?.map(item => (
									<div className={styles.audio} key={item.audio_url}>
										<audio controls>
											<source src={item.audio_url} type='audio/mpeg' />
										</audio>
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
						</div>
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
