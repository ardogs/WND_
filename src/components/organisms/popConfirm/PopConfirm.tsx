import { Popconfirm as AntPopConfirm, PopconfirmProps } from 'antd'
import { Button } from '../../atoms';
import { usePopConfirmation } from '../../../hooks/popConfirmation/usePopConfirmation';

interface Props extends Omit<PopconfirmProps, 'title' | 'description'> {
    title: string,
    description: string,
    buttonText: string,
    next?: () => void

}

export const PopConfirm = ({ title, description, buttonText, next, ...rest }: Props) => {
    
    const { handleOk, handleCancel, open, showPopconfirm } = usePopConfirmation(next ?? (() => {}))
    return (
        <AntPopConfirm title={title} description={description} open={open} onConfirm={handleOk} onCancel={handleCancel} {...rest}>
            <Button type="primary" onClick={showPopconfirm} text={buttonText}> </Button>
        </AntPopConfirm>
    )
}
