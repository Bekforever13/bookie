import React from 'react'
import { userStore } from 'src/store/userStore'
import styles from './Cart.module.scss'
import { StyledSubmitButton } from 'src/components/ui/button/StyledButtons'
import prince from 'src/assets/images/prince.png'
import { Checkbox, Popconfirm } from 'antd'
import { BsTrash } from 'react-icons/bs'

const Cart: React.FC = () => {
	const { cart } = userStore()
	console.log(cart)
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
									<p>Antuan de Sent-Ekzyuperi</p>
								</div>
								<div className={styles.price}>
									<h2>{item.price} som</h2>
									<Popconfirm title='Delete the book?'>
										<p>
											<BsTrash />
											Oshiriw
										</p>
									</Popconfirm>
								</div>
							</div>
							<div>
								<Checkbox />
							</div>
						</div>
					))}
				</div>
				<div className={styles.box}>
					<p>
						Dawam ettiriw ushın, satıp almaqshı bolǵan kitaplarıńızdı belgileń
					</p>
					<StyledSubmitButton>Bárshesin belgilew</StyledSubmitButton>
				</div>
			</div>
		</div>
	)
}

export { Cart }
