import { useNavigate } from 'react-router-dom'
import styles from './Header.module.scss'
import { Dispatch, SetStateAction } from 'react'
import { ConfigProvider, MenuProps } from 'antd'
import { Menu } from 'antd'
import { AiOutlineHome } from 'react-icons/ai'
import { BsFillPersonPlusFill } from 'react-icons/bs'
import { BiCategory, BiLogIn } from 'react-icons/bi'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: 'group'
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type,
	} as MenuItem
}

type THamburgerMenuProps = {
	isOpen: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
}

const HeaderHamburgerMenu: React.FC<THamburgerMenuProps> = ({
	isOpen,
	setOpen,
}) => {
	const navigate = useNavigate()

	const items: MenuProps['items'] = [
		getItem('Bas bet', '/', <AiOutlineHome />),

		getItem('Kategoriyalar', 'categories', <BiCategory />, [
			getItem('Jáhán ádebiyatı', 'jahan'),
			getItem('Qaraqalpaq ádebiyatı', 'qaraqalpaq'),
			getItem('Ózbek ádebiyatı', 'ozbek'),
			getItem('Qısqa audiolar', 'qisqa'),
			getItem('Qaraqalpaq folklorı', 'folklori'),
		]),
		{ type: 'divider' },
		getItem('Kiriw', 'login', <BiLogIn />),
		getItem('Dizimnen ótiw', 'register', <BsFillPersonPlusFill />),
	]

	const onClick: MenuProps['onClick'] = e => {
		setOpen(false)
		navigate(e.key, { replace: true })
	}

	return (
		<div className={isOpen ? styles.hLinks : styles.hide}>
			<ConfigProvider
				theme={{
					token: {
						colorBgContainer: '#2d71ae',
						colorText: '#fff',
						fontSize: 20,
						margin: 50,
					},
				}}
			>
				<Menu
					onClick={onClick}
					defaultSelectedKeys={['1']}
					defaultOpenKeys={['sub1']}
					mode='inline'
					items={items}
				/>
			</ConfigProvider>
		</div>
	)
}
export { HeaderHamburgerMenu }
