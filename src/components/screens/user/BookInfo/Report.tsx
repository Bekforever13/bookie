import React, { useEffect, useRef, useState } from 'react'
import styles from './BookInfo.module.scss'
import avatar from 'src/assets/images/user.png'
import { Rate, message } from 'antd'
import { StyledButton } from 'src/components/ui'
import { $host } from 'src/config/axios'
import { useParams } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { authStore } from 'src/store/authStore'
import { TReview } from 'src/types/Types'
import TextArea from 'antd/es/input/TextArea'

const Report: React.FC = () => {
	const { slug } = useParams()
	const [text, setText] = useState('')
	const [rating, setRating] = useState(4)
	const [data, setData] = useState<TReview>()
	const { auth } = authStore()
	const queryClient = useQueryClient()
	const textAreaRef = useRef<HTMLTextAreaElement>(null)

	useEffect(() => {
		if (slug) setData(prevState => ({ ...prevState, text, rating, slug }))
	}, [slug, text, rating])

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const val = event.target?.value
		setText(val)
	}

	const handleClickReport = () => {
		$host.post('/reviews', data).then(() => {
			message.success('Pikir bildirildi.')
			queryClient.invalidateQueries('book-info')
			setText('')
		})
	}

	return (
		<div className={styles.report}>
			{auth ? (
				<>
					<div className={styles.head}>
						<h2>Pikir qaldırıw</h2>
						<Rate onChange={e => setRating(e)} value={rating} />
					</div>
					<div className={styles.text}>
						<img src={avatar} alt='user avatar' />
						<TextArea
							placeholder={"Pikir qaldırin'..."}
							onChange={handleChange}
							ref={textAreaRef}
							rows={1}
							value={text}
							autoSize
						/>
						<StyledButton
							onClick={handleClickReport}
							backgroundcolor='var(--brand-color-1)'
							color='#fff'
						>
							Sholıw
						</StyledButton>
					</div>
				</>
			) : (
				<h2 className={styles.notlogged}>
					Pikir qaldırıw ushın, dáslep, akkauntıńızǵa kiriwińiz kerek boladı
				</h2>
			)}
		</div>
	)
}

export { Report }
