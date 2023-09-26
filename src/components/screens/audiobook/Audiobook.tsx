import React, { useEffect, useState } from 'react'
import styles from './Audiobook.module.scss'
import prince from 'src/assets/images/prince.png'
import wave from 'src/assets/images/wave.svg'
import { useParams } from 'react-router-dom'
import { $host } from 'src/config/axios'
import { useQuery } from 'react-query'
import { IBookInfo } from 'src/types/Types'
import { AudioPlayer } from './AudioPlayer'
import { Romanize } from './Romanize'

const Audiobook: React.FC = () => {
	const [currentAudio, setCurrentAudio] = useState('')
	const { slug } = useParams()
	const [selectedAudioIndex, setSelectedAudioIndex] = useState(0)
	const { data } = useQuery<IBookInfo>({
		queryKey: ['book_info'],
		queryFn: getBookInfo,
	})

	const handleClickAudio = (index: number) => {
		setSelectedAudioIndex(index)
		data && setCurrentAudio(data.audios[index]?.audio_url)
	}
	const handlePrevAudio = () => {
		setSelectedAudioIndex(prevIndex => prevIndex - 1)
		setCurrentAudio('')
		data && setCurrentAudio(data.audios[selectedAudioIndex - 1]?.audio_url)
	}

	const handleNextAudio = () => {
		setSelectedAudioIndex(prevIndex => prevIndex + 1)
		setCurrentAudio('')
		data && setCurrentAudio(data.audios[selectedAudioIndex + 1]?.audio_url)
	}

	async function getBookInfo() {
		const res = await $host.get(`/all-books/${slug}`)
		return res.data.data
	}

	useEffect(() => {
		if (data) {
			setCurrentAudio(data.audios[0]?.audio_url)
		}
	}, [data])

	return (
		<div className={styles.book}>
			<div className={styles.text}>
				<img
					src={data?.image[0] ? data?.image[0].image_url : prince}
					alt='book image'
				/>
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
						{data?.audios.map((_, index) => (
							<li onClick={() => handleClickAudio(index)} key={index}>
								<div>{Romanize(index + 1)} bólim</div>
								{index === selectedAudioIndex && <img src={wave} alt='wave' />}
							</li>
						))}
					</ul>
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
