import ReactDOM from 'react-dom/client'
import { App } from './App'
import 'src/assets/styles/base/_reset.scss'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<BrowserRouter>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</BrowserRouter>
)
