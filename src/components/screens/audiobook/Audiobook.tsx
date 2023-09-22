import React, { useEffect, useState } from 'react'
import styles from './Audiobook.module.scss'
import prince from 'src/assets/images/prince.png'
import wave from 'src/assets/images/wave.svg'
import { useParams } from 'react-router-dom'
import { $host } from 'src/config/axios'
import { useQuery } from 'react-query'
import { IBookInfo } from 'src/assets/types/Types'
import { AudioPlayer } from './AudioPlayer'
import song from 'src/assets/004._the_weeknd_-_starboy.mp3'

const Audiobook: React.FC = () => {
	const [currentAudio, setCurrentAudio] = useState('')
	const { slug } = useParams()
	const { data } = useQuery<IBookInfo>({
		queryKey: ['book_info'],
		queryFn: getBookInfo,
	})

	async function getBookInfo() {
		const res = await $host.get(`/all-books/${slug}`)
		return res.data.data
	}

	useEffect(() => {
		window.scrollTo(0, 0)
		if (data) {
			setCurrentAudio(data.audios[0]?.file_name)
		}
	}, [])

	return (
		<div className={styles.book}>
			<div className={styles.text}>
				<img src={prince} alt='book image' />
				<div className={styles.desc}>
					<h1>{data?.title}</h1>
					<h4>{data?.author[0]?.name}</h4>
					<p>{data?.description}</p>
					<div>
						{data?.genre.map(item => (
							<span key={item.slug}>{item.name}</span>
						))}
					</div>
				</div>
			</div>
			<div className={styles.audio}>
				<div className={styles.chapters}>
					<h4>Sóz bası</h4>
					<ul>
						<li>
							I bólim <img src={wave} alt='wave' />
						</li>
						<li>II bólim</li>
						<li>III bólim</li>
					</ul>
				</div>
				<AudioPlayer currentAudio={song} />
			</div>
		</div>
	)
}

export { Audiobook }
