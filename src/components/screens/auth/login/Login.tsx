import styles from './Login.module.scss'
import { StyledSubmitButton } from 'src/components/ui/button/StyledButtons'
import { StyledInputPassword } from 'src/components/ui/input/password/StyledInputPassword'
import { authStore } from 'src/store/authStore'
import { UiInput } from 'src/components/ui/input/UiInput'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { AiOutlinePhone } from 'react-icons/ai'
import { $host } from 'src/config/axios'
import { useMutation } from 'react-query'
import Cookies from 'js-cookie'

type TData = {
	email: string
	password: string
}

async function signIn(data: TData) {
	const res = await $host.post('/login', data)
	Cookies.set('token', res.data.token, { expires: 7 })
}

const Login: React.FC = () => {
	const { phone, password, setPhone, setPassword, setAuth, auth } = authStore()
	const navigate = useNavigate()
	const mutation = useMutation(signIn, { onSuccess: () => setAuth(true) })

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		mutation.mutateAsync({ email: phone, password: password })
	}

	useEffect(() => {
		if (auth) {
			navigate('/', { replace: true })
		}
	}, [auth])

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
