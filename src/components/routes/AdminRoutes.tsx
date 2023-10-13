import {
	AdminHome,
	Users,
	Books,
	Author,
	Genre,
	Narrator,
	Orders,
	Review,
	AdminBookInfo,
	AdminCategory,
} from 'src/components/screens'

export const AdminRoutes = [
	{ path: '/admin', element: <AdminHome /> },
	{ path: '/admin/users', element: <Users /> },
	{ path: '/admin/books', element: <Books /> },
	{ path: '/admin/books/:id', element: <AdminBookInfo /> },
	{ path: '/admin/author', element: <Author /> },
	{ path: '/admin/narrator', element: <Narrator /> },
	{ path: '/admin/genre', element: <Genre /> },
	{ path: '/admin/category', element: <AdminCategory /> },
	{ path: '/admin/review', element: <Review /> },
	{ path: '/admin/orders', element: <Orders /> },
]
