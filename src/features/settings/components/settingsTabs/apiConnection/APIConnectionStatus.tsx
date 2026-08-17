import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import { Button, Flex } from '../../../../../components/atoms'
import { useSettings } from '../../../../../hooks'
import './styles.scss'

export const APIConnectionStatus = () => {
  const {
    handleStatusConnection,
    statusConnectionisLoading,
    statusConnection,
  } = useSettings()

  return (
    <Flex align="center" gap={12}>
      <Button
        type="primary"
        text="Probar conexión"
        onClick={handleStatusConnection}
        loading={statusConnectionisLoading}
        disabled={statusConnectionisLoading}
      />
      {statusConnection ? (
        <AiOutlineCheckCircle className="api-status-icon connected" />
      ) : (
        <AiOutlineCloseCircle className="api-status-icon disconnected" />
      )}
    </Flex>
  )
}
