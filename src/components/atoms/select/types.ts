import { ReactNode } from 'react'

export interface DefaultOptionType {
  label?: ReactNode
  value?: string | number
  disabled?: boolean
  children?: DefaultOptionType[]
  [key: string]: any
}

export type OptionType = DefaultOptionType