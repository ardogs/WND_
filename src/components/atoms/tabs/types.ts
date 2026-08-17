import { ReactNode } from 'react'

export interface TabItem {
  key: string
  label: ReactNode
  children?: ReactNode
  icon?: ReactNode
  disabled?: boolean
}

export interface TabsProps {
  tabPosition?: 'top' | 'right' | 'bottom' | 'left'
  items?: TabItem[]
  defaultActiveKey?: string
  activeKey?: string
  onChange?: (activeKey: string) => void
  className?: string
  animated?: boolean | { tabPane?: boolean }
}
