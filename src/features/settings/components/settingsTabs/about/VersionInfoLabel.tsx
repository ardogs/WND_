import { Flex, Text } from '../../../../../components/atoms'

interface Props {
  title: string
  version: string
}

export const VersionInfoLabel = ({ title, version }: Props) => {
  return (
    <Flex justify="space-between" align="center" className="w-full">
      <Text type="secondary" description={title} />
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-muted text-foreground border border-border">
        {version}
      </span>
    </Flex>
  )
}
