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
import React from 'react'

type CreateProductsInputs = {
  name: HTMLInputElement
  size: HTMLInputElement
  type: HTMLOptionElement
}

const ProductFormPage = () => {
  const [formError, setFormError] = React.useState({
    name: '',
    size: '',
    type: ''
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { name, size, type } = event.currentTarget
      .elements as typeof event.currentTarget.elements & CreateProductsInputs

    if (!name.value) {
      setFormError((prev) => ({
        ...prev,
        name: 'The name is required'
      }))
    }

    if (!size.value) {
      setFormError((prev) => ({
        ...prev,
        size: 'The size is required'
      }))
    }

    if (!type.value) {
      setFormError((prev) => ({
        ...prev,
        type: 'The type is required'
      }))
    }
  }

  return (
    <div className="grid h-screen place-items-center">
      <div className="flex w-96 flex-col gap-10">
        <Typography className="text-center" variant="h1">
          Create Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <InputGroup>
              <InputGroup.Label htmlFor="name">Name</InputGroup.Label>
              <InputGroup.LabelError>{formError.name}</InputGroup.LabelError>
              <InputGroup.Input
                name="name"
                type="text"
                id="name"
                placeholder="Basic t-shirt"
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
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Label htmlFor="type">Type</InputGroup.Label>
              <InputGroup.LabelError>{formError.type}</InputGroup.LabelError>
              <Select>
                <SelectTrigger name="type" id="type" className="w-[180px]">
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
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export { ProductFormPage }
