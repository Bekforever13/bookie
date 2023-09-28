import React from 'react'
import { Breadcrumbs } from './Breadcrumbs'
import styles from './Header.module.scss'

const Header: React.FC = () => {
	return (
		<div className={styles.header}>
			<div>
				<Breadcrumbs />
			</div>
			<div></div>
		</div>
	)
}

export { Header }
