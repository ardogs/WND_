import React, { ReactNode } from 'react'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  description?: ReactNode
  children?: ReactNode
  orientation?: 'left' | 'right' | 'center'
  type?: 'horizontal' | 'vertical'
  dashed?: boolean
  className?: string
}

export const Divider = ({
  description,
  children,
  orientation = 'left',
  type = 'horizontal',
  dashed = false,
  className,
  ...rest
}: DividerProps) => {
  const label = description || children

  if (type === 'vertical') {
    return (
      <Separator
        orientation="vertical"
        className={cn('inline-block mx-2 h-4 align-middle', dashed && 'border-dashed', className)}
      />
    )
  }

  if (!label) {
    return (
      <Separator
        orientation="horizontal"
        className={cn('my-4', dashed && 'border-dashed', className)}
      />
    )
  }

  return (
    <div
      className={cn('relative my-4 flex items-center', className)}
      {...rest}
    >
      <div
        className={cn(
          'flex-grow border-t border-border',
          dashed && 'border-dashed',
          orientation === 'left' && 'max-w-[24px]'
        )}
      />
      <span className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div
        className={cn(
          'flex-grow border-t border-border',
          dashed && 'border-dashed',
          orientation === 'right' && 'max-w-[24px]'
        )}
      />
    </div>
  )
}
