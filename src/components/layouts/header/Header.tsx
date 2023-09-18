import { useState, useEffect } from 'react'
import { GuestHeader } from './GuestHeader/GuestHeader'
import styles from './Header.module.scss'
import logo from 'src/assets/images/HeaderLogo.svg'
import { UserHeader } from './UserHeader/UserHeader'
import { Link } from 'react-router-dom'
import { authStore } from 'src/store/authStore'
import { HeaderHamburgerMenu } from './HeaderHamburgerMenu'
import Hamburger from 'hamburger-react'
import Cookies from 'js-cookie'
import { $host } from 'src/config/axios'

const Header: React.FC = () => {
	const { auth, setAuth } = authStore()
	const [isOpen, setOpen] = useState(false)

	useEffect(() => {
		const token = Cookies.get('token')
		if (token) {
			$host
				.get('/getme', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then(() => setAuth(true))
		}
	}, [])

	return (
		<div className={styles.header}>
			<Link to='/'>
				<img src={logo} alt='logo' />
			</Link>
			{auth ? <UserHeader /> : <GuestHeader />}
			<div className={styles.hamburger}>
				<Hamburger
					size={27}
					toggled={isOpen}
					toggle={setOpen}
					direction='left'
				/>
			</div>
			<HeaderHamburgerMenu isOpen={isOpen} setOpen={setOpen} />
		</div>
	)
}
export { Header }
