import React from 'react'
import { userStore } from 'src/store/userStore'
import styles from './Cart.module.scss'
import { StyledSubmitButton } from 'src/components/ui'
import prince from 'src/assets/images/prince.png'
import { Checkbox, Popconfirm, message } from 'antd'
import trash from 'src/assets/images/trash0.svg'
import { useNavigate } from 'react-router-dom'
import { IBookItem } from 'src/types/Types'

const Cart: React.FC = () => {
	const navigate = useNavigate()
	const { cart, removeFromCart, addBooksToBuy } = userStore()
	const [isAllSelected, setIsAllSelected] = React.useState(false)
	const [selectedBooks, setSelectedBooks] = React.useState<IBookItem[]>([])

	const handleRemove = (slug: string) => {
		removeFromCart(slug)
		message.error('Sebetten óshirildi')
	}

	const handleSelectAll = () => {
		if (isAllSelected) {
			setSelectedBooks([])
		} else {
			setSelectedBooks(cart)
		}
		setIsAllSelected(!isAllSelected)
	}

	const handleBookSelect = (book: IBookItem) => {
		if (selectedBooks.includes(book)) {
			setSelectedBooks(selectedBooks.filter(item => item !== book))
		} else {
			setSelectedBooks([...selectedBooks, book])
		}
		setIsAllSelected(false)
	}

	const handleClickBuy = () => {
		selectedBooks.forEach(book => {
			addBooksToBuy(book)
		})
		navigate('/payment')
	}

	return (
		<div className={styles.cart}>
			<h1>Sebet</h1>
			<div className={styles.wrapper}>
				<div className={styles.books}>
					{cart?.map(item => (
						<div key={item.slug} className={styles.book}>
							<img src={prince} alt='img' />
							<div className={styles.text}>
								<div className={styles.name}>
									<h4>{item.title}</h4>
									<p>{item.author?.[0].name}</p>
								</div>
								<div className={styles.price}>
									<h2>{item.price} som</h2>
									<Popconfirm
										onConfirm={() => handleRemove(item.slug)}
										title='Delete the book?'
									>
										<p>
											<img src={trash} alt='trash' />
											Oshiriw
										</p>
									</Popconfirm>
								</div>
							</div>
							<div>
								<Checkbox
									checked={selectedBooks.includes(item)}
									onChange={() => handleBookSelect(item)}
								/>
							</div>
						</div>
					))}
				</div>
				<div className={styles.box}>
					<p>
						Dawam ettiriw ushın, satıp almaqshı bolǵan kitaplarıńızdı belgileń
					</p>
					{selectedBooks.length > 0 ? (
						<StyledSubmitButton onClick={handleClickBuy}>
							Satıp alıw
						</StyledSubmitButton>
					) : (
						<StyledSubmitButton onClick={handleSelectAll}>
							Bárshesin belgilew
						</StyledSubmitButton>
					)}
				</div>
			</div>
		</div>
	)
}

export { Cart }
