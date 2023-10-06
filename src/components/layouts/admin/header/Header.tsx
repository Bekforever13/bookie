import React from 'react'
import { Breadcrumbs } from './Breadcrumbs'
import styles from './Header.module.scss'
import { Popconfirm } from 'antd'
import { BiLogOut } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { authStore } from 'src/store/authStore'

const Header: React.FC = () => {
	const navigate = useNavigate()
	const { setAuth, clearRole } = authStore()

	const handleLogout = () => {
		setAuth(false)
		Cookies.remove('token')
		clearRole()
		navigate('/', { replace: true })
	}
	return (
		<div className={styles.header}>
			<div>
				<Breadcrumbs />
			</div>
			<Popconfirm
				className={styles.logout}
				title='Do you want to logout?'
				onConfirm={handleLogout}
			>
				<BiLogOut /> Logout
			</Popconfirm>
		</div>
	)
}

export { Header }
