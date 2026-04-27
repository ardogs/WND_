import { Card as AntCard, CardProps } from 'antd';
import "./styles.scss"
const { Meta } = AntCard;

interface Props extends CardProps {
    title: string
}

export const Card = ({ title, ...rest }: Props) => {
    return (
        <AntCard  className="shadow card" {...rest}>
            <Meta title={title} />
        </AntCard>
    )
}
