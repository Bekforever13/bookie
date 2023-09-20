import React from 'react'
import { useQuery } from 'react-query'
import { $host } from 'src/config/axios'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Navigation } from 'swiper/modules'
import styles from './RecentlyAddedBooks.module.scss'
import { IBookItem } from 'src/assets/types/Types'
import { BookCard } from 'src/components/shared/BookCard/BookCard'
import { Skeleton } from 'src/components/shared/BookCard/Skeleton'

async function getRecentlyAddedBooks() {
	const res = await $host.get('/latest-additions')
	return res.data.data
}

const RecentlyAddedBooks: React.FC = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['recentlyAdded'],
		queryFn: getRecentlyAddedBooks,
	})

	return (
		<div className={styles.recently}>
			<h2>Sońǵı qosılǵanları</h2>
			<Swiper
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
								<BookCard {...item} />
							</SwiperSlide>
					  ))}
			</Swiper>
		</div>
	)
}

export { RecentlyAddedBooks }
