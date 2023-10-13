import React, { useEffect, useState } from 'react'
import { StyledButton } from 'src/components/ui'
import { userStore } from 'src/store/userStore'
import { Popconfirm, message } from 'antd'
import styles from './Payment.module.scss'
import click from 'src/assets/images/Click.svg'
import payme from 'src/assets/images/Payme.svg'
import uzum from 'src/assets/images/Uzum.svg'
import arrow from 'src/assets/images/Chevron.svg'
import trash from 'src/assets/images/trash0.svg'
import prince from 'src/assets/images/prince.png'
import { formatPrice } from 'src/services/services'
import { $host } from 'src/config/axios'

const Payment: React.FC = () => {
	const [totalSum, setTotalSum] = useState(0)
	const [selectedPayment, setSelectedPayment] = useState('')
	const { booksToBuy, removeFromBooksToBuy } = userStore()
	const [books, setBooks] = useState<number[]>([])
	const [paymentId, setPaymentId] = useState<number | undefined>()

	const handlePaymentClick = () => {
		setSelectedPayment('click')
		setPaymentId(1)
	}

	const handlePaymentPayme = () => {
		setSelectedPayment('payme')
		setPaymentId(2)
	}

	const handlePaymentUzum = () => {
		setSelectedPayment('uzum')
		setPaymentId(3)
	}

	const handleClickRemove = (slug: string) => removeFromBooksToBuy(slug)

	const handleClickBuy = () => {
		$host
			.post('/orders', { books: books, payment_id: paymentId })
			.then(() => message.success('Buyırtpańız qabıl etildi'))
	}

	useEffect(() => {
		booksToBuy.map(item => {
			if (item.id !== undefined) {
				setBooks(prev => [...prev, item.id])
			}
		})
		setTotalSum(booksToBuy.reduce((acc, b) => acc + b.price, 0))
	}, [])

	return (
		<div className={styles.payment}>
			<h1>Satıp alıw</h1>
			<div className={styles.wrapper}>
				<div className={styles.books}>
					{booksToBuy.map(item => (
						<div key={item.slug} className={styles.book}>
							<img
								src={(item.image[0] && item.image[0]?.image_url) || prince}
								alt='img'
							/>
							<div className={styles.text}>
								<div className={styles.name}>
									<h4>{item.title}</h4>
									<p>{item.author?.[0]?.name ?? ''}</p>
								</div>
								<h2>
									{formatPrice(item?.price)} som
									<Popconfirm
										onConfirm={() => handleClickRemove(item.slug)}
										title='Kitapti oshirip taslaymizba?'
										okText='Awa'
										cancelText='Yaq'
									>
										<img src={trash} alt='trash' />
									</Popconfirm>
								</h2>
							</div>
						</div>
					))}
				</div>
				<div className={styles.box}>
					<div className={styles.items}>
						<div className={styles.item}>
							Kitap ({booksToBuy.length}) <span>{totalSum} som</span>
						</div>
					</div>
					<div className={styles.total}>
						Jámi <span>{totalSum} som</span>
					</div>
					<div className={styles.btns}>
						<button
							className={selectedPayment === 'click' ? styles.active : ''}
							disabled
							type='button'
							onClick={handlePaymentClick}
						>
							<img src={click} alt='image' />
						</button>

						<button
							className={selectedPayment === 'payme' ? styles.active : ''}
							type='button'
							onClick={handlePaymentPayme}
						>
							<img src={payme} alt='image' />
						</button>

						<button
							className={selectedPayment === 'uzum' ? styles.active : ''}
							disabled
							type='button'
							onClick={handlePaymentUzum}
						>
							<img src={uzum} alt='image' />
						</button>
					</div>
					<div className={styles.submit}>
						<StyledButton
							color='var(--typography-light)'
							backgroundcolor='var(--brand-color-5)'
							onClick={handleClickBuy}
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
