import { Checkbox as AntCheckBox, CheckboxChangeEvent, CheckboxProps } from "antd";

interface Props extends Omit<CheckboxProps, 'checked' | 'name' | 'onChange'> {
    check: boolean,
    name: string,
    onChange: (event: CheckboxChangeEvent) => void
}

export const Checkbox = ({ check, name, onChange, ...rest }: Props) => (
    <AntCheckBox checked={check} name={name} onChange={onChange} {...rest}> Precio del suministro</AntCheckBox >
)


