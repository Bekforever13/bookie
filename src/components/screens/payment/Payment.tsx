import React, { useEffect, useState } from 'react'
import styles from './Payment.module.scss'
import prince from 'src/assets/images/prince.png'
import click from 'src/assets/images/Click.svg'
import payme from 'src/assets/images/Payme.svg'
import uzum from 'src/assets/images/Uzum.svg'
import arrow from 'src/assets/images/Chevron.svg'
import { StyledButton } from 'src/components/ui/button/StyledButtons'
import { userStore } from 'src/store/userStore'
import { BsTrash } from 'react-icons/bs'
import { Popconfirm } from 'antd'

const Payment: React.FC = () => {
	const [totalSum, setTotalSum] = useState(0)
	const { booksToBuy, removeFromBooksToBuy } = userStore()

	const handlePaymentClick = () => {
		// Обработка события для кнопки click
	}

	const handlePaymentPayme = () => {
		// Обработка события для кнопки payme
	}

	const handlePaymentUzum = () => {
		// Обработка события для кнопки uzum
	}

	const handleClickRemove = (slug: string) => {
		removeFromBooksToBuy(slug)
	}

	useEffect(() => {
		setTotalSum(booksToBuy.reduce((acc, b) => acc + b.price, 0))
	}, [booksToBuy])

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
									<p>{item.author?.[0]?.name}</p>
								</div>
								<h2>
									{item.price} som
									<Popconfirm
										onConfirm={() => handleClickRemove(item.slug)}
										title='Kitapti oshirip taslaymizba?'
									>
										<span>
											<BsTrash />
										</span>
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
						<button onClick={handlePaymentClick}>
							<img src={click} alt='image' />
						</button>

						<button onClick={handlePaymentPayme}>
							<img src={payme} alt='image' />
						</button>

						<button onClick={handlePaymentUzum}>
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
