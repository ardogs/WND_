import { Flex as AntFlex, FlexProps } from 'antd';

interface Props extends FlexProps {
    children: React.ReactNode,
}

export const Flex = ({ children, ...rest }: Props) => {
    return (
        <AntFlex {...rest}>{children}</AntFlex>
    )
}
