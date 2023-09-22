import React from 'react'
import { userStore } from 'src/store/userStore'
import styles from './Cart.module.scss'
import { StyledSubmitButton } from 'src/components/ui/button/StyledButtons'
import prince from 'src/assets/images/prince.png'
import { Checkbox, Popconfirm, message } from 'antd'
import { BsTrash } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const Cart: React.FC = () => {
	const navigate = useNavigate()
	const { cart, removeFromCart } = userStore()
	const [isAllSelected, setIsAllSelected] = React.useState(false)
	const [selectedBooks, setSelectedBooks] = React.useState<string[]>([])

	const handleRemove = (slug: string) => {
		removeFromCart(slug)
		message.error('Sebetten óshirildi')
	}

	const handleSelectAll = () => {
		if (isAllSelected) {
			setSelectedBooks([])
		} else {
			const allBookSlugs = cart.map(item => item.slug)
			setSelectedBooks(allBookSlugs)
		}
		setIsAllSelected(!isAllSelected)
	}

	const handleBookSelect = (slug: string) => {
		if (selectedBooks.includes(slug)) {
			setSelectedBooks(selectedBooks.filter(item => item !== slug))
		} else {
			setSelectedBooks([...selectedBooks, slug])
		}
		setIsAllSelected(false)
	}

	return (
		<div className={styles.cart}>
			<h1>Saylandılar</h1>
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
											<BsTrash />
											Oshiriw
										</p>
									</Popconfirm>
								</div>
							</div>
							<div>
								<Checkbox
									checked={selectedBooks.includes(item.slug)}
									onChange={() => handleBookSelect(item.slug)}
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
						<StyledSubmitButton
							onClick={() =>
								navigate('/payment', {
									state: selectedBooks,
								})
							}
						>
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
