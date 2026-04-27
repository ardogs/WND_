import { Title } from '../../atoms/title/Title';
import { Text } from '../../atoms/text/Text';
import { Flex } from '../../atoms';

interface Props {
  title: string,
  description: string
}

export const TitleWithDescription = ({ title, description }: Props) => {
  return (
    <Flex vertical align='start' justify='center'>
      <Title level={5} text={title} />
      <Text type="secondary" description={description} />
    </Flex >



  )
}
