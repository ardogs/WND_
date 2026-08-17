import React from 'react'
import { Button as ShadcnButton } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type buttonIconClassName = 'red' | 'white' | string

export interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'className'> {
  icon: React.ReactNode
  className?: buttonIconClassName
  size?: 'small' | 'middle' | 'large' | 'sm' | 'default' | 'lg'
  type?: string
  htmlType?: 'button' | 'submit' | 'reset'
  title?: string
}

export const IconButton = ({
  icon,
  className,
  size = 'middle',
  onClick,
  disabled,
  type: _legacyType,
  htmlType = 'button',
  title,
  ...rest
}: IconButtonProps) => {
  const isRed = className === 'red'

  return (
    <ShadcnButton
      type={htmlType}
      variant="ghost"
      size="icon"
      disabled={disabled}
      onClick={onClick}
      title={title}
      className={cn(
        'h-8 w-8 rounded-lg p-0 flex items-center justify-center text-foreground/80 hover:text-foreground hover:bg-muted/90 border border-transparent hover:border-border/60 transition-colors duration-150 cursor-pointer shrink-0',
        isRed && 'hover:bg-destructive hover:text-destructive-foreground hover:border-destructive',
        typeof className === 'string' && !['red', 'white'].includes(className) && className
      )}
      {...rest}
    >
      <span className="text-sm flex items-center justify-center">{icon}</span>
    </ShadcnButton>
  )
}
