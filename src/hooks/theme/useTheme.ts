import { useSettingsStore } from '../../store/settings/useSettingStore'

export const useTheme = () => {
  const darkmode = useSettingsStore((state) => state.darkmode)

  return {
    isDark: darkmode,
    colorBgBase: darkmode ? '#252525' : '#EAEAEA',
    colorBgContainer: darkmode ? '#2E2E2E' : '#FCFCFC',
    colorBgElevated: darkmode ? '#1E1E1E' : '#F9F9F9',
    colorPrimary: '#0176D3',
    colorTextBase: darkmode ? '#D9D9D9' : '#464747',
  }
}
