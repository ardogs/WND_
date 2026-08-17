import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type TextType = 'secondary' | 'success' | 'warning' | 'danger' | string

export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  type?: TextType
  description?: string
  children?: ReactNode
  strong?: boolean
  italic?: boolean
  underline?: boolean
  delete?: boolean
  code?: boolean
  className?: string
}

export const Text = ({
  type,
  description,
  children,
  strong = false,
  italic = false,
  underline = false,
  delete: isDelete = false,
  code = false,
  className,
  ...rest
}: TextProps) => {
  const content = description !== undefined ? description : children

  let colorClass = 'text-foreground'
  if (type === 'secondary') colorClass = 'text-muted-foreground'
  if (type === 'success') colorClass = 'text-green-600 dark:text-green-400'
  if (type === 'warning') colorClass = 'text-yellow-600 dark:text-yellow-400'
  if (type === 'danger') colorClass = 'text-destructive'

  return (
    <span
      className={cn(
        'text-sm leading-relaxed',
        colorClass,
        strong && 'font-semibold',
        italic && 'italic',
        underline && 'underline',
        isDelete && 'line-through',
        code && 'rounded bg-muted px-1.5 py-0.5 font-mono text-xs',
        className
      )}
      {...rest}
    >
      {content}
    </span>
  )
}
