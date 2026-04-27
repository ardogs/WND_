import { Select as AntSelect } from 'antd';
import { DefaultOptionType, SelectProps } from 'antd/es/select';
import "./styles.scss"

interface Props extends SelectProps{
    handleChange: (param: string) => void,
    option: DefaultOptionType[]
    defaultValue: string
}


export const Select = ({ handleChange, option, defaultValue, ...rest }: Props) => {
    return <AntSelect size="middle" defaultValue={defaultValue} onChange={handleChange} options={option} {...rest} className='select'/>
}
