import { Route, Routes } from 'react-router-dom'
import s from 'src/assets/styles/App.module.scss'
import { Layout } from './components/layouts/Layout'
import { routes } from './components/routes/Routes'
import { protectedRoutes } from './components/routes/ProtectedRoutes'
import { authStore } from './store/authStore'
import { NotFound } from './components/screens'

const App = () => {
	const { auth } = authStore()

	return (
		<div className={s.app}>
			<Routes>
				<Route path='/' element={<Layout />}>
					{routes.map(item => (
						<Route key={item.path} path={item.path} element={item.element} />
					))}
					{auth &&
						protectedRoutes.map(item => (
							<Route key={item.path} path={item.path} element={item.element} />
						))}
					<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
		</div>
	)
}
export { App }
