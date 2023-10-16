import { Link, useNavigate } from 'react-router-dom'
import styles from './Header.module.scss'
import { BsFillPersonPlusFill } from 'react-icons/bs'
import { BiLogIn } from 'react-icons/bi'
import { authStore } from 'src/store/authStore'
import exit from 'src/assets/images/Exit.svg'
import Cookies from 'js-cookie'
import { $host } from 'src/config/axios'
import { useQuery } from 'react-query'
import { TIdNameSlug, THamburgerMenuProps } from 'src/types/Types'
import home from 'src/assets/images/home0.svg'
import cart from 'src/assets/images/cart0.svg'
import favorite from 'src/assets/images/favorites0.svg'
import my_books from 'src/assets/images/myBooks0.svg'
import category from 'src/assets/images/library0.svg'

const HeaderHamburgerMenu: React.FC<THamburgerMenuProps> = ({
	isOpen,
	setOpen,
}) => {
	const navigate = useNavigate()
	const { auth, setAuth } = authStore()
	const { data } = useQuery<TIdNameSlug[]>({
		queryKey: ['categories'],
		queryFn: getCategories,
		staleTime: 5 * 60 * 1000,
		cacheTime: 60 * 60 * 1000,
	})
	async function getCategories() {
		const res = await $host.get('/category')
		return res.data.data
	}
	const handleClickExit = (e: React.MouseEvent) => {
		e.stopPropagation()
		Cookies.remove('token')
		setAuth(false)
	}

	const onClick = (e: string) => {
		setOpen(false)
		navigate(e, { replace: true })
	}

	const authorizedMenuItems = [
		{
			pathname: 'favorites',
			icon: <img src={favorite} alt='favorites' />,
			label: 'Saylandilar',
		},
		{ pathname: 'cart', icon: <img src={cart} alt='cart' />, label: 'Sebet' },
		{
			pathname: 'my_books',
			icon: <img src={my_books} alt='my_books' />,
			label: 'Kitaplarim',
		},
	]

	return (
		<div className={isOpen ? styles.hLinks : styles.hide}>
			<div className={styles.menuItem} onClick={() => onClick('/')}>
				<img src={home} alt='home' />
				<Link to='/'>Bas bet</Link>
			</div>
			{data?.map(item => (
				<div
					key={item.slug}
					onClick={() => onClick(`/category/${item.slug}`)}
					className={styles.menuItem}
				>
					<img src={category} alt='category' />
					<Link to={`/${item.slug}`}>{item.name}</Link>
				</div>
			))}
			{auth ? (
				authorizedMenuItems.map(item => (
					<div
						className={styles.menuItem}
						onClick={() => onClick(`/${item.pathname}`)}
						key={item.label}
					>
						{item.icon}
						{item.label}
					</div>
				))
			) : (
				<div className={styles.guestMenu}>
					<div
						className={styles.guestMenuItem}
						onClick={() => onClick('/login')}
					>
						<BiLogIn />
						Kiriw
					</div>
					<div
						className={styles.guestMenuItem}
						onClick={() => onClick('/register')}
					>
						<BsFillPersonPlusFill />
						Dizimnen ótiw
					</div>
				</div>
			)}
			{auth && (
				<div className={styles.menuItem} onClick={handleClickExit}>
					<img src={exit} alt='logout' />
					Shigiw
				</div>
			)}
		</div>
	)
}
export { HeaderHamburgerMenu }
