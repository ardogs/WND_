import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import { Button, Flex } from '../../../../../components/atoms'
import { useSettings } from '../../../../../hooks'

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
        <AiOutlineCheckCircle className="text-xl text-emerald-500" />
      ) : (
        <AiOutlineCloseCircle className="text-xl text-destructive" />
      )}
    </Flex>
  )
}
