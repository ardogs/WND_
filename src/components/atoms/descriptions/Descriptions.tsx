import { Descriptions as AntDescriptions, DescriptionsProps as AntDescriptionsProps } from 'antd';

interface Props extends Omit<AntDescriptionsProps, 'children'> {
    children: React.ReactNode;
}

const DescriptionWrapper = ({ children, ...rest }: Props) => {
    return <AntDescriptions {...rest}>{children}</AntDescriptions>
}

export const Descriptions = Object.assign(DescriptionWrapper, {
    Item: AntDescriptions.Item
})

