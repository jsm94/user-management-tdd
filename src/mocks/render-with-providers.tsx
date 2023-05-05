import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'

export const queryClient = new QueryClient()

const Providers = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

export const renderWithProviders = (ui: React.ReactNode) =>
  render(<Providers>{ui}</Providers>)
