import { Divider as AntDivider, DividerProps } from "antd";

interface Props extends DividerProps {
    description?: string
}
export const Divider = ({ description, ...rest }: Props) => {
    return (
        <AntDivider orientation="left" {...rest}>{description}</AntDivider>
    )
}
