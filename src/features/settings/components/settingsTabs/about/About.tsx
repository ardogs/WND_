import Logo from "../../../../../assets/img/logo_2.webp";
import { Image, Title, Flex, Text } from '../../../../../components/atoms';
import { useSettings } from "../../../../../hooks";
import { VersionInfoLabel } from "./VersionInfoLabel";
import "./styles.scss"

export const About = () => {

  const { apiVersion, uiVersion, electronVersion, chromeVersion, osType, osVersion, osArch } = useSettings();
  return (
    <Flex vertical align="center" justify="center">
      <Image src={Logo} alt="WND" width={127} />
      <Title level={5} text="Plataforma de control W&D's" />
      <VersionInfoLabel title="Versión del sistema" version={apiVersion} />
      <VersionInfoLabel title="Versión de la UI" version={ uiVersion } />
      <VersionInfoLabel title="Versión de electron" version={ electronVersion } />
      <VersionInfoLabel title="Versión de chrome" version={ chromeVersion } />
      <VersionInfoLabel title="Sistema operativo" version={ osType } />
      <VersionInfoLabel title="Compilación del sistema operativo" version={ osVersion } />
      <VersionInfoLabel title="Arquitectura" version={osArch} />
      <Text type="secondary"description="Copyright © 2025 Windows & Doors. Todos los derechos reservados." className="copyright"/>

    </Flex>
  )
}
