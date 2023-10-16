import { Breadcrumb } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { HomeOutlined } from '@ant-design/icons'

const Breadcrumbs: React.FC = () => {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const pathnames = pathname.split('/').filter(item => item)
	const capatilize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

	const items = pathnames.map((name, index) => {
		const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
		const isLast = index === pathnames.length - 1
		return {
			title: capatilize(name),
			path: isLast ? undefined : routeTo,
			icon: index === 0 ? <HomeOutlined /> : null,
			onClick: () => {
				navigate(routeTo)
			},
		}
	})

	return <Breadcrumb items={items} />
}

export { Breadcrumbs }
