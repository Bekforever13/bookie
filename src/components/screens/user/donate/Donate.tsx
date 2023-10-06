import React from 'react'
import styles from './Donate.module.scss'
import donate from 'src/assets/images/donate.png'
import star from 'src/assets/images/donate_star.svg'
import save from 'src/assets/images/donate_save.svg'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`

const Donate: React.FC = () => {
	const [activeItem, setActiveItem] = React.useState<string | null>('0')

	const onChange = (key: string | string[]) => {
		setActiveItem((prevActiveItem: string | null) =>
			prevActiveItem === key ? null : key.toString()
		)
	}

	const items = [
		{
			key: '1',
			label: 'Puldan tısqarı qanday járdem bere alaman?',
			children: <p>{text}</p>,
		},
		{
			key: '2',
			label: 'Sırt elde turıp ta pul ótkere alaman ba?',
			children: <p>{text}</p>,
		},
		{
			key: '3',
			label: 'Qárejetler smetası bar ma?',
			children: <p>{text}</p>,
		},
		{
			key: '4',
			label: 'Naq pul arqalı qollap-quwatlasam bola ma?',
			children: <p>{text}</p>,
		},
	]

	return (
		<div className={styles.donate}>
			<div className={styles.wrapper}>
				<div className={styles.text}>
					<h3>Jańa shoqqılardı birgelikte iyeleyik!</h3>
					<p>
						Biz, jańadan ashılǵan «Bookie» qaraqalpaq tilindegi audiokitarlar
						platforması, siz sıyaqlı keńpeyil hám qayır saqawatlı insanlardıń
						járdemine súyenemiz. Eger usı sózlerdi oqıp atırǵanlar keminde 20
						mıń somnan qayır-saqawat qılsa, joybar jumısları 2 jıl ishinde óz
						juwmaǵına jetedi. Sizden joybardı qollap-quwatlawıńızdı soraymız hám
						bunıń menen siz Qaraqalpaq tiliniń rawajlanıwına úlken úles qosqan
						bolasız.
					</p>
				</div>
				<img src={donate} alt='donate' />
			</div>
			<div className={styles.faq}>
				<h4>Kóp beriletuǵın sorawlar</h4>
				<div className={styles.accordion}>
					{items.map(item => (
						<div
							key={item.key}
							className={styles.accordionItem}
							onClick={() => onChange(item.key)}
						>
							<div
								className={`${styles.accordionHeader} ${
									activeItem === item.key ? styles.active : ''
								}`}
							>
								{item.label}
								<span>
									{activeItem === item.key ? (
										<AiOutlineMinus />
									) : (
										<AiOutlinePlus />
									)}
								</span>
							</div>
							<div
								className={`${styles.accordionContent} ${
									activeItem === item.key ? styles.show : ''
								}`}
							>
								{item.children}
							</div>
						</div>
					))}
				</div>
			</div>
			<img className={styles.save} src={save} alt='save' />
			<img className={styles.star} src={star} alt='star' />
		</div>
	)
}

export { Donate }
