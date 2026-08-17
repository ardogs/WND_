import { ReactNode } from 'react'
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

  const menuItems: TitleBarMenuItem[] = [
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
  ]

  const navigate = useNavigate()

  const handleMinimize = () => {
    window?.electronAPI?.minimize?.()
  }

  const handleMaximize = () => {
    window?.electronAPI?.maximize?.()
  }

  const handleClose = () => {
    window?.electronAPI?.close?.()
  }

  const handleHome = () => {
    navigate('/')
  }
  const handleGoBack = () => {
    navigate(-1)
  }

  return {
    //Values
    menuItems,
    logo,

    //Functions
    handleMinimize,
    handleMaximize,
    handleClose,
    handleHome,
    handleGoBack,
  }
}
