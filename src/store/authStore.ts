import { create } from 'zustand'

interface BearState {
	auth: boolean
	phone: string
	password: string
	name: string
	email: string
	setAuth: (payload: boolean) => void
	setPhone: (payload: string) => void
	setPassword: (payload: string) => void
	setName: (payload: string) => void
	setEmail: (payload: string) => void
}

export const authStore = create<BearState>()(set => ({
	auth: false,
	phone: '+998',
	password: '',
	name: '',
	email: '',
	setAuth: payload => set({ auth: payload }),
	setPhone: payload => set({ phone: payload }),
	setPassword: payload => set({ password: payload }),
	setName: payload => set({ name: payload }),
	setEmail: payload => set({ email: payload }),
}))
