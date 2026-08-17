import React, { useState, useMemo, memo } from 'react'
import {
  Table as ShadcnTable,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import { TableProps } from './types'
import { Button } from '../button/Button'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const TableInner = <T extends Record<string, any>>({
  columns = [],
  dataSource,
  data,
  pagination = false,
  scroll,
  className,
  style,
  rowKey = 'key',
  onRow,
}: TableProps<T>) => {
  const rawItems = dataSource || data
  const items = useMemo(() => rawItems || [], [rawItems])

  const [currentPage, setCurrentPage] = useState(
    typeof pagination === 'object' && pagination.current ? pagination.current : 1
  )
  const pageSize =
    typeof pagination === 'object' && pagination.pageSize ? pagination.pageSize : 10

  const total = items.length
  const totalPages = Math.ceil(total / pageSize)

  const paginatedData = useMemo(() => {
    if (pagination === false) return items
    const start = (currentPage - 1) * pageSize
    return items.slice(start, start + pageSize)
  }, [items, pagination, currentPage, pageSize])

  const getRowKey = (record: T, index: number): string => {
    if (typeof rowKey === 'function') return rowKey(record)
    if (typeof rowKey === 'string' && record[rowKey] !== undefined) return String(record[rowKey])
    return String(index)
  }

  const scrollStyle: React.CSSProperties = {}
  if (scroll?.y) {
    scrollStyle.maxHeight = typeof scroll.y === 'number' ? `${scroll.y}px` : scroll.y
    scrollStyle.overflowY = 'auto'
  }
  if (scroll?.x) {
    scrollStyle.maxWidth = typeof scroll.x === 'number' ? `${scroll.x}px` : scroll.x
    scrollStyle.overflowX = 'auto'
  }

  return (
    <div className={cn('w-full flex flex-col gap-3', className)} style={style}>
      <div
        className="rounded-lg border border-border bg-card overflow-hidden"
        style={scrollStyle}
      >
        <ShadcnTable>
          <TableHeader className="bg-muted/40">
            <TableRow>
              {columns.map((col, idx) => {
                const alignClass =
                  col.align === 'right'
                    ? 'text-right'
                    : col.align === 'center'
                    ? 'text-center'
                    : 'text-left'
                return (
                  <TableHead
                    key={String(col.key || col.dataIndex || idx)}
                    className={cn('font-semibold text-foreground/80 py-3', alignClass, col.className)}
                    style={{ width: col.width }}
                  >
                    {col.title}
                  </TableHead>
                )
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length || 1}
                  className="h-24 text-center text-muted-foreground"
                >
                  No hay datos disponibles
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((record, index) => {
                const rowProps = onRow?.(record) || {}
                return (
                  <TableRow
                    key={getRowKey(record, index)}
                    className={cn(
                      'transition-colors hover:bg-muted/50',
                      rowProps.className
                    )}
                    onClick={rowProps.onClick}
                  >
                    {columns.map((col, colIdx) => {
                      const value = col.dataIndex ? record[col.dataIndex] : undefined
                      const primaryArg = value !== undefined ? value : record
                      const cellContent = col.render
                        ? col.render(primaryArg, record, index)
                        : value !== undefined
                        ? String(value)
                        : null
                      const alignClass =
                        col.align === 'right'
                          ? 'text-right'
                          : col.align === 'center'
                          ? 'text-center'
                          : 'text-left'

                      return (
                        <TableCell
                          key={String(col.key || col.dataIndex || colIdx)}
                          className={cn('py-3', alignClass, col.className)}
                        >
                          {cellContent}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </ShadcnTable>
      </div>

      {pagination !== false && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <Button
            type="default"
            size="small"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            icon={<ChevronLeft className="h-4 w-4" />}
          />
          <span className="text-xs text-muted-foreground px-2">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            type="default"
            size="small"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            icon={<ChevronRight className="h-4 w-4" />}
          />
        </div>
      )}
    </div>
  )
}

export const Table = memo(TableInner) as typeof TableInner
