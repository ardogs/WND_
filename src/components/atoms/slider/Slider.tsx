import { Slider as AntSlider } from 'antd';
import type { SliderSingleProps } from 'antd/es/slider';
// import { div } from 'framer-motion/client';


interface Props extends Omit<SliderSingleProps, 'min' | 'max'> {
    min: number,
    max: number,
    value: number
    handleChange: (size: number) => void
}

export const Slider = ({ min, max, value, handleChange }: Props) => {
    return (
        <div style={{ width: "80%", margin: "0 15px" }}>
            <AntSlider min={min} max={max} onChange={handleChange} value={value}/>
        </div>
    )
}
