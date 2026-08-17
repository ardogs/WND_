import { Title, TitleLevel } from '../../atoms/title/Title'
import { Text } from '../../atoms/text/Text'
import { cn } from '@/lib/utils'

export interface TitleWithDescriptionProps {
  title: string
  description?: string
  level?: TitleLevel
  className?: string
}

export const TitleWithDescription = ({
  title,
  description,
  level = 1,
  className,
}: TitleWithDescriptionProps) => {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <Title level={level} text={title} />
      {description && (
        <Text type="secondary" className="text-sm text-muted-foreground">
          {description}
        </Text>
      )}
    </div>
  )
}
