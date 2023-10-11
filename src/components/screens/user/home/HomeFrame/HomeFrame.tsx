import React from 'react'
import VecStar1 from 'src/assets/images/VecStar1.svg'
import VecStar2 from 'src/assets/images/VecStar2.png'
import VecStar3 from 'src/assets/images/VecStar3.svg'
import VecSave from 'src/assets/images/VecSave.svg'
import FrameBorder from 'src/assets/images/frameborder.png'
import styles from './HomeFrame.module.scss'

const HomeFrame: React.FC = () => {
	return (
		<div id='frame' className={styles.frame}>
			<img className={styles.image1} src={VecSave} alt={`save`} />
			<img className={styles.image2} src={VecStar1} alt='star1' />
			<div className={styles.border}>
				<img src={FrameBorder} alt='border' />
			</div>
			<iframe
				loading='lazy'
				className={styles.iframe}
				src='https://www.youtube.com/embed/n8km_5T2Sio'
				title="'Bookie' qaraqalpaq tilindegi audiokitaplar joybarı"
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
			></iframe>
			<img className={styles.image3} src={VecStar2} alt='star2' />
			<img className={styles.image4} src={VecStar3} alt='star3' />
		</div>
	)
}

export { HomeFrame }
