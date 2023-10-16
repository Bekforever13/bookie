import React, { useState } from 'react'
import { StyledButton, StyledSubmitButton } from 'src/components/ui'
import { authStore } from 'src/store/authStore'
import { useNavigate } from 'react-router-dom'
import { $host } from 'src/config/axios'
import Cookies from 'js-cookie'
import { MaskedInput } from 'antd-mask-input'
import { Form, Input, message } from 'antd'
import styles from './Login.module.scss'
import { IForgotPassword, TLoginProps } from './Login.types'

const ForgotPassword: React.FC<TLoginProps> = ({ setIsForgotPassword }) => {
	const [form] = Form.useForm()
	const navigate = useNavigate()
	const [changePassword, setChangePassword] = useState(false)
	const { setAuth, setRole, setPhone, phone, password, setPassword } =
		authStore()

	const onSubmit = ({ phone, code }: IForgotPassword) => {
		const formattedPhone = phone.substring(1).split(' ').join('')
		$host.post('/check-code', { phone: formattedPhone, code }).then(res => {
			setAuth(true)
			Cookies.set('token', res.data.token, { expires: 7 })
			setRole()
			setChangePassword(true)
		})
	}

	const handleClickGetSMS = () => {
		$host.post('/check-phone', { phone: phone })
	}

	const handleChangePassword = () => {
		$host.patch('/update-password', { password: password }).then(() => {
			message.success('Parolıńız ózgertirildi')
			navigate('/', { replace: true })
			setIsForgotPassword(false)
		})
	}

	return (
		<>
			<h1>Paroldi qayta tiklew</h1>
			{!changePassword ? (
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
						<MaskedInput
							onChange={e => setPhone(e.unmaskedValue)}
							inputMode='tel'
							mask='+{998} 00 000 00 00'
						/>
					</Form.Item>
					<Form.Item
						name='code'
						rules={[{ required: true, message: 'SMS kod kiritiń' }]}
					>
						<Input
							style={{
								border: '1px solid var(--brand-color-1)',
								background: 'var(--typography-light)',
								padding: '13px 20px 13px 30px',
								borderRadius: '16px',
							}}
							placeholder='SMS Kod'
						/>
					</Form.Item>
					<p className={styles.getsms} onClick={handleClickGetSMS}>
						Kodtı alıw
					</p>
					<StyledSubmitButton>Qayta tiklew</StyledSubmitButton>
				</Form>
			) : (
				<Form>
					<Form.Item>
						<Input.Password
							style={{
								border: '1px solid var(--brand-color-1)',
								background: 'var(--typography-light)',
								padding: '13px 20px 13px 30px',
								borderRadius: '16px',
							}}
							placeholder='Taza parolıńız'
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</Form.Item>
					<StyledButton
						backgroundcolor='var(--typography-light)'
						color='#fff'
						onClick={handleChangePassword}
					>
						Parol ózgertiw
					</StyledButton>
				</Form>
			)}
		</>
	)
}

export { ForgotPassword }
