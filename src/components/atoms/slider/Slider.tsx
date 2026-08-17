import { Slider as ShadcnSlider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

export interface SliderProps {
  min: number
  max: number
  value: number
  handleChange?: (val: number) => void
  onChange?: (val: number) => void
  step?: number
  disabled?: boolean
  className?: string
}

export const Slider = ({
  min,
  max,
  value,
  handleChange,
  onChange,
  step = 1,
  disabled = false,
  className,
}: SliderProps) => {
  const onValueChange = (vals: number[]) => {
    const val = vals[0]
    handleChange?.(val)
    onChange?.(val)
  }

  return (
    <div className={cn('w-full my-1 flex items-center', className)}>
      <ShadcnSlider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={onValueChange}
        disabled={disabled}
      />
    </div>
  )
}
