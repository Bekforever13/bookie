import React, { useEffect } from 'react'
import styles from './Audiobook.module.scss'
import prince from 'src/assets/images/prince.png'
import wave from 'src/assets/images/wave.svg'

const Audiobook: React.FC = () => {
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])
	return (
		<div className={styles.book}>
			<div className={styles.text}>
				<img src={prince} alt='book image' />
				<div className={styles.desc}>
					<h1>Kishkene Shaxzada</h1>
					<h4>Antuan de Send-Ekzyuperi</h4>
					<p>
						Ushıwshı, Kishkene shahzada, Túlki hám jılan – bul filosofiyalıq
						ertektiń tiykarǵı qaharmanları. Óz planetasın taslap ketip, álem
						boylap sayaxat etken Kishkene shahzada ómirdiń mazmunı ne ekenligin
						túsinedi – ol tuwılǵan planetasında óz gúlin súyiwi, onıń qádirin
						biliwdi úyreniwi kerek eken. Shıǵarma jas óspirimler hám úlkenler
						ushın birdey qızıqlı hám mánili.
					</p>
					<div>
						<span>Proza</span>
						<span>Povest</span>
					</div>
				</div>
			</div>
			<div className={styles.audio}>
				<div className={styles.chapters}>
					<h4>Sóz bası</h4>
					<ul>
						<li>
							I bólim <img src={wave} alt='wave' />
						</li>
						<li>II bólim</li>
						<li>III bólim</li>
					</ul>
				</div>
				<div className={styles.player}>
					<div></div>
					<div></div>
				</div>
			</div>
		</div>
	)
}

export { Audiobook }
