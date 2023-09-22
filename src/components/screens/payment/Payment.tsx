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
import { IBookItem, IBookInfo } from 'src/assets/types/Types'
import { $host } from 'src/config/axios'

const Payment: React.FC = () => {
	const location = useLocation()
	const [books, setBooks] = useState<IBookItem[]>([])
	const [totalSum, setTotalSum] = useState(0)
	const selectedBooks = Array.isArray(location.state)
		? location.state
		: [location.state]
	const { data, error } = useQuery<IBookItem[]>({
		queryFn: getAllBooks,
	})

	const handleClick = () => {
		// Обработка события для кнопки click
	}

	const handlePayme = () => {
		// Обработка события для кнопки payme
	}

	const handleUzum = () => {
		// Обработка события для кнопки uzum
	}

	async function getAllBooks() {
		try {
			const response = await $host.get('/all-books')
			return response.data.data
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		if (data && selectedBooks && selectedBooks.length > 0) {
			const newBooksArray: IBookItem[] = []
			selectedBooks.map((item: string | IBookInfo) => {
				const slug = typeof item === 'string' ? item : item?.slug
				if (slug) {
					data.filter((book: IBookItem) => {
						if (book.slug === slug) {
							newBooksArray.push(book)
						}
					})
				}
			})
			setBooks(prev => prev.concat(newBooksArray))
			window.history.replaceState({}, document.title)
		}
	}, [])

	useEffect(() => {
		setTotalSum(books.reduce((acc, b) => acc + b.price, 0))
	}, [books])

	if (error) {
		return <div>Error</div>
	}
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
						<button onClick={handleClick}>
							<img src={click} alt='image' />
						</button>

						<button onClick={handlePayme}>
							<img src={payme} alt='image' />
						</button>

						<button onClick={handleUzum}>
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
