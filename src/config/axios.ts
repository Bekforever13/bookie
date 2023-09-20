import axios from 'axios'
import Cookies from 'js-cookie'

const $host = axios.create({
	baseURL: import.meta.env.VITE_APP_API_URL,
})

$host.interceptors.request.use(function (config) {
	const token = Cookies.get('token')
	config.headers.Authorization = token ? `Bearer ${token}` : ''
	return config
})

export { $host }
