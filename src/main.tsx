import ReactDOM from 'react-dom/client'
import { App } from './App'
import 'src/assets/styles/base/_reset'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
)
