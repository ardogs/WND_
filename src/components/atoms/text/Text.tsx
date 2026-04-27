
import { Typography } from "antd";
import { BaseType } from "antd/es/typography/Base";
import { TextProps } from "antd/es/typography/Text";

const { Text: AntText } = Typography;

interface Props extends Omit<TextProps, 'type'> {
    type?: BaseType,
    description: string,

}

export const Text = ({ type, description }: Props) => {
    return (
        <AntText type={type}> {description}</AntText>
    )
}
