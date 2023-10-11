export interface IFormValues {
	phone: string
	password: string
}
export interface IForgotPassword {
	phone: string
	code: string
}

export type TLoginProps = { setIsForgotPassword: (el: boolean) => void }
