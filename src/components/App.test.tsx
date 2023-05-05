import { renderWithProviders } from '@/mocks/render-with-providers'
import { screen } from '@testing-library/react'
import App from './App'

describe('<App />', () => {
  it('should render the App', () => {
    const { container } = renderWithProviders(<App />)

    expect(container.firstChild).toBeInTheDocument()
  })

  it('should render the App with the login form', () => {
    renderWithProviders(<App />)

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
  })
})
