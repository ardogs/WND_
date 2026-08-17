import { useEffect } from 'react'
import { motion } from 'framer-motion'
import logo from '../../../assets/img/logo_2.webp'
import { useSettingsStore } from '../../../store/settings/useSettingStore'

export const LoadingScreen = () => {
  const darkmode = useSettingsStore((state) => state.darkmode)

  useEffect(() => {
    const root = document.documentElement
    if (darkmode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [darkmode])

  return (
    <div className="fixed inset-0 w-screen h-screen bg-background text-foreground flex flex-col items-center justify-center select-none drag-region overflow-hidden z-[9999] transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="flex flex-col items-center justify-center gap-8 no-drag-region"
      >
        {/* Brand identity */}
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="WND Logo"
            className="w-16 h-16 object-contain drop-shadow-md select-none"
            draggable={false}
          />
          <div className="flex flex-col">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Windows <span className="text-primary">&</span> Doors
            </h1>
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mt-0.5">
              Sistema de Gestión
            </span>
          </div>
        </div>

        {/* Loading Spinner & Status */}
        <div className="flex flex-col items-center gap-3 mt-4">
          <div className="relative flex items-center justify-center w-10 h-10">
            <div className="w-9 h-9 border-[3px] border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
          <span className="text-xs font-medium text-muted-foreground tracking-wide animate-pulse">
            Iniciando aplicación...
          </span>
        </div>
      </motion.div>
    </div>
  )
}
