import { ReactNode, CSSProperties } from 'react'

export interface StepItem {
  key?: string | number
  title?: ReactNode
  description?: ReactNode
  icon?: ReactNode
  disabled?: boolean
}

export interface StepsProps {
  current?: number
  status?: 'wait' | 'process' | 'finish' | 'error'
  items?: StepItem[]
  size?: 'small' | 'default'
  className?: string
  style?: CSSProperties
  onChange?: (current: number) => void
}