import React, { ReactNode } from 'react'
import { toast, Toaster } from '@/components/ui/sonner'

export interface AppProps {
  children?: ReactNode
  className?: string
  style?: React.CSSProperties
}

const messageHandler = {
  success: (content: any, _duration?: number) => {
    const text = typeof content === 'object' && content !== null && 'content' in content ? content.content : content
    toast.success(text)
  },
  error: (content: any, _duration?: number) => {
    const text = typeof content === 'object' && content !== null && 'content' in content ? content.content : content
    toast.error(text)
  },
  info: (content: any, _duration?: number) => {
    const text = typeof content === 'object' && content !== null && 'content' in content ? content.content : content
    toast.info(text)
  },
  warning: (content: any, _duration?: number) => {
    const text = typeof content === 'object' && content !== null && 'content' in content ? content.content : content
    toast.warning(text)
  },
  loading: (content: any, _duration?: number) => {
    const text = typeof content === 'object' && content !== null && 'content' in content ? content.content : content
    toast.loading(text)
  },
}

const useApp = () => {
  return {
    message: messageHandler,
    notification: messageHandler,
    modal: {
      confirm: () => {},
      info: () => {},
      success: () => {},
      error: () => {},
      warning: () => {},
    },
  }
}

const AppWrapper: React.FC<AppProps> = ({ children, className, style }) => {
  return (
    <div className={className} style={style}>
      {children}
      <Toaster position="top-right" richColors closeButton />
    </div>
  )
}

export const App = Object.assign(AppWrapper, {
  useApp,
})

export { toast }