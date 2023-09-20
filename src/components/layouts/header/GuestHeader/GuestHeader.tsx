import { ButtonWithGrayHover } from 'src/components/ui/button/StyledButtons'
import styles from './GuestHeader.module.scss'
import { useNavigate } from 'react-router-dom'

const GuestHeader: React.FC = () => {
	const navigate = useNavigate()
	return (
		<div className={styles.buttons}>
			<ButtonWithGrayHover
				bg='var(--typography-light)'
				color='var(--brand-color-1)'
				onClick={() => navigate('/login', { replace: true })}
			>
				Kiriw
			</ButtonWithGrayHover>
			<ButtonWithGrayHover
				bg='transparent'
				color='var(--typography-light)'
				border='1px solid var(--typography-light)'
				onClick={() => navigate('/register', { replace: true })}
			>
				Dizimnen ótiw
			</ButtonWithGrayHover>
		</div>
	)
}
export { GuestHeader }
