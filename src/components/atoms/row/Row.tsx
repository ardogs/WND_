import { Row as AntRow, RowProps } from 'antd';

interface Props extends RowProps {
    children: React.ReactNode;
}

export const Row = ({ children, ...rest }: Props) => {
    return <AntRow {...rest}> {children} </AntRow>
}
