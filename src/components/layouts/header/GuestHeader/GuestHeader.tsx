import styles from './GuestHeader.module.scss'
import logo from 'src/assets/images/Logo.svg'

const GuestHeader: React.FC = () => {
	return (
		<div className={styles.GuestHeader}>
			<img src={logo} alt='logo' />
			<div></div>
		</div>
	)
}
export { GuestHeader }
