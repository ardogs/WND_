import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputNumberProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'min' | 'max' | 'size'> {
  value?: number | string | null
  onChange?: (value: number | null) => void
  min?: number
  max?: number
  controls?: boolean
  formatter?: (value: number | string | undefined) => string
  parser?: (displayValue: string | undefined) => number
  status?: 'error' | 'warning' | ''
  size?: 'small' | 'middle' | 'large'
}

export const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(
  (
    {
      className,
      value,
      onChange,
      min = 0,
      max = 100000000,
      controls: _controls = false,
      status,
      disabled,
      size,
      ...rest
    },
    ref
  ) => {
    const formatNumber = (val: number | string | null | undefined): string => {
      if (val === undefined || val === null || val === '') return ''
      const numStr = String(val).replace(/,/g, '')
      const num = Number(numStr)
      if (isNaN(num)) return String(val)
      return num.toLocaleString('en-US')
    }

    const [displayVal, setDisplayVal] = React.useState<string>(formatNumber(value))

    React.useEffect(() => {
      setDisplayVal(formatNumber(value))
    }, [value])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/,/g, '').trim()
      if (raw === '') {
        setDisplayVal('')
        onChange?.(null)
        return
      }

      const parsed = Number(raw)
      if (!isNaN(parsed)) {
        let clamped = parsed
        if (min !== undefined && clamped < min) clamped = min
        if (max !== undefined && clamped > max) clamped = max
        setDisplayVal(formatNumber(clamped))
        onChange?.(clamped)
      }
    }

    const sizeClasses = {
      small: 'h-8 text-xs px-2.5',
      middle: 'h-9 text-sm px-3',
      large: 'h-10 text-base px-3.5',
    }

    return (
      <input
        ref={ref}
        type="text"
        inputMode="numeric"
        disabled={disabled}
        value={displayVal}
        onChange={handleInputChange}
        className={cn(
          'flex w-full rounded-md border border-input bg-background text-sm shadow-xs transition-colors text-right placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/50',
          size ? sizeClasses[size] : 'h-9 px-3',
          status === 'error' && 'border-destructive focus-visible:ring-destructive',
          className
        )}
        {...rest}
      />
    )
  }
)
InputNumber.displayName = 'InputNumber'
