import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { AiOutlinePhone } from 'react-icons/ai'
import { FaSms } from 'react-icons/fa'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { StyledSubmitButton, UiInput } from 'src/components/ui'
import { $host } from 'src/config/axios'
import { authStore } from 'src/store/authStore'
import styles from './Register.module.scss'
import { TRegisterProps } from './Register.types'

type TData = {
	phone: string
	code: string
}

const Verification: React.FC<TRegisterProps> = ({ setIsVerification }) => {
	const navigate = useNavigate()
	const { phone, setPhone, code, setCode, auth, setAuth } = authStore()
	const mutation = useMutation(VerifyPhone, {
		onSuccess: () => {
			setAuth(true), setIsVerification(false)
		},
	})

	async function VerifyPhone(data: TData) {
		const res = await $host.post('/verified-code', data)
		Cookies.set('token', res.data.token, { expires: 7 })
	}

	const onSubmit = () =>
		mutation.mutateAsync({
			phone: phone,
			code: code,
		})

	useEffect(() => {
		if (auth) {
			navigate('/', { replace: true })
		}
	}, [auth])

	return (
		<div className={styles.verification}>
			<UiInput
				type='tel'
				icon={<AiOutlinePhone />}
				placeholder='Phone'
				value={phone}
				setValue={setPhone}
			/>
			<UiInput
				type='number'
				icon={<FaSms />}
				value={code}
				placeholder='SMS kod'
				setValue={setCode}
			/>
			<StyledSubmitButton onClick={onSubmit}>Tastıyıqlaw</StyledSubmitButton>
		</div>
	)
}

export { Verification }
