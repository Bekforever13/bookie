import React, { useEffect, useState } from 'react'
import styles from './Payment.module.scss'
import prince from 'src/assets/images/prince.png'
import click from 'src/assets/images/Click.svg'
import payme from 'src/assets/images/Payme.svg'
import uzum from 'src/assets/images/Uzum.svg'
import arrow from 'src/assets/images/Chevron.svg'
import { StyledButton } from 'src/components/ui/button/StyledButtons'
import { useLocation } from 'react-router-dom'
import { useQuery } from 'react-query'
import { IBookItem } from 'src/assets/types/Types'
import { $host } from 'src/config/axios'
import { IBookInfo } from 'src/assets/types/Types'

const Payment: React.FC = () => {
	const location = useLocation()
	const [books, setBooks] = useState<IBookItem[]>([])
	const [totalSum, setTotalSum] = useState(0)
	const selectedBooks = Array.isArray(location.state)
		? location.state
		: [location.state]
	const { data } = useQuery<IBookItem[]>({
		queryFn: getAllBooks,
	})

	async function getAllBooks() {
		const res = await $host.get('/all-books')
		return res.data.data
	}

	useEffect(() => {
		if (data && selectedBooks && selectedBooks.length > 0) {
			const temp: IBookItem[] = []
			selectedBooks.forEach((item: string | IBookInfo) => {
				const slug = typeof item === 'string' ? item : item?.slug
				if (slug) {
					data.forEach((book: IBookItem) => {
						if (book.slug === slug) {
							temp.push(book)
						}
					})
				}
			})
			setBooks(prev => prev.concat(temp))
			window.history.replaceState({}, document.title)
		}
	}, [])

	useEffect(() => {
		setTotalSum(books.reduce((acc, b) => acc + b.price, 0))
	}, [books])

	return (
		<div className={styles.payment}>
			<h1>Satıp alıw</h1>
			<div className={styles.wrapper}>
				<div className={styles.books}>
					{books.map(item => (
						<div key={item.slug} className={styles.book}>
							<img
								src={(item.image[0] && item.image[0]?.image_url) || prince}
								alt='img'
							/>
							<div className={styles.text}>
								<div className={styles.name}>
									<h4>{item.title}</h4>
									<p>{item.author?.[0]?.name}</p>
								</div>
								<h2>{item.price} som</h2>
							</div>
						</div>
					))}
				</div>
				<div className={styles.box}>
					<div className={styles.items}>
						<div className={styles.item}>
							Kitap ({books.length}) <span>{totalSum} som</span>
						</div>
					</div>
					<div className={styles.total}>
						Jámi <span>{totalSum} som</span>
					</div>
					<div className={styles.btns}>
						<button>
							<img src={click} alt='image' />
						</button>
						<button>
							<img src={payme} alt='image' />
						</button>
						<button>
							<img src={uzum} alt='image' />
						</button>
					</div>
					<div className={styles.submit}>
						<StyledButton
							color='var(--typography-light)'
							backgroundcolor='var(--brand-color-5)'
						>
							Tólew <img src={arrow} alt='arrow' />
						</StyledButton>
					</div>
				</div>
			</div>
		</div>
	)
}

export { Payment }
