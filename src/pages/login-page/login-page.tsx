import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { loginSchema } from './login-schema'

type Inputs = {
  email: string
  password: string
}

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(loginSchema)
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full max-w-sm items-center gap-1.5">
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

          <button type="submit" name="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
