import {
  Donate,
  Home,
  Login,
  Register,
  BookInfo,
  Category,
  Audiobook,
  Faq,
} from 'src/components/screens'

export const routes = [
  { path: '/', element: <Home /> },
  { path: '/book/:slug', element: <BookInfo /> },
  { path: '/audiobook/:slug', element: <Audiobook /> },
  { path: '/category/:slug', element: <Category /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/donate', element: <Donate /> },
  { path: '/faq', element: <Faq /> },
]
