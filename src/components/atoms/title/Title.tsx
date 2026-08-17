import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type TitleLevel = 1 | 2 | 3 | 4 | 5

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: TitleLevel
  text?: string
  children?: ReactNode
  className?: string
}

export const Title = ({
  level = 1,
  text,
  children,
  className,
  ...rest
}: TitleProps) => {
  const content = text !== undefined ? text : children

  switch (level) {
    case 1:
      return (
        <h1
          className={cn('scroll-m-20 text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl', className)}
          {...rest}
        >
          {content}
        </h1>
      )
    case 2:
      return (
        <h2
          className={cn('scroll-m-20 text-2xl font-bold tracking-tight text-foreground first:mt-0', className)}
          {...rest}
        >
          {content}
        </h2>
      )
    case 3:
      return (
        <h3
          className={cn('scroll-m-20 text-xl font-semibold tracking-tight text-foreground', className)}
          {...rest}
        >
          {content}
        </h3>
      )
    case 4:
      return (
        <h4
          className={cn('scroll-m-20 text-lg font-semibold tracking-tight text-foreground', className)}
          {...rest}
        >
          {content}
        </h4>
      )
    case 5:
    default:
      return (
        <h5
          className={cn('scroll-m-20 text-base font-medium tracking-tight text-foreground', className)}
          {...rest}
        >
          {content}
        </h5>
      )
  }
}
