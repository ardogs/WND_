import { useNavigate, Link } from 'react-router-dom';
import { MenuProps } from "antd";
import logo from '../../assets/img/logo_2.webp';
import { useTranslation } from 'react-i18next';
import { ListdataSource } from '../../components/atoms/list/types';
import { DarkModeSwitch } from '../../features/settings/components/settingsTabs/system/DarkModeSwitch';
import { LanguageSelect } from '../../features/settings/components/settingsTabs/system/LanguageSelect';

export const useTitleBar = () => {

    const { t } = useTranslation("header");

    type MenuItem = Required<MenuProps>['items'][number];

    const menuItems: MenuItem[] = [
        {
            label: <Link to="/quotations"> {t("quotations")} </Link>,
            key: 'quotations',
        },
        {
            label: <Link to="/invoices"> {t("invoices")} </Link>,
            key: 'invoices',
        },
        {
            label: <Link to="/companies"> {t("companies")}</ Link >,
            key: 'companies',
        },

    ];

    const dataList: ListdataSource[] = [
        {
            title: t("dark_mode"),
            action: <DarkModeSwitch />
        },
        {
            title: t("language"),
            action: <LanguageSelect />
        },
        {
            title: t("setting"),
            action: <Link to="/settings">{t("go")}</Link>,
        },
    ];

    const navigate = useNavigate();

    const handleMinimize = () => {
        window?.electronAPI?.minimize?.();
    }

    const handleMaximize = () => {
        window?.electronAPI?.maximize?.()
    }

    const handleClose = () => {
        window?.electronAPI?.close?.()
    }

    const handleHome = () => {
        navigate('/')
    }
    const handleGoBack = () => {
        navigate(-1)
    }


    return {
        //Values
        menuItems,
        dataList,
        titleList: t("quick_access"),
        logo,

        //Functions
        handleMinimize,
        handleMaximize,
        handleClose,
        handleHome,
        handleGoBack
    }
}
