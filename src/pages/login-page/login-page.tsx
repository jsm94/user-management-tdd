import { Button } from '@/components/ui/button'
import { InputGroup } from '@/components/ui/input-group'
import { Typography } from '@/components/ui/typography'
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
    <div className="grid h-screen place-items-center">
      <div className="flex w-96 flex-col gap-10">
        <Typography className="text-center" variant="h1">
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
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

            <InputGroup>
              <InputGroup.Label htmlFor="email">Email</InputGroup.Label>
              <InputGroup.LabelError>
                {errors?.email?.message}
              </InputGroup.LabelError>
              <InputGroup.Input
                type="email"
                id="email"
                placeholder="your@email.com"
                {...register('email', { required: true })}
              />
            </InputGroup>

            <InputGroup>
              <InputGroup.Label htmlFor="password">Password</InputGroup.Label>
              <InputGroup.LabelError>
                {errors?.password?.message}
              </InputGroup.LabelError>
              <InputGroup.Input
                type="password"
                id="password"
                placeholder="********"
                {...register('password', { required: true })}
              />
            </InputGroup>

            <Button type="submit" name="submit" disabled={isLoading}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
