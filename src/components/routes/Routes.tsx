import { Home } from 'src/components/screens'
import { Login } from 'src/components/screens'
import { Register } from 'src/components/screens'
import { BookInfo } from 'src/components/screens'
import { Category } from 'src/components/screens'

export const routes = [
	{ path: '/', element: <Home /> },
	{ path: '/book/:slug', element: <BookInfo /> },
	{ path: '/category/:categoryId', element: <Category /> },
	{ path: '/login', element: <Login /> },
	{ path: '/register', element: <Register /> },
	{ path: '/favorites', element: <Register /> },
	{ path: '/my_books', element: <Register /> },
]
