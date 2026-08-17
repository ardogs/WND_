import * as React from 'react'
import { Input as ShadcnInput } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'size'> {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  status?: 'error' | 'warning' | ''
  size?: 'small' | 'middle' | 'large'
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, prefix, suffix, status, size, ...props }, ref) => {
    const sizeClasses = {
      small: 'h-8 text-xs px-2.5',
      middle: 'h-9 text-sm px-3',
      large: 'h-10 text-base px-3.5',
    }

    const appliedSize = size ? sizeClasses[size] : 'h-9 text-sm px-3'

    if (prefix || suffix) {
      return (
        <div
          className={cn(
            'flex w-full items-center rounded-md border border-input bg-background shadow-xs transition-colors focus-within:ring-1 focus-within:ring-ring',
            appliedSize,
            status === 'error' && 'border-destructive focus-within:ring-destructive',
            className
          )}
        >
          {prefix && <span className="mr-2 text-muted-foreground flex items-center">{prefix}</span>}
          <input
            ref={ref}
            className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            {...props}
          />
          {suffix && <span className="ml-2 text-muted-foreground flex items-center">{suffix}</span>}
        </div>
      )
    }

    return (
      <ShadcnInput
        ref={ref}
        className={cn(
          status === 'error' && 'border-destructive focus-visible:ring-destructive',
          size && sizeClasses[size],
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'
