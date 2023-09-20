import { Route, Routes } from 'react-router-dom'
import s from 'src/assets/styles/App.module.scss'
import { Layout } from './components/layouts/Layout'
import { routes } from './components/routes/Routes'
const App = () => {
	return (
		<div className={s.app}>
			<Routes>
				<Route path='/' element={<Layout />}>
					{routes.map(item => (
						<Route key={item.path} path={item.path} element={item.element} />
					))}
				</Route>
			</Routes>
		</div>
	)
}
export { App }
