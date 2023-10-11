import React from 'react'
import { IBookItem } from 'src/types/Types'
import styles from './BookCard.module.scss'
import prince from 'src/assets/images/prince.png'
import heart0 from 'src/assets/images/heart0.svg'
import heart1 from 'src/assets/images/heart1.svg'
import wave0 from 'src/assets/images/AudioWave.svg'
import { StyledButton } from 'src/components/ui'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { userStore } from 'src/store/userStore'
import play from 'src/assets/images/play.svg'

const BookCard: React.FC<IBookItem> = props => {
	const { categoryId } = useParams()
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const { price, slug, title, author, image } = props
	const { addToFavorite, favorites, removeFromFavorite } = userStore()
	const isFav = favorites.some(item => item.slug === slug)

	const buttonFilter =
		!categoryId && pathname !== '/my_books' && pathname !== '/favorites'
	const audioFilter = pathname === '/my_books'
	const priceFilter = categoryId || pathname === '/favorites'

	const handleClickFavorite = (e: any) => {
		e.stopPropagation()
		addToFavorite(props)
	}
	const handleRemoveFromFavorite = (e: any) => {
		e.stopPropagation()
		removeFromFavorite(slug)
	}

	const handleClickBook = () => {
		if (pathname !== '/my_books') {
			navigate(`/book/${slug}`)
		} else {
			navigate(`/audiobook/${slug}`)
		}
	}

	return (
		<div onClick={handleClickBook} className={styles.book_card}>
			<div className={styles.img}>
				<img src={image[0] ? image[0].image_url : prince} alt='image' />
			</div>
			<div className={styles.wrapper}>
				<div className={styles.title}>
					<div className={styles.text}>
						<h3>{title}</h3>
						<p>{author && author[0].name}</p>
					</div>
					<div className={styles.favorite}>
						{isFav ? (
							<img
								onClick={handleRemoveFromFavorite}
								src={heart1}
								alt='favorite'
							/>
						) : (
							<img onClick={handleClickFavorite} src={heart0} alt='favorite' />
						)}
					</div>
				</div>
				<div className={styles.waves}>
					{audioFilter && (
						<Link key={slug} to={`/audiobook/${slug}`}>
							<img className={styles.play} src={play} alt='play icon' />
						</Link>
					)}
					{priceFilter && (
						<h4>{price.toLocaleString('ru-RU', { useGrouping: true })} som</h4>
					)}
					<div>
						<img src={wave0} alt='wave' />
						<span>123</span>
					</div>
					{buttonFilter && (
						<StyledButton
							backgroundcolor='var(--additional-color-4)'
							color='var(--typography-light)'
							onClick={() => navigate(`/audiobook/${slug}`, { replace: true })}
						>
							Tıńlaw
						</StyledButton>
					)}
				</div>
			</div>
		</div>
	)
}

export { BookCard }
