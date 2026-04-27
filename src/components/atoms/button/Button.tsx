import { Button as AntButton } from 'antd';
import type { ButtonProps } from 'antd';
import "./styles.scss"

interface Props extends Omit<ButtonProps, 'type'> {
    type: ButtonProps['type'];
    text: string
}

export const Button = ({ type, text, ...rest }: Props) => {
    return (
        <AntButton type={type} {...rest} className='my-button'>{text}</AntButton>
    )
}
