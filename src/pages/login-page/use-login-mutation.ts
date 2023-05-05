import axios from 'axios'
import { useMutation } from 'react-query'
import { LoginInputs } from './login-page.interfaces'

const loginService = async (email: string, password: string): Promise<void> => {
  const response = await axios.post('/login', { email, password })
  return response.data
}

export const useLoginMutation = () =>
  useMutation((payload: LoginInputs) =>
    loginService(payload.email, payload.password)
  )
