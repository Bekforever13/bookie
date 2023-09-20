import React from 'react'
import { ButtonWithGrayHover } from 'src/components/ui/button/StyledButtons'
import styles from './HomeHead.module.scss'
import girl from 'src/assets/images/girl.jpg'

const HomeHead: React.FC = () => {
	return (
		<div className={styles.head}>
			<div className={styles.text}>
				<h1>«Bookie» — audiokitaplar platformasına xosh keldiń, oqıwshı!</h1>
				<p>
					Bul platformada qaraqalpaq tilinde basıp shıǵarılǵan jáhán, ózbek hám
					qaraqalpaq ádebiyatınıń dúrdana shıǵarmaları jáne qaraqalpaq awızeki
					dóretiwshiliginiń hasıl marjanlarınınıń audio variantların jaratamız.
					Jáhán, ózbek hám qaraqalpaq kórkem-ádebiy dóretpeleri, sonday-aq
					qaraqalpaq folklorınıń dúrdana shıǵarmalarınıń elektron variantların
					islep shıǵamız hám saytqa jaylastıramız.
				</p>
				<ButtonWithGrayHover
					width='fit-content'
					bg='var(--additional-color-4)'
					color='var(--typography-light)'
				>
					Baslaw
				</ButtonWithGrayHover>
			</div>
			<div className={styles.image}>
				<img src={girl} alt='girl, books' />
			</div>
		</div>
	)
}

export { HomeHead }
