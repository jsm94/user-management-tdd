'use client'

import { VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'
import { Label } from './label'

const labelVariants = cva('text-red-500')

const LabelError = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <Label ref={ref} className={cn(labelVariants(), className)} {...props} />
))

LabelError.displayName = 'LabelError'

export { LabelError }
