import {
	TransparentButton,
	WhiteButton,
} from 'src/components/ui/button/StyledButtons'
import styles from './GuestHeader.module.scss'
import { useNavigate } from 'react-router-dom'

const GuestHeader: React.FC = () => {
	const navigate = useNavigate()
	return (
		<div className={styles.buttons}>
			<WhiteButton onClick={() => navigate('/login', { replace: true })}>
				Kiriw
			</WhiteButton>
			<TransparentButton
				onClick={() => navigate('/register', { replace: true })}
			>
				Dizimnen ótiw
			</TransparentButton>
		</div>
	)
}
export { GuestHeader }
