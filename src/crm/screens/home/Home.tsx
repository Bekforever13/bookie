import React from 'react'
import styles from './Home.module.scss'
import { Statistic } from 'antd'

const Home: React.FC = () => {
	return (
		<div className={styles.home}>
			<Statistic title='Kitaplar sani' value={112893} />
			<Statistic title='User sani' value={323} />
		</div>
	)
}

export { Home }
