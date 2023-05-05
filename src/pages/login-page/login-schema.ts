import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  email: yup.string().email().required('The email is required'),
  password: yup.string().required('The password is required')
})
