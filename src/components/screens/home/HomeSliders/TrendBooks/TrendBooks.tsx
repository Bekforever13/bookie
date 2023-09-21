import Cookies from 'js-cookie'
import React from 'react'
import { useQuery } from 'react-query'
import { $host } from 'src/config/axios'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Navigation } from 'swiper/modules'
import styles from './TrendBooks.module.scss'
import { IBookItem } from 'src/assets/types/Types'
import { BookCard } from 'src/components/shared/BookCard/BookCard'
import { Skeleton } from 'src/components/shared/BookCard/Skeleton'

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
	})

	return (
		<div className={styles.recently}>
			<h2>Trendtegi kitaplar</h2>
			<Swiper
				loopPreventsSliding
				modules={[Navigation]}
				navigation
				spaceBetween={30}
				breakpoints={{
					1: {
						slidesPerView: 1,
					},
					750: {
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
			</Swiper>
		</div>
	)
}

export { TrendBooks }
