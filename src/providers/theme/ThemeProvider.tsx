import { ReactNode } from 'react'
import { ConfigProvider, theme } from 'antd';
import { lightTheme, darkTheme } from './theme';
import { useSettingsStore } from '../../store/settings/useSettingStore';

interface Props {
    children: ReactNode
}

export const ThemeProvider = ({ children }: Props) => {

    const darkmode = useSettingsStore((state) => state.darkmode)
    const fontSize = useSettingsStore((state) => state.fontSize)

    const baseTheme = !darkmode ? lightTheme : darkTheme;
    const finalTheme = { ...baseTheme,
        token: {
            ...baseTheme.token,
            fontSize: fontSize,
        },
    };

    const algorithm = darkmode ? theme.darkAlgorithm : theme.defaultAlgorithm;
    return (
        <ConfigProvider theme={{ ...finalTheme, algorithm }} >
            {children}
        </ConfigProvider>
    )
}
