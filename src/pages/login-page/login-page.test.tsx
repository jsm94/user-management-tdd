import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithProviders } from '@/mocks/render-with-providers'
import { LoginPage } from './login-page'

const getSubmitButton = () => screen.getByRole('button', { name: /submit/i })

test('it should renderr login page', () => {
  renderWithProviders(<LoginPage />)

  expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
})

test('it should renders the form elements', () => {
  renderWithProviders(<LoginPage />)

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  expect(getSubmitButton()).toBeInTheDocument()
})

test('it should validate the inputs as required', async () => {
  renderWithProviders(<LoginPage />)

  userEvent.click(getSubmitButton())

  expect(await screen.findByText(/The email is required/i)).toBeInTheDocument()
  expect(
    await screen.findByText(/The password is required/i)
  ).toBeInTheDocument()
})

test('it should validate email format', async () => {
  renderWithProviders(<LoginPage />)

  userEvent.type(screen.getByLabelText(/email/i), 'invalid-email')

  userEvent.click(getSubmitButton())

  expect(await screen.findByText(/The email is not valid/i)).toBeInTheDocument()
})

test('it should disable the submit button while submitting', async () => {
  renderWithProviders(<LoginPage />)

  expect(getSubmitButton()).not.toBeDisabled()

  await userEvent.type(screen.getByLabelText(/email/i), 'johndoe@domain.com')
  await userEvent.type(screen.getByLabelText(/password/i), '123456')

  await userEvent.click(getSubmitButton())

  expect(getSubmitButton()).toBeDisabled()
})

test('it should show a loading indicator while submitting', async () => {
  renderWithProviders(<LoginPage />)

  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()

  await userEvent.type(screen.getByLabelText(/email/i), 'johndoe@domain.com')
  await userEvent.type(screen.getByLabelText(/password/i), '123456')

  await userEvent.click(getSubmitButton())

  expect(
    await screen.findByRole('progressbar', { name: /loading/i })
  ).toBeInTheDocument()
})
