import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

export const LoginPage = () => {
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { email, password } = event.currentTarget
      .elements as typeof event.currentTarget.elements & {
      email: HTMLInputElement
      password: HTMLInputElement
    }

    if (!email.value) setEmailErrorMessage('The email is required')
    if (!password.value) setPasswordErrorMessage('The password is required')
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input type="email" name="email" id="email" placeholder="Email" />
          {emailErrorMessage && <p>{emailErrorMessage}</p>}

          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          {passwordErrorMessage && <p>{passwordErrorMessage}</p>}

          <button type="submit" name="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
