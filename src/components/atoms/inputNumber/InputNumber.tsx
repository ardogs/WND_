import { InputNumber as AntInputNumber, InputNumberProps } from 'antd';
import "./styles.scss"

export const InputNumber = (props: InputNumberProps) => {

    return (
        <AntInputNumber formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            min={0}
            max={10000000}
            controls={false}
            {...props}
        />
    )
}
