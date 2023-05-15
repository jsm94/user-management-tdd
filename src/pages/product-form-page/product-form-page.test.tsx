import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { baseUrl } from '@/config'
import { server } from '@/mocks/server'
import { rest } from 'msw'
import { ProductFormPage } from './product-form-page'

const mockServerWithError = (statusCode: number, message: string) =>
  server.use(
    rest.post(`${baseUrl}/products`, (req, res, ctx) =>
      res(ctx.status(statusCode), ctx.json({ message }))
    )
  )

describe('when the form is mounted', () => {
  beforeEach(() => {
    render(<ProductFormPage />)
  })

  it('it should render the create product form page', () => {
    expect(
      screen.getByRole('heading', { name: /create product/i })
    ).toBeInTheDocument()
  })

  it('it should render the form elements: name, size, type (electronic, furniture, clothing)', () => {
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/size/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/type/i)).toBeInTheDocument()

    expect(screen.queryByText(/electronic/i)).toBeInTheDocument()
    expect(screen.queryByText(/furniture/i)).toBeInTheDocument()
    expect(screen.queryByText(/clothing/i)).toBeInTheDocument()
  })

  it('it should render the submit button', () => {
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
  })
})

describe('when the form is submitted', () => {
  beforeEach(() => {
    render(<ProductFormPage />)
  })

  it('it should display validation messages', () => {
    const submitButton = screen.getByRole('button', { name: /submit/i })

    expect(screen.queryByText(/the name is required/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/the size is required/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/the type is required/i)).not.toBeInTheDocument()

    fireEvent.click(submitButton)

    expect(screen.getByText(/the name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/the size is required/i)).toBeInTheDocument()
    expect(screen.getByText(/the type is required/i)).toBeInTheDocument()
  })
})

describe('when the user blurs an empty input field', () => {
  it('it should display a validation message', () => {
    render(<ProductFormPage />)

    const nameInput = screen.getByLabelText(/name/i)
    const sizeInput = screen.getByLabelText(/size/i)

    fireEvent.blur(nameInput, { target: { value: '' } })
    fireEvent.blur(sizeInput, { target: { value: '' } })

    expect(screen.getByText(/the name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/the size is required/i)).toBeInTheDocument()
  })
})

describe('when the user submits the form with valid data', () => {
  it('should the submit button be disabled until the request is done', async () => {
    render(<ProductFormPage />)

    const submitButton = screen.getByRole('button', { name: /submit/i })

    expect(submitButton).toBeEnabled()

    fireEvent.click(submitButton)

    expect(submitButton).toBeDisabled()

    await waitFor(() => {
      expect(submitButton).toBeEnabled()
    })
  })

  it('should shows a success message "Product stored" and clean the form', async () => {
    render(<ProductFormPage />)

    const submitButton = screen.getByRole('button', { name: /submit/i })
    const nameInput = screen.getByLabelText(/name/i)
    const sizeInput = screen.getByLabelText(/size/i)
    const typeInput = screen.getByLabelText(/type/i)

    fireEvent.change(nameInput, { target: { value: 'Product 1' } })
    fireEvent.change(sizeInput, { target: { value: '10' } })
    fireEvent.change(typeInput, { target: { value: 'electronic' } })

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/product stored/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/name/i)).toHaveValue('')
      expect(screen.getByLabelText(/size/i)).toHaveValue('')
      expect(screen.getByLabelText(/type/i)).toHaveValue('')
    })
  })
})

describe('when the user submits the form and the server returns an unexpected error', () => {
  it('should shows an error message "Unexpected error, please try again"', async () => {
    render(<ProductFormPage />)

    const submitButton = screen.getByRole('button', { name: /submit/i })

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(
        screen.getByText(/unexpected error, please try again/i)
      ).toBeInTheDocument()
    })
  })
})

describe('when the user submits the form and the server returns a validation error', () => {
  it('should shows a validation error message "The form is invalid, please check the required fields"', async () => {
    mockServerWithError(
      400,
      'The form is invalid, please check the required fields'
    )

    render(<ProductFormPage />)

    const submitButton = screen.getByRole('button', { name: /submit/i })

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(
        screen.getByText(
          /the form is invalid, please check the required fields/i
        )
      ).toBeInTheDocument()
    })
  })
})
