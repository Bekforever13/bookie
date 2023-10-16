import React from 'react'
import { useQuery } from 'react-query'
import { $host } from 'src/config/axios'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import styles from './RecentlyAddedBooks.module.scss'
import { IBookItem } from 'src/types/Types'
import { BookCard, Skeleton } from 'src/components/shared'
// import prev from 'src/assets/images/prevSlider.svg'
// import next from 'src/assets/images/nextSlider.svg'

import 'swiper/css'
import 'swiper/css/navigation'

async function getRecentlyAddedBooks() {
	const res = await $host.get('/latest-additions')
	return res.data.data
}

const RecentlyAddedBooks: React.FC = () => {
	const { data, isLoading } = useQuery({ queryFn: getRecentlyAddedBooks })

	return (
		<div className={styles.recently}>
			<h2>Sońǵı qosılǵanları</h2>
			<Swiper
				modules={[Navigation]}
				navigation
				// navigation={{
				// 	nextEl: '.swiper-button-next',
				// 	prevEl: '.swiper-button-prev',
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
				{/* <div className='swiper-button-next'>
					<img src={next} alt='chevron' />
				</div>
				<div className='swiper-button-prev'>
					<img src={prev} alt='chevron' />
				</div> */}
			</Swiper>
		</div>
	)
}

export { RecentlyAddedBooks }
