// import { ReactNode } from 'react';
import { Flex } from 'antd';

import { IconButton, List } from '../../atoms';
import { IconButtonMenu } from '../iconButtonMenu';
import { ListdataSource } from '../../atoms/list/types';
import { AiOutlineSetting, AiOutlineMinus, AiOutlineBorder, AiOutlineClose } from 'react-icons/ai';

import './styles.scss'


interface Props {
    handleMinimize: () => void
    handleMaximize: () => void
    handleClose: () => void
    content: ListdataSource[],
    title: string
}

export const ControlButtons = ({ handleMinimize, handleMaximize, handleClose, content, title }: Props) => {
    return (
        <Flex className="borderLeft control-button-div" justify='center' align='center' >
            <IconButtonMenu icon={<AiOutlineSetting />} content={<List data={content} />} title={ title } />
            <IconButton icon={<AiOutlineMinus />} className="white" onClick={handleMinimize} />
            <IconButton icon={<AiOutlineBorder />} className="white" onClick={handleMaximize} />
            <IconButton icon={<AiOutlineClose />} className="red" onClick={handleClose} />
        </Flex>
    )
}

