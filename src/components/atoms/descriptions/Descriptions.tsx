import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface DescriptionsItemProps {
  label?: ReactNode
  children?: ReactNode
  span?: number
  className?: string
}

export const DescriptionsItem: React.FC<DescriptionsItemProps> = ({
  label,
  children,
  className,
}) => {
  return (
    <div className={cn('p-3.5 border-b border-r border-border/70 last:border-b-0 flex flex-col justify-center', className)}>
      {label && (
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
          {label}
        </span>
      )}
      <div className="text-sm font-medium text-foreground break-words">
        {children || '-'}
      </div>
    </div>
  )
}
DescriptionsItem.displayName = 'Descriptions.Item'

export interface DescriptionsProps {
  title?: ReactNode
  bordered?: boolean
  layout?: 'horizontal' | 'vertical'
  column?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number }
  className?: string
  style?: React.CSSProperties
  children?: ReactNode
}

const DescriptionsWrapper: React.FC<DescriptionsProps> = ({
  title,
  bordered = true,
  className,
  style,
  children,
}) => {
  return (
    <div
      className={cn(
        'w-full rounded-xl bg-card text-card-foreground overflow-hidden',
        bordered && 'border border-border/70 shadow-xs',
        className
      )}
      style={style}
    >
      {title && (
        <div className="px-4 py-3 border-b border-border/70 font-semibold text-sm text-foreground bg-muted/40">
          {title}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t-0">
        {children}
      </div>
    </div>
  )
}

export const Descriptions = Object.assign(DescriptionsWrapper, {
  Item: DescriptionsItem,
})
