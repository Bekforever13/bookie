import { useState } from 'react'
import styles from './Register.module.scss'
import { Verification } from './Verification'
import { RegisterForm } from './RegisterForm'

const Register: React.FC = () => {
	const [isVerification, setIsVerification] = useState(false)

	return (
		<div className={styles.register}>
			<h1>Dizimnen ótiw</h1>
			{isVerification ? (
				<Verification setIsVerification={setIsVerification} />
			) : (
				<RegisterForm setIsVerification={setIsVerification} />
			)}
		</div>
	)
}
export { Register }
