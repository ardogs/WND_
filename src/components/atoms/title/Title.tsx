import { Typography } from 'antd';
import { type TitleProps } from 'antd/es/typography/Title';
const { Title: AntTitle } = Typography;

interface Props extends Omit<TitleProps, 'level' | 'text'> {
    level: TitleProps["level"],
    text: string
}


export const Title = ({ level, text, ...rest }: Props) => {
    return (
        <AntTitle level={level} {...rest}>{text}</AntTitle>
    )
}
