import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { Button, Flex } from '../../../../../components/atoms';
import { useSettings } from '../../../../../hooks';
import "./styles.scss";

export const APIConnectionStatus = () => {
    const { handleStatusConnection, statusConnectionisLoading, statusConnection } = useSettings();
    return (
        <Flex align='center' gap={10}>
            <Button type="primary" text="Probar conexión" onClick={handleStatusConnection} disabled={statusConnectionisLoading} />
            {(statusConnection) ? <AiOutlineCheckCircle /> : <AiOutlineCloseCircle />}
        </Flex>
    )
}
