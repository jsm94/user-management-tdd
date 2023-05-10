import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import React from 'react'

const typographyVariants = cva([], {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      p: 'leading-7 [&:not(:first-child)]:mt-6'
    }
  }
})

export type TypographyProps = React.AllHTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof typographyVariants>

const Typography = ({
  className,
  children,
  variant,
  ...props
}: TypographyProps) => {
  const Tag = variant || 'p'

  const cvaClasses = typographyVariants({ variant })

  return (
    <Tag className={cn(cvaClasses, className)} {...props}>
      {children}
    </Tag>
  )
}

Typography.displayName = 'Typography'

export { Typography }
