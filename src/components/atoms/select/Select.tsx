import React from 'react'
import {
  Select as ShadcnSelect,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { DefaultOptionType } from './types'
import { cn } from '@/lib/utils'

export interface SelectProps {
  handleChange?: (val: string) => void
  onChange?: (val: string) => void
  option?: DefaultOptionType[]
  options?: DefaultOptionType[]
  defaultValue?: string
  value?: string
  disabled?: boolean
  loading?: boolean
  placeholder?: string
  className?: string
  size?: 'small' | 'middle' | 'large'
}

export const Select = ({
  handleChange,
  onChange,
  option,
  options,
  defaultValue,
  value,
  disabled = false,
  placeholder = 'Seleccionar...',
  className,
}: SelectProps) => {
  const items = option || options || []
  const [currentVal, setCurrentVal] = React.useState<string>(value || defaultValue || '')

  React.useEffect(() => {
    if (value !== undefined) {
      setCurrentVal(value)
    } else if (defaultValue !== undefined && !currentVal) {
      setCurrentVal(defaultValue)
    }
  }, [value, defaultValue, currentVal])

  const onValueChange = (newVal: string) => {
    setCurrentVal(newVal)
    handleChange?.(newVal)
    onChange?.(newVal)
  }

  const validItems = items.filter(
    (item) =>
      item &&
      item.value !== undefined &&
      item.value !== null &&
      String(item.value).trim() !== ''
  )

  return (
    <ShadcnSelect
      value={currentVal ? String(currentVal) : undefined}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <SelectTrigger className={cn('w-full bg-background', className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {validItems.length > 0 ? (
          validItems.map((item) => (
            <SelectItem
              key={String(item.value)}
              value={String(item.value)}
              disabled={item.disabled}
            >
              {item.label}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="_empty" disabled>
            Sin opciones
          </SelectItem>
        )}
      </SelectContent>
    </ShadcnSelect>
  )
}
