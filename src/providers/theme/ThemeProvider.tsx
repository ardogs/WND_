import { ReactNode, useEffect } from 'react'
import { useSettingsStore } from '../../store/settings/useSettingStore'
import { Toaster } from '@/components/ui/sonner'

interface Props {
  children: ReactNode
}

export const ThemeProvider = ({ children }: Props) => {
  const darkmode = useSettingsStore((state) => state.darkmode)
  const fontSize = useSettingsStore((state) => state.fontSize)

  useEffect(() => {
    const root = document.documentElement
    if (darkmode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [darkmode])

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`
  }, [fontSize])

  return (
    <div
      id="wnd-theme-root"
      className="h-full w-full bg-background text-foreground"
      style={{ fontSize: `${fontSize}px` }}
    >
      {children}
      <Toaster position="top-right" richColors closeButton />
    </div>
  )
}

