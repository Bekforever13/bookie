import React from 'react'
import styles from './AdminBookInfo.module.scss'
import { useQuery } from 'react-query'
import { IAdminBookInfo } from 'src/types/Types'
import { useLocation, useParams } from 'react-router-dom'
import { $host } from 'src/config/axios'
import no_photo from 'src/assets/images/no_photo.jpg'

const AdminBookInfo: React.FC = () => {
	const { id } = useParams()
	const { pathname } = useLocation()
	const { data } = useQuery<IAdminBookInfo>({
		queryKey: [pathname],
		queryFn: getBookInfo,
		staleTime: 5 * 60 * 1000,
		cacheTime: 60 * 60 * 1000,
	})

	async function getBookInfo() {
		const res = await $host.get(`/books/${id}`)
		return res.data.data
	}
	return (
		<div className={styles.AdminBookInfo}>
			{data && (
				<>
					<div className={styles.image}>
						{data.image[0] ? (
							data.image.map(item => (
								<img
									key={item.image_url}
									src={item.image_url}
									alt='book image'
								/>
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
						<h5>
							{data?.price.toLocaleString('ru-RU', { useGrouping: true })} som
						</h5>
						<div>
							{Array.isArray(data.narrator) &&
								data.narrator.map(item => <div key={item.id}>{item.name}</div>)}
						</div>
						<h5>{data.language}</h5>
						<div>
							{data.genre?.map(item => (
								<h5 key={item.id}>{item.name}</h5>
							))}
						</div>
						<div>
							{data.audios?.map(item => (
								<audio key={item.audio_url} src={item.audio_url} controls />
							))}
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export { AdminBookInfo }
