import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { ItemType } from 'antd/es/menu/interface';
import { Menu as AntMenu } from 'antd';

import "./styles.scss"

interface Props {
    items: ItemType[]
}

const getSelectedKey = (pathname: string): string | undefined => {
    if (pathname === '/') return 'home';
    if (pathname.includes('/quotation')) return 'quotations';
    if (pathname.includes('/invoices')) return 'invoices';
    if (pathname.includes('/companies')) return 'companies';
};

export const Menu = ({ items }: Props) => {
    const location = useLocation();
    const [current, setCurrent] = useState<string>('');

    useEffect(() => {
        const currentPath = getSelectedKey(location.pathname) || 'Home'
        setCurrent(currentPath);
    }, [location.pathname])

    return <AntMenu selectedKeys={[current]} mode="horizontal" items={items} />;
};

