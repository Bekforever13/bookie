import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './Layout.module.scss'
import { Header } from './header/Header'
import { Footer } from './footer/Footer'
import { Categories } from './categories/Categories'
import { authStore } from 'src/store/authStore'
import Cookies from 'js-cookie'

const Layout: React.FC = () => {
	const { setRole } = authStore()
	const token = Cookies.get('token')
	useEffect(() => {
		if (token) {
			setRole()
		}
	}, [])

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
