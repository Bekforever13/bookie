export const formatPhone = (phone: string) =>
	phone.substring(1).split(' ').join('')

export const formatPrice = (price: number) =>
	price.toLocaleString('ru-RU', { useGrouping: true })

