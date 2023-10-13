import React, { useState } from 'react'
import { message } from 'antd'
import feedback from 'src/assets/images/feedback.png'
import styles from './HomeFeedback.module.scss'
import { UiButton } from 'src/components/ui'
import { $host } from 'src/config/axios'
import { TFeedback } from 'src/types/Types'
import { UiRate } from 'src/components/ui'

const HomeFeedback: React.FC = () => {
	const [formData, setFormData] = useState<TFeedback>({
		name: '',
		description: '',
		rating: 5,
	})
	const { name, description, rating } = formData

	const handleClickBtn = async () => {
		try {
			await $host.post('/supports', formData)
			message.success('Pikirińiz ushın raxmet')
		} catch (error) {
			message.error('Maǵlıwmatlardı júklewde qátelik júz berdi')
		} finally {
			setFormData({ name: '', description: '', rating: 5 })
		}
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.feedback}>
				<h2>Pikir bildiriw</h2>
				<UiRate
					value={rating}
					onChange={e => setFormData({ ...formData, rating: e })}
				/>
				<input
					placeholder='Atıńız'
					value={name}
					onChange={e => setFormData({ ...formData, name: e.target.value })}
				/>
				<textarea
					placeholder='Pikiriniz'
					value={description}
					onChange={e =>
						setFormData({ ...formData, description: e.target.value })
					}
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
