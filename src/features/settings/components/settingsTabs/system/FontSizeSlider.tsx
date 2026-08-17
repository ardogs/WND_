import { Flex, Slider, Text } from '../../../../../components/atoms'
import { useSettings } from '../../../../../hooks'

export const FontSizeSlider = () => {
  const { fontSize, handleFontSize } = useSettings()

  return (
    <Flex align="center" justify="center" className="w-[200px] min-w-[180px] gap-3">
      <Slider min={15} max={20} value={fontSize} handleChange={handleFontSize} />
      <Text description={String(fontSize)} className="font-semibold text-xs min-w-[20px] text-right" />
    </Flex>
  )
}
