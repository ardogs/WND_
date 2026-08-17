import { ListdataSource } from './types'
import { cn } from '@/lib/utils'

export interface ListProps {
  data: ListdataSource[]
  className?: string
}

export const List = ({ data, className }: ListProps) => {
  return (
    <div className={cn('divide-y divide-border/50', className)}>
      {data.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between py-2.5 px-1 text-sm transition-colors hover:bg-muted/40 rounded-md"
        >
          <span className="font-medium text-foreground text-xs">{item.title}</span>
          {item.action && <div className="flex-shrink-0">{item.action}</div>}
        </div>
      ))}
    </div>
  )
}