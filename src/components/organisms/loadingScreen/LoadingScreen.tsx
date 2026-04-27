import { Title, Flex, Image } from "../../atoms"
import { AnimatedPage } from "../../layout"
import logo from "../../../assets/img/logo_2.webp";
import "./styles.scss"
// import { Flex } from '../../atoms/flex/Flex';



export const LoadingScreen = () => {
    return (
        <AnimatedPage>

            <Flex vertical className="container" justify="center" align="center">
                <Flex justify="center" align="center" gap={25}>
                    <Title level={1} text="Windows & Doors" className="title" />
                    <Image src={logo} alt="logo" width={100} />
                </Flex>
                
                <span className="loader"></span>
            </Flex>

        </AnimatedPage>
    )
}

