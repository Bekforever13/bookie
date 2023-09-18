import { Link } from 'react-router-dom'
import styles from './UserHeader.module.scss'
import exit from 'src/assets/images/Exit.svg'
import { authStore } from 'src/store/authStore'
import Cookies from 'js-cookie'

const UserHeader: React.FC = () => {
	const { setAuth } = authStore()

	const handleClickExit = () => {
		Cookies.remove('token')
		setAuth(false)
	}

	return (
		<div className={styles.actions}>
			<Link to='/favorites'>Saylandilar</Link>
			<Link to='/my_books'>Kitaplarim</Link>
			<button onClick={handleClickExit} className={styles.exit}>
				Shıǵıw <img src={exit} alt='exit' />
			</button>
		</div>
	)
}
export { UserHeader }
