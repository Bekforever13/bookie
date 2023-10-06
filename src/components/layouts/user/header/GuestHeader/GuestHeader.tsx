import { StyledButton } from 'src/components/ui'
import styles from './GuestHeader.module.scss'
import { useNavigate } from 'react-router-dom'

const GuestHeader: React.FC = () => {
	const navigate = useNavigate()
	return (
		<div className={styles.buttons}>
			<StyledButton
				backgroundcolor='var(--typography-light)'
				color='var(--brand-color-1)'
				onClick={() => navigate('/login', { replace: true })}
			>
				Kiriw
			</StyledButton>
			<StyledButton
				backgroundcolor='transparent'
				color='var(--typography-light)'
				border='1px solid var(--typography-light)'
				onClick={() => navigate('/register', { replace: true })}
			>
				Dizimnen ótiw
			</StyledButton>
		</div>
	)
}
export { GuestHeader }
