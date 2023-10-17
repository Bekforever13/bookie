import React from 'react'
import styles from './BookInfo.module.scss'
import { useQuery } from 'react-query'
import { IBookInfo } from 'src/types/Types'
import { $host } from 'src/config/axios'
import { useLocation, useParams } from 'react-router-dom'
import avatar from 'src/assets/images/user.png'
import { Rate, Spin } from 'antd'

const Testimonials: React.FC = () => {
	const params = useParams()
	const { pathname } = useLocation()
	const { data, isFetching } = useQuery<IBookInfo>({
		queryKey: ['book-info', pathname],
		queryFn: getBookInfo,
		staleTime: 5 * 60 * 1000,
		cacheTime: 60 * 60 * 1000,
	})

	async function getBookInfo() {
		const res = await $host.get(`/all-books/${params.slug}`)
		return res.data.data
	}
	return (
		<Spin spinning={isFetching}>
			{data && (
				<div className={styles.testimonials}>
					<h1>Paydalanıwshılar pikiri</h1>
					<div className={styles.wrapper}>
						{data?.reviews?.map((item, i) => (
							<div key={i} className={styles.user_testimonial}>
								<img className={styles.avatar} src={avatar} alt='user_avatar' />
								<div className={styles.text}>
									<div className={styles.name}>
										<h4>{item.name}</h4>
										<Rate disabled value={item.rating} />
									</div>
									<p>{item.text}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
			{!data?.reviews?.length && (
				<h1 className={styles.empty}>Házirshe hesh kim pikir qaldırmadi</h1>
			)}
		</Spin>
	)
}

export { Testimonials }
