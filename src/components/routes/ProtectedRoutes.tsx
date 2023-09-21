import { Cart } from 'src/components/screens'
import { Favorites } from 'src/components/screens'
import { MyBooks } from 'src/components/screens'

export const protectedRoutes = [
	{ path: '/favorites', element: <Favorites /> },
	{ path: '/my_books', element: <MyBooks /> },
	{ path: '/cart', element: <Cart /> },
]
