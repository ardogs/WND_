import React from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { TabsProps } from './types'
import { cn } from '@/lib/utils'

const tabContentVariants: Variants = {
  initial: {
    opacity: 0,
    y: 8,
    scale: 0.995,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.22,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.995,
    transition: {
      duration: 0.14,
      ease: 'easeIn',
    },
  },
}

export const Tabs = ({
  tabPosition = 'top',
  items = [],
  defaultActiveKey,
  activeKey,
  onChange,
  className,
}: TabsProps) => {
  const initialKey = defaultActiveKey || activeKey || (items[0] ? items[0].key : '')
  const [current, setCurrent] = React.useState<string>(initialKey)
  const idRef = React.useId()

  React.useEffect(() => {
    if (activeKey !== undefined) {
      setCurrent(activeKey)
    }
  }, [activeKey])

  const handleValueChange = (val: string) => {
    setCurrent(val)
    onChange?.(val)
  }

  const isVertical = tabPosition === 'left' || tabPosition === 'right'
  const activeItem = items.find((item) => item.key === current) || items[0]

  return (
    <div
      className={cn(
        'w-full',
        isVertical ? 'flex flex-row gap-8 items-start' : 'flex flex-col gap-4',
        className
      )}
    >
      <div
        role="tablist"
        className={cn(
          isVertical
            ? 'flex flex-col h-auto w-60 justify-start items-stretch bg-muted/40 p-1.5 rounded-2xl border border-border/60 space-y-1 shrink-0 select-none'
            : 'h-10 bg-muted/40 p-1 rounded-xl border border-border/60 inline-flex items-center select-none'
        )}
      >
        {items.map((item) => {
          const isActive = current === item.key
          return (
            <button
              key={item.key}
              role="tab"
              aria-selected={isActive}
              disabled={item.disabled}
              onClick={() => handleValueChange(item.key)}
              className={cn(
                'relative px-3.5 py-2.5 text-sm font-medium transition-colors rounded-xl cursor-pointer select-none flex items-center',
                isVertical ? 'w-full text-left' : 'justify-center',
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-card/40'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId={`active-tab-${idRef}`}
                  className="absolute inset-0 bg-card rounded-xl shadow-xs border border-border/60 z-0"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              <span className="relative z-10 inline-flex items-center">
                {item.icon && <span className="mr-2.5 inline-flex items-center">{item.icon}</span>}
                {item.label}
              </span>
            </button>
          )
        })}
      </div>

      <div className={cn(isVertical ? 'flex-1 min-w-0' : 'w-full', 'relative')}>
        <AnimatePresence mode="wait" initial={false}>
          {activeItem && (
            <motion.div
              key={activeItem.key}
              variants={tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full focus-visible:outline-none"
            >
              {activeItem.children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
