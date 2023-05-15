import { Button } from '@/components/ui/button'
import { InputGroup } from '@/components/ui/input-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'
import { baseUrl } from '@/config'
import axios from 'axios'
import React from 'react'
import { PRODUCT_HTTP_STATUS } from './product-form-page.interfaces'

type CreateProductsInputs = {
  name: HTMLInputElement
  size: HTMLInputElement
  type: HTMLOptionElement
}

const ProductFormPage = () => {
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false)
  const [errorMessage, setErrorMessage] = React.useState<string>('')
  const [typeSelectorValue, setTypeSelectorValue] = React.useState<
    string | undefined
  >()
  const [formError, setFormError] = React.useState({
    name: '',
    size: '',
    type: ''
  })

  const validateField = ({ name, value }: { name: string; value: string }) => {
    setFormError((prev) => ({
      ...prev,
      [name]: value.length ? '' : `The ${name} is required`
    }))
  }

  const validateForm = ({ name, size, type }: CreateProductsInputs) => {
    validateField({ name: name.name, value: name.value })
    validateField({ name: size.name, value: size.value })
    validateField({ name: 'type', value: type.value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsSubmitting(true)

    const { name, size, type } = event.currentTarget
      .elements as typeof event.currentTarget.elements & CreateProductsInputs

    validateForm({ name, size, type })

    try {
      const response = await axios.post(`${baseUrl}/products`, {
        name: name.value,
        size: size.value,
        type: type.value
      })
      if (response.status === PRODUCT_HTTP_STATUS.CREATED) {
        ;(event.target as HTMLFormElement).reset()
        setTypeSelectorValue('')
        setIsSuccess(true)
      }
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError(error) && error?.response?.data?.message) {
        setErrorMessage(error?.response?.data?.message)
      } else {
        setErrorMessage('Unexpected error, please try again')
      }

      setIsSuccess(false)
    }

    setIsSubmitting(false)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    validateField({ name, value })
  }

  return (
    <div className="grid h-screen place-items-center">
      <div className="flex w-96 flex-col gap-10">
        <Typography className="text-center" variant="h1">
          Create Product
        </Typography>
        {isSuccess && <p>Product stored</p>}
        {errorMessage && <p>{errorMessage}</p>}
        <form id="product-form" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <InputGroup>
              <InputGroup.Label htmlFor="name">Name</InputGroup.Label>
              <InputGroup.LabelError>{formError.name}</InputGroup.LabelError>
              <InputGroup.Input
                name="name"
                type="text"
                id="name"
                placeholder="Basic t-shirt"
                onBlur={handleBlur}
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Label htmlFor="size">Size</InputGroup.Label>
              <InputGroup.LabelError>{formError.size}</InputGroup.LabelError>
              <InputGroup.Input
                name="size"
                type="text"
                id="size"
                placeholder="Medium"
                onBlur={handleBlur}
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Label htmlFor="type">Type</InputGroup.Label>
              <InputGroup.LabelError>{formError.type}</InputGroup.LabelError>
              <Select onValueChange={setTypeSelectorValue}>
                <SelectTrigger
                  name="type"
                  id="type"
                  className="w-[180px]"
                  value={typeSelectorValue}
                >
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Type</SelectLabel>
                    <SelectItem value="electronic">Electronic</SelectItem>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </InputGroup>
            <Button
              disabled={isSubmitting}
              loading={isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export { ProductFormPage }
