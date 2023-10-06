import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './Layout.module.scss'
import { Header } from './header/Header'
import { Footer } from './footer/Footer'
import { Categories } from './categories/Categories'
import { authStore } from 'src/store/authStore'

const Layout: React.FC = () => {
	const { setRole } = authStore()
	useEffect(() => setRole(), [])

	return (
		<div className={styles.layout}>
			<Header />
			<Categories />
			<div className={styles.outlet}>
				<Outlet />
			</div>
			<Footer />
		</div>
	)
}
export { Layout }
