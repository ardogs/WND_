import React, { useState, useMemo, useEffect } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface DatePickerProps {
  value?: string | Date | any
  onChange?: (date: any, dateString?: string) => void
  disabled?: boolean
  className?: string
  status?: 'error' | 'warning' | ''
  size?: 'small' | 'middle' | 'large'
  placeholder?: string
}

const MONTH_NAMES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]

const WEEKDAY_NAMES = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá']

function parseDateValue(val: any): Date | null {
  if (!val) return null
  if (val instanceof Date && !isNaN(val.getTime())) return val
  if (typeof val === 'string') {
    const cleanStr = val.includes('T') ? val.split('T')[0] : val
    const parts = cleanStr.split('-')
    if (parts.length === 3) {
      const y = parseInt(parts[0], 10)
      const m = parseInt(parts[1], 10) - 1
      const d = parseInt(parts[2], 10)
      const date = new Date(y, m, d)
      if (!isNaN(date.getTime())) return date
    }
    const parsed = new Date(val)
    if (!isNaN(parsed.getTime())) return parsed
  }
  return null
}

function formatDateToISO(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function formatDateToDisplay(date: Date): string {
  const d = String(date.getDate()).padStart(2, '0')
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const y = date.getFullYear()
  return `${d}/${m}/${y}`
}

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      disabled = false,
      className,
      status,
      size,
      placeholder = 'Seleccionar fecha',
    },
    ref
  ) => {
    const [open, setOpen] = useState(false)
    const parsedDate = useMemo(() => parseDateValue(value), [value])

    const [viewDate, setViewDate] = useState<Date>(() => parsedDate || new Date())

    useEffect(() => {
      if (parsedDate) {
        setViewDate(parsedDate)
      }
    }, [parsedDate])

    const currentYear = viewDate.getFullYear()
    const currentMonth = viewDate.getMonth()

    const handlePrevMonth = (e: React.MouseEvent) => {
      e.stopPropagation()
      setViewDate(new Date(currentYear, currentMonth - 1, 1))
    }

    const handleNextMonth = (e: React.MouseEvent) => {
      e.stopPropagation()
      setViewDate(new Date(currentYear, currentMonth + 1, 1))
    }

    const handleSelectDay = (day: number) => {
      const selected = new Date(currentYear, currentMonth, day)
      const isoStr = formatDateToISO(selected)
      onChange?.(isoStr, isoStr)
      setOpen(false)
    }

    const handleSelectToday = () => {
      const today = new Date()
      const isoStr = formatDateToISO(today)
      onChange?.(isoStr, isoStr)
      setViewDate(today)
      setOpen(false)
    }

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation()
      onChange?.('', '')
    }

    // Build calendar matrix
    const calendarDays = useMemo(() => {
      const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay()
      const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
      const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate()

      const days: { day: number; isCurrentMonth: boolean; dateObj: Date }[] = []

      // Previous month trailing days
      for (let i = firstDayIndex - 1; i >= 0; i--) {
        const d = daysInPrevMonth - i
        days.push({
          day: d,
          isCurrentMonth: false,
          dateObj: new Date(currentYear, currentMonth - 1, d),
        })
      }

      // Current month days
      for (let i = 1; i <= daysInCurrentMonth; i++) {
        days.push({
          day: i,
          isCurrentMonth: true,
          dateObj: new Date(currentYear, currentMonth, i),
        })
      }

      // Next month leading days (to complete 42 cells or 35 cells)
      const remaining = 42 - days.length
      for (let i = 1; i <= remaining; i++) {
        days.push({
          day: i,
          isCurrentMonth: false,
          dateObj: new Date(currentYear, currentMonth + 1, i),
        })
      }

      return days
    }, [currentYear, currentMonth])

    const todayStr = useMemo(() => formatDateToISO(new Date()), [])
    const selectedStr = useMemo(() => (parsedDate ? formatDateToISO(parsedDate) : ''), [parsedDate])

    const sizeClasses = {
      small: 'h-8 text-xs px-2.5',
      middle: 'h-9 text-sm px-3',
      large: 'h-10 text-base px-3.5',
    }

    return (
      <div ref={ref} className="relative w-full">
        <Popover open={open} onOpenChange={disabled ? undefined : setOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              disabled={disabled}
              className={cn(
                'flex w-full items-center justify-between rounded-md border border-input bg-background py-1 text-sm shadow-xs transition-colors cursor-pointer select-none text-left',
                'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/50',
                size ? sizeClasses[size] : 'h-9 px-3',
                status === 'error' && 'border-destructive focus-visible:ring-destructive text-destructive',
                className
              )}
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <CalendarIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                <span
                  className={cn(
                    'truncate',
                    !parsedDate ? 'text-muted-foreground' : 'text-foreground font-medium'
                  )}
                >
                  {parsedDate ? formatDateToDisplay(parsedDate) : placeholder}
                </span>
              </div>

              {parsedDate && !disabled && (
                <span
                  role="button"
                  onClick={handleClear}
                  className="p-0.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </span>
              )}
            </button>
          </PopoverTrigger>

          <PopoverContent
            align="start"
            sideOffset={6}
            className="w-[280px] p-3 bg-popover/95 backdrop-blur-md border border-border shadow-xl rounded-2xl select-none"
          >
            {/* Header: Month & Year navigation */}
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-sm font-semibold text-foreground tracking-tight">
                {MONTH_NAMES[currentMonth]} {currentYear}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="w-7 h-7 flex items-center justify-center rounded-lg border border-border/70 hover:bg-muted text-foreground transition-colors cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="w-7 h-7 flex items-center justify-center rounded-lg border border-border/70 hover:bg-muted text-foreground transition-colors cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Weekdays header */}
            <div className="grid grid-cols-7 gap-1 text-center mb-1">
              {WEEKDAY_NAMES.map((weekday, i) => (
                <div
                  key={i}
                  className="text-[11px] font-semibold text-muted-foreground py-1"
                >
                  {weekday}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((item, index) => {
                const itemIso = formatDateToISO(item.dateObj)
                const isSelected = selectedStr === itemIso
                const isToday = todayStr === itemIso

                return (
                  <button
                    key={index}
                    type="button"
                    disabled={!item.isCurrentMonth}
                    onClick={() => item.isCurrentMonth && handleSelectDay(item.day)}
                    className={cn(
                      'h-8 w-8 text-xs rounded-lg flex items-center justify-center transition-colors cursor-pointer font-medium',
                      !item.isCurrentMonth && 'opacity-25 pointer-events-none text-muted-foreground',
                      item.isCurrentMonth && !isSelected && 'text-foreground hover:bg-secondary',
                      isToday && !isSelected && 'border border-primary/50 text-primary font-bold',
                      isSelected && 'bg-primary text-primary-foreground font-semibold shadow-xs hover:bg-primary/90'
                    )}
                  >
                    {item.day}
                  </button>
                )
              })}
            </div>

            {/* Quick Actions Footer */}
            <div className="mt-3 pt-2.5 border-t border-border/60 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={handleSelectToday}
                className="font-medium text-primary hover:underline cursor-pointer py-0.5 px-1 rounded transition-colors"
              >
                Hoy
              </button>
              {parsedDate && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="font-medium text-muted-foreground hover:text-destructive cursor-pointer py-0.5 px-1 rounded transition-colors"
                >
                  Limpiar
                </button>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    )
  }
)
DatePicker.displayName = 'DatePicker'
