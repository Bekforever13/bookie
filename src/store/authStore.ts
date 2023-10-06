import { create } from 'zustand'
import Cookies from 'js-cookie'
import { $host } from 'src/config/axios'

interface authState {
	auth: boolean
	role: string
	phone: string
	password: string
	name: string
	email: string
	setAuth: (payload: boolean) => void
	setRole: () => void
	clearRole: () => void
	setPhone: (payload: string) => void
	setPassword: (payload: string) => void
	setName: (payload: string) => void
	setEmail: (payload: string) => void
}

export const authStore = create<authState>()(set => ({
	auth: Cookies.get('token') ? true : false,
	role: '',
	phone: '+998',
	password: '',
	name: '',
	email: '',
	setAuth: payload => set({ auth: payload }),
	setPhone: payload => set({ phone: payload }),
	setPassword: payload => set({ password: payload }),
	setName: payload => set({ name: payload }),
	setEmail: payload => set({ email: payload }),
	clearRole: () => set({ role: '' }),
	setRole: () => {
		$host
			.get('/getme')
			.then(response => set({ role: response.data.data.role }))
			.catch(error => console.error('Ошибка при выполнении запроса:', error))
	},
}))
