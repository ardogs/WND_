// import { Flex } from 'antd'
// import React from 'react'
import { Flex, Text } from '../../../../../components/atoms'
import "./styles.scss"

interface Props {
    title: string,
    version: string
}
export const VersionInfoLabel = ({ title, version }: Props) => {
    return (
        <Flex  vertical align='center' justify='center' className='VersionInfoLabel' gap={5}>
            <Text type="secondary"description={title} />
            <Text  description={version} />
        </Flex>
    )
}
