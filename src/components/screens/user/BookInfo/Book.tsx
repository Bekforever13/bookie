import React from 'react'
import { useQuery } from 'react-query'
import { $host } from 'src/config/axios'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { IBookInfo } from 'src/types/Types'
import prince from 'src/assets/images/prince.png'
import { StyledButton } from 'src/components/ui'
import heart0 from 'src/assets/images/heart0.svg'
import heart1 from 'src/assets/images/heart1.svg'
import styles from './BookInfo.module.scss'
import { userStore } from 'src/store/userStore'
import { authStore } from 'src/store/authStore'
import { message } from 'antd'

const Book: React.FC = () => {
	const { slug } = useParams()
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const { auth } = authStore()
	const {
		favorites,
		cart,
		addToCart,
		addToFavorite,
		removeFromFavorite,
		addBooksToBuy,
	} = userStore()
	const { data } = useQuery<IBookInfo>({
		queryKey: ['book_info', pathname],
		queryFn: getBookInfo,
		staleTime: 5 * 60 * 1000,
		cacheTime: 60 * 60 * 1000,
	})
	const isFav = favorites.some(item => item.slug === data?.slug)
	const isCart = cart.some(item => item.slug === data?.slug)

	const handleClickFavorite = () => {
		data && addToFavorite(data)
		message.success('Saylandılarǵa qosıldı')
	}
	const handleRemoveFromFavorite = () => {
		data && removeFromFavorite(data.slug)
		message.error('Saylandılar bóliminen óshirildi.')
	}
	const handleClickCart = () => {
		data && addToCart(data)
		message.success('Sebetke qosıldı')
	}
	const handleClickNavigate = () => {
		navigate('/cart', { replace: true })
	}
	const handleClickBuy = () => {
		if (!auth) {
			message.warning(
				'Kitap satıp alıw ushın, dáslep, akkauntıńızǵa kiriwińiz kerek boladı',
				3
			)
		} else if (auth) {
			data && addBooksToBuy(data)
			navigate('/payment')
		}
	}

	async function getBookInfo() {
		const res = await $host.get(`/all-books/${slug}`)
		return res.data.data
	}

	console.log(data)

	return (
		<div className={styles.book}>
			<div className={styles.image}>
				<img
					src={data?.image[0] ? data?.image[0].image_url : prince}
					alt='book image'
				/>
			</div>
			<div className={styles.text}>
				<h1>{data?.title}</h1>
				<h4>{data?.author?.[0].name}</h4>
				<p>{data?.description}</p>
				<div className={styles.categories}>
					{data?.category.map(item => (
						<span key={item.slug}>{item.name}</span>
					))}
				</div>
				<h2>{data?.price} sum</h2>
				<div className={styles.btns}>
					<StyledButton
						border='1px solid #2D71AE'
						backgroundcolor='transparent'
						color='#2D71AE'
						onClick={handleClickBuy}
					>
						Satıp alıw
					</StyledButton>
					{auth &&
						(!isCart ? (
							<StyledButton
								onClick={handleClickCart}
								backgroundcolor='var(--additional-color-4)'
								color='var(--typography-light)'
							>
								Sebetke salıw
							</StyledButton>
						) : (
							<StyledButton
								onClick={handleClickNavigate}
								backgroundcolor='none'
								color='var(--additional-color-4)'
								border='1px solid var(--additional-color-4)'
							>
								Sebetke ótiw
							</StyledButton>
						))}
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
		</div>
	)
}

export { Book }
