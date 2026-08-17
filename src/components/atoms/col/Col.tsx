import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  span?: number
  offset?: number
  className?: string
}

export const Col = ({
  children,
  span = 24,
  offset = 0,
  className,
  style,
  ...rest
}: ColProps) => {
  const colSpanStyle: React.CSSProperties = {
    ...style,
    gridColumn: offset > 0 ? `${offset + 1} / span ${span}` : `span ${span} / span ${span}`,
  }

  return (
    <div
      className={cn('min-w-0', className)}
      style={colSpanStyle}
      {...rest}
    >
      {children}
    </div>
  )
}
