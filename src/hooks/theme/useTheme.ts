import { theme } from 'antd';
const { useToken } = theme;

export const useTheme = () => {

    const { token } = useToken();

    return {
        colorBgBase: token.colorBgBase,
        colorBgContainer: token.colorBgContainer
    }
}

