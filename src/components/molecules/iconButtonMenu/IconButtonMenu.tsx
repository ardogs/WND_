import React, { ReactNode, useState } from 'react';
import { Popover } from 'antd';

import { IconButton } from '../../atoms';

import './style.scss'

interface Props {
    icon: React.ReactNode,
    content: React.ReactNode,
    title: ReactNode

}

export const IconButtonMenu = ({ icon, content, title }: Props) => {

    const [open, setOpen] = useState(false);

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    return (
        <Popover rootClassName="auto-width-popover"   title={title} content={content} placement="bottomLeft" trigger="click" open={open} onOpenChange={handleOpenChange} >
            <IconButton icon={icon} className="white" />
        </Popover>
    );
};

