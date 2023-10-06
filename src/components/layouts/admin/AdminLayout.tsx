import React from 'react'
import styles from './AdminLayout.module.scss'
import { Outlet } from 'react-router-dom'
import { Header } from './header/Header'
import { Navbar } from './navbar/Navbar'

const AdminLayout: React.FC = () => {
	return (
		<div className={styles.admin_layout}>
			<Navbar />
			<main>
				<Header />
				<Outlet />
			</main>
		</div>
	)
}

export { AdminLayout }
