import { Donate, Home } from 'src/components/screens'
import { Login } from 'src/components/screens'
import { Register } from 'src/components/screens'
import { BookInfo } from 'src/components/screens'
import { Category } from 'src/components/screens'
import { Audiobook } from 'src/components/screens'

export const routes = [
	{ path: '/', element: <Home /> },
	{ path: '/book/:slug', element: <BookInfo /> },
	{ path: '/audiobook/:slug', element: <Audiobook /> },
	{ path: '/category/:slug', element: <Category /> },
	{ path: '/login', element: <Login /> },
	{ path: '/register', element: <Register /> },
	{ path: '/donate', element: <Donate /> },
]
