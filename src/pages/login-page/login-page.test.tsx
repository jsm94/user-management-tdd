import { render, screen } from '@testing-library/react'

import { LoginPage } from './login-page'

test('it should renderr login page', () => {
  render(<LoginPage />)

  expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
})

test('it should renders the form elements', () => {
  render(<LoginPage />)

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
})
