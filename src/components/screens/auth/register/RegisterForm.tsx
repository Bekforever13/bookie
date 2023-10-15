import React from 'react'
import { ConfigProvider, Form, Input } from 'antd'
import { useMutation } from 'react-query'
import { $host } from 'src/config/axios'
import { IRegisterValues } from './Register.types'
import { MaskedInput } from 'antd-mask-input'
import { StyledSubmitButton } from 'src/components/ui'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Register.module.scss'
import { authStore } from 'src/store/authStore'
import { formatPhone } from 'src/services/services'
import Cookies from 'js-cookie'

const RegisterForm: React.FC = () => {
	const [form] = Form.useForm()
	const navigate = useNavigate()
	const { setPhone, setAuth } = authStore()
	const { mutate } = useMutation(signUp, {
		onSuccess: () => {
			navigate('/')
			setAuth(true)
		},
	})

	async function signUp(data: IRegisterValues) {
		const res = await $host.post('/register', data)
		console.log(res.data.token)
		Cookies.set('token', res.data.token, { expires: 7 })
		return res.data.token
	}

	const onSubmit = ({ phone, password, name }: IRegisterValues) => {
		setPhone(phone)
		mutate({ password, name, phone: formatPhone(phone) })
	}

	return (
		<ConfigProvider
			theme={{
				token: {
					colorBorder: 'var(--brand-color-1)',
					borderRadius: 16,
					colorBgContainer: 'var(--typography-light)',
				},
			}}
		>
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
					name='name'
					rules={[{ required: true, message: 'Atıńızdı kiritiń' }]}
				>
					<Input
						style={{
							padding: '13px',
						}}
						placeholder='Atıńız'
						type='text'
					/>
				</Form.Item>
				<Form.Item
					name='phone'
					rules={[{ required: true, message: 'Telefon nomerińizdi kiritiń' }]}
				>
					<MaskedInput
						style={{
							border: '1px solid var(--brand-color-1)',
							background: 'var(--typography-light)',
							padding: '13px',
							borderRadius: '16px',
						}}
						inputMode='tel'
						mask='+{998} 00 000 00 00'
					/>
				</Form.Item>
				<Form.Item
					name='password'
					rules={[
						{ required: true, message: 'Parolıńızdı kiritiń' },
						{ min: 8, message: 'Parol keminde 8 belginen ibarat bolıwı kerek' },
					]}
				>
					<Input.Password
						style={{
							padding: '13px',
						}}
						placeholder='Parolıńız'
					/>
				</Form.Item>

				<StyledSubmitButton>Dizimnen ótiw</StyledSubmitButton>
			</Form>
			<Link to='/login' className={styles.log}>
				Kiriw
			</Link>
		</ConfigProvider>
	)
}

export { RegisterForm }
