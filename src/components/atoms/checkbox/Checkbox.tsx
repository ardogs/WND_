import { ReactNode } from 'react'
import { Checkbox as ShadcnCheckbox } from '@/components/ui/checkbox'
import { CheckboxChangeEvent } from './types'
import { cn } from '@/lib/utils'

export interface CheckboxProps {
  check?: boolean
  checked?: boolean
  name?: string
  onChange?: (event: CheckboxChangeEvent) => void
  children?: ReactNode
  disabled?: boolean
  className?: string
}

export const Checkbox = ({
  check,
  checked,
  name,
  onChange,
  children,
  disabled = false,
  className,
}: CheckboxProps) => {
  const isChecked = check ?? checked ?? false

  const handleCheckedChange = (state: boolean) => {
    onChange?.({
      target: {
        checked: state,
        name,
      },
    })
  }

  return (
    <label
      className={cn(
        'inline-flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer select-none',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <ShadcnCheckbox
        checked={isChecked}
        onCheckedChange={handleCheckedChange}
        name={name}
        disabled={disabled}
      />
      {children && <span>{children}</span>}
    </label>
  )
}
