import React, { ReactNode } from 'react'
import {
  Card as ShadcnCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

export interface CardMetaProps {
  title?: ReactNode
  description?: ReactNode
  avatar?: ReactNode
  className?: string
}

const Meta = ({ title, description, avatar, className }: CardMetaProps) => (
  <div className={cn('flex items-center space-x-3', className)}>
    {avatar && <div className="flex-shrink-0">{avatar}</div>}
    <div>
      {title && <div className="font-semibold text-foreground">{title}</div>}
      {description && <div className="text-sm text-muted-foreground">{description}</div>}
    </div>
  </div>
)

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode
  extra?: ReactNode
  children?: ReactNode
  hoverable?: boolean
  bordered?: boolean
}

export const CardComponent = ({
  title,
  extra,
  children,
  hoverable = false,
  bordered = true,
  className,
  ...rest
}: CardProps) => {
  return (
    <ShadcnCard
      className={cn(
        'rounded-2xl transition-all duration-200 shadow-sm border bg-card text-card-foreground',
        !bordered && 'border-transparent',
        hoverable && 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer',
        className
      )}
      {...rest}
    >
      {(title || extra) && (
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 pt-5 px-6">
          {title && <CardTitle className="text-base font-semibold">{title}</CardTitle>}
          {extra && <div className="text-sm">{extra}</div>}
        </CardHeader>
      )}
      {children && <CardContent className={cn('px-6 pb-5', (title || extra) ? 'pt-0' : 'pt-5')}>{children}</CardContent>}
    </ShadcnCard>
  )
}

export const Card = Object.assign(CardComponent, {
  Meta,
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
})
