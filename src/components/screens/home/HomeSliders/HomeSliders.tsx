import React from 'react'
import { RecentlyAddedBooks } from './RecentlyAddedBooks/RecentlyAddedBooks'
import { TrendBooks } from './TrendBooks/TrendBooks'
import styles from './HomeSliders.module.scss'

const HomeSliders: React.FC = () => {
	return (
		<div className={styles.sliders}>
			<RecentlyAddedBooks />
			<TrendBooks />
		</div>
	)
}

export { HomeSliders }
