import { AnimationProvider } from '../../../providers/animation/AnimationProvider';
import { Title, Flex, Button } from "../../atoms"
import { useTheme, useTitleBar } from "../../../hooks";
import animation from '../../../assets/animations/404Error.json';
import "./styles.scss";


export const Error = () => {
    const { handleHome } = useTitleBar();
    const { colorBgContainer } = useTheme();
    return (
        <Flex vertical className="container" justify="center" align="center" style={{ backgroundColor: colorBgContainer }}>
            <Title level={1} text="Parece que el recurso no se encontró" />
            <AnimationProvider animation={animation} height={200} />
            <Button text="Volver al inicio" type="primary" onClick={handleHome} />
        </Flex>
    )
}

