import { ReactNode, CSSProperties } from 'react'

export interface AnyObject {
  [key: string]: any
}

export interface ColumnType<T = any> {
  title?: ReactNode
  key?: string | number
  dataIndex?: string
  render?: (value: any, record: T, index: number) => ReactNode
  align?: 'left' | 'center' | 'right'
  width?: number | string
  className?: string
}

export type ColumnsType<T = any> = ColumnType<T>[]

export interface TablePaginationConfig {
  current?: number
  pageSize?: number
  total?: number
  showSizeChanger?: boolean
  position?: ('top' | 'bottom' | 'bottomCenter' | 'bottomRight' | 'bottomLeft')[]
  onChange?: (page: number, pageSize: number) => void
}

export interface TableProps<T = any> {
  columns?: ColumnsType<T>
  dataSource?: T[]
  data?: T[]
  loading?: boolean
  pagination?: false | TablePaginationConfig
  scroll?: { x?: number | string; y?: number | string }
  className?: string
  style?: CSSProperties
  rowKey?: string | ((record: T) => string)
  onRow?: (record: T) => { onClick?: () => void; className?: string }
}