import { authStore } from 'src/store/authStore'
import styles from './Register.module.scss'
import { UiInput } from 'src/components/ui/input/UiInput'
import { StyledInputPassword } from 'src/components/ui/input/password/StyledInputPassword'
import { StyledSubmitButton } from 'src/components/ui/button/StyledButtons'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlinePhone, AiOutlineUser, AiOutlineMail } from 'react-icons/ai'
import Cookies from 'js-cookie'
import { $host } from 'src/config/axios'
import { useMutation } from 'react-query'
import { useEffect } from 'react'

type TData = {
	email: string
	phone: string
	name: string
	password: string
}

async function signUp(data: TData) {
	const res = await $host.post('/register', data)
	Cookies.set('token', res.data.token, { expires: 7 })
}

const Register: React.FC = () => {
	const navigate = useNavigate()
	const {
		phone,
		password,
		setPassword,
		setPhone,
		name,
		setName,
		email,
		setEmail,
		setAuth,
		auth,
	} = authStore()
	const mutation = useMutation(signUp, { onSuccess: () => setAuth(true) })

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		mutation.mutateAsync({
			email: email,
			password: password,
			name: name,
			phone: phone,
		})
	}

	useEffect(() => {
		if (auth) {
			navigate('/', { replace: true })
		}
	}, [auth])

	return (
		<div className={styles.register}>
			<h1>Dizimnen ótiw</h1>
			<form onSubmit={onSubmit}>
				<UiInput
					type='text'
					icon={<AiOutlineUser />}
					value={name}
					placeholder='Atıńız'
					setValue={setName}
				/>
				<UiInput
					type='email'
					icon={<AiOutlineMail />}
					value={email}
					placeholder='E-mail'
					setValue={setEmail}
				/>
				<UiInput
					type='tel'
					icon={<AiOutlinePhone />}
					placeholder='Phone'
					value={phone}
					setValue={setPhone}
				/>
				<StyledInputPassword value={password} setValue={setPassword} />
				<StyledSubmitButton>Dizimnen ótiw</StyledSubmitButton>
			</form>
			<Link to='/login' className={styles.log}>
				Kiriw
			</Link>
		</div>
	)
}
export { Register }
