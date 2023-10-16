import Cookies from 'js-cookie'
import React from 'react'
import { useQuery } from 'react-query'
import { $host } from 'src/config/axios'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import styles from './TrendBooks.module.scss'
import { IBookItem } from 'src/types/Types'
import { BookCard } from 'src/components/shared/BookCard/BookCard'
import { Skeleton } from 'src/components/shared/BookCard/Skeleton'
// import prev from 'src/assets/images/prevSlider.svg'
// import next from 'src/assets/images/nextSlider.svg'

import 'swiper/css'
import 'swiper/css/navigation'

async function getTrendAddedBooks() {
	const token = Cookies.get('token')
	const res = await $host.get('/most-viewed', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return res.data.data
}

const TrendBooks: React.FC = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['TrendBooks'],
		queryFn: getTrendAddedBooks,
		staleTime: 5 * 60 * 1000,
		cacheTime: 60 * 60 * 1000,
	})

	return (
		<div className={styles.recently}>
			<h2>Trendtegi kitaplar</h2>
			<Swiper
				loopPreventsSliding
				modules={[Navigation]}
				navigation
				// navigation={{
				// 	nextEl: '.swiper-button-next-custom',
				// 	prevEl: '.swiper-button-prev-custom',
				// }}
				spaceBetween={30}
				breakpoints={{
					1: {
						slidesPerView: 1,
						centeredSlides: true,
					},
					600: {
						slidesPerView: 2,
					},
					1050: {
						slidesPerView: 3,
					},
					1350: {
						slidesPerView: 4,
					},
					1600: {
						slidesPerView: 5,
					},
				}}
			>
				{isLoading
					? [...Array(4)].map((_, i) => (
							<SwiperSlide key={i}>
								<Skeleton key={i} />
							</SwiperSlide>
					))
					: data?.map((item: IBookItem) => (
							<SwiperSlide key={item.slug}>
								<BookCard key={item.slug} {...item} />
							</SwiperSlide>
					))}
				{/* <div className='swiper-button-next-custom'>
					<img src={next} alt='chevron' />
				</div>
				<div className='swiper-button-prev-custom'>
					<img src={prev} alt='chevron' />
				</div> */}
			</Swiper>
		</div>
	)
}

export { TrendBooks }
