import React, { useEffect } from 'react'
import { StyledSubmitButton } from 'src/components/ui'
import { authStore } from 'src/store/authStore'
import { Link, useNavigate } from 'react-router-dom'
import { $host } from 'src/config/axios'
import { useMutation } from 'react-query'
import Cookies from 'js-cookie'
import { MaskedInput } from 'antd-mask-input'
import { Form, Input, message } from 'antd'
import styles from './Login.module.scss'
import { IFormValues, TLoginProps } from './Login.types'
import { formatPhone } from 'src/services/services'

const LoginForm: React.FC<TLoginProps> = ({ setIsForgotPassword }) => {
	const [form] = Form.useForm()
	const { setAuth, setRole, role } = authStore()
	const navigate = useNavigate()
	const { mutate, isError, isSuccess } = useMutation(signIn)

	const onSubmit = ({ phone, password }: IFormValues) => {
		mutate({ password, phone: formatPhone(phone) })
	}

	async function signIn(data: IFormValues) {
		const res = await $host.post('/login', data)
		Cookies.set('token', res.data?.token, { expires: 7 })
	}

	useEffect(() => {
		if (isSuccess) {
			setRole()
			navigate('/')
			setAuth(true)
		}
		if (isError) message.error('Akkaunt maǵlıwmatları qáte kiritildi')
	}, [role, isError, isSuccess])

	return (
		<>
			<h1>Kiriw</h1>
			<Form
				form={form}
				name='Auth Login'
				layout='vertical'
				initialValues={{ remember: true }}
				onFinish={onSubmit}
				autoComplete='off'
				size='large'
			>
				<Form.Item
					name='phone'
					rules={[{ required: true, message: 'Telefon nomerińizdi kiritiń' }]}
				>
					<MaskedInput inputMode='tel' mask='+{998} 00 000 00 00' />
				</Form.Item>
				<Form.Item
					name='password'
					rules={[{ required: true, message: 'Parolıńızdı kiritiń' }]}
				>
					<Input.Password
						style={{
							border: '1px solid var(--brand-color-1)',
							background: 'var(--typography-light)',
							padding: '13px 20px 13px 30px',
							borderRadius: '16px',
						}}
						placeholder='Parolıńız'
					/>
				</Form.Item>
				<div className={styles.actions}>
					<span>Parolińizdi umıttıńız ba?</span>
					<p
						className={styles.forgot}
						onClick={() => setIsForgotPassword(true)}
					>
						Qayta tiklew
					</p>
				</div>
				<StyledSubmitButton>Kiriw</StyledSubmitButton>
			</Form>
			<Link to='/register' className={styles.reg}>
				Dizimnen ótiw
			</Link>
		</>
	)
}

export { LoginForm }
