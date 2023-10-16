export const formatPhone = (phone: string) =>
	phone.substring(1).split(' ').join('')

export const formatPrice = (price: number | string) =>
	price.toLocaleString('ru-RU', { useGrouping: true })
