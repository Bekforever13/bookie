import React from 'react'
import { IBookItem } from 'src/assets/types/Types'
import styles from './BookCard.module.scss'
import prince from 'src/assets/images/prince.png'
import heart0 from 'src/assets/images/heart0.svg'
// import heart1 from 'src/assets/images/heart1.svg'
import wave0 from 'src/assets/images/AudioWave.svg'
// import wave1 from 'src/assets/images/AudioWave2.svg'
import { ButtonWithGrayHover } from 'src/components/ui/button/StyledButtons'
import { useNavigate, useParams } from 'react-router-dom'

const BookCard: React.FC<IBookItem> = props => {
	const { categoryId } = useParams()
	const navigate = useNavigate()
	const { price, slug, title } = props

	const handleClickFavorite = (e: any) => {
		e.stopPropagation()
		console.log('stopped')
	}

	const handleClickBook = () => {
		navigate(`/book/${slug}`)
	}

	return (
		<div onClick={handleClickBook} className={styles.book_card}>
			<div className={styles.img}>
				<img src={prince} alt='image' />
			</div>
			<div className={styles.wrapper}>
				<div className={styles.title}>
					<div className={styles.text}>
						<h3>{title}</h3>
						<p>Antuan de Sent-Ekzyuperi</p>
					</div>
					<div onClick={handleClickFavorite} className={styles.favorite}>
						<img src={heart0} alt='favorite' />
						{/* <img src={heart1} alt='favorite' /> */}
					</div>
				</div>
				<div className={styles.waves}>
					{categoryId && <h4>{price} sum</h4>}
					<div>
						<img src={wave0} alt='wave' />
						<span>123</span>
						{/* <img src={wave1} alt='wave' /> */}
					</div>
					{!categoryId && (
						<ButtonWithGrayHover
							bg='var(--additional-color-4)'
							color='var(--typography-light)'
							onClick={() => navigate(`/book/${slug}`, { replace: true })}
						>
							Tıńlaw
						</ButtonWithGrayHover>
					)}
				</div>
			</div>
		</div>
	)
}

export { BookCard }
