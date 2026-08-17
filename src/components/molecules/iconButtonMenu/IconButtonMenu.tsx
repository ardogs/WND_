import { ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { IconButton } from '../../atoms'
import { useSettings } from '../../../hooks'
import { useTranslation } from 'react-i18next'
import { DarkModeSwitch } from '../../../features/settings/components/settingsTabs/system/DarkModeSwitch'
import {
  Settings,
  Moon,
  Sun,
  Globe,
  Sliders,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export interface IconButtonMenuProps {
  icon?: ReactNode
  content?: ReactNode
  title?: ReactNode
}

export const IconButtonMenu = ({ icon, content, title }: IconButtonMenuProps) => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation('header')
  const { darkmode, language, handleLanguagueChange, languageisLoading } = useSettings()
  const navigate = useNavigate()

  const languages = [
    { code: 'es', label: 'ES' },
    { code: 'kr', label: 'KR' },
    { code: 'en', label: 'EN' },
  ]

  const handleNavigateSettings = () => {
    setOpen(false)
    navigate('/settings')
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div>
          <IconButton
            icon={icon || <Settings className="w-4 h-4 text-foreground/80" />}
            className="white"
            title={String(title || t('quick_access'))}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-80 p-3 bg-popover/95 backdrop-blur-md border border-border shadow-2xl rounded-2xl space-y-2 select-none"
      >
        {content ? (
          <>
            {title && (
              <div className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-2 pb-1.5 border-b border-border/50">
                {title}
              </div>
            )}
            <div>{content}</div>
          </>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between pb-2 px-1 border-b border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                  <Sparkles className="w-3 h-3" />
                </div>
                <span className="text-xs font-semibold text-foreground tracking-tight">
                  {title || t('quick_access')}
                </span>
              </div>
              <span className="text-[10px] font-medium text-muted-foreground bg-muted/70 px-1.5 py-0.5 rounded-md">
                WND Quick
              </span>
            </div>

            {/* Homogeneous Option Cards */}
            <div className="space-y-1.5">
              {/* Row 1: Dark Mode */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-secondary/40 hover:bg-secondary/60 border border-border/40 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center border border-border/60 shadow-2xs shrink-0">
                    {darkmode ? (
                      <Moon className="w-4 h-4 text-blue-400" />
                    ) : (
                      <Sun className="w-4 h-4 text-amber-500" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-foreground">
                      {t('dark_mode')}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {darkmode ? 'Tema oscuro activo' : 'Tema claro activo'}
                    </span>
                  </div>
                </div>
                <DarkModeSwitch />
              </div>

              {/* Row 2: Language */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-secondary/40 hover:bg-secondary/60 border border-border/40 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center border border-border/60 shadow-2xs shrink-0">
                    <Globe className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-foreground">
                      {t('language')}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {language === 'es' ? 'Español' : language === 'kr' ? '한국어' : 'English'}
                    </span>
                  </div>
                </div>

                {/* Segmented language selector */}
                <div className="flex items-center p-0.5 rounded-lg bg-background/80 border border-border/60 shadow-2xs">
                  {languages.map((item) => {
                    const isActive = language === item.code
                    return (
                      <button
                        key={item.code}
                        disabled={languageisLoading}
                        onClick={() => handleLanguagueChange(item.code)}
                        className={cn(
                          'px-2 py-0.5 text-[11px] font-semibold rounded-md transition-all cursor-pointer',
                          isActive
                            ? 'bg-primary text-primary-foreground shadow-xs'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        )}
                      >
                        {item.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Row 3: Settings Navigation */}
              <div
                onClick={handleNavigateSettings}
                className="flex items-center justify-between p-2.5 rounded-xl bg-secondary/40 hover:bg-primary/10 border border-border/40 hover:border-primary/30 group transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-background group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center text-foreground border border-border/60 shadow-2xs transition-colors shrink-0">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
                      {t('setting')}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      Preferencias del sistema y API
                    </span>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-md flex items-center justify-center group-hover:bg-primary/15 text-muted-foreground group-hover:text-primary transition-colors">
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}
