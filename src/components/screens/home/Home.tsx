import { useEffect } from 'react'
import styles from './Home.module.scss'
import { HomeFeedback } from './HomeFeedback/HomeFeedback'
import { HomeFrame } from './HomeFrame/HomeFrame'
import { HomeHead } from './HomeHead/HomeHead'
import { HomeSliders } from './HomeSliders/HomeSliders'

const Home: React.FC = () => {
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])
	return (
		<div className={styles.home}>
			<HomeHead />
			<HomeFrame />
			<HomeSliders />
			<HomeFeedback />
		</div>
	)
}
export { Home }
