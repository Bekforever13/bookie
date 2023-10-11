import { useState } from 'react'
import styles from './Login.module.scss'
import { LoginForm } from './LoginForm'
import { ForgotPassword } from './ForgotPassword'

const Login: React.FC = () => {
	const [isForgotPassword, setIsForgotPassword] = useState(false)
	return (
		<div className={styles.login}>
			{isForgotPassword ? (
				<ForgotPassword setIsForgotPassword={setIsForgotPassword} />
			) : (
				<LoginForm setIsForgotPassword={setIsForgotPassword} />
			)}
		</div>
	)
}
export { Login }
