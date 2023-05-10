import * as React from 'react'

import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { Input } from './input'
import { Label } from './label'
import { LabelError } from './label-error'

// eslint-disable-next-line tailwindcss/no-custom-classname
const inputVariants = cva([], {
  variants: {
    variant: {
      error:
        'focus-visible:border-input border-rose-400 text-rose-400 focus-visible:ring-rose-400'
    }
  }
})

type InputGroupComponent = {
  className?: string
  children: React.ReactNode
}

const InputGroup = ({ className, children }: InputGroupComponent) => {
  const childrenArray = React.Children.toArray(children)
  const label = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === Label
  )

  const labelError = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === LabelError
  )

  const input = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === Input
  )
  console.log(labelError)
  const cvaClasses =
    React.isValidElement(labelError) && labelError.props.children
      ? inputVariants({ variant: 'error' })
      : ''

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="flex justify-between">
        <>
          {label}
          {labelError}
        </>
      </div>
      <>
        {React.cloneElement(input as React.ReactElement, {
          className: cn(
            cvaClasses,
            React.isValidElement(input) && input?.props.className
          )
        })}
      </>
    </div>
  )
}

InputGroup.Label = Label
InputGroup.LabelError = LabelError
InputGroup.Input = Input

InputGroup.displayName = 'InputGroup'

export { Input, InputGroup }
