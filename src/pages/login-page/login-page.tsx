import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Inputs } from './login-page.interfaces'
import { loginSchema } from './login-schema'
import { useLoginMutation } from './use-login-mutation'

export const LoginPage = () => {
  const mutation = useLoginMutation()

  const { isLoading } = mutation

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(loginSchema)
  })

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    mutation.mutate({ email, password })
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
