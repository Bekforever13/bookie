import React from 'react'
import { useQuery } from 'react-query'
import { $host } from 'src/config/axios'
import { useParams } from 'react-router-dom'
import { IBookInfo } from 'src/assets/types/Types'
import prince from 'src/assets/images/prince.png'
import { StyledButton } from 'src/components/ui/button/StyledButtons'
import heart0 from 'src/assets/images/heart0.svg'
// import heart1 from 'src/assets/images/heart1.svg'
import styles from './BookInfo.module.scss'

const Book: React.FC = () => {
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
		<div className={styles.book}>
			<div className={styles.image}>
				<img src={prince} alt='book image' />
			</div>
			<div className={styles.text}>
				<h1>{data?.title}</h1>
				<h4>{data?.author[0].name}</h4>
				<p>{data?.description}</p>
				<div className={styles.categories}>
					{data?.category.map(item => (
						<span key={item.id}>{item.name}</span>
					))}
				</div>
				<h2>{data?.price} sum</h2>
				<div className={styles.btns}>
					<StyledButton
						border='1px solid #2D71AE'
						bg='transparent'
						color='#2D71AE'
					>
						Satıp alıw
					</StyledButton>
					<StyledButton
						bg='var(--additional-color-4)'
						color='var(--typography-light)'
					>
						Sebetke salıw
					</StyledButton>
					<img src={heart0} alt='favorite' />
					{/* <img src={heart1} alt="favorite" /> */}
				</div>
			</div>
		</div>
	)
}

export { Book }
