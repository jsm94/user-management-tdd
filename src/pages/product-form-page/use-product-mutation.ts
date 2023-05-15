import { baseUrl } from '@/config'
import axios from 'axios'
import { useMutation } from 'react-query'
import { ProductFormInputs } from './product-form-page.interfaces'

const productService = async (
  name: string,
  size: string,
  type: string
): Promise<void> => {
  const response = await axios.post(`${baseUrl}/products`, {
    name,
    type,
    size
  })
  return response.data
}

export const useProductMutation = () =>
  useMutation((payload: ProductFormInputs) =>
    productService(payload.name, payload.size, payload.type)
  )
