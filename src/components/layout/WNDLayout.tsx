import { memo } from "react";
import { Layout } from 'antd';
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import { TitleBar } from "../organisms";
import { useTheme } from "../../hooks";
const { Header, Content } = Layout;
import "./styles.scss"





export const WNDLayout = memo(() => {

    const { colorBgContainer } = useTheme();
    const location = useLocation();
    const key = location.pathname.split('/')[1] || '/';

    return (
        <Layout className="layout">
            <Header > <TitleBar /> </Header>
            <Content className="main-view-div">
                <div className="main-view-div-card" style={{ backgroundColor: colorBgContainer }}>
                    <AnimatePresence mode="wait">
                        <div className="main-view-div-content" key={key}>
                            <Outlet />
                        </div>
                    </AnimatePresence>
                    {/* <Footer >Copyright © 2025 Windows & Doors. Todos los derechos reservados.</Footer> */}
                </div>
            </Content>
        </Layout>
    );
})