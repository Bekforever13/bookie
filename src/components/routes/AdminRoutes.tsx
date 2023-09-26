import { Books, Home, Users } from 'src/crm/screens'

export const AdminRoutes = [
	{ path: '/admin', element: <Home /> },
	{ path: '/admin/users', element: <Users /> },
	{ path: '/admin/books', element: <Books /> },
]
