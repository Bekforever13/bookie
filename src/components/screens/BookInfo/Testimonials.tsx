import React from 'react'
import styles from './BookInfo.module.scss'
import { useQuery } from 'react-query'
import { IBookInfo } from 'src/assets/types/Types'
import { $host } from 'src/config/axios'
import { useParams } from 'react-router-dom'
import avatar from 'src/assets/images/avatar.svg'
import { Rate } from 'antd'

const Testimonials: React.FC = () => {
	const params = useParams()
	const { data } = useQuery<IBookInfo>({
		queryKey: ['book_info'],
		queryFn: getBookInfo,
	})

	async function getBookInfo() {
		const res = await $host.get(`/all-books/${params.slug}`)
		return res.data.data
	}
	return (
		<>
			{data && (
				<div className={styles.testimonials}>
					<h1>Paydalanıwshılar pikiri</h1>
					<div className={styles.wrapper}>
						{data?.reviews?.map(item => (
							<div key={item.user_id} className={styles.user_testimonial}>
								<div className={styles.avatar}>
									<img src={avatar} alt='user_avatar' />
								</div>
								<div className={styles.text}>
									<div className={styles.name}>
										<h4>Charlie</h4>
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
		</>
	)
}

export { Testimonials }
