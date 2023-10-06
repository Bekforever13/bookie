import styles from './Login.module.scss'
import { StyledSubmitButton, StyledInputPassword } from 'src/components/ui'
import { authStore } from 'src/store/authStore'
import { UiInput } from 'src/components/ui/input/UiInput'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { AiOutlinePhone } from 'react-icons/ai'
import { $host } from 'src/config/axios'
import { useMutation } from 'react-query'
import Cookies from 'js-cookie'
import { TUserData } from 'src/types/Types'

type TData = {
	phone: string
	password: string
}

const Login: React.FC = () => {
	const {
		phone,
		password,
		setPhone,
		setPassword,
		setAuth,
		auth,
		setRole,
		role,
	} = authStore()
	const navigate = useNavigate()
	const mutation = useMutation(signIn, { onSuccess: () => setAuth(true) })

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		mutation.mutateAsync({ phone: phone, password: password })
	}

	async function signIn(data: TData) {
		const res = await $host.post('/login', data)
		await Cookies.set('token', res.data.token, { expires: 7 })
		await setRole()
	}

	return (
		<div className={styles.login}>
			<h1>Kiriw</h1>
			<form onSubmit={onSubmit}>
				<UiInput
					type='tel'
					icon={<AiOutlinePhone />}
					value={phone}
					setValue={setPhone}
					placeholder='Phone'
				/>
				<StyledInputPassword value={password} setValue={setPassword} />
				<StyledSubmitButton>Kiriw</StyledSubmitButton>
			</form>
			<Link to='/register' className={styles.reg}>
				Dizimnen ótiw
			</Link>
		</div>
	)
}
export { Login }
