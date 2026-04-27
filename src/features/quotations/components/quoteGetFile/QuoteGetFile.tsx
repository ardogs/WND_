import { Flex, Title, Text, Button } from '../../../../components/atoms'
import { AnimationProvider } from '../../../../providers/animation/AnimationProvider';
import  animation  from '../../../../assets/animations/file_transfer.json';
import "./styles.scss";

export const QuoteGetFile = () => {
  return (
    <Flex vertical align='center' className='QuoteGetFile'>
        <Title level={2} text='El archivo se esta creando'/>
        <Text description='Por favor espere un momento. El botón de abajo se activara una vez que el archivo este listo'/>
        <AnimationProvider animation={animation} height={300}/>
        <Button type='primary'  loading={true} text='Abrir archivo'/>
    </Flex>
  )
}
