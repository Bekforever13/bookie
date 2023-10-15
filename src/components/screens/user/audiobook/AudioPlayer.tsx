import React, { useEffect, useRef, useState } from 'react'
import styles from './Audiobook.module.scss'
import prev from 'src/assets/images/prevaudio.svg'
import play from 'src/assets/images/playaudio.svg'
import next from 'src/assets/images/nextaudio.svg'
import { Slider } from 'antd'
import { HiPause } from 'react-icons/hi'
import comment from 'src/assets/images/comment.svg'
import { useNavigate, useParams } from 'react-router-dom'

interface AudioPlayerProps {
	currentAudio: string
	onPrev: () => void
	onNext: () => void
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
	currentAudio,
	onNext,
	onPrev,
}) => {
	const navigate = useNavigate()
	const params = useParams()
	const [isPlaying, setIsPlaying] = useState<boolean>(false)
	const [currentTime, setCurrentTime] = useState<number>(0)
	const [volume, setVolume] = useState<number>(50)
	const audio = useRef<HTMLAudioElement>(null)

	const playAudio = () => {
		if (audio.current && currentAudio) {
			audio.current.play()
			setIsPlaying(true)
		}
	}

	const pauseAudio = () => {
		if (audio.current) {
			audio.current.pause()
			setIsPlaying(false)
		}
	}

	const nextAudio = () => onNext

	const prevAudio = () => onPrev

	const handleClickComment = () => navigate(`/book/${params.slug}`)

	const handleTimelineChange = (value: number) => {
		if (audio.current) {
			audio.current.currentTime = value
		}
	}
	const handleVolumeChange = (value: number) => {
		setVolume(value)
		if (audio.current) {
			audio.current.volume = value / 100
		}
	}

	const formatTime = (time: number): string => {
		const minutes = Math.floor(time / 60)
		const seconds = Math.floor(time % 60)
		return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
	}

	useEffect(() => {
		setIsPlaying(false)
		setCurrentTime(0)
		if (audio.current) {
			audio.current.pause()
			audio.current.currentTime = 0
		}
	}, [currentAudio])

	return (
		<div className={styles.player}>
			<div className={styles.controls}>
				<div className={styles.play}>
					<img onClick={handleClickComment} src={comment} alt='prev' />
					<img onClick={prevAudio} src={prev} alt='prev' />
					{isPlaying ? (
						<HiPause onClick={pauseAudio} />
					) : (
						<img onClick={playAudio} src={play} alt='play' />
					)}
					<img onClick={nextAudio} src={next} alt='next' />
				</div>
				<div className={styles.times}>
					<div className={styles.time}>
						<div>{formatTime(currentTime)}</div>
						<div>{formatTime(audio.current?.duration || 0)}</div>
					</div>
					<div className={styles.timeline}>
						<Slider
							tooltip={{ open: false }}
							value={currentTime}
							onChange={handleTimelineChange}
							max={audio.current?.duration}
						/>
					</div>
				</div>
			</div>
			<div className={styles.volume}>
				<Slider vertical value={volume} onChange={handleVolumeChange} />
			</div>
			<audio
				ref={audio}
				src={currentAudio}
				onTimeUpdate={() => setCurrentTime(audio.current?.currentTime || 0)}
				onEnded={pauseAudio}
			/>
		</div>
	)
}

export { AudioPlayer }
