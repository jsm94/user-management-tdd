import App from 'components/App'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import 'styles/globals.css'
import 'tailwindcss/tailwind.css'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)
const queryClient = new QueryClient()

const AppWithProviders = () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)

root.render(<AppWithProviders />)
