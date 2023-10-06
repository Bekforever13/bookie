import styles from './Home.module.scss'
import { HomeFeedback } from './HomeFeedback/HomeFeedback'
import { HomeFrame } from './HomeFrame/HomeFrame'
import { HomeHead } from './HomeHead/HomeHead'
import { HomeSliders } from './HomeSliders/HomeSliders'

const Home: React.FC = () => {
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
