import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  gutter?: number | [number, number]
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'
  align?: 'top' | 'middle' | 'bottom' | 'stretch'
  className?: string
}

const justifyMap: Record<string, string> = {
  start: 'justify-start',
  end: 'justify-end',
  center: 'justify-center',
  'space-between': 'justify-between',
  'space-around': 'justify-around',
  'space-evenly': 'justify-evenly',
}

const alignMap: Record<string, string> = {
  top: 'items-start',
  middle: 'items-center',
  bottom: 'items-end',
  stretch: 'items-stretch',
}

export const Row = ({
  children,
  gutter = 16,
  justify = 'start',
  align = 'top',
  className,
  style,
  ...rest
}: RowProps) => {
  const gutterX = Array.isArray(gutter) ? gutter[0] : gutter
  const gutterY = Array.isArray(gutter) ? gutter[1] : 0

  const rowStyle: React.CSSProperties = {
    ...style,
    rowGap: gutterY ? `${gutterY}px` : undefined,
  }

  const justifyClass = justifyMap[justify] || 'justify-start'
  const alignClass = alignMap[align] || 'items-start'

  return (
    <div
      className={cn('grid grid-cols-24 w-full', justifyClass, alignClass, className)}
      style={{ ...rowStyle, columnGap: `${gutterX}px` }}
      {...rest}
    >
      {children}
    </div>
  )
}
