import React, { useState } from 'react'
import styles from './Audiobook.module.scss'
import wave from 'src/assets/images/wave.svg'
import { useLocation, useParams } from 'react-router-dom'
import { $host } from 'src/config/axios'
import { useQuery } from 'react-query'
import { IBookInfo } from 'src/types/Types'
import { AudioPlayer } from './AudioPlayer'
import { Romanize } from 'src/services/Romanize'
import no_photo from 'src/assets/images/no_photo.jpg'

const Audiobook: React.FC = () => {
	const colors = [
		'rgba(244, 103, 103, 0.70)',
		'rgba(254, 133, 95, 0.70)',
		'rgba(255, 106, 159, 0.70)',
		'rgba(101, 27, 147, 0.70)',
		'rgba(110, 68, 229, 0.70)',
		'rgba(133, 100, 227, 0.70)',
		'rgba(139, 117, 201, 0.70)',
		'rgba(22, 180, 132, 0.70)',
		'rgba(80, 151, 117, 0.70)',
		'rgba(69, 189, 110, 0.70)',
	]
	const [currentAudio, setCurrentAudio] = useState('')
	const { slug } = useParams()
	const [selectedAudioIndex, setSelectedAudioIndex] = useState(0)
	const { pathname } = useLocation()
	const { data } = useQuery<IBookInfo>({
		queryKey: [pathname],
		queryFn: getBookInfo,
		staleTime: 5 * 60 * 1000,
		cacheTime: 60 * 60 * 1000,
		onSuccess: data => {
			setCurrentAudio(data.audios[0]?.audio_url)
		},
	})

	const handleClickAudio = (index: number) => {
		setSelectedAudioIndex(index)
		data && setCurrentAudio(data.audios[index]?.audio_url)
	}
	const handlePrevAudio = () => {
		setSelectedAudioIndex(prevIndex => prevIndex - 1)
		setCurrentAudio('')
		setCurrentAudio(data?.audios[selectedAudioIndex - 1]?.audio_url ?? '')
	}

	const handleNextAudio = () => {
		setSelectedAudioIndex(prevIndex => prevIndex + 1)
		setCurrentAudio('')
		setCurrentAudio(data?.audios[selectedAudioIndex + 1]?.audio_url ?? '')
	}

	async function getBookInfo() {
		const { data } = await $host.get(`/all-books/${slug}`)
		return data.data
	}

	return (
		<div className={styles.book}>
			<div className={styles.text}>
				{data?.image?.[0]?.image_url ? (
					<img src={data?.image[0].image_url} alt='book image' />
				) : (
					<img src={no_photo} alt='book image' />
				)}
				<div className={styles.desc}>
					<h1>{data?.title}</h1>
					<h4>{data?.author?.[0]?.name ?? ''}</h4>
					<p>{data?.description}</p>
					<div>
						{data?.genre?.map((item, index) => (
							<span key={item.slug} style={{ backgroundColor: colors[index] }}>
								{item.name}
							</span>
						)) ?? ''}
					</div>
				</div>
			</div>
			<div className={styles.audio}>
				<div className={styles.chapters}>
					<h4>Sóz bası</h4>
					<div className={styles.chapter_wrapper}>
						{data?.audios?.map((el, index) => (
							<button
								disabled={el.is_free}
								onClick={() => handleClickAudio(index)}
								key={index}
							>
								<div>{Romanize(index + 1)} bólim</div>
								{index === selectedAudioIndex && <img src={wave} alt='wave' />}
							</button>
						))}
					</div>
				</div>
				<AudioPlayer
					onPrev={handlePrevAudio}
					onNext={handleNextAudio}
					currentAudio={currentAudio}
				/>
			</div>
		</div>
	)
}

export { Audiobook }
