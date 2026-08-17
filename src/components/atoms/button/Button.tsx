import React, { ReactNode } from 'react'
import { Button as ShadcnButton, type ButtonProps as ShadcnButtonProps } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ButtonType = 'primary' | 'default' | 'dashed' | 'link' | 'text' | 'destructive'
export type ButtonSize = 'small' | 'middle' | 'large' | 'sm' | 'default' | 'lg'

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type?: ButtonType
  variant?: string
  color?: string
  htmlType?: 'button' | 'submit' | 'reset'
  text?: string
  children?: ReactNode
  loading?: boolean
  disabled?: boolean
  icon?: ReactNode
  size?: ButtonSize
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const Button = ({
  type = 'default',
  variant,
  color,
  htmlType = 'button',
  text,
  children,
  loading = false,
  disabled = false,
  icon,
  size = 'middle',
  className,
  onClick,
  ...rest
}: ButtonProps) => {
  let shadcnVariant: ShadcnButtonProps['variant'] = 'outline'
  let customClasses = ''

  if (type === 'primary' || variant === 'primary') {
    shadcnVariant = 'default'
  } else if (type === 'destructive' || variant === 'destructive') {
    shadcnVariant = 'destructive'
  } else if (type === 'dashed' || variant === 'dashed') {
    shadcnVariant = 'outline'
    customClasses = 'border-dashed'
  } else if (type === 'link' || variant === 'link') {
    shadcnVariant = 'link'
  } else if (type === 'text' || variant === 'text') {
    shadcnVariant = 'ghost'
  } else {
    shadcnVariant = 'outline'
  }

  let mappedSize: ShadcnButtonProps['size'] = 'default'
  if (size === 'small' || size === 'sm') mappedSize = 'sm'
  if (size === 'large' || size === 'lg') mappedSize = 'lg'

  return (
    <ShadcnButton
      type={htmlType}
      variant={shadcnVariant}
      size={mappedSize}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn('font-medium cursor-pointer transition-all', customClasses, className)}
      {...rest}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!loading && icon && <span className="mr-1.5 inline-flex items-center">{icon}</span>}
      {text || children}
    </ShadcnButton>
  )
}
