import styles from './Register.module.scss'
import { RegisterForm } from './RegisterForm'

const Register: React.FC = () => {
	return (
		<div className={styles.register}>
			<h1>Dizimnen ótiw</h1>
			<RegisterForm />
		</div>
	)
}
export { Register }
