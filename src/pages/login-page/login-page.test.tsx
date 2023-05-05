import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { LoginPage } from './login-page'

const getSubmitButton = () => screen.getByRole('button', { name: /submit/i })

test('it should renderr login page', () => {
  render(<LoginPage />)

  expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
})

test('it should renders the form elements', () => {
  render(<LoginPage />)

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  expect(getSubmitButton()).toBeInTheDocument()
})

test('it should validate the inputs as required', async () => {
  render(<LoginPage />)

  userEvent.click(getSubmitButton())

  expect(await screen.findByText(/The email is required/i)).toBeInTheDocument()
  expect(
    await screen.findByText(/The password is required/i)
  ).toBeInTheDocument()
})

test('it should validate email format', async () => {
  render(<LoginPage />)

  userEvent.type(screen.getByLabelText(/email/i), 'invalid-email')

  userEvent.click(getSubmitButton())

  expect(await screen.findByText(/The email is not valid/i)).toBeInTheDocument()
})
