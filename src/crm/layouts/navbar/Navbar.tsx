import React from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import logo from 'src/assets/images/HeaderLogo.svg'
import styles from './Navbar.module.scss'
import { AiOutlineHome } from 'react-icons/ai'
import { FiUsers } from 'react-icons/fi'
import { BiLogOut } from 'react-icons/bi'
import { PiBooks } from 'react-icons/pi'
import { Popconfirm } from 'antd'
import { authStore } from 'src/store/authStore'
import Cookies from 'js-cookie'

const Navbar: React.FC = () => {
	const navigate = useNavigate()
	const { setAuth } = authStore()
	const { pathname } = useLocation()
	const menuItems = [
		{ pathname: '/admin', icon: <AiOutlineHome />, label: 'Home' },
		{
			pathname: '/admin/books',
			icon: <PiBooks />,
			label: 'Books',
		},
		{ pathname: '/admin/users', icon: <FiUsers />, label: 'Users' },
	]

	const handleLogout = () => {
		setAuth(false)
		Cookies.remove('token')
		navigate('/', { replace: true })
	}

	return (
		<nav className={styles.navbar}>
			<img src={logo} alt='logo' />
			<div className={styles.wrapper}>
				{menuItems.map(item => {
					return (
						<div
							key={item.pathname}
							className={
								pathname === item.pathname ? styles.active : styles.notActive
							}
						>
							{item.icon}
							<Link to={item.pathname}>{item.label}</Link>
						</div>
					)
				})}
				<Popconfirm title='Do you want to logout?' onConfirm={handleLogout}>
					<BiLogOut /> Logout
				</Popconfirm>
			</div>
		</nav>
	)
}

export { Navbar }
