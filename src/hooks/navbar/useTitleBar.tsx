import { ReactNode, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/img/logo_2.webp'
import { useTranslation } from 'react-i18next'

export interface TitleBarMenuItem {
  key: string
  label: ReactNode
  to?: string
}

export const useTitleBar = () => {
  const { t } = useTranslation('header')
  const navigate = useNavigate()

  const menuItems: TitleBarMenuItem[] = useMemo(
    () => [
      {
        label: t('quotations'),
        to: '/quotations',
        key: 'quotations',
      },
      {
        label: t('invoices'),
        to: '/invoices',
        key: 'invoices',
      },
      {
        label: t('companies'),
        to: '/companies',
        key: 'companies',
      },
    ],
    [t]
  )

  const handleMinimize = useCallback(() => {
    window?.electronAPI?.minimize?.()
  }, [])

  const handleMaximize = useCallback(() => {
    window?.electronAPI?.maximize?.()
  }, [])

  const handleClose = useCallback(() => {
    window?.electronAPI?.close?.()
  }, [])

  const handleHome = useCallback(() => {
    navigate('/')
  }, [navigate])

  const handleGoBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  return {
    menuItems,
    logo,
    handleMinimize,
    handleMaximize,
    handleClose,
    handleHome,
    handleGoBack,
  }
}
