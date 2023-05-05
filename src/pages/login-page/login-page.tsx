import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LoginErrorMessages, LoginInputs } from './login-page.interfaces'
import { loginSchema } from './login-schema'
import { useLoginMutation } from './use-login-mutation'

const errorMessages: LoginErrorMessages = {
  401: 'The email or password are not correct',
  500: 'Unexpected error, please try again'
}

export const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState<string>('')

  const mutation = useLoginMutation()

  const { isLoading } = mutation

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInputs>({
    resolver: yupResolver(loginSchema)
  })

  const onSubmit: SubmitHandler<LoginInputs> = async ({ email, password }) => {
    mutation.mutate(
      { email, password },
      {
        onError: (error) => {
          let internalErrorMessage = 'Unexpected error, please try again'
          if (axios.isAxiosError(error) && error?.response?.status)
            internalErrorMessage = errorMessages[error.response.status]

          setErrorMessage(internalErrorMessage)
        }
      }
    )
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          {isLoading && (
            <p role="progressbar" aria-label="loading">
              Loading...
            </p>
          )}

          {errorMessage && (
            <p role="alert" aria-label="error">
              {errorMessage}
            </p>
          )}

          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            {...register('email', { required: true })}
          />
          {errors?.email && <p>{errors?.email?.message}</p>}

          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            {...register('password', { required: true })}
          />
          {errors?.password && <p>{errors?.password?.message}</p>}

          <button type="submit" name="submit" disabled={isLoading}>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
