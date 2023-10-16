import { Route, Routes, useLocation } from 'react-router-dom'
import s from 'src/assets/styles/App.module.scss'
import { Layout } from './components/layouts/user/Layout'
import { routes } from './components/routes/Routes'
import { protectedRoutes } from './components/routes/ProtectedRoutes'
import { authStore } from './store/authStore'
import { NotFound } from './components/screens'
import ScrollToTop from './utils/ScrollToTop'
import { AdminRoutes } from './components/routes/AdminRoutes'
import { AdminLayout } from './components/layouts/admin/AdminLayout'
import { Spin } from 'antd'
import { useEffect } from 'react'

const App = () => {
	const { auth, role, setRole } = authStore()
	const { pathname } = useLocation()

	useEffect(() => setRole(), [role, pathname])

	return (
		<div className={s.app}>
			{!role && pathname.includes('admin') && (
				<div
					style={{
						position: 'absolute',
						inset: '0',
						background: 'white',
						zIndex: 9999999,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Spin />
				</div>
			)}

			<ScrollToTop>
				<Routes>
					<Route path='/' element={<Layout />}>
						{routes.map(item => (
							<Route key={item.path} path={item.path} element={item.element} />
						))}
						{auth &&
							protectedRoutes.map(item => (
								<Route
									key={item.path}
									path={item.path}
									element={item.element}
								/>
							))}
						<Route path='*' element={<NotFound />} />
					</Route>
					{role.includes('admin') && (
						<Route path='/admin' element={<AdminLayout />}>
							{AdminRoutes.map(item => (
								<Route
									key={item.path}
									path={item.path}
									element={item.element}
								/>
							))}
							<Route path='*' element={<NotFound />} />
						</Route>
					)}
				</Routes>
			</ScrollToTop>
		</div>
	)
}
export { App }
