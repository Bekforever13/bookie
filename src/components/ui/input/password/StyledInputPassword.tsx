import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import styles from './StyledInputPassword.module.scss'
import { StyledInput } from '../StyledInput'

interface IProps {
	value: string
	setValue: (el: string) => void
}

const StyledInputPassword: React.FC<IProps> = ({ value, setValue }) => {
	const [showPassword, setShowPassword] = useState(false)

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	return (
		<label className={styles.passwordInput}>
			<StyledInput
				value={value}
				onChange={e => setValue(e.target.value)}
				type={showPassword ? 'text' : 'password'}
				placeholder='Parolıńız'
			/>
			{showPassword ? (
				<FaEyeSlash onClick={togglePasswordVisibility} />
			) : (
				<FaEye onClick={togglePasswordVisibility} />
			)}
		</label>
	)
}
export { StyledInputPassword }
