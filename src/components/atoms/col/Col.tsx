import { Col as AntCol, ColProps } from 'antd';

interface Props extends ColProps {
    children: React.ReactNode;
}

export const Col = ({ children, ...rest }: Props) => {
    return <AntCol {...rest}> {children} </AntCol>
}
