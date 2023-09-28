import { Audio, Author, Books, Home, Users,Narrator, Genre, Category, Images, Review, Orders } from 'src/crm/screens'

export const AdminRoutes = [
	{ path: '/admin', element: <Home /> },
	{ path: '/admin/users', element: <Users /> },
	{ path: '/admin/books', element: <Books /> },
	{ path: '/admin/audio', element: <Audio /> },
	{ path: '/admin/author', element: <Author /> },
	{ path: '/admin/narrator', element: <Narrator /> },
	{ path: '/admin/genre', element: <Genre /> },
	{ path: '/admin/category', element: <Category /> },
	{ path: '/admin/images', element: <Images /> },
	{ path: '/admin/review', element: <Review /> },
	{ path: '/admin/orders', element: <Orders /> },
]
