import { Flex, Text } from '../../../../../components/atoms'
import './styles.scss'

interface Props {
  title: string
  version: string
}

export const VersionInfoLabel = ({ title, version }: Props) => {
  return (
    <Flex justify="space-between" align="center" className="w-full">
      <Text type="secondary" description={title} />
      <span className="about-badge font-mono">{version}</span>
    </Flex>
  )
}
