import { fireEvent, render, screen } from '@testing-library/react'

import { ProductFormPage } from './product-form-page'

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
