import React from 'react'
import star1 from 'src/assets/images/VecStar1.svg'
import star2 from 'src/assets/images/VecStar2.png'
import star3 from 'src/assets/images/VecStar3.svg'
import save from 'src/assets/images/VecSave.svg'
import border from 'src/assets/images/frameborder.png'
import styles from './HomeFrame.module.scss'

const HomeFrame: React.FC = () => {
	return (
		<div id='frame' className={styles.frame}>
			<img className={styles.image1} src={save} alt='save' />
			<img className={styles.image2} src={star1} alt='star1' />
			<div className={styles.border}>
				<img src={border} alt='border' />
			</div>
			<iframe
				loading='lazy'
				className={styles.iframe}
				src='https://www.youtube.com/embed/n8km_5T2Sio'
				title='"Bookie" qaraqalpaq tilindegi audiokitaplar joybarı'
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
			></iframe>
			<img className={styles.image3} src={star2} alt='star2' />
			<img className={styles.image4} src={star3} alt='star3' />
		</div>
	)
}

export { HomeFrame }
