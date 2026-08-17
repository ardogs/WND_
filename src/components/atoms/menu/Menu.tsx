import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

export interface MenuItem {
  key?: string | number
  label?: React.ReactNode
  to?: string
  disabled?: boolean
  onClick?: () => void
  icon?: React.ReactNode
}

export interface MenuProps {
  items?: MenuItem[] | any[]
  className?: string
}

const getSelectedKey = (pathname: string): string => {
  if (pathname === '/') return 'home'
  if (pathname.includes('/quotation')) return 'quotations'
  if (pathname.includes('/invoice')) return 'invoices'
  if (pathname.includes('/compan')) return 'companies'
  return ''
}

export const Menu = ({ items = [], className }: MenuProps) => {
  const location = useLocation()
  const [current, setCurrent] = useState<string>('')

  useEffect(() => {
    const currentPath = getSelectedKey(location.pathname)
    setCurrent(currentPath)
  }, [location.pathname])

  return (
    <nav className={cn('flex items-center gap-1.5', className)}>
      {items.map((item) => {
        if (!item) return null
        const key = String(item.key || '')
        const isActive = current === key

        const itemContent = (
          <>
            {item.icon && <span className="text-sm">{item.icon}</span>}
            <span>{typeof item.label === 'string' ? item.label : item.label}</span>
          </>
        )

        const itemClasses = cn(
          'h-8 px-3.5 text-xs font-semibold rounded-lg border transition-colors duration-150 flex items-center justify-center gap-1.5 select-none cursor-pointer shrink-0',
          isActive
            ? 'bg-primary text-primary-foreground border-primary'
            : 'text-foreground/80 hover:text-foreground hover:bg-muted/80 bg-muted/30 border-border/40 hover:border-border/80',
          item.disabled && 'opacity-50 pointer-events-none'
        )

        if (item.to) {
          return (
            <Link
              key={key}
              to={item.to}
              onClick={item.onClick}
              className={itemClasses}
            >
              {itemContent}
            </Link>
          )
        }

        return (
          <button
            key={key}
            type="button"
            onClick={item.onClick}
            className={itemClasses}
          >
            {itemContent}
          </button>
        )
      })}
    </nav>
  )
}
