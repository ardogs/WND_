import { Flex } from 'antd';
import { useTitleBar } from '../../../hooks';
import { Image } from '../../atoms';
import { Menu } from '../../atoms';
import { ControlButtons } from '../../molecules';
import { NavigationButtons } from '../../molecules';
import "./styles.scss"

export const TitleBar = () => {

    const { logo, menuItems, dataList, titleList, handleHome, handleGoBack, handleMinimize, handleMaximize, handleClose } = useTitleBar();

    return (
        <Flex justify="space-between" align="center" className="drag-region" >
            <div className="div-content no-drag-region">
                <Image src={logo} alt="WND's" width={24} />
                <NavigationButtons handleHome={handleHome} handleGoBack={handleGoBack} />
                <div className="menu-wrapper">
                    <Menu items={menuItems} />
                </div>
            </div>

            <div className=" div-content no-drag-region">
                <ControlButtons handleMinimize={handleMinimize} handleMaximize={handleMaximize} handleClose={handleClose} content={dataList} title={titleList} />
            </div>
        </Flex>
    )
}
