import { Flex, Title, Text, Button } from '../../../../components/atoms'
import { AnimationProvider } from '../../../../providers/animation/AnimationProvider'
import animation from '../../../../assets/animations/file_transfer.json'

export const QuoteGetFile = () => {
  return (
    <Flex vertical align="center" className="w-full overflow-y-hidden space-y-4">
      <Title level={2} text="El archivo se está creando" />
      <Text description="Por favor espere un momento. El botón de abajo se activará una vez que el archivo esté listo" />
      <AnimationProvider animation={animation} height={300} />
      <Button type="primary" loading={true} text="Abrir archivo" />
    </Flex>
  )
}
