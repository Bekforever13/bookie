import React, { useState } from 'react'
import styles from './Audiobook.module.scss'
import wave from 'src/assets/images/wave.svg'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { $host } from 'src/config/axios'
import { useQuery } from 'react-query'
import { IBookInfo } from 'src/types/Types'
import { AudioPlayer } from './AudioPlayer'
import { Romanize } from 'src/services/Romanize'
import no_photo from 'src/assets/images/no_photo.jpg'
import lock from 'src/assets/images/lock.svg'
import unlock from 'src/assets/images/unlock.svg'
import { Popover } from 'antd'
import { authStore } from 'src/store/authStore'
import { userStore } from 'src/store/userStore'

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
	const navigate = useNavigate()
	const [currentAudio, setCurrentAudio] = useState('')
	const { slug } = useParams()
	const { auth } = authStore()
	const { addBooksToBuy, clearBooksToBuy } = userStore()
	const [selectedAudioIndex, setSelectedAudioIndex] = useState(-1)
	const { pathname } = useLocation()
	const { data } = useQuery<IBookInfo>({
		queryKey: [pathname],
		queryFn: getBookInfo,
		staleTime: 5 * 60 * 1000,
		cacheTime: 60 * 60 * 1000,
	})

	const handleUnlockBtn = () => {
		if (auth) {
			clearBooksToBuy()
			data && addBooksToBuy(data)
			navigate('/payment')
		} else {
			navigate('/login')
		}
	}

	const content = (
		<div className={styles.content}>
			<div>Qalǵan bólimlerdi esitiw ushın, kitaptı satıp alıń.</div>
			<button onClick={handleUnlockBtn}>
				<img src={unlock} alt='unlock' /> Satıp alıw
			</button>
		</div>
	)

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
		const { data } = await $host.get(`/show-book/${slug}`)
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
					<div className={styles.genres}>
						{data?.genre?.map((item, index) => (
							<span key={item.slug} style={{ backgroundColor: colors[index] }}>
								{item.name}
							</span>
						)) ?? ''}
					</div>
					<div className={styles.narrator}>
						Oqıǵan: <span>{data?.narrator[0].name}</span>
					</div>
				</div>
			</div>
			<div className={styles.audio}>
				<div className={styles.chapters}>
					<h4>Sóz bası</h4>
					<div className={styles.chapter_wrapper}>
						{data?.audios?.map((el, index) => {
							return el.audio_url && el.audio_url.includes('http') ? (
								<button onClick={() => handleClickAudio(index)} key={index}>
									<div>{Romanize(index + 1)} bólim</div>
									{index === selectedAudioIndex && (
										<img src={wave} alt='wave' />
									)}
								</button>
							) : (
								<Popover content={content}>
									<button disabled key={index}>
										{Romanize(index + 1)} bólim
										<img className={styles.lock} src={lock} alt='lock' />
									</button>
								</Popover>
							)
						})}
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
