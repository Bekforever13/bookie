import React from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import logo from 'src/assets/images/HeaderLogo.svg'
import styles from './Navbar.module.scss'
import { AiOutlineHome, AiOutlineFileImage } from 'react-icons/ai'
import { PiBooks } from 'react-icons/pi'
import { MdOutlineAudiotrack, MdOutlineViewAgenda } from 'react-icons/md'
import { BsPencilSquare, BsMic } from 'react-icons/bs'
import { BiCategory } from 'react-icons/bi'
import { GoCodeReview } from 'react-icons/go'
import { LuListOrdered } from 'react-icons/lu'
import { FiUsers } from 'react-icons/fi'
import { BiLogOut } from 'react-icons/bi'
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
		{ pathname: '/admin/audio', icon: <MdOutlineAudiotrack />, label: 'Audio' },
		{ pathname: '/admin/author', icon: <BsPencilSquare />, label: 'Author' },
		{ pathname: '/admin/narrator', icon: <BsMic />, label: 'Narrator' },
		{ pathname: '/admin/genre', icon: <MdOutlineViewAgenda />, label: 'Genre' },
		{ pathname: '/admin/category', icon: <BiCategory />, label: 'Category' },
		{
			pathname: '/admin/images',
			icon: <AiOutlineFileImage />,
			label: 'Images',
		},
		{ pathname: '/admin/review', icon: <GoCodeReview />, label: 'Review' },
		{ pathname: '/admin/orders', icon: <LuListOrdered />, label: 'Orders' },
		{ pathname: '/admin/users', icon: <FiUsers />, label: 'Users' },
	]

	const handleLogout = () => {
		setAuth(false)
		Cookies.remove('token')
		navigate('/', { replace: true })
	}
	const handleClickRoute = (pathname: string) => {
		navigate(pathname, { replace: true })
	}

	return (
		<nav className={styles.navbar}>
			<img src={logo} alt='logo' />
			<div className={styles.wrapper}>
				{menuItems.map(item => {
					return (
						<div
							onClick={() => handleClickRoute(item.pathname)}
							key={item.pathname}
							className={
								pathname === item.pathname ? styles.active : styles.notActive
							}
						>
							{item.icon}
							{item.label}
						</div>
					)
				})}
				<Popconfirm
					className={styles.logout}
					title='Do you want to logout?'
					onConfirm={handleLogout}
				>
					<BiLogOut /> Logout
				</Popconfirm>
			</div>
		</nav>
	)
}

export { Navbar }
