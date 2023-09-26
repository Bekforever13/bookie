import { Rate } from 'antd'
import React, { useEffect, useState } from 'react'
import feedback from 'src/assets/images/feedback.png'
import styles from './HomeFeedback.module.scss'
import { UiButton } from 'src/components/ui/button/UiButton'
import { $host } from 'src/config/axios'
import { TFeedback } from 'src/types/Types'

const HomeFeedback: React.FC = () => {
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [rating, setRating] = useState(5)
	const [data, setData] = useState<TFeedback>()

	useEffect(() => {
		setData({ name, description, rating })
	}, [name, description, rating])

	const handleClickBtn = () => {
		$host.post('/supports', data).then(() => {
			setName('')
			setDescription('')
			setRating(5)
		})
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.feedback}>
				<h2>Pikir bildiriw</h2>
				<Rate value={rating} onChange={e => setRating(e)} />
				<input
					placeholder='Atıńız'
					value={name}
					onChange={e => setName(e.target.value)}
				/>
				<textarea
					placeholder='Pikiriniz'
					value={description}
					onChange={e => setDescription(e.target.value)}
				/>
				<UiButton onClick={handleClickBtn}>Jollaw</UiButton>
			</div>
			<div className={styles.img}>
				<img src={feedback} alt='feedback' />
			</div>
		</div>
	)
}

export { HomeFeedback }
