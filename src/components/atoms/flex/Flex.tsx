import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'flex-start' | 'flex-end'
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch' | 'flex-start' | 'flex-end'
  vertical?: boolean
  gap?: number | string | 'small' | 'middle' | 'large'
  wrap?: boolean | 'wrap' | 'nowrap' | 'wrap-reverse'
  className?: string
}

const justifyMap: Record<string, string> = {
  start: 'justify-start',
  'flex-start': 'justify-start',
  end: 'justify-end',
  'flex-end': 'justify-end',
  center: 'justify-center',
  'space-between': 'justify-between',
  'space-around': 'justify-around',
  'space-evenly': 'justify-evenly',
}

const alignMap: Record<string, string> = {
  start: 'items-start',
  'flex-start': 'items-start',
  end: 'items-end',
  'flex-end': 'items-end',
  center: 'items-center',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
}

export const Flex = ({
  children,
  justify,
  align,
  vertical = false,
  gap,
  wrap,
  className,
  style,
  ...rest
}: FlexProps) => {
  const justifyClass = justify ? (justifyMap[justify] || '') : ''
  const alignClass = align ? (alignMap[align] || '') : ''
  const directionClass = vertical ? 'flex-col' : 'flex-row'

  let gapClass = ''
  let customStyle = { ...style }

  if (typeof gap === 'number') {
    customStyle = { ...customStyle, gap: `${gap}px` }
  } else if (gap === 'small') {
    gapClass = 'gap-2'
  } else if (gap === 'middle') {
    gapClass = 'gap-4'
  } else if (gap === 'large') {
    gapClass = 'gap-6'
  } else if (typeof gap === 'string') {
    customStyle = { ...customStyle, gap }
  }

  let wrapClass = ''
  if (wrap === true || wrap === 'wrap') wrapClass = 'flex-wrap'
  if (wrap === 'nowrap') wrapClass = 'flex-nowrap'
  if (wrap === 'wrap-reverse') wrapClass = 'flex-wrap-reverse'

  return (
    <div
      className={cn(
        'flex',
        directionClass,
        justifyClass,
        alignClass,
        gapClass,
        wrapClass,
        className
      )}
      style={customStyle}
      {...rest}
    >
      {children}
    </div>
  )
}
