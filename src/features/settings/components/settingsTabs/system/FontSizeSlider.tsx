import { Flex, Slider,Text } from '../../../../../components/atoms';
import { useSettings } from '../../../../../hooks';
import "./styles.scss";


export const FontSizeSlider = () => {

    const { fontSize, handleFontSize } = useSettings();

    return (
        <Flex align='center' justify='center' className='font-size-slider-container'>
            <Slider min={15} max={20} value={fontSize} handleChange={handleFontSize} />
            <Text description={String(fontSize)} />
        </Flex>
    )
}
