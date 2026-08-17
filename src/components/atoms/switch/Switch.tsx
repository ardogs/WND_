import { ReactNode } from 'react'
import { Switch as ShadcnSwitch } from '@/components/ui/switch'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SwitchOrigin {
  x: number
  y: number
}

export interface SwitchProps {
  loading?: boolean
  isChecked?: boolean
  checked?: boolean
  handleOnChange?: (checked: boolean, event?: React.MouseEvent, origin?: SwitchOrigin) => void
  onChange?: (checked: boolean, event?: React.MouseEvent, origin?: SwitchOrigin) => void
  checkedChildren?: ReactNode
  unCheckedChildren?: ReactNode
  disabled?: boolean
  className?: string
}

export const Switch = ({
  loading = false,
  isChecked,
  checked,
  handleOnChange,
  onChange,
  checkedChildren,
  unCheckedChildren,
  disabled = false,
  className,
}: SwitchProps) => {
  const currentChecked = isChecked ?? checked ?? false

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) return
    const rect = e.currentTarget?.getBoundingClientRect?.()
    const origin: SwitchOrigin = {
      x: e.clientX > 0 ? e.clientX : (rect ? rect.left + rect.width / 2 : window.innerWidth / 2),
      y: e.clientY > 0 ? e.clientY : (rect ? rect.top + rect.height / 2 : window.innerHeight / 2),
    }
    const newChecked = !currentChecked
    handleOnChange?.(newChecked, e, origin)
    onChange?.(newChecked, e, origin)
  }

  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <ShadcnSwitch
        checked={currentChecked}
        onClick={handleClick}
        disabled={disabled || loading}
      />
      {loading && <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />}
      {!loading && (
        <span className="text-xs text-muted-foreground select-none">
          {currentChecked ? checkedChildren : unCheckedChildren}
        </span>
      )}
    </div>
  )
}

