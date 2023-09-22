import React from 'react'
import styles from './Payment.module.scss'
import prince from 'src/assets/images/prince.png'
import click from 'src/assets/images/Click.svg'
import payme from 'src/assets/images/Payme.svg'
import uzum from 'src/assets/images/Uzum.svg'
import arrow from 'src/assets/images/Chevron.svg'
import { StyledButton } from 'src/components/ui/button/StyledButtons'

const Payment: React.FC = () => {
	return (
		<div className={styles.payment}>
			<h1>Satıp alıw</h1>
			<div className={styles.wrapper}>
				<div className={styles.books}>
					<div className={styles.book}>
						<img src={prince} alt='img' />
						<div className={styles.text}>
							<div className={styles.name}>
								<h4>Kishkene Shaxzada</h4>
								<p>Antuan de Sent-Ekzyuperi</p>
							</div>
							<h2>12312 som</h2>
						</div>
					</div>
				</div>
				<div className={styles.box}>
					<div className={styles.items}>
						<div className={styles.item}>
							Kitap (1) <span>14900</span>
						</div>
					</div>
					<div className={styles.total}>
						Jámi <span>14900</span>
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
