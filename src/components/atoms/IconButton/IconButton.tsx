import { Button as AntButton, ButtonProps } from "antd";
import './styles.scss'

export type buttonIconClassName = 'red' | 'white';

interface Props extends Omit<ButtonProps, 'icon' | 'className'> {
    icon: React.ReactNode;
    className?: buttonIconClassName,
}

export const IconButton = ({ icon, className, type = "text", size = "large", ...rest }: Props) => {
    return <AntButton type={type} icon={icon} className={`buttonIcon-${className}`} size={size} {...rest} />
}
